import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import SideMenu from "./components/layout/SideMenu";
import Footer from "./components/layout/Footer";
import CartDrawer from "./components/cart/CartDrawer";

function App() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: "About us", href: "/about-us" },
    { label: "Booking", href: "/booking" },
    { label: "Contact us", href: "/contact-us" },
  ];

  return (
    <div className="appShell">
      <Header brand="Persian Gold" links={links} />
      <SideMenu links={links} />
	  <CartDrawer />

      <main className="appMain">
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/gallery" element={<div>Gallery Page</div>} />
          <Route path="/about-us" element={<div>About Page</div>} />
          <Route path="/booking" element={<div>Booking Page</div>} />
          <Route path="/contact-us" element={<div>Contact Page</div>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;