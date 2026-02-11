

import "./App.css";

import HamburgerButton from "./components/layout/HamburgerButton";
import SideMenu from "./components/layout/SideMenu";



function App() {
  

  const links = [
    { label: "Home", href: "/" },
    { label: "Gallery", href: "/gallery" },
    { label: "About us", href: "/about us" },
	 { label: "Bookning", href: "/bookning" },
	 { label: "Contact us", href: "/contact us" },
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
  <HamburgerButton />
</header>


      <SideMenu links={links} />

      <main style={{ padding: 16 }}>
       
      
      </main>
    </>
  );
}

export default App;
