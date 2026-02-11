import "./App.css";
import CartButton from "./components/cart/CartButton";
import CartDrawer from "./components/cart/CartDrawer";
import { useCartStore } from "./store/cartStore";

export default function App() {
  const addItem = useCartStore((s) => s.addItem);
  const clear = useCartStore((s) => s.clear);

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <CartButton />
      </div>

      <CartDrawer />

      <h1>Test Cart</h1>

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button
          onClick={() =>
            addItem({
              id: "p1",
              name: "Test Product",
              price: 99,
              imageUrl: "",
            })
          }
        >
          Add Test Product
        </button>

        <button onClick={clear}>Clear Cart</button>
      </div>
    </div>
  );
}
