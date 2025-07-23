const API_URL = import.meta.env.VITE_API_URL;

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

export const uploadProductImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload-product-image`, {
    method: "PATCH",
    body: formData,
    credentials: "include", // optional — only needed if using cookies/auth
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Failed to upload image");
  }

  return res.json(); // contains drive_url and message
};