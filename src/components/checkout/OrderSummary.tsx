type CartItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

type Props = {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

function formatEUR(value: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function OrderSummary({ items, subtotal, shipping, total }: Props) {
  return (
    <section>
      <h2 style={{ marginTop: 0 }}>Your order</h2>

      <div style={{ border: "1px solid #2a2a2a", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", padding: 12, fontWeight: 700 }}>
          <div>Product</div>
          <div>Subtotal</div>
        </div>

        {items.map((it) => (
          <div
            key={it.id}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              padding: 12,
              borderTop: "1px solid #2a2a2a",
            }}
          >
            <div>
              {it.name} × {it.qty}
            </div>
            <div>{formatEUR(it.price * it.qty)}</div>
          </div>
        ))}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            padding: 12,
            borderTop: "1px solid #2a2a2a",
            fontWeight: 700,
          }}
        >
          <div>Subtotal</div>
          <div>{formatEUR(subtotal)}</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", padding: 12, borderTop: "1px solid #2a2a2a" }}>
          <div>Shipping</div>
          <div>{formatEUR(shipping)}</div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            padding: 12,
            borderTop: "1px solid #2a2a2a",
            fontWeight: 800,
          }}
        >
          <div>Total</div>
          <div>{formatEUR(total)}</div>
        </div>
      </div>
    </section>
  );
}
