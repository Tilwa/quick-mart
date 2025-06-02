"use client";

import Header from "@/app/_components/header/Header";
import Slider from "@/app/_components/slider/Slider";
import "./page.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../_hooks/product/useGetAllProducts";

function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products", page, searchTerm, sortBy],
    queryFn: () => getAllProducts(page, searchTerm, sortBy),
  });

  console.log(products);

  return (
    <div>
      {/* <Header /> */}
      <div className="all-prod-home">
        <Slider />
        <h2 className="all-prod-recommended">All Products</h2>

        <div className="all-prod-grid-container">
          <div className="all-prod-grid-item">
            <div className="all-prod-product-card">
              <div className="all-prod-discount-badge">25% OFF</div>
              <img
                src="./img1.png"
                alt="Storage Tin Set"
                className="all-prod-product-img"
              />

              <div className="all-prod-brand-logo">TINIFY</div>

              <div className="all-prod-product-info">
                <span className="all-prod-delivery-badge">Free Shipping</span>
                <p className="all-prod-category">Storage Tins</p>
                <h3 className="all-prod-title">Classic Tin Container Set</h3>
                <p className="all-prod-price">49 AED</p>
                <p className="all-prod-vat">51 AED - VAT Included</p>
              </div>
            </div>
          </div>
          <div className="all-prod-grid-item">
            {" "}
            <div className="all-prod-product-card">
              <div className="all-prod-discount-badge">25% OFF</div>
              <img
                src="./img2.png"
                alt="Storage Tin Set"
                className="all-prod-product-img"
              />

              <div className="all-prod-brand-logo">TINIFY</div>

              <div className="all-prod-product-info">
                <span className="all-prod-delivery-badge">Free Shipping</span>
                <p className="all-prod-category">Storage Tins</p>
                <h3 className="all-prod-title">Classic Tin Container Set</h3>
                <p className="all-prod-price">49 AED</p>
                <p className="all-prod-vat">51 AED - VAT Included</p>
              </div>
            </div>
          </div>
          <div className="all-prod-grid-item">
            {" "}
            <div className="all-prod-product-card">
              <div className="all-prod-discount-badge">25% OFF</div>
              <img
                src="./img1.png"
                alt="Storage Tin Set"
                className="all-prod-product-img"
              />

              <div className="all-prod-brand-logo">TINIFY</div>

              <div className="all-prod-product-info">
                <span className="all-prod-delivery-badge">Free Shipping</span>
                <p className="all-prod-category">Storage Tins</p>
                <h3 className="all-prod-title">Classic Tin Container Set</h3>
                <p className="all-prod-price">49 AED</p>
                <p className="all-prod-vat">51 AED - VAT Included</p>
              </div>
            </div>
          </div>
          <div className="all-prod-grid-item">
            {" "}
            <div className="all-prod-product-card">
              <div className="all-prod-discount-badge">25% OFF</div>
              <img
                src="./img1.png"
                alt="Storage Tin Set"
                className="all-prod-product-img"
              />

              <div className="all-prod-brand-logo">TINIFY</div>

              <div className="all-prod-product-info">
                <span className="all-prod-delivery-badge">Free Shipping</span>
                <p className="all-prod-category">Storage Tins</p>
                <h3 className="all-prod-title">Classic Tin Container Set</h3>
                <p className="all-prod-price">49 AED</p>
                <p className="all-prod-vat">51 AED - VAT Included</p>
              </div>
            </div>
          </div>

          <div className="all-prod-grid-item">Item 5</div>
          <div className="all-prod-grid-item">Item 6</div>
          <div className="all-prod-grid-item">Item 7</div>
          <div className="all-prod-grid-item">Item 8</div>

          <div className="all-prod-grid-item">Item 9</div>
          <div className="all-prod-grid-item">Item 10</div>
          <div className="all-prod-grid-item">Item 11</div>
          <div className="all-prod-grid-item">Item 12</div>

          <div className="all-prod-grid-item">Item 13</div>
          <div className="all-prod-grid-item">Item 14</div>
          <div className="all-prod-grid-item">Item 15</div>
          <div className="all-prod-grid-item">Item 16</div>
        </div>
      </div>
    </div>
  );
}

export default Page;
