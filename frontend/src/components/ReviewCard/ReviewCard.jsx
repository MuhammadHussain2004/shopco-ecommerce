import { BadgeCheck, MoreHorizontal } from "lucide-react";
import StarRating from "../StarRating/StarRating";
import "./ReviewCard.css";

function ReviewCard({ review }) {
  const postedDate = new Date(review.postedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="review-card">
      <div className="review-card__top">
        <StarRating rating={review.rating} showValue={false} />
        <MoreHorizontal size={18} className="review-card__more" />
      </div>
      <p className="review-card__name">
        {review.name}
        {review.verified && <BadgeCheck size={16} className="review-card__verified" />}
      </p>
      <p className="review-card__comment">"{review.comment}"</p>
      <p className="review-card__date">Posted on {postedDate}</p>
    </div>
  );
}

export default ReviewCard;
