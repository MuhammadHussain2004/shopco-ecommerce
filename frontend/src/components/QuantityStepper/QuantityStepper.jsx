import { Minus, Plus } from "lucide-react";
import "./QuantityStepper.css";

function QuantityStepper({ quantity, onChange, min = 1, max = 99 }) {
  return (
    <div className="quantity-stepper">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>
      <span>{quantity}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

export default QuantityStepper;
