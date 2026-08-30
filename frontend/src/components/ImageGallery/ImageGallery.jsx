import { useState } from "react";
import "./ImageGallery.css";

function ImageGallery({ images, alt }) {
  const [active, setActive] = useState(0);

  return (
    <div className="image-gallery">
      <div className="image-gallery__thumbs">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            className={`image-gallery__thumb ${
              active === i ? "image-gallery__thumb--active" : ""
            }`}
            onClick={() => setActive(i)}
          >
            <img src={src} alt={`${alt} ${i + 1}`} />
          </button>
        ))}
      </div>
      <div className="image-gallery__main">
        <img src={images[active]} alt={alt} />
      </div>
    </div>
  );
}

export default ImageGallery;
