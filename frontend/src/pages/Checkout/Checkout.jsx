import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../api/orders";
import { DELIVERY_FEE } from "../../constants/order";
import "./Checkout.css";

const EMPTY_FORM = { name: "", email: "", phone: "", address: "", city: "" };

function Checkout() {
  const { items, subtotal, promo, clearCart } = useCart();
  const [form, setForm] = useState(EMPTY_FORM);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  const discountPercent = promo?.discountPercent || 0;
  const discount = Math.round(((subtotal * discountPercent) / 100) * 100) / 100;
  const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0;
  const total = Math.round((subtotal - discount + deliveryFee) * 100) / 100;

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPlacing(true);
    setError("");
    try {
      const payload = {
        items: items.map((item) => ({
          product: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        })),
        customer: form,
        promoCode: promo?.code,
      };
      const createdOrder = await createOrder(payload);
      setOrder(createdOrder);
      clearCart();
    } catch (err) {
      setError(err.message || "Could not place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (order) {
    return (
      <div className="container checkout-page__confirmation">
        <CheckCircle2 size={56} className="checkout-page__confirmation-icon" />
        <h1>Order placed!</h1>
        <p>
          Thanks {order.customer.name}, your order has been received and is being
          processed. Total charged: <strong>${order.total.toFixed(0)}</strong>.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  return (
    <div className="checkout-page">
      <div className="container checkout-page__breadcrumb">
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Cart", to: "/cart" },
            { label: "Checkout" },
          ]}
        />
      </div>

      <div className="container">
        <h1 className="checkout-page__title">CHECKOUT</h1>
      </div>

      <form className="container checkout-page__layout" onSubmit={handleSubmit}>
        <div className="checkout-page__form">
          <h2>Shipping Details</h2>

          <label className="checkout-page__field">
            <span>Full name</span>
            <input type="text" required value={form.name} onChange={handleChange("name")} />
          </label>

          <label className="checkout-page__field">
            <span>Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={handleChange("email")}
            />
          </label>

          <label className="checkout-page__field">
            <span>Phone</span>
            <input type="tel" required value={form.phone} onChange={handleChange("phone")} />
          </label>

          <label className="checkout-page__field">
            <span>Address</span>
            <input
              type="text"
              required
              value={form.address}
              onChange={handleChange("address")}
            />
          </label>

          <label className="checkout-page__field">
            <span>City</span>
            <input type="text" required value={form.city} onChange={handleChange("city")} />
          </label>

          {error && <p className="checkout-page__error">{error}</p>}
        </div>

        <OrderSummary
          subtotal={subtotal}
          discountPercent={discountPercent}
          discount={discount}
          deliveryFee={deliveryFee}
          total={total}
        >
          <button type="submit" className="btn btn-primary checkout-page__submit" disabled={placing}>
            {placing ? "Placing Order..." : "Place Order"}
          </button>
        </OrderSummary>
      </form>
    </div>
  );
}

export default Checkout;
