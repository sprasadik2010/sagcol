import { useEffect, useState } from "react";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteProductImage
} from "../api/productApi";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const handleSave = async (product) => {
    if (editing) {
      await updateProduct(editing.id, product);
      setEditing(null);
    } else {
      await createProduct(product);
    }
    loadProducts();
  };

  const handleDelete = async (id, imagepath) => {
    await deleteProduct(id);
    await deleteProductImage(imagepath)
    loadProducts();
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Product Management</h1>
      <ProductForm onSave={handleSave} product={editing} />
      <ProductList
        products={products}
        onEdit={(p) => setEditing(p)}
        onDelete={handleDelete}
      />
    </div>
  );
}
