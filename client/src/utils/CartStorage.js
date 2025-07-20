import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (product) => {
        const existing = get().cart.find(p => p.name === product.name);
        if (existing) {
          set({
            cart: get().cart.map(p =>
              p.name === product.name ? { ...p, quantity: p.quantity + 1 } : p
            )
          });
        } else {
          set({ cart: [...get().cart, { ...product, quantity: 1 }] });
        }
      },
      removeFromCart: (name) =>
        set({ cart: get().cart.filter(p => p.name !== name) }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'shopping-cart', // key in localStorage
    }
  )
);
