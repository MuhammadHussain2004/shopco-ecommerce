import { Check } from "lucide-react";
import "./ColorSwatch.css";

function ColorSwatch({ colors, selected, onSelect }) {
  return (
    <div className="color-swatch-list">
      {colors.map((color) => {
        const isSelected = selected === color.name;
        const isLight = ["#ffffff", "#fff"].includes(color.hex.toLowerCase());
        return (
          <button
            key={color.name}
            type="button"
            className={`color-swatch ${isLight ? "color-swatch--light" : ""}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => onSelect(color.name)}
            aria-label={color.name}
            aria-pressed={isSelected}
            title={color.name}
          >
            {isSelected && (
              <Check size={14} className={isLight ? "color-swatch__check--dark" : ""} />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ColorSwatch;
