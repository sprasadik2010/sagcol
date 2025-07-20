import { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../utils/CartStorage";

export default function ProductItem(props) {
  const {
    id,
    src,
    name,
    price,
    priceSale,
    status,
    colors = [],
  } = props;

  // const [cart, setCart] = useState(loadCart());

  // useEffect(() => {
  //   saveCart(cart);
  // }, [cart]);
  const addToCart = useCartStore(state => state.addToCart);
  const handleAddToCart = (item) => {
    addToCart(item);
  };

  // const handleAddToCart = () =>{
  //   saveCart({id:id,name:name,price:price,quantity:1,image:src});
  // }

  return (
    <div className="bg-white p-4 rounded-lg shadow-[0_4px_10px_rgba(59,130,246,0.5)] hover:shadow-[0_8px_20px_rgba(59,130,246,0.7)] hover:transition-shadow duration-300">
      <div className="relative pt-[100%]">
        {status && (
          <span
            className={`absolute top-4 right-4 z-10 uppercase text-xs font-semibold px-2 py-1 rounded-full ${status === "sold out"
              ? "bg-red-500 text-white"
              : "bg-blue-500 text-white"
              }`}
          >
            {status}
          </span>
        )}
        <img
          key={id}
          src={src}
          alt={`product-${id}`}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      <div className="p-4 space-y-2">
        <div className="text-sm font-medium text-gray-800 truncate hover:underline cursor-pointer">
          {name}
        </div>


        <div className="flex items-center justify-between">
          <div className="flex -space-x-1">
            {/* Add to Cart Icon */}
            <button
              className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:cursor-pointer hover:bg-blue-600 transition-all z-10"
              onClick={() =>
                handleAddToCart({ id, name, price, quantity: 1, image: src })
              }
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
