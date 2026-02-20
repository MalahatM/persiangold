import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SideMenu from "./components/layout/SideMenu";
import CartDrawer from "./components/cart/CartDrawer";

import Home from "./pages/Home";
import GalleryPage from "./pages/Gallery/GalleryPage";
import RingsPage from "./pages/Rings/RingsPage";


import NecklacePage from "./pages/Necklaces/NecklacesPage";
import EarringsPage from "./pages/Earrings/EarringsPage";


import BraceletsPage from "./pages/Bracelets/BraceletsPage";
import ProductDetailPage from "./pages/ProductDetail/ProductDetailPage";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import AboutPage from "./pages/About/AboutPage";
import BookingPage from "./pages/Booking/BookingPage";







export default function App() {
 const links = [
  { label: "Home", href: "/" },
  { label: "Gallery", href: "/gallery" },
  { label: "About us", href: "/about" },   
  { label: "Booking", href: "/booking" },
  { label: "Contact us", href: "/contact-us" },
];

  return (
    <>
      <div className="appHeaderWrap">
        <Header />
      </div>

      <SideMenu links={links} />

      <div className="appMain">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/rings" element={<RingsPage />} />

          <Route path="/necklaces" element={<NecklacePage />} />
		  <Route path="/earrings" element={<EarringsPage />} />
		
		  <Route path="/bracelets" element={<BraceletsPage />} />
		  <Route path="/product/:id" element={<ProductDetailPage />} />
		  <Route path="/checkout" element={<CheckoutPage />} />
		 <Route path="/about" element={<AboutPage />} />
		 <Route path="/booking" element={<BookingPage />} />



        

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
