import "./Footer.css";
import { Facebook, Instagram } from "lucide-react";

type Props = {
  ownerText?: string;
};

export default function Footer({
  ownerText = "Boutique Owner Panel – Manage products, orders and content.",
}: Props) {
  return (
    <footer className="siteFooter">

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
            <div>📞 046782926</div>
            <div>✉ email@persiangold.com</div>
            <div>📍Address:Iran mall 2e floor nummer 396</div>
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
