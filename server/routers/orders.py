from fastapi import APIRouter

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.get("/")
async def get_orders():
    return {"message": "List of orders"}
