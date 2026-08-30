import Product from "../models/Product.js";
import Review from "../models/Review.js";

export async function getProducts(req, res) {
  const {
    category,
    style,
    color,
    size,
    minPrice,
    maxPrice,
    onSale,
    section,
    sort,
    q,
    page = 1,
    limit = 9,
  } = req.query;

  const filter = {};
  if (category) filter.category = category;
  if (style) filter.dressStyle = style;
  if (color) filter["colors.name"] = color;
  if (size) filter.sizes = size;
  if (onSale === "true") filter.oldPrice = { $exists: true, $ne: null };
  if (section) filter.sections = section;
  if (q) filter.name = { $regex: q, $options: "i" };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const sortMap = {
    "price-asc": { price: 1 },
    "price-desc": { price: -1 },
    rating: { rating: -1 },
    newest: { createdAt: -1 },
  };
  const sortBy = sortMap[sort] || { createdAt: -1 };

  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));

  const [items, total] = await Promise.all([
    Product.find(filter)
      .sort(sortBy)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Product.countDocuments(filter),
  ]);

  res.json({
    items,
    total,
    page: pageNum,
    totalPages: Math.max(1, Math.ceil(total / limitNum)),
  });
}

export async function getProductBySlug(req, res) {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
}

export async function getRelatedProducts(req, res) {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) return res.status(404).json({ message: "Product not found" });

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  }).limit(4);

  res.json(related);
}

const REVIEW_SORT_MAP = {
  latest: { postedAt: -1 },
  oldest: { postedAt: 1 },
  highest: { rating: -1 },
  lowest: { rating: 1 },
};

export async function getReviews(req, res) {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) return res.status(404).json({ message: "Product not found" });

  const { page = 1, limit = 6, sort = "latest" } = req.query;
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.max(1, Number(limit));
  const sortBy = REVIEW_SORT_MAP[sort] || REVIEW_SORT_MAP.latest;

  const [items, total] = await Promise.all([
    Review.find({ product: product._id })
      .sort(sortBy)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Review.countDocuments({ product: product._id }),
  ]);

  res.json({ items, total, page: pageNum, totalPages: Math.max(1, Math.ceil(total / limitNum)) });
}

export async function createReview(req, res) {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) return res.status(404).json({ message: "Product not found" });

  const { name, rating, comment } = req.body;
  if (!name || !rating || !comment) {
    return res.status(400).json({ message: "name, rating and comment are required" });
  }

  const review = await Review.create({
    product: product._id,
    name,
    rating,
    comment,
    verified: false,
  });

  const allReviews = await Review.find({ product: product._id });
  const avgRating =
    allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
  product.rating = Math.round(avgRating * 10) / 10;
  await product.save();

  res.status(201).json(review);
}
