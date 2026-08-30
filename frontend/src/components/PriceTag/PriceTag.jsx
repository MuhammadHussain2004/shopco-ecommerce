import { formatPrice } from "../../utils/format";
import "./PriceTag.css";

function PriceTag({ price, oldPrice, discountPercent, size = "md" }) {
  return (
    <div className={`price-tag price-tag--${size}`}>
      <span className="price-tag__current">{formatPrice(price)}</span>
      {oldPrice && (
        <span className="price-tag__old">{formatPrice(oldPrice)}</span>
      )}
      {discountPercent && (
        <span className="price-tag__discount">-{discountPercent}%</span>
      )}
    </div>
  );
}

export default PriceTag;
