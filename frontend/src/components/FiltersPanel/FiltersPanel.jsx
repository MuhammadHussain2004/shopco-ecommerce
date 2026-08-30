import ColorSwatch from "../ColorSwatch/ColorSwatch";
import SizePill from "../SizePill/SizePill";
import {
  CATEGORIES,
  DRESS_STYLES,
  SIZES,
  COLORS,
  PRICE_MIN,
  PRICE_MAX,
} from "../../constants/filters";
import "./FiltersPanel.css";

function FiltersPanel({ draft, onChange, onApply, bordered = true }) {
  const set = (key, value) => onChange({ ...draft, [key]: value });

  return (
    <div className={`filters-panel ${bordered ? "filters-panel--bordered" : ""}`}>
      <div className="filters-panel__section filters-panel__categories">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={`filters-panel__category ${
              draft.category === category ? "filters-panel__category--active" : ""
            }`}
            onClick={() => set("category", draft.category === category ? "" : category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="filters-panel__divider" />

      <div className="filters-panel__section">
        <p className="filters-panel__label">Price</p>
        <div className="filters-panel__price">
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            value={draft.minPrice}
            onChange={(e) =>
              set("minPrice", Math.min(Number(e.target.value), draft.maxPrice))
            }
          />
          <input
            type="range"
            min={PRICE_MIN}
            max={PRICE_MAX}
            value={draft.maxPrice}
            onChange={(e) =>
              set("maxPrice", Math.max(Number(e.target.value), draft.minPrice))
            }
          />
        </div>
        <div className="filters-panel__price-labels">
          <span>${draft.minPrice}</span>
          <span>${draft.maxPrice}</span>
        </div>
      </div>

      <div className="filters-panel__divider" />

      <div className="filters-panel__section">
        <p className="filters-panel__label">Colors</p>
        <ColorSwatch
          colors={COLORS}
          selected={draft.color}
          onSelect={(color) => set("color", draft.color === color ? "" : color)}
        />
      </div>

      <div className="filters-panel__divider" />

      <div className="filters-panel__section">
        <p className="filters-panel__label">Size</p>
        <SizePill
          sizes={SIZES}
          selected={draft.size}
          onSelect={(size) => set("size", draft.size === size ? "" : size)}
        />
      </div>

      <div className="filters-panel__divider" />

      <div className="filters-panel__section filters-panel__categories">
        <p className="filters-panel__label">Dress Style</p>
        {DRESS_STYLES.map((style) => (
          <button
            key={style}
            type="button"
            className={`filters-panel__category ${
              draft.style === style ? "filters-panel__category--active" : ""
            }`}
            onClick={() => set("style", draft.style === style ? "" : style)}
          >
            {style}
          </button>
        ))}
      </div>

      <button type="button" className="btn btn-primary filters-panel__apply" onClick={onApply}>
        Apply Filter
      </button>
    </div>
  );
}

export default FiltersPanel;
