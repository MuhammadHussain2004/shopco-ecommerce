import { Star, StarHalf } from "lucide-react";
import "./StarRating.css";

function StarRating({ rating, showValue = true, size = 16 }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="star-rating">
      <div className="star-rating__stars">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={size} className="star star--full" />
        ))}
        {hasHalfStar && <StarHalf size={size} className="star star--full" />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="star star--empty" />
        ))}
      </div>
      {showValue && <span className="star-rating__value">{rating.toFixed(1)}/5</span>}
    </div>
  );
}

export default StarRating;
