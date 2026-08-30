import { useEffect, useState } from "react";
import Hero from "../../components/Hero/Hero";
import BrandStrip from "../../components/BrandStrip/BrandStrip";
import ProductSection from "../../components/ProductSection/ProductSection";
import DressStyleGrid from "../../components/DressStyleGrid/DressStyleGrid";
import TestimonialCarousel from "../../components/TestimonialCarousel/TestimonialCarousel";
import Newsletter from "../../components/Newsletter/Newsletter";
import { fetchProducts } from "../../api/products";
import { fetchTestimonials } from "../../api/testimonials";

function Home() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchProducts({ section: "new-arrivals", limit: 4 })
      .then((data) => setNewArrivals(data.items))
      .catch(() => setNewArrivals([]));

    fetchProducts({ section: "top-selling", limit: 4 })
      .then((data) => setTopSelling(data.items))
      .catch(() => setTopSelling([]));

    fetchTestimonials()
      .then(setTestimonials)
      .catch(() => setTestimonials([]));
  }, []);

  return (
    <>
      <Hero />
      <BrandStrip />
      <ProductSection
        title="NEW ARRIVALS"
        products={newArrivals}
        viewAllHref="/shop?section=new-arrivals"
      />
      <ProductSection
        title="TOP SELLING"
        products={topSelling}
        viewAllHref="/shop?section=top-selling"
      />
      <DressStyleGrid />
      <TestimonialCarousel testimonials={testimonials} />
      <Newsletter />
    </>
  );
}

export default Home;
