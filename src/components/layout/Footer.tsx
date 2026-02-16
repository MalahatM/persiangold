import "./Footer.css";
import { Facebook, Instagram, Phone } from "lucide-react";

import iranFlag from "../../assets/iran-flag.png";
import { Lock } from "lucide-react";


type Props = {
  ownerText?: string;
};

export default function Footer({
  ownerText = "Boutique Owner Panel – Manage products, orders and content.",
}: Props) {
return (
  <footer className="siteFooter">

    {/* 🔒 Lock centered */}
    <div className="siteFooter__lock">
      <Lock size={28} strokeWidth={1.5} />
    </div>

    <div className="siteFooter__content">
      <div className="siteFooter__col">
        <h3 className="siteFooter__title">Follow Us</h3>
        <div className="siteFooter__socials">
          <a href="#" aria-label="Facebook" className="siteFooter__icon">
            <Facebook size={20} />
          </a>
          <a href="#" aria-label="Instagram" className="siteFooter__icon">
            <Instagram size={20} />
          </a>
        </div>
      </div>

      <div className="siteFooter__col siteFooter__col--right">
        <h3 className="siteFooter__title">Contact Us</h3>
<div className="siteFooter__contact">
  <div className="siteFooter__row">
    <Phone size={16} className="siteFooter__phoneIcon" />
    <span className="siteFooter__text">046782926</span>
  </div>

  <div className="siteFooter__row">
    <span className="siteFooter__mailIcon">✉</span>
    <span className="siteFooter__text">email@persiangold.com</span>
  </div>

  <div className="siteFooter__row siteFooter__row--address">
    <img src={iranFlag} alt="Lion and Sun" className="siteFooter__lion" />
    <span className="siteFooter__text">Address: Iran mall 2e floor number 396</span>
  </div>
</div>

      </div>
    </div>

    <div className="siteFooter__owner">
      {ownerText}
    </div>

    <div className="siteFooter__bottom">
      © {new Date().getFullYear()} PersianGold. All rights reserved.
    </div>
  </footer>
);

}
