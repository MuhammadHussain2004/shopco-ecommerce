import Order from "../models/Order.js";
import PromoCode from "../models/PromoCode.js";

const DELIVERY_FEE = 15;

export async function createOrder(req, res) {
  const { items, customer, promoCode } = req.body;

  if (!items || !items.length || !customer) {
    return res.status(400).json({ message: "items and customer are required" });
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discountPercent = 0;
  if (promoCode) {
    const promo = await PromoCode.findOne({ code: promoCode.toUpperCase(), active: true });
    if (promo) discountPercent = promo.discountPercent;
  }
  const discount = Math.round(((subtotal * discountPercent) / 100) * 100) / 100;
  const total = Math.round((subtotal - discount + DELIVERY_FEE) * 100) / 100;

  const order = await Order.create({
    items,
    customer,
    promoCode: promoCode || undefined,
    subtotal,
    discount,
    deliveryFee: DELIVERY_FEE,
    total,
  });

  res.status(201).json(order);
}

export async function getOrder(req, res) {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
}
