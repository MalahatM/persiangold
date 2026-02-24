import { useUiStore } from "../../store/uiStore";
import { Menu } from "lucide-react";
import "./HamburgerButton.css";

export default function HamburgerButton({ className }: { className?: string }) {
  const toggleMenu = useUiStore((s) => s.toggleSideMenu);

  return (
    <button
      type="button"
      aria-label="Open menu"
      onClick={toggleMenu}
      className={`hamburgerBtn ${className ?? ""}`}
    >
      <Menu size={22} strokeWidth={2} />
    </button>
  );
}