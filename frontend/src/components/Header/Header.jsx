import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  CircleUserRound,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { CATEGORIES } from "../../constants/filters";
import MobileMenu from "../MobileMenu/MobileMenu";
import "./Header.css";

function Header() {
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/shop${searchValue ? `?q=${encodeURIComponent(searchValue)}` : ""}`);
    setMobileSearchOpen(false);
  };

  return (
    <header className="site-header">
      {announcementVisible && (
        <div className="announcement-bar">
          <p>
            Sign up and get 20% off to your first order. <Link to="/shop">Sign Up Now</Link>
          </p>
          <button
            type="button"
            className="announcement-bar__close"
            onClick={() => setAnnouncementVisible(false)}
            aria-label="Dismiss announcement"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="main-nav container">
        <button
          type="button"
          className="icon-btn hamburger"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <Link to="/" className="logo">
          SHOP.CO
        </Link>

        <nav className="nav-links">
          <div
            className="nav-dropdown"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button type="button" className="nav-link nav-link--dropdown">
              Shop <ChevronDown size={16} />
            </button>
            {shopOpen && (
              <div className="nav-dropdown__panel">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category}
                    to={`/shop?category=${encodeURIComponent(category)}`}
                    className="nav-dropdown__link"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/shop?onSale=true" className="nav-link">
            On Sale
          </Link>
          <Link to="/shop?section=new-arrivals" className="nav-link">
            New Arrivals
          </Link>
          <Link to="/shop" className="nav-link">
            Brands
          </Link>
        </nav>

        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <Search size={18} className="search-bar__icon" />
          <input
            type="search"
            placeholder="Search for products..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>

        <div className="nav-icons">
          <button
            type="button"
            className="icon-btn search-toggle"
            onClick={() => setMobileSearchOpen((open) => !open)}
            aria-label="Toggle search"
          >
            <Search size={22} />
          </button>
          <Link to="/cart" className="icon-btn" aria-label="Cart">
            <ShoppingCart size={22} />
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>
          <span className="icon-btn icon-btn--static" aria-hidden="true">
            <CircleUserRound size={22} />
          </span>
        </div>
      </div>

      {mobileSearchOpen && (
        <form className="mobile-search container" onSubmit={handleSearchSubmit}>
          <Search size={18} className="search-bar__icon" />
          <input
            type="search"
            autoFocus
            placeholder="Search for products..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>
      )}

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  );
}

export default Header;
