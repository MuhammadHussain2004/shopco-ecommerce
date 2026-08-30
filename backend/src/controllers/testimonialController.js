import Testimonial from "../models/Testimonial.js";

export async function getTestimonials(req, res) {
  const testimonials = await Testimonial.find().sort({ createdAt: 1 });
  res.json(testimonials);
}
