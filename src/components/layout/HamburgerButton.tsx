import { useUiStore } from "../../store/uiStore";

export default function HamburgerButton({ className }: { className?: string }) {
  const toggleMenu = useUiStore((s) => s.toggleSideMenu);

  return (
    <button type="button" aria-label="Open menu" onClick={toggleMenu} className={className}>
      =
    </button>
  );
}