import { post } from "./client";

export const applyPromoCode = (code) => post("/promo/apply", { code });
