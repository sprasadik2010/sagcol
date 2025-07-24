import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { fetchProducts } from "../api/productApi";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then(data => {
        setProducts(data);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading products...</div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          fileId={product.imagepath} // image file id
          name={product.name}
          price={product.price}
          priceSale={product.price > 1000 ? product.price - 200 : null} // Example sale logic
          status={!product.isactive ? "sold out" : ""}
        />
      ))}
    </div>
  );
}
