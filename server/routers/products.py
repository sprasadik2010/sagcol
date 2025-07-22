from fastapi import APIRouter, Depends, File, UploadFile, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from typing import List
# from gdrivefuncs.gdrivefunctions import upload_file_to_drive
from gdrivefuncs.upload_to_drive import upload_file_to_drive
from uuid import uuid4
import shutil
import os


from database import SessionLocal
from models import Product
from schemas import ProductSchema, ProductCreate

from fastapi import FastAPI, Request
from fastapi.responses import RedirectResponse

router = APIRouter(prefix="/products", tags=["Products"])

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 1. Get all products
@router.get("/GetAllProducts", response_model=List[ProductSchema])
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).all()

# 2. Get product by ID
@router.get("/GetProductById/{product_id}", response_model=ProductSchema)
def get_product_by_id(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# 3. Search products by name
@router.get("/SearchProduct", response_model=List[ProductSchema])
def search_product(query: str = Query(..., min_length=1), db: Session = Depends(get_db)):
    results = db.query(Product).filter(Product.name.ilike(f"%{query}%")).all()
    return results

# 4. Add a new product
@router.post("/AddProduct", response_model=ProductSchema)
def add_product(product: ProductCreate, db: Session = Depends(get_db)):
    try:
        new_product = Product(**product.dict())
        db.add(new_product)
        db.commit()
        db.refresh(new_product)
        return new_product
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Error adding product")

# 4. Upload a  product Image
@router.patch("/upload-product-image")
async def upload_product_image(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:
        # Save temporarily
        guid = str(uuid4())
        temp_path = f"temp_{guid}_{file.filename}"
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Upload to Google Drive
        folder_id = "1LFN2Oy2wiNGMJKixfAIrWlmwR8xISJR5"
        gdrive_link = upload_file_to_drive(temp_path, file.filename, folder_id)

        # Optionally: Save image reference to a ProductImage or similar table
        # For now, just return the link

        os.remove(temp_path)

        return {
            "message": "Image uploaded successfully",
            "filename": file.filename,
            "drive_url": gdrive_link
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading image: {str(e)}")
    
# 4. Auth Redirect Url
@router.get("/oauth2callback")
async def oauth2callback(request: Request):
    from gdrivefuncs.upload_to_drive import handle_auth_callback

    full_url = str(request.url)
    try:
        handle_auth_callback(full_url)
        return {"message": "Authorization successful. You can now upload files."}
    except Exception as e:
        return {"error": str(e)}


# 5. Authorisation
@router.get("/authorize")
def authorize():
    from gdrivefuncs.upload_to_drive import get_auth_url
    auth_url = get_auth_url()
    return RedirectResponse(auth_url)