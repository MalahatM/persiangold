import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  qty: number;
};

type CartState = {
  isCartOpen: boolean;
  items: CartItem[];

  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;

  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  isCartOpen: false,
  items: [],

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),

  addItem: (item) =>
    set((s) => {
      const found = s.items.find((x) => x.id === item.id);
      if (found) {
        return {
          items: s.items.map((x) =>
            x.id === item.id ? { ...x, qty: x.qty + 1 } : x
          ),
        };
      }
      return { items: [...s.items, { ...item, qty: 1 }] };
    }),

  removeItem: (id) => set((s) => ({ items: s.items.filter((x) => x.id !== id) })),

  increase: (id) =>
    set((s) => ({
      items: s.items.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)),
    })),

  decrease: (id) =>
    set((s) => ({
      items: s.items
        .map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x))
        .filter((x) => x.qty > 0),
    })),

  clearCart: () => set({ items: [] }),
}));
