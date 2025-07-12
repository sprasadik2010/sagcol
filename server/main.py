from fastapi import FastAPI
from routers import products_router, orders_router  # Imported from __init__.py

app = FastAPI()

# Include routers
app.include_router(products_router)
app.include_router(orders_router)

# # Optional root route
# @app.get("/")
# def read_root():
#     return {"message": "Welcome to the SAG Collections API"}
