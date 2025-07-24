// src/api/productApi.js

const API_URL = import.meta.env.VITE_API_URL;

export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/GetAllProducts`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return res.json(); // expects array of product objects
};

export const getProductImage = async (fileid) => {
  const res = await fetch(`${API_URL}/getimage/${fileid}`, {
    method: "GET",
    credentials: "include", // optional if using cookies/auth
  });

  if (!res.ok) {
    throw new Error("Failed to fetch image");
  }

  const blob = await res.blob();
  const imageUrl = URL.createObjectURL(blob); // create object URL for blob

  return imageUrl; // can be used as src in <img>
};
