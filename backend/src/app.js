import express from "express";
import cors from "cors";

import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";
import promoRouter from "./routes/promo.js";
import newsletterRouter from "./routes/newsletter.js";
import testimonialsRouter from "./routes/testimonials.js";

const app = express();

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/products", productsRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/promo", promoRouter);
app.use("/api/newsletter", newsletterRouter);
app.use("/api/testimonials", testimonialsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server error" });
});

export default app;
