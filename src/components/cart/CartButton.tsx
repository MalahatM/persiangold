import { useCartStore } from "../../store/cartStore";

type Props = { className?: string };

export default function CartButton({ className }: Props) {
  const toggleCart = useCartStore((s) => s.toggleCart);
  const totalCount = useCartStore((s) => s.totalCount());

  return (
    <button type="button" onClick={toggleCart} className={className} aria-label="Open cart">
      🛒 {totalCount > 0 ? `(${totalCount})` : ""}
    </button>
  );
}