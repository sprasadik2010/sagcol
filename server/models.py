from sqlalchemy import Column, Integer, String, Numeric, Boolean
from database import Base  # from your database.py

class Product(Base):
    __tablename__ = "Products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    price = Column(Numeric(8, 2))
    stock = Column(Integer, default=0)
    imagepath = Column(String)
    isactive = Column(Boolean)
