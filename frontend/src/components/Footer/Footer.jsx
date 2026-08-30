import { FaTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import { SiVisa, SiMastercard, SiPaypal, SiApplepay, SiGooglepay } from "react-icons/si";
import "./Footer.css";

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: ["About", "Features", "Works", "Career"],
  },
  {
    title: "Help",
    links: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"],
  },
  {
    title: "FAQ",
    links: ["Account", "Manage Deliveries", "Orders", "Payments"],
  },
  {
    title: "Resources",
    links: ["Free eBooks", "Development Tutorial", "How to - Blog", "Youtube Playlist"],
  },
];

const SOCIAL_ICONS = [FaTwitter, FaFacebookF, FaInstagram, FaGithub];
const PAYMENT_ICONS = [SiVisa, SiMastercard, SiPaypal, SiApplepay, SiGooglepay];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__top">
        <div className="site-footer__brand">
          <p className="logo">SHOP.CO</p>
          <p className="site-footer__desc">
            We have clothes that suits your style and which you're proud to wear. From
            women to men.
          </p>
          <div className="site-footer__social">
            {SOCIAL_ICONS.map((Icon, i) => (
              <span key={i} className="site-footer__social-icon" aria-hidden="true">
                <Icon size={14} />
              </span>
            ))}
          </div>
        </div>

        {FOOTER_COLUMNS.map((column) => (
          <div key={column.title} className="site-footer__column">
            <p className="site-footer__column-title">{column.title}</p>
            <ul>
              {column.links.map((link) => (
                <li key={link}>
                  <span className="site-footer__link">{link}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container site-footer__bottom">
        <p>Shop.co © 2000-2023, All Rights Reserved</p>
        <div className="site-footer__payments">
          {PAYMENT_ICONS.map((Icon, i) => (
            <Icon key={i} size={28} aria-hidden="true" />
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
