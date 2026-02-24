import { NavLink } from "react-router-dom";
import { useUiStore } from "../../store/uiStore";
import "./SideMenu.css";

type Props = {
  links?: { label: string; href: string }[];
};

export default function SideMenu({ links = [] }: Props) {
  const isOpen = useUiStore((s) => s.isSideMenuOpen);
  const closeMenu = useUiStore((s) => s.closeSideMenu);

 
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="sideMenuOverlay is-open"
      onClick={closeMenu}
    >
      <div className="sideMenuPanel is-open" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={closeMenu}
          aria-label="Close menu"
          className="sideMenuClose"
        >
          ×
        </button>

        <nav className="sideMenuNav">
          {links.map((l) => (
            <NavLink
              key={l.href}
              to={l.href}
              className={({ isActive }) =>
                isActive ? "sideMenuLink active" : "sideMenuLink"
              }
              onClick={closeMenu}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}