import "./Header.css";

import HamburgerButton from "./HamburgerButton";

type Props = {
  brand?: string;
  cartText?: string; 
};

export default function Header({ brand = "Persian Gold", cartText = "0 $" }: Props) {
  return (
    <header className="siteHeader">
      <div className="siteHeader__brand">{brand}</div>

      <div className="siteHeader__actions">
        <button className="siteHeader__cart" type="button" aria-label="Cart">
          <span className="siteHeader__cartText">{cartText}</span>
          <span className="siteHeader__cartIcon" aria-hidden="true">🛒</span>
        </button>

        <HamburgerButton className="siteHeader__hamburger" />
      </div>
    </header>
  );
}
