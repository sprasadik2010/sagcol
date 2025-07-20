import { useState } from "react";
import { FaShoppingBasket } from "react-icons/fa";
import Cart from "./Cart";

export default function CartIconWithPopup({ cartItems = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="relative">
        <FaShoppingBasket className="text-2xl text-gray-800" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
            {itemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[350px] max-h-[500px] bg-white shadow-lg rounded-xl z-50 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold">Cart</h3>
            <button
              className="text-gray-500 hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>
          <Cart cartItems={cartItems} />
        </div>
      )}
    </div>
  );
}
