import { Trash2 } from "lucide-react";
import QuantityStepper from "../QuantityStepper/QuantityStepper";
import { formatPrice } from "../../utils/format";
import "./CartItemRow.css";

function CartItemRow({ item, onRemove, onQuantityChange }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item__image" />
      <div className="cart-item__details">
        <div className="cart-item__top">
          <div>
            <p className="cart-item__name">{item.name}</p>
            <p className="cart-item__meta">Size: {item.size}</p>
            <p className="cart-item__meta">Color: {item.color}</p>
          </div>
          <button type="button" onClick={() => onRemove(item)} aria-label="Remove item">
            <Trash2 size={20} className="cart-item__remove" />
          </button>
        </div>
        <div className="cart-item__bottom">
          <p className="cart-item__price">{formatPrice(item.price)}</p>
          <QuantityStepper
            quantity={item.quantity}
            onChange={(quantity) => onQuantityChange(item, quantity)}
          />
        </div>
      </div>
    </div>
  );
}

export default CartItemRow;
