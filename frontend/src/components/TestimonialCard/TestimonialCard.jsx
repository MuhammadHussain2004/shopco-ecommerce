import { BadgeCheck } from "lucide-react";
import StarRating from "../StarRating/StarRating";
import "./TestimonialCard.css";

function TestimonialCard({ testimonial }) {
  return (
    <div className="testimonial-card">
      <StarRating rating={testimonial.rating} showValue={false} />
      <p className="testimonial-card__name">
        {testimonial.name}
        <BadgeCheck size={16} className="testimonial-card__verified" />
      </p>
      <p className="testimonial-card__comment">"{testimonial.comment}"</p>
    </div>
  );
}

export default TestimonialCard;
