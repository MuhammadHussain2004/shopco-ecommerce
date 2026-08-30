import { Link } from "react-router-dom";
import { DRESS_STYLES } from "../../constants/filters";
import "./DressStyleGrid.css";

function DressStyleGrid() {
  return (
    <section className="dress-style">
      <div className="container dress-style__panel">
        <h2 className="dress-style__title">BROWSE BY DRESS STYLE</h2>
        <div className="dress-style__grid">
          {DRESS_STYLES.map((style) => (
            <Link
              key={style}
              to={`/shop?style=${encodeURIComponent(style)}`}
              className={`dress-style__tile dress-style__tile--${style.toLowerCase()}`}
            >
              <img
                src={`/images/categories/${style.toLowerCase()}.png`}
                alt={style}
                className="dress-style__image"
              />
              <span className="dress-style__label">{style}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DressStyleGrid;
