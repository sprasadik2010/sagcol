import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../utils/CartStorage";
import { getProductImage } from "../api/productApi";

export default function ProductItem({ id, fileId, name, price, priceSale, status }) {
  const [imgUrl, setImgUrl] = useState("");
  const addToCart = useCartStore(state => state.addToCart);

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

  const handleAddToCart = () => {
    addToCart({ id, name, price, quantity: 1, image: imgUrl });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-[0_4px_10px_rgba(59,130,246,0.5)] hover:shadow-[0_8px_20px_rgba(59,130,246,0.7)] hover:transition-shadow duration-300">
      <div className="relative pt-[100%]">
        {status && (
          <span className={`absolute top-4 right-4 z-10 uppercase text-xs font-semibold px-2 py-1 rounded-full ${
            status === "sold out" ? "bg-red-500 text-white" : "bg-blue-500 text-white"
          }`}>
            {status}
          </span>
        )}
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={`product-${id}`}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200" />
        )}
      </div>

      <div className="p-4 space-y-2">
        <div className="text-sm font-medium text-gray-800 truncate hover:underline cursor-pointer">
          {name}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-1">
            <button
              className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:cursor-pointer hover:bg-blue-600 transition-all z-10"
              onClick={handleAddToCart}
            >
              <FaShoppingCart />
            </button>
          </div>

          <div className="text-sm font-semibold text-gray-900">
            {priceSale && (
              <span className="line-through text-gray-400 mr-1">
                ₹{priceSale}
              </span>
            )}
            ₹{price}
          </div>
        </div>
      </div>
    </div>
  );
}
