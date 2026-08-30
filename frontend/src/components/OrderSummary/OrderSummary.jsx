import { Tag } from "lucide-react";
import { formatPrice } from "../../utils/format";
import "./OrderSummary.css";

function OrderSummary({
  subtotal,
  discountPercent,
  discount,
  deliveryFee,
  total,
  promo,
  onPromoChange,
  onApplyPromo,
  promoStatus,
  children,
}) {
  return (
    <div className="order-summary">
      <h2 className="order-summary__title">Order Summary</h2>

      <div className="order-summary__row">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      {discount > 0 && (
        <div className="order-summary__row order-summary__row--discount">
          <span>Discount ({discountPercent ? `-${discountPercent}%` : ""})</span>
          <span>-{formatPrice(discount)}</span>
        </div>
      )}

      <div className="order-summary__row">
        <span>Delivery Fee</span>
        <span>{formatPrice(deliveryFee)}</span>
      </div>

      <div className="order-summary__divider" />

      <div className="order-summary__row order-summary__row--total">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>

      {onApplyPromo && (
        <div className="order-summary__promo">
          <div className="order-summary__promo-input">
            <Tag size={16} />
            <input
              type="text"
              placeholder="Add promo code"
              value={promo}
              onChange={(e) => onPromoChange(e.target.value)}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={onApplyPromo}>
            Apply
          </button>
        </div>
      )}

      {promoStatus === "success" && (
        <p className="order-summary__promo-message order-summary__promo-message--success">
          Promo code applied!
        </p>
      )}
      {promoStatus === "error" && (
        <p className="order-summary__promo-message order-summary__promo-message--error">
          Invalid or expired promo code.
        </p>
      )}

      {children}
    </div>
  );
}

export default OrderSummary;
