import { FaShoppingBasket } from "react-icons/fa";

export default function CartIcon({ cartItems = [] }) {
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative w-fit">
      <FaShoppingBasket className="text-2xl text-gray-700" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2">
          {itemCount}
        </span>
      )}
    </div>
  );
}
