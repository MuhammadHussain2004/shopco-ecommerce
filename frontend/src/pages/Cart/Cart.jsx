import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import CartItemRow from "../../components/CartItemRow/CartItemRow";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import Newsletter from "../../components/Newsletter/Newsletter";
import { useCart } from "../../context/CartContext";
import { applyPromoCode } from "../../api/promo";
import { DELIVERY_FEE } from "../../constants/order";
import "./Cart.css";

function Cart() {
  const { items, removeItem, updateQuantity, subtotal, promo, setPromo } = useCart();
  const [promoInput, setPromoInput] = useState(promo?.code || "");
  const [promoStatus, setPromoStatus] = useState("idle");
  const navigate = useNavigate();

  const discountPercent = promo?.discountPercent || 0;
  const discount = Math.round(((subtotal * discountPercent) / 100) * 100) / 100;
  const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
  const total = Math.round((subtotal - discount + deliveryFee) * 100) / 100;

  const handleApplyPromo = async () => {
    if (!promoInput) return;
    try {
      const data = await applyPromoCode(promoInput);
      setPromo(data);
      setPromoStatus("success");
    } catch {
      setPromo(null);
      setPromoStatus("error");
    }
  };

  return (
    <div className="cart-page">
      <div className="container cart-page__breadcrumb">
        <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Cart" }]} />
      </div>

      <div className="container">
        <h1 className="cart-page__title">YOUR CART</h1>
      </div>

      {items.length === 0 ? (
        <div className="container cart-page__empty">
          <p>Your cart is empty.</p>
          <Link to="/shop" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="container cart-page__layout">
          <div className="cart-page__items">
            {items.map((item) => (
              <CartItemRow
                key={`${item.productId}-${item.size}-${item.color}`}
                item={item}
                onRemove={removeItem}
                onQuantityChange={updateQuantity}
              />
            ))}
          </div>

          <OrderSummary
            subtotal={subtotal}
            discountPercent={discountPercent}
            discount={discount}
            deliveryFee={deliveryFee}
            total={total}
            promo={promoInput}
            onPromoChange={setPromoInput}
            onApplyPromo={handleApplyPromo}
            promoStatus={promoStatus}
          >
            <button
              type="button"
              className="btn btn-primary cart-page__checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Go to Checkout →
            </button>
          </OrderSummary>
        </div>
      )}

      <Newsletter />
    </div>
  );
}

export default Cart;
