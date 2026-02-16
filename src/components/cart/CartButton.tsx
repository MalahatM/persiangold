import { useCartStore } from "../../store/cartStore";

type Props = { className?: string };

export default function CartButton({ className }: Props) {
  const toggleCart = useCartStore((s) => s.toggleCart);
  const totalCount = useCartStore((s) => s.totalCount());

  return (
    <button
      type="button"
      onClick={toggleCart}
      aria-label="Open cart"
      className={className}
      style={{
        position: "relative",
        width: 40,
        height: 40,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.18)",
        background: "rgba(255,255,255,0.06)",
        color: "#fff",
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* Cart icon (white via currentColor) */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        aria-hidden="true"
        style={{ display: "block" }}
      >
        <path
          fill="currentColor"
          d="M7.2 6.8H20a1 1 0 0 1 .98 1.2l-1.2 6A2 2 0 0 1 17.82 16H8.1a2 2 0 0 1-1.96-1.6L4.28 4.8H3a1 1 0 1 1 0-2h2.1a1 1 0 0 1 .97.76L6.2 6.8ZM8.1 14h9.72l.9-4.5H7.2l.9 4.5ZM9 21a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
        />
      </svg>

      {/* Badge */}
      {totalCount > 0 && (
        <span
          style={{
            position: "absolute",
            top: -6,
            right: -6,
            minWidth: 18,
            height: 18,
            padding: "0 6px",
            borderRadius: 999,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            lineHeight: "18px",
            fontWeight: 700,
            background: "#fff",
            color: "#111",
            border: "1px solid rgba(0,0,0,0.25)",
          }}
        >
          {totalCount}
        </span>
      )}
    </button>
  );
}
