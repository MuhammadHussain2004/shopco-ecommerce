import { Link } from "react-router-dom";
import StarRating from "../StarRating/StarRating";
import PriceTag from "../PriceTag/PriceTag";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.slug}`} className="product-card">
      <div className="product-card__image-wrap">
        <img
          src={product.images[0]}
          alt={product.name}
          className="product-card__image"
        />
      </div>
      <h3 className="product-card__name">{product.name}</h3>
      <StarRating rating={product.rating} />
      <PriceTag
        price={product.price}
        oldPrice={product.oldPrice}
        discountPercent={product.discountPercent}
      />
    </Link>
  );
}

export default ProductCard;
