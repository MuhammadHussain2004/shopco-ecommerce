import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Product from "../models/Product.js";
import Review from "../models/Review.js";
import Testimonial from "../models/Testimonial.js";
import PromoCode from "../models/PromoCode.js";

const img = (name) => `/images/products/${name}`;

const products = [
  {
    name: "T-shirt with Tape Details",
    slug: "tshirt-with-tape-details",
    price: 120,
    rating: 4.5,
    description:
      "A relaxed-fit tee finished with a bold tape detail across the chest. Made from soft, breathable cotton for everyday comfort.",
    images: [img("tshirt-tape-details.png")],
    colors: [
      { name: "black", hex: "#1A1A1A" },
      { name: "white", hex: "#FFFFFF" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "T-shirts",
    dressStyle: "Casual",
    sections: ["new-arrivals"],
  },
  {
    name: "Skinny Fit Jeans",
    slug: "skinny-fit-jeans",
    price: 240,
    oldPrice: 260,
    discountPercent: 20,
    rating: 3.5,
    description:
      "Classic skinny fit jeans with a touch of stretch for all-day comfort, in a versatile faded-blue wash.",
    images: [img("skinny-fit-jeans.png")],
    colors: [
      { name: "blue", hex: "#3B5BA5" },
      { name: "black", hex: "#1A1A1A" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "Jeans",
    dressStyle: "Casual",
    sections: ["new-arrivals"],
  },
  {
    name: "Checkered Shirt",
    slug: "checkered-shirt",
    price: 180,
    rating: 4.5,
    description:
      "A timeless checkered button-down shirt cut from soft cotton flannel, perfect for layering in any season.",
    images: [img("checkered-shirt.png")],
    colors: [
      { name: "red", hex: "#8B2131" },
      { name: "purple", hex: "#5C4A72" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "Shirts",
    dressStyle: "Formal",
    sections: ["new-arrivals"],
  },
  {
    name: "Sleeve Striped T-shirt",
    slug: "sleeve-striped-tshirt",
    price: 130,
    oldPrice: 160,
    discountPercent: 30,
    rating: 4.5,
    description:
      "A raglan-sleeve tee with contrast striped sleeves for a sporty, easy-to-style look.",
    images: [img("sleeve-striped-tshirt.png")],
    colors: [
      { name: "orange", hex: "#D9622B" },
      { name: "black", hex: "#1A1A1A" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "T-shirts",
    dressStyle: "Casual",
    sections: ["new-arrivals"],
  },
  {
    name: "Vertical Striped Shirt",
    slug: "vertical-striped-shirt",
    price: 212,
    oldPrice: 232,
    discountPercent: 20,
    rating: 5.0,
    description:
      "A relaxed vertical-striped shirt in breathable cotton, effortless enough for the weekend and sharp enough for the office.",
    images: [img("vertical-striped-shirt.png")],
    colors: [
      { name: "green", hex: "#5C6E52" },
      { name: "white", hex: "#FFFFFF" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "Shirts",
    dressStyle: "Formal",
    sections: ["top-selling"],
  },
  {
    name: "Courage Graphic T-shirt",
    slug: "courage-graphic-tshirt",
    price: 145,
    rating: 4.0,
    description:
      "A bold graphic tee printed with an oversized 'Courage' design, made from heavyweight cotton jersey.",
    images: [img("courage-graphic-tshirt.png")],
    colors: [
      { name: "orange", hex: "#C2521B" },
      { name: "black", hex: "#1A1A1A" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "T-shirts",
    dressStyle: "Casual",
    sections: ["top-selling"],
  },
  {
    name: "Loose Fit Bermuda Shorts",
    slug: "loose-fit-bermuda-shorts",
    price: 80,
    rating: 3.0,
    description:
      "Relaxed, loose-fit bermuda shorts in washed denim, cut just above the knee for warm-weather comfort.",
    images: [img("loose-fit-bermuda-shorts.png")],
    colors: [
      { name: "blue", hex: "#7A93B8" },
      { name: "black", hex: "#1A1A1A" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "Shorts",
    dressStyle: "Casual",
    sections: ["top-selling"],
  },
  {
    name: "Faded Skinny Jeans",
    slug: "faded-skinny-jeans",
    price: 210,
    rating: 4.5,
    description:
      "Deep-black skinny jeans with a subtle faded wash, tapered through the leg for a modern silhouette.",
    images: [img("faded-skinny-jeans.png")],
    colors: [
      { name: "black", hex: "#1A1A1A" },
      { name: "blue", hex: "#3B5BA5" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "Jeans",
    dressStyle: "Casual",
    sections: ["top-selling"],
  },
  {
    name: "Gradient Graphic T-shirt",
    slug: "gradient-graphic-tshirt",
    price: 145,
    rating: 3.5,
    description:
      "A statement tee featuring a vivid gradient graphic print on soft, lightweight cotton.",
    images: [img("gradient-graphic-tshirt.png")],
    colors: [
      { name: "white", hex: "#FFFFFF" },
      { name: "pink", hex: "#D6538A" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "T-shirts",
    dressStyle: "Party",
    sections: [],
  },
  {
    name: "Polo with Tipping Details",
    slug: "polo-with-tipping-details",
    price: 180,
    rating: 4.5,
    description:
      "A pique-knit polo with contrast tipping at the collar and placket for a clean, classic finish.",
    images: [img("polo-tipping-details.png")],
    colors: [
      { name: "red", hex: "#8B3A42" },
      { name: "white", hex: "#FFFFFF" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "Shirts",
    dressStyle: "Formal",
    sections: [],
  },
  {
    name: "Black Striped T-shirt",
    slug: "black-striped-tshirt",
    price: 120,
    oldPrice: 150,
    discountPercent: 30,
    rating: 5.0,
    description:
      "A raglan-style striped tee with contrast black sleeves, cut from soft combed cotton.",
    images: [img("black-striped-tshirt.png")],
    colors: [
      { name: "black", hex: "#1A1A1A" },
      { name: "white", hex: "#FFFFFF" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "T-shirts",
    dressStyle: "Casual",
    sections: [],
  },
  {
    name: "One Life Graphic T-shirt",
    slug: "one-life-graphic-tshirt",
    price: 260,
    oldPrice: 300,
    discountPercent: 40,
    rating: 4.5,
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    images: [
      img("one-life-graphic-tshirt-1.png"),
      img("one-life-graphic-tshirt-2.png"),
      img("one-life-graphic-tshirt-3.png"),
    ],
    colors: [
      { name: "olive", hex: "#5C5442" },
      { name: "green", hex: "#3E4A3D" },
      { name: "navy", hex: "#1F2937" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "T-shirts",
    dressStyle: "Casual",
    sections: [],
  },
  {
    name: "Polo with Contrast Trims",
    slug: "polo-with-contrast-trims",
    price: 212,
    oldPrice: 242,
    discountPercent: 20,
    rating: 4.0,
    description:
      "A sharp pique polo with contrast trims at the collar and sleeves, tailored for a clean modern fit.",
    images: [img("polo-contrast-trims.png")],
    colors: [
      { name: "teal", hex: "#1E6E73" },
      { name: "white", hex: "#FFFFFF" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    category: "Shirts",
    dressStyle: "Formal",
    sections: [],
  },
];

const reviewsBySlug = {
  "one-life-graphic-tshirt": [
    {
      name: "Samantha D.",
      rating: 4.5,
      comment:
        "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
      postedAt: new Date("2023-08-14"),
    },
    {
      name: "Alex M.",
      rating: 5,
      comment:
        "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
      postedAt: new Date("2023-08-15"),
    },
    {
      name: "Ethan R.",
      rating: 3.5,
      comment:
        "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
      postedAt: new Date("2023-08-16"),
    },
    {
      name: "Olivia P.",
      rating: 5,
      comment:
        "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
      postedAt: new Date("2023-08-17"),
    },
    {
      name: "Liam K.",
      rating: 4,
      comment:
        "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
      postedAt: new Date("2023-08-18"),
    },
    {
      name: "Ava H.",
      rating: 4.5,
      comment:
        "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
      postedAt: new Date("2023-08-19"),
    },
  ],
};

const testimonials = [
  {
    name: "Sarah M.",
    rating: 5,
    comment:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    name: "Alex K.",
    rating: 5,
    comment:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    name: "James L.",
    rating: 5,
    comment:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
];

async function seed() {
  await connectDB();

  await Promise.all([
    Product.deleteMany({}),
    Review.deleteMany({}),
    Testimonial.deleteMany({}),
    PromoCode.deleteMany({}),
  ]);

  const createdProducts = await Product.insertMany(products);
  console.log(`Seeded ${createdProducts.length} products`);

  const productBySlug = Object.fromEntries(
    createdProducts.map((p) => [p.slug, p])
  );

  const reviewDocs = [];
  for (const [slug, reviews] of Object.entries(reviewsBySlug)) {
    const product = productBySlug[slug];
    if (!product) continue;
    for (const review of reviews) {
      reviewDocs.push({ ...review, product: product._id, verified: true });
    }
  }
  await Review.insertMany(reviewDocs);
  console.log(`Seeded ${reviewDocs.length} reviews`);

  await Testimonial.insertMany(testimonials);
  console.log(`Seeded ${testimonials.length} testimonials`);

  await PromoCode.insertMany([{ code: "SAVE20", discountPercent: 20 }]);
  console.log("Seeded promo codes");

  await mongoose.disconnect();
  console.log("Done.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
