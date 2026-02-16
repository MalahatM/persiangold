// Header.tsx
import CartButton from "../cart/CartButton";
import HamburgerButton from "./HamburgerButton";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="headerInner">
		
        <div className="brand">Persian Gold</div>

        <div className="headerActions">
          <CartButton />
          <HamburgerButton />
        </div>
      </div>
    </header>
  );
}
