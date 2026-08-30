import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import FiltersPanel from "../../components/FiltersPanel/FiltersPanel";
import FiltersDrawer from "../../components/FiltersDrawer/FiltersDrawer";
import ProductCard from "../../components/ProductCard/ProductCard";
import Newsletter from "../../components/Newsletter/Newsletter";
import { fetchProducts } from "../../api/products";
import { PRICE_MIN, PRICE_MAX } from "../../constants/filters";
import "./Shop.css";

const SORT_OPTIONS = [
  { value: "", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

function getPageTitle(params) {
  if (params.get("q")) return `Search results for "${params.get("q")}"`;
  if (params.get("style")) return params.get("style");
  if (params.get("category")) return params.get("category");
  if (params.get("section") === "new-arrivals") return "New Arrivals";
  if (params.get("section") === "top-selling") return "Top Selling";
  if (params.get("onSale") === "true") return "On Sale";
  return "All Products";
}

function paramsToFilters(params) {
  return {
    category: params.get("category") || "",
    style: params.get("style") || "",
    color: params.get("color") || "",
    size: params.get("size") || "",
    minPrice: params.get("minPrice") ? Number(params.get("minPrice")) : PRICE_MIN,
    maxPrice: params.get("maxPrice") ? Number(params.get("maxPrice")) : PRICE_MAX,
  };
}

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [result, setResult] = useState({ items: [], total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [draft, setDraft] = useState(() => paramsToFilters(searchParams));

  const page = Number(searchParams.get("page") || 1);
  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    setDraft(paramsToFilters(searchParams));
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    const query = {
      category: searchParams.get("category") || undefined,
      style: searchParams.get("style") || undefined,
      color: searchParams.get("color") || undefined,
      size: searchParams.get("size") || undefined,
      minPrice: searchParams.get("minPrice") || undefined,
      maxPrice: searchParams.get("maxPrice") || undefined,
      onSale: searchParams.get("onSale") || undefined,
      section: searchParams.get("section") || undefined,
      q: searchParams.get("q") || undefined,
      sort: sort || undefined,
      page,
      limit: 9,
    };
    fetchProducts(query)
      .then(setResult)
      .catch(() => setResult({ items: [], total: 0, totalPages: 1 }))
      .finally(() => setLoading(false));
  }, [searchParams, page, sort]);

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === undefined || value === null) {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });
    setSearchParams(next);
  };

  const handleApplyFilters = () => {
    updateParams({
      category: draft.category,
      style: draft.style,
      color: draft.color,
      size: draft.size,
      minPrice: draft.minPrice !== PRICE_MIN ? draft.minPrice : "",
      maxPrice: draft.maxPrice !== PRICE_MAX ? draft.maxPrice : "",
      page: "",
    });
  };

  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: getPageTitle(searchParams) },
  ];

  return (
    <div className="shop-page">
      <div className="container shop-page__breadcrumb">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="container shop-page__layout">
        <aside className="shop-page__sidebar">
          <FiltersPanel draft={draft} onChange={setDraft} onApply={handleApplyFilters} />
        </aside>

        <div className="shop-page__main">
          <div className="shop-page__toolbar">
            <h1 className="shop-page__title">{getPageTitle(searchParams)}</h1>
            <div className="shop-page__meta">
              <span className="shop-page__count">
                {loading ? "Loading..." : `Showing ${result.items.length} of ${result.total} Products`}
              </span>
              <label className="shop-page__sort">
                Sort by:
                <select
                  value={sort}
                  onChange={(e) => updateParams({ sort: e.target.value, page: "" })}
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button
              type="button"
              className="shop-page__filter-toggle"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open filters"
            >
              <SlidersHorizontal size={16} />
            </button>
          </div>

          {!loading && result.items.length === 0 && (
            <p className="shop-page__empty">No products match these filters.</p>
          )}

          <div className="shop-page__grid">
            {result.items.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          {result.totalPages > 1 && (
            <div className="shop-page__pagination">
              <button
                type="button"
                className="btn btn-outline"
                disabled={page <= 1}
                onClick={() => updateParams({ page: page - 1 })}
              >
                <ChevronLeft size={16} /> Previous
              </button>
              {Array.from({ length: result.totalPages }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`shop-page__page-btn ${
                    page === i + 1 ? "shop-page__page-btn--active" : ""
                  }`}
                  onClick={() => updateParams({ page: i + 1 })}
                >
                  {i + 1}
                </button>
              ))}
              <button
                type="button"
                className="btn btn-outline"
                disabled={page >= result.totalPages}
                onClick={() => updateParams({ page: page + 1 })}
              >
                Next <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <FiltersDrawer
        open={drawerOpen}
        draft={draft}
        onChange={setDraft}
        onApply={handleApplyFilters}
        onClose={() => setDrawerOpen(false)}
        sort={sort}
        onSortChange={(value) => updateParams({ sort: value, page: "" })}
        sortOptions={SORT_OPTIONS}
      />

      <Newsletter />
    </div>
  );
}

export default Shop;
