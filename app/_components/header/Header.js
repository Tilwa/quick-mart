"use client";

import Navigation from "@/app/_components/navigation/Navigation";
import "./Header.css";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/app/_hooks/product/useGetAllProducts";
import { useRouter } from "next/navigation";

function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const router = useRouter();

  // Fetch products by search term
  const { data: products } = useQuery({
    queryKey: ["products", searchTerm],
    queryFn: () =>
      getAllProducts({ page: 1, search: searchTerm, sortBy, pageSize: 20 }),
    enabled: searchTerm.length >= 3, // don't fetch until 3+ chars
  });

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== "") {
      router.push(
        `/all-products?search=${encodeURIComponent(searchTerm.trim())}`
      );
    } else {
      router.push("/all-products"); // ❌ no search query if input is empty
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link href="/" className="logo-main">
          <div>
            <span className="logo-quick-title">Quick</span>
            <span className="logo-mart-title">Mart</span>
          </div>
        </Link>

        <div className="search-bar-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              onFocus={(e) => e.target.select()}
            />
            <button id="search-btn" onClick={handleSearchSubmit}>
              Search
            </button>
          </div>

          {/* 🔍 Search dropdown */}
          {searchTerm.length >= 3 && products?.docs?.length > 0 && (
            <div className="search-suggestions">
              {products.docs.map((product, index) => (
                <Link
                  href={`/product/${product._id}`}
                  key={product._id}
                  className="suggestion-item"
                >
                  {product.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <hr id="header-line" />
      <Navigation />
    </header>
  );
}

export default Header;
