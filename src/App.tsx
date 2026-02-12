import "./App.css";

import Header from "./components/layout/Header";
import SideMenu from "./components/layout/SideMenu";


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
      <Header brand="Persian Gold" cartText="0 $" />
      <SideMenu links={links} />

      <main className="appMain">
        
      </main>
    </div>
  );
}

export default App;
