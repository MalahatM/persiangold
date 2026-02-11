import { useCartStore } from "../../store/cartStore";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isCartOpen);
  const closeCart = useCartStore((s) => s.closeCart);

  const items = useCartStore((s) => s.items);
  const increase = useCartStore((s) => s.increase);
  const decrease = useCartStore((s) => s.decrease);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalPrice = useCartStore((s) => s.totalPrice());

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)" }}
      onClick={closeCart}
    >
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 320,
          height: "100%",
          background: "#111",
          color: "#fff",
          padding: 16,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>Cart</h3>
          <button type="button" onClick={closeCart} aria-label="Close cart">✕</button>
        </div>

        <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
          {items.length === 0 ? (
            <p style={{ opacity: 0.8 }}>Your cart is empty.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} style={{ border: "1px solid #333", padding: 12, borderRadius: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{it.name}</div>
                    <div style={{ opacity: 0.8 }}>{it.price} kr</div>
                  </div>
                  <button type="button" onClick={() => removeItem(it.id)} aria-label="Remove item">
                    🗑️
                  </button>
                </div>

                <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                  <button type="button" onClick={() => decrease(it.id)}>-</button>
                  <span>{it.qty}</span>
                  <button type="button" onClick={() => increase(it.id)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ marginTop: 16, borderTop: "1px solid #333", paddingTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Total</span>
            <strong>{totalPrice} kr</strong>
          </div>
        </div>
      </div>
    </div>
  );
}