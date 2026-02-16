import "./App.css";

import Home from "./pages/Home";
import Header from "./components/layout/Header";
import SideMenu from "./components/layout/SideMenu";
import Footer from "./components/layout/Footer";

export default function App() {
  const links = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: "About us", href: "/about-us" },
    { label: "Booking", href: "/booking" },
    { label: "Contact us", href: "/contact-us" },
  ];

  return (
    <div className="appShell">
      <Header brand="Persian Gold" />
      <SideMenu links={links} />

      <main className="appMain">
        <Home />
      </main>

      <Footer />
    </div>
  );
}
