import "./App.css";
import { Routes, Route } from "react-router-dom";

import HamburgerButton from "./components/layout/HamburgerButton";
import SideMenu from "./components/layout/SideMenu";

import CartButton from "./components/cart/CartButton";
import CartDrawer from "./components/cart/CartDrawer";

import GalleryPage from "./pages/Gallery/GalleryPage";

function App() {
  const links = [
    { label: "Gallery", href: "/gallery" },
  ];

  return (
    <>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <strong>PersianGold</strong>
        <div style={{ display: "flex", gap: 10 }}>
          <CartButton />
          <HamburgerButton />
        </div>
      </header>

      <SideMenu links={links} />

      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="*" element={<div>Loading...</div>} />
        </Routes>
      </main>

      <CartDrawer />
    </>
  );
}

export default App;
