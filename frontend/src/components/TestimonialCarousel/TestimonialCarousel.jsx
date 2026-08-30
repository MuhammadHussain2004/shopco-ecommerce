import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import "./TestimonialCarousel.css";

function TestimonialCarousel({ testimonials }) {
  const scrollerRef = useRef(null);

  const scrollByAmount = (direction) => {
    scrollerRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  if (!testimonials.length) return null;

  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials__header">
          <h2 className="testimonials__title">OUR HAPPY CUSTOMERS</h2>
          <div className="testimonials__nav">
            <button type="button" onClick={() => scrollByAmount(-1)} aria-label="Previous">
              <ArrowLeft size={18} />
            </button>
            <button type="button" onClick={() => scrollByAmount(1)} aria-label="Next">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="testimonials__scroller" ref={scrollerRef}>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialCarousel;
