import { post } from "./client";

export const subscribeToNewsletter = (email) => post("/newsletter", { email });
