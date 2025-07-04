import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import myImg from "@/public/img1.png";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const isOutOfStock = product.inStock < 1;

  const images = [
    product.image1,
    product.image2,
    product.image3,
    product.image4,
    product.image5,
  ].filter(Boolean);

  const [currentImage, setCurrentImage] = useState(0);

  const handlePrevImage = (e) => {
    e.stopPropagation();
    e.preventDefault(); // 🔒 Prevent link from triggering
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    e.preventDefault(); // 🔒 Prevent link from triggering
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const title =
    product.title?.length > 27
      ? product.title.slice(0, 27) + "..."
      : product.title;

  const description =
    product.description?.length > 76
      ? product.description.slice(0, 76) + "..."
      : product.description;

  const vatAmount = (product.offerPrice * 5) / 105;

  const hasDiscount = product.originalPrice > product.offerPrice;
  const discount = hasDiscount
    ? Math.round(
        ((product.originalPrice - product.offerPrice) / product.originalPrice) *
          100
      )
    : null;

  return (
    <div className={`product-card ${isOutOfStock ? "out-of-stock" : ""}`}>
      <div className="discount-badge">{discount}% OFF</div>

      <div className="product-image-slider">
        {images.length > 1 && (
          <button onClick={handlePrevImage} className="nav-btn">
            ◀
          </button>
        )}

        {/* Wrap only the image in a Link if in stock */}
        {isOutOfStock ? (
          <Image
            src={images[currentImage] || myImg}
            alt={product.title}
            width={260}
            height={200}
            className="product-img"
            style={{ filter: "grayscale(100%)" }}
          />
        ) : (
          <Link href={`/all-products/product/${product.id}`}>
            <Image
              src={images[currentImage] || myImg}
              alt={product.title}
              width={260}
              height={200}
              className="product-img"
            />
          </Link>
        )}

        {images.length > 1 && (
          <button onClick={handleNextImage} className="nav-btn">
            ▶
          </button>
        )}
      </div>

      <div className="brand-logo">{product.brand}</div>

      <div className="product-info">
        <span className="delivery-badge">
          {isOutOfStock ? "Out of Stock" : "Free Shipping"}
        </span>
        <p className="category">{product.category}</p>
        <h3 className="title">
          {isOutOfStock ? (
            product.title
          ) : (
            <Link
              href={`/all-products/product/${product.id}`}
              id="product-title"
            >
              <p className="title">{title}</p>
            </Link>
          )}
        </h3>
        <p className="description">{description}</p>
        <p className="price">
          {product.offerPrice} AED{" "}
          <span className="original-price">{product.originalPrice} AED</span>
        </p>
        <p className="vat">{vatAmount.toFixed(2)} AED - VAT Included</p>
      </div>
    </div>
  );
}
