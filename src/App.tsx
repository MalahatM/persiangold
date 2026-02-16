
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SideMenu from "./components/layout/SideMenu";


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
      <div className="appHeaderWrap">
        <Header />
       
      </div>

      <SideMenu links={links} />

      {/* ⬇️ مهم: main رو بردار */}
      <div className="appMain">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about-us" element={<div style={{ padding: 16 }}>ABOUT</div>} />
          <Route path="/booking" element={<div style={{ padding: 16 }}>BOOKING</div>} />
          <Route path="/contact-us" element={<div style={{ padding: 16 }}>CONTACT</div>} />
          <Route path="*" element={<div style={{ padding: 16 }}>Not found</div>} />
        </Routes>
      </div>

      <Footer />
      <CartDrawer />
    </>
  );
}
