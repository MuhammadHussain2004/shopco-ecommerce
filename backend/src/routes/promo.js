import { Router } from "express";
import { applyPromo } from "../controllers/promoController.js";

const router = Router();

router.post("/apply", applyPromo);

export default router;
