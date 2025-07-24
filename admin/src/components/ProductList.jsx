import { useState, useEffect } from "react";
import { getProductImage } from "../api/productApi";

const API_URL = import.meta.env.VITE_API_URL;

function ProductImage({ fileId }) {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchImage() {
      try {
        const url = await getProductImage(fileId);
        if (isMounted) {
          setImgUrl(url);
        }
      } catch (err) {
        console.error("Image load error:", err);
      }
    }

    if (fileId) {
      fetchImage();
    }

    return () => {
      isMounted = false;
    };
  }, [fileId]);

  if (!imgUrl) return <div className="w-full h-40 bg-gray-200" />; // Placeholder

  return <img src={imgUrl} alt="" className="w-full h-40 object-cover mb-2" />;
}

export default function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow">
          {product.imagepath && <ProductImage fileId={product.imagepath} />}
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="text-gray-700 text-sm">{product.description}</p>
          <p className="text-gray-800 font-medium">₹{product.price}</p>
          <p className="text-sm">Stock: {product.stock}</p>
          <p className={`text-sm ${product.isactive ? "text-green-600" : "text-red-600"}`}>
            {product.isactive ? "Active" : "Inactive"}
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => onEdit(product)}
              className="px-3 py-1 bg-yellow-400 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
