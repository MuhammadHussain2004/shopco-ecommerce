import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    comment: { type: String, required: true },
    verified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
