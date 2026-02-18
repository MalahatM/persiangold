import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUiStore } from "../../store/uiStore";
import "./SideMenu.css";

type Props = {
  links?: { label: string; href: string }[];
};

export default function SideMenu({ links = [] }: Props) {
  const isOpen = useUiStore((s) => s.isSideMenuOpen);
  const closeMenu = useUiStore((s) => s.closeSideMenu);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeMenu]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`sideMenuOverlay ${isOpen ? "isOpen" : "isClosed"}`}
      onClick={closeMenu}
    >
      <aside
        className={`sideMenuPanel ${isOpen ? "isOpen" : "isClosed"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sideMenuTop">
          <strong className="sideMenuTitle">Menu</strong>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="sideMenuCloseBtn"
          >
            ×
          </button>
        </div>

        <nav className="sideMenuNav">
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              onClick={closeMenu}
              className="sideMenuLink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}
