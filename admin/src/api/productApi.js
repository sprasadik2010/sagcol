const API_URL = "http://localhost:8000/products"; // FastAPI backend

export const fetchProducts = async () => {
  const res = await fetch(API_URL + "/GetAllProducts");
  return res.json();
};

export const createProduct = async (product) => {
  const res = await fetch(API_URL + "/AddProduct", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Failed to add product");
  }

  return res.json();
};

export const updateProduct = async (id, product) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
};

export const deleteProduct = async (id) => {
  return fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
