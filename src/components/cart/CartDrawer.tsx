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
      onClick={closeCart}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,

        background: "rgba(0,0,0,0.25)",

        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        padding: 16, 
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 320,
          maxWidth: "92%",
          height: "55%",          
          marginTop: 8,           
          background: "#111",
          color: "#fff",
          padding: 16,
          borderRadius: 16,   
          border: "1px solid #2a2a2a",
          boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
          overflow: "auto",     
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <h3 style={{ margin: 0 }}>Cart</h3>
          <button type="button" onClick={closeCart} aria-label="Close cart">
            ✕
          </button>
        </div>

        <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
          {items.length === 0 ? (
            <p style={{ opacity: 0.8 }}>Your cart is empty.</p>
          ) : (
            items.map((it) => (
              <div
                key={it.id}
                style={{
                  border: "1px solid #333",
                  padding: 12,
                  borderRadius: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{it.name}</div>
                    <div style={{ opacity: 0.8 }}>{it.price} £</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(it.id)}
                    aria-label="Remove item"
                  >
                    🗑️
                  </button>
                </div>

                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <button type="button" onClick={() => decrease(it.id)}>
                    -
                  </button>
                  <span>{it.qty}</span>
                  <button type="button" onClick={() => increase(it.id)}>
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ marginTop: 16, borderTop: "1px solid #333", paddingTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Total</span>
            <strong>{totalPrice} £</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
