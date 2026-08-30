import { post } from "./client";

export const createOrder = (order) => post("/orders", order);
