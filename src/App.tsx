import "./App.css";
import { Routes, Route } from "react-router-dom";

import HamburgerButton from "./components/layout/HamburgerButton";
import SideMenu from "./components/layout/SideMenu";

import CartButton from "./components/cart/CartButton";
import CartDrawer from "./components/cart/CartDrawer";

import Home from "./pages/Home";
import GalleryPage from "./pages/Gallery/GalleryPage";

function App() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: "About us", href: "/about-us" },
    { label: "Booking", href: "/booking" },
    { label: "Contact us", href: "/contact-us" },
  ];

  return (
    <>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          background: "#0b0b0b",
          color: "#fff",
        }}
      >
        <strong>PersianGold</strong>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <CartButton />
          <HamburgerButton />
        </div>
      </header>

      <SideMenu links={links} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<GalleryPage />} />

          <Route path="/about-us" element={<div style={{ padding: 16 }}>ABOUT</div>} />
          <Route path="/booking" element={<div style={{ padding: 16 }}>BOOKING</div>} />
          <Route path="/contact-us" element={<div style={{ padding: 16 }}>CONTACT</div>} />

          <Route path="*" element={<div style={{ padding: 16 }}>Not found</div>} />
        </Routes>
      </main>

      <CartDrawer />
    </>
  );
}

export default App;
