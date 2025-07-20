from pydantic import BaseModel
from typing import Optional

# Response schema
class ProductSchema(BaseModel):
    id: int
    name: str
    description: Optional[str]
    price: Optional[float]
    stock: int
    imagepath: Optional[str]
    isactive: Optional[bool]

    class Config:
        from_attributes = True  # Enables automatic conversion from SQLAlchemy model

# Request schema for creating a product (no `id`)
class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: Optional[float] = None
    stock: int = 0
    imagepath: Optional[str] = None
    isactive: Optional[bool] = True
