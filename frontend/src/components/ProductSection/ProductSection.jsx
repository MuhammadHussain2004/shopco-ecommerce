import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductSection.css";

function ProductSection({ title, products, viewAllHref }) {
  if (!products.length) return null;

  return (
    <section className="product-section">
      <div className="container">
        <h2 className="product-section__title">{title}</h2>
        <div className="product-section__scroller">
          <div className="product-section__grid">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
        {viewAllHref && (
          <div className="product-section__cta">
            <Link to={viewAllHref} className="btn btn-outline">
              View All
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductSection;
