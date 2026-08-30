# SHOP.CO — E-commerce Website

A pixel-faithful rebuild of the "Shop.co" Figma community template, built as a full MERN stack app.

- **Frontend**: React (Vite), plain CSS
- **Backend**: Node.js + Express
- **Database**: MongoDB (Atlas)

## Project structure

```
frontend/   React app (Home, Shop, Product Detail, Cart, Checkout)
backend/    Express REST API + MongoDB models
```

## Local setup

### 1. Backend

```
cd backend
npm install
cp .env.example .env   # then fill in MONGODB_URI
npm run seed            # seeds products, reviews, testimonials, promo codes
npm run dev              # runs on http://localhost:5000
```

### 2. Frontend

```
cd frontend
npm install
cp .env.example .env   # VITE_API_URL=http://localhost:5000 (already the default)
npm run dev              # runs on http://localhost:5173
```

Try promo code `SAVE20` on the Cart page for a working discount example.

## Deployment (Vercel + MongoDB Atlas)

Both `frontend` and `backend` deploy as **separate Vercel projects** from the same GitHub repo (each with its own "Root Directory" setting).

1. **MongoDB Atlas**: create a free M0 cluster, a database user, allow network access from `0.0.0.0/0`, and copy the connection string.
2. **Backend on Vercel**: New Project → import this repo → Root Directory = `backend` → Environment Variables: `MONGODB_URI`, `CLIENT_URL` (the frontend's Vercel URL, set after step 3). Deploy, then run `npm run seed` locally once against the Atlas URI to populate the database.
3. **Frontend on Vercel**: New Project → import this repo → Root Directory = `frontend` → Environment Variable: `VITE_API_URL` (the backend's Vercel URL from step 2). Deploy.
4. Go back to the backend project's environment variables and set `CLIENT_URL` to the frontend's real deployed URL, then redeploy the backend so CORS allows it.

## API overview

| Method | Route | Description |
| --- | --- | --- |
| GET | `/api/products` | List products (filters: category, style, color, size, minPrice, maxPrice, onSale, section, q, sort, page, limit) |
| GET | `/api/products/:slug` | Single product |
| GET | `/api/products/:slug/related` | Related products |
| GET/POST | `/api/products/:slug/reviews` | Reviews (paginated) / submit a review |
| POST | `/api/orders` | Place an order |
| POST | `/api/promo/apply` | Validate a promo code |
| POST | `/api/newsletter` | Subscribe an email |
| GET | `/api/testimonials` | Homepage testimonials |
