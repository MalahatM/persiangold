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
  clear: () => void;

  totalCount: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
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

  clear: () => set({ items: [] }),

  totalCount: () => get().items.reduce((sum, x) => sum + x.qty, 0),
  totalPrice: () => get().items.reduce((sum, x) => sum + x.price * x.qty, 0),
}));