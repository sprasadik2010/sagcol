from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import products_router, orders_router  # Your routers

app = FastAPI()

# ✅ Add this middleware to fix CORS error
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://sagcollections-admin.onrender.com",
        "https://sagcollections-client.onrender.com"
        ], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include your routers
app.include_router(products_router)
app.include_router(orders_router)

# Optional root route
@app.get("/")
def read_root():
    return {"message": "Welcome to the SAG Collections API"}
