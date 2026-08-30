import { Router } from "express";
import {
  getProducts,
  getProductBySlug,
  getRelatedProducts,
  getReviews,
  createReview,
} from "../controllers/productController.js";

const router = Router();

router.get("/", getProducts);
router.get("/:slug", getProductBySlug);
router.get("/:slug/related", getRelatedProducts);
router.get("/:slug/reviews", getReviews);
router.post("/:slug/reviews", createReview);

export default router;
