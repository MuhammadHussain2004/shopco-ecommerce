import "./BrandStrip.css";

const BRANDS = ["versace", "zara", "gucci", "prada", "calvin-klein"];

function BrandStrip() {
  return (
    <section className="brand-strip">
      <div className="container brand-strip__grid">
        {BRANDS.map((brand) => (
          <img
            key={brand}
            src={`/images/brands/${brand}.png`}
            alt={brand.replace("-", " ")}
            className="brand-strip__logo"
          />
        ))}
      </div>
    </section>
  );
}

export default BrandStrip;
