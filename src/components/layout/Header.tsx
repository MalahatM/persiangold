import { Link, NavLink } from "react-router-dom";
import CartButton from "../cart/CartButton";
import HamburgerButton from "./HamburgerButton";
import "./Header.css";

type LinkItem = { label: string; href: string };

type HeaderProps = {
  brand: string;
  links: LinkItem[];
};

export default function Header({ brand, links }: HeaderProps) {
  return (
    <header className="header">
      <div className="headerInner">
        {/* Left: Brand */}
        <Link to="/" className="brand">
          {brand}
        </Link>

        {/* Right side */}
        <div className="headerRight">
          <nav className="nav" aria-label="Primary">
            {links.map((l) => (
              <NavLink
                key={l.href}
                to={l.href}
                className={({ isActive }) =>
                  isActive ? "navLink active" : "navLink"
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="headerActions">
            <CartButton />
            <HamburgerButton className="hamburgerOnly" />
          </div>
        </div>
      </div>
    </header>
  );
}