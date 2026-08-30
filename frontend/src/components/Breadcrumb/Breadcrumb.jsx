import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import "./Breadcrumb.css";

function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="breadcrumb__item">
            {item.to && !isLast ? (
              <Link to={item.to} className="breadcrumb__link">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "breadcrumb__current" : ""}>{item.label}</span>
            )}
            {!isLast && <ChevronRight size={14} className="breadcrumb__separator" />}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
