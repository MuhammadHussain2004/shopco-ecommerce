import { X } from "lucide-react";
import FiltersPanel from "../FiltersPanel/FiltersPanel";
import "./FiltersDrawer.css";

function FiltersDrawer({ open, draft, onChange, onApply, onClose, sort, onSortChange, sortOptions }) {
  if (!open) return null;

  return (
    <div className="filters-drawer">
      <div className="filters-drawer__header container">
        <h2>Filters</h2>
        <button type="button" onClick={onClose} aria-label="Close filters">
          <X size={22} />
        </button>
      </div>
      <div className="filters-drawer__body container">
        <label className="filters-drawer__sort">
          Sort by
          <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <FiltersPanel
          draft={draft}
          onChange={onChange}
          bordered={false}
          onApply={() => {
            onApply();
            onClose();
          }}
        />
      </div>
    </div>
  );
}

export default FiltersDrawer;
