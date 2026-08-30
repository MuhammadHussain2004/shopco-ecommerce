import PromoCode from "../models/PromoCode.js";

export async function applyPromo(req, res) {
  const { code } = req.body;
  if (!code) return res.status(400).json({ message: "code is required" });

  const promo = await PromoCode.findOne({ code: code.toUpperCase(), active: true });
  if (!promo) {
    return res.status(404).json({ message: "Invalid or expired promo code" });
  }

  res.json({ code: promo.code, discountPercent: promo.discountPercent });
}
