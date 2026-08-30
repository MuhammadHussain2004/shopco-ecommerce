import "./SizePill.css";

function SizePill({ sizes, selected, onSelect }) {
  return (
    <div className="size-pill-list">
      {sizes.map((size) => (
        <button
          key={size}
          type="button"
          className={`size-pill ${selected === size ? "size-pill--active" : ""}`}
          onClick={() => onSelect(size)}
          aria-pressed={selected === size}
        >
          {size}
        </button>
      ))}
    </div>
  );
}

export default SizePill;
