import { useCartStore } from "../utils/CartStorage";

export default function Cart() {
  const cartItems = useCartStore(state => state.cart);
  const setCart = useCartStore(state => state.setCart); // Add this if you want to update cart in store

  const updateQuantity = (id, amount) => {
    const updated = cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );
    setCart(updated); // Update the global cart state
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCart(updated);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center bg-white rounded-xl shadow-md p-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-l"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded-r"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="ml-4 text-red-500 hover:text-red-700"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <span className="text-xl font-bold">Total: ₹{total}</span>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
