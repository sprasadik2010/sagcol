// src/api/productApi.js

const API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/GetAllProducts`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json(); // expects array of product objects
};

export const getProductImage = async (fileId) => {
  // Construct Drive URL or call FastAPI endpoint if you proxy image fetching
  return `https://drive.usercontent.google.com/download?id=${fileId}`;
};
