import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    discountPercent: { type: Number },
    rating: { type: Number, required: true, min: 0, max: 5 },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    colors: [
      {
        name: { type: String, required: true },
        hex: { type: String, required: true },
      },
    ],
    sizes: { type: [String], required: true },
    category: {
      type: String,
      required: true,
      enum: ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"],
    },
    dressStyle: {
      type: String,
      required: true,
      enum: ["Casual", "Formal", "Party", "Gym"],
    },
    sections: { type: [String], default: [] },
    stock: { type: Number, default: 100 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
