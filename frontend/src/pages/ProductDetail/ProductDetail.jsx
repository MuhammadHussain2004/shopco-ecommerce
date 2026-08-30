import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import StarRating from "../../components/StarRating/StarRating";
import PriceTag from "../../components/PriceTag/PriceTag";
import ColorSwatch from "../../components/ColorSwatch/ColorSwatch";
import SizePill from "../../components/SizePill/SizePill";
import QuantityStepper from "../../components/QuantityStepper/QuantityStepper";
import Tabs from "../../components/Tabs/Tabs";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import ReviewFormModal from "../../components/ReviewFormModal/ReviewFormModal";
import ProductCard from "../../components/ProductCard/ProductCard";
import Newsletter from "../../components/Newsletter/Newsletter";
import { fetchProductBySlug, fetchRelatedProducts, fetchReviews, submitReview } from "../../api/products";
import { useCart } from "../../context/CartContext";
import "./ProductDetail.css";

const TABS = ["Product Details", "Rating & Reviews", "FAQs"];

function ProductDetail() {
  const { slug } = useParams();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [reviews, setReviews] = useState({ items: [], total: 0, page: 1, totalPages: 1 });
  const [activeTab, setActiveTab] = useState(TABS[1]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [addedMessage, setAddedMessage] = useState(false);
  const [reviewSort, setReviewSort] = useState("latest");

  useEffect(() => {
    setProduct(null);
    fetchProductBySlug(slug).then((data) => {
      setProduct(data);
      setSelectedColor(data.colors[0]?.name || "");
      setSelectedSize(data.sizes.find((s) => s === "Large") || data.sizes[0] || "");
    });
    fetchRelatedProducts(slug).then(setRelated).catch(() => setRelated([]));
  }, [slug]);

  useEffect(() => {
    fetchReviews(slug, { page: 1, sort: reviewSort }).then(setReviews).catch(() => {});
  }, [slug, reviewSort]);

  const loadMoreReviews = () => {
    fetchReviews(slug, { page: reviews.page + 1, sort: reviewSort }).then((data) =>
      setReviews((prev) => ({ ...data, items: [...prev.items, ...data.items] }))
    );
  };

  const handleSubmitReview = async (review) => {
    await submitReview(slug, review);
    setReviewModalOpen(false);
    const refreshed = await fetchReviews(slug, { page: 1, sort: reviewSort });
    setReviews(refreshed);
    const updatedProduct = await fetchProductBySlug(slug);
    setProduct(updatedProduct);
  };

  const handleAddToCart = () => {
    addItem(
      {
        productId: product._id,
        slug: product.slug,
        name: product.name,
        image: product.images[0],
        price: product.price,
        size: selectedSize,
        color: selectedColor,
      },
      quantity
    );
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  if (!product) {
    return <div className="container pdp-loading">Loading...</div>;
  }

  return (
    <div className="pdp">
      <div className="container pdp__breadcrumb">
        <Breadcrumb
          items={[
            { label: "Home", to: "/" },
            { label: "Shop", to: "/shop" },
            { label: product.category, to: `/shop?category=${product.category}` },
            { label: product.name },
          ]}
        />
      </div>

      <div className="container pdp__top">
        <ImageGallery images={product.images} alt={product.name} />

        <div className="pdp__info">
          <h1 className="pdp__name">{product.name}</h1>
          <StarRating rating={product.rating} />
          <PriceTag
            price={product.price}
            oldPrice={product.oldPrice}
            discountPercent={product.discountPercent}
            size="lg"
          />
          <p className="pdp__description">{product.description}</p>

          <div className="pdp__divider" />

          <div className="pdp__option">
            <p className="pdp__option-label">Select Colors</p>
            <ColorSwatch
              colors={product.colors}
              selected={selectedColor}
              onSelect={setSelectedColor}
            />
          </div>

          <div className="pdp__divider" />

          <div className="pdp__option">
            <p className="pdp__option-label">Choose Size</p>
            <SizePill sizes={product.sizes} selected={selectedSize} onSelect={setSelectedSize} />
          </div>

          <div className="pdp__divider" />

          <div className="pdp__add-row">
            <QuantityStepper quantity={quantity} onChange={setQuantity} />
            <button type="button" className="btn btn-primary pdp__add-btn" onClick={handleAddToCart}>
              {addedMessage ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      <div className="container pdp__tabs-section">
        <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

        {activeTab === "Product Details" && (
          <div className="pdp__tab-content">
            <p>{product.description}</p>
          </div>
        )}

        {activeTab === "Rating & Reviews" && (
          <div className="pdp__tab-content">
            <div className="pdp__reviews-header">
              <h2>All Reviews ({reviews.total})</h2>
              <div className="pdp__reviews-actions">
                <select
                  className="pdp__reviews-sort"
                  value={reviewSort}
                  onChange={(e) => setReviewSort(e.target.value)}
                  aria-label="Sort reviews"
                >
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                </select>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setReviewModalOpen(true)}
                >
                  Write a Review
                </button>
              </div>
            </div>

            <div className="pdp__reviews-grid">
              {reviews.items.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>

            {reviews.page < reviews.totalPages && (
              <div className="pdp__load-more">
                <button type="button" className="btn btn-outline" onClick={loadMoreReviews}>
                  Load More Reviews
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "FAQs" && (
          <div className="pdp__tab-content">
            <p>Have a question about this product? Reach out via Customer Support and we'll get back to you.</p>
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div className="container pdp__related">
          <h2 className="pdp__related-title">YOU MIGHT ALSO LIKE</h2>
          <div className="pdp__related-grid">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </div>
      )}

      <Newsletter />

      <ReviewFormModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        onSubmit={handleSubmitReview}
      />
    </div>
  );
}

export default ProductDetail;
