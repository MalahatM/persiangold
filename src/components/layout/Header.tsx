import "./Header.css";
import HamburgerButton from "./HamburgerButton";

type Props = {
  brand?: string;
};

export default function Header({ brand = "Persian Gold" }: Props) {
  return (
    <header className="siteHeader">
      <div className="siteHeader__brand">{brand}</div>

      <div className="siteHeader__actions">
        <HamburgerButton className="siteHeader__hamburger" />
      </div>
    </header>
  );
}
