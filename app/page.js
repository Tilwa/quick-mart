"use client";

import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import Footer from "./_components/footer/Footer";
import Header from "./_components/header/Header";
import Slider from "./_components/slider/Slider";
import "./page.css";
import Link from "next/link";
import { getFilteredProducts } from "./_hooks/product/useGetFilteredProducts";
import Image from "next/image";

// Reusable horizontal product slider row
function ProductRow({ title, products }) {
  const containerRef = useRef(null);
  const [showMore, setShowMore] = useState(false);

  const handleScroll = (direction) => {
    const scrollAmount = 400;
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      if (scrollLeft + clientWidth + scrollAmount >= scrollWidth) {
        setShowMore(true);
      }
    }
  };

  return (
    <div className="product-row">
      <h2 className="row-title">{title}</h2>
      <div className="scroll-wrapper">
        <button className="arrow left" onClick={() => handleScroll("left")}>
          ◀
        </button>

        <div className="grid-container" ref={containerRef}>
          {products?.products?.map((p, i) => {
            const shortTitle =
              p.title?.length > 27 ? p.title.slice(0, 27) + "..." : p.title;
            const vatAmount = (p.offerPrice * 0.05).toFixed(2);

            const shortDescription =
              p.description?.length > 76
                ? p.description.slice(0, 76) + "..."
                : p.description;

            const hasDiscount = p.originalPrice > p.offerPrice;
            const discount = hasDiscount
              ? Math.round(
                  ((p.originalPrice - p.offerPrice) / p.originalPrice) * 100
                )
              : null;

            return (
              <div className="grid-item" key={i}>
                <div className="product-card">
                  {hasDiscount && (
                    <div className="discount-badge">{discount}% OFF</div>
                  )}

                  <Image
                    width={100}
                    height={100}
                    src={p.image1}
                    alt={p.title}
                    className="product-img"
                  />

                  <div className="brand-logo">{p.brand}</div>

                  <div className="product-info">
                    <span className="delivery-badge">Free Shipping</span>
                    <p className="category">{p.category}</p>
                    <h3 className="title">{shortTitle}</h3>
                    <p className="vat">{shortDescription}</p>
                    <p className="price">{p.offerPrice} AED</p>
                    <p className="vat">{vatAmount} AED - VAT Included</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button className="arrow right" onClick={() => handleScroll("right")}>
          ▶
        </button>
      </div>

      {showMore && (
        <div className="show-more-wrapper">
          <Link href="/all-products">
            <button className="show-more-btn">Show More Products</button>
          </Link>
        </div>
      )}
    </div>
  );
}

function HomePage() {
  const [selectedFilters] = useState({
    "Fabric Name": [],
    Color: [],
    Size: [],
    Availability: [],
  });

  const sharedQueryParams = {
    page: 1,
    pageSize: 10,
    search: "",
    sortBy: "createdAt_desc",
    filters: {
      brand: selectedFilters["Fabric Name"],
      color: selectedFilters["Color"],
      size: selectedFilters["Size"],
    },
  };

  const { data: featuredData = [] } = useQuery({
    queryKey: ["featured-products"],
    queryFn: () => getFilteredProducts(sharedQueryParams),
  });

  const { data: newArrivalsData = [] } = useQuery({
    queryKey: ["new-arrivals"],
    queryFn: () =>
      getFilteredProducts({ ...sharedQueryParams, sortBy: "createdAt_desc" }),
  });

  const { data: trendingData = [] } = useQuery({
    queryKey: ["trending-products"],
    queryFn: () =>
      getFilteredProducts({ ...sharedQueryParams, sortBy: "popularity" }),
  });

  const { data: exclusiveData = [] } = useQuery({
    queryKey: ["exclusive-products"],
    queryFn: () =>
      getFilteredProducts({ ...sharedQueryParams, sortBy: "random" }),
  });

  return (
    <div>
      <Header />
      <div className="home">
        <Slider />
        <ProductRow title="Featured Products" products={featuredData} />
        <ProductRow title="New Arrivals" products={newArrivalsData} />
        <ProductRow title="Trending Now" products={trendingData} />
        <ProductRow title="Exclusive Picks" products={exclusiveData} />
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
