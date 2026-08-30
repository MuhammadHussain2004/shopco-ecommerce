import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { CATEGORIES } from "../../constants/filters";
import "./MobileMenu.css";

function MobileMenu({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="mobile-menu">
      <div className="mobile-menu__backdrop" onClick={onClose} />
      <div className="mobile-menu__panel">
        <button
          type="button"
          className="mobile-menu__close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={22} />
        </button>

        <nav className="mobile-menu__links">
          <p className="mobile-menu__label">Shop</p>
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              to={`/shop?category=${encodeURIComponent(category)}`}
              onClick={onClose}
              className="mobile-menu__link"
            >
              {category}
            </Link>
          ))}

          <div className="mobile-menu__divider" />

          <Link to="/shop?onSale=true" onClick={onClose} className="mobile-menu__link">
            On Sale
          </Link>
          <Link
            to="/shop?section=new-arrivals"
            onClick={onClose}
            className="mobile-menu__link"
          >
            New Arrivals
          </Link>
          <Link to="/shop" onClick={onClose} className="mobile-menu__link">
            Brands
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;
