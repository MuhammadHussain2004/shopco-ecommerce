import { get, post } from "./client";

export const fetchProducts = (params = {}) => {
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== "")
  ).toString();
  return get(`/products${query ? `?${query}` : ""}`);
};

export const fetchProductBySlug = (slug) => get(`/products/${slug}`);

export const fetchRelatedProducts = (slug) => get(`/products/${slug}/related`);

export const fetchReviews = (slug, params = {}) => {
  const query = new URLSearchParams(params).toString();
  return get(`/products/${slug}/reviews${query ? `?${query}` : ""}`);
};

export const submitReview = (slug, review) =>
  post(`/products/${slug}/reviews`, review);
