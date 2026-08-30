import { Link } from "react-router-dom";
import "./Hero.css";

function Sparkle({ className }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M20 0 C21 14 26 19 40 20 C26 21 21 26 20 40 C19 26 14 21 0 20 C14 19 19 14 20 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

const STATS = [
  { value: "200+", label: "International Brands" },
  { value: "2,000+", label: "High-Quality Products" },
  { value: "30,000+", label: "Happy Customers" },
];

function Hero() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__content">
          <h1 className="hero__heading">
            FIND CLOTHES
            <br />
            THAT MATCHES
            <br />
            YOUR STYLE
          </h1>
          <p className="hero__text">
            Browse through our diverse range of meticulously crafted garments, designed
            to bring out your individuality and cater to your sense of style.
          </p>
          <Link to="/shop" className="btn btn-primary hero__cta">
            Shop Now
          </Link>

          <div className="hero__stats">
            {STATS.map((stat) => (
              <div key={stat.label} className="hero__stat">
                <p className="hero__stat-value">{stat.value}</p>
                <p className="hero__stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__image-wrap">
          <Sparkle className="hero__sparkle hero__sparkle--top" />
          <Sparkle className="hero__sparkle hero__sparkle--bottom" />
          <img
            src="/images/hero/couple.png"
            alt="Models wearing Shop.co clothing"
            className="hero__image"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
