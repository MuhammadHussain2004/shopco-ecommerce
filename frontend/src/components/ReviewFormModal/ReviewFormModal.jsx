import { useState } from "react";
import { Star } from "lucide-react";
import Modal from "../Modal/Modal";
import "./ReviewFormModal.css";

function ReviewFormModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({ name, rating, comment });
      setName("");
      setRating(5);
      setComment("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Write a Review">
      <form className="review-form" onSubmit={handleSubmit}>
        <label className="review-form__field">
          <span>Your rating</span>
          <div className="review-form__stars">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                aria-label={`${value} star`}
              >
                <Star
                  size={24}
                  className={value <= rating ? "review-form__star--active" : ""}
                />
              </button>
            ))}
          </div>
        </label>

        <label className="review-form__field">
          <span>Name</span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </label>

        <label className="review-form__field">
          <span>Review</span>
          <textarea
            required
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this product"
          />
        </label>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </Modal>
  );
}

export default ReviewFormModal;
