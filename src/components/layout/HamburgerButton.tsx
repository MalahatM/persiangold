import { useUiStore } from "../../store/uiStore";
import { Menu } from "lucide-react";

export default function HamburgerButton({ className }: { className?: string }) {
  const toggleMenu = useUiStore((s) => s.toggleSideMenu);
  const isOpen = useUiStore((s) => s.isSideMenuOpen);

  return (
    <button
      type="button"
      aria-label="Open menu"
      onClick={() => {
        console.log("hamburger clicked", { before: isOpen });
        toggleMenu();
        // نکته: چون state async هست، before/after رو همینجا دقیق نمی‌بینی.
        // اگر after دقیق می‌خوای، یک useEffect تو SideMenu/یا همین کامپوننت بذار.
      }}
      className={className}
      style={{
        width: 44,
        height: 44,
        border: 0,
        background: "rgba(255,255,255,0.06)",
        color: "#fff",
        borderRadius: 10,
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
      }}
    >
      <Menu size={22} strokeWidth={2} />
    </button>
  );
}
