import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SideMenu from "./components/layout/SideMenu";

import CartButton from "./components/cart/CartButton";
import CartDrawer from "./components/cart/CartDrawer";

import Home from "./pages/Home";
import GalleryPage from "./pages/Gallery/GalleryPage";

export default function App() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: "About us", href: "/about-us" },
    { label: "Booking", href: "/booking" },
    { label: "Contact us", href: "/contact-us" },
  ];

  return (
    <>
      {/* Keep Header component but ensure cart access remains available */}
      <div style={{ position: "relative" }}>
        <Header />
        <div style={{ position: "absolute", top: 12, right: 72, zIndex: 1000 }}>
          <CartButton />
        </div>
      </div>

      <SideMenu links={links} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<GalleryPage />} />

          <Route path="/about-us" element={<div style={{ padding: 16 }}>ABOUT</div>} />
          <Route path="/booking" element={<div style={{ padding: 16 }}>BOOKING</div>} />
          <Route
            path="/contact-us"
            element={<div style={{ padding: 16 }}>CONTACT</div>}
          />

          <Route path="*" element={<div style={{ padding: 16 }}>Not found</div>} />
        </Routes>
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}
