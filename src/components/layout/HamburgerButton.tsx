import { useUiStore } from "../../store/uiStore";
import { Menu } from "lucide-react";

type Props = {
  className?: string;
};

export default function HamburgerButton({ className }: Props) {
  const toggleMenu = useUiStore((s) => s.toggleSideMenu);

  return (
    <button
      type="button"
      aria-label="Open menu"
      onClick={toggleMenu}
      className={className}
    >
      <Menu size={22} strokeWidth={2} />
    </button>
  );
}