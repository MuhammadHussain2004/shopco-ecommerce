import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 5 },
    comment: { type: String, required: true },
    verified: { type: Boolean, default: true },
    postedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
