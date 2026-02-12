import { useUiStore } from "../../store/uiStore";
import "./SideMenu.css";

type Props = {
  links?: { label: string; href: string }[];
};

export default function SideMenu({ links = [] }: Props) {
  const isOpen = useUiStore((s) => s.isSideMenuOpen);
  const closeMenu = useUiStore((s) => s.closeSideMenu);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={`sideMenuOverlay ${isOpen ? "is-open" : ""}`}
      onClick={closeMenu}
    >
      <div
        className={`sideMenuPanel ${isOpen ? "is-open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={closeMenu} aria-label="Close menu" className="sideMenuClose">
          ×
        </button>

        <nav className="sideMenuNav">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="sideMenuLink" onClick={closeMenu}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
