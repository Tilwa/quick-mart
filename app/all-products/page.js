"use client";

import Header from "@/app/_components/header/Header";
import Slider from "@/app/_components/slider/Slider";
import "./page.css";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../_hooks/product/useGetAllProducts";
import Link from "next/link";
import Image from "next/image";
import DropdownFilter from "../ui/dropdownFilter/DropdownFilter";
import { getFilteredProducts } from "@/app/_hooks/product/useGetFilteredProducts";
import { getAllColors } from "../_hooks/color/useGetAllColors";
import { getAllSizes } from "../_hooks/size/useGetAllSizes";
import ProductCard from "../ui/productCard/ProductCard";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import Footer from "../_components/footer/Footer";

function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    "Fabric Name": [],
    Color: [],
    Size: [],
    Availability: [],
  });

  // fetching  products brands
  // Fetching products brands
  const { data: productsBrands } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts({ pageSize: 10000 }),
  });

  const brandOptions = Array.from(
    new Set(
      productsBrands?.products?.map((product) => product.brand).filter(Boolean)
    )
  );

  // Fetch products
  const { data: productsData, isLoading } = useQuery({
    queryKey: [
      "products",
      page,
      searchTerm,
      sortBy,
      selectedFilters,
      minPrice,
      maxPrice,
    ],
    queryFn: () =>
      getFilteredProducts({
        page,
        search: searchTerm,
        sortBy,
        pageSize: 52,
        filters: {
          brand: selectedFilters["Fabric Name"],
          color: selectedFilters["Color"],
          size: selectedFilters["Size"],
        },
        minPrice: minPrice ? Number(minPrice) : undefined,
        maxPrice: maxPrice ? Number(maxPrice) : undefined,
        availability:
          selectedFilters["Availability"]?.[0] === "In Stock"
            ? "InStock"
            : selectedFilters["Availability"]?.[0] === "Out of Stock"
            ? "OutOfStock"
            : undefined,
      }),
  });

  // Colors
  const { data: colorData } = useQuery({
    queryKey: ["colors"],
    queryFn: () => getAllColors({ pageSize: 10000 }),
  });
  // const colorOptions = colorData?.colors?.map((c) => c.name) || [];

  // Sizes
  const { data: sizeData } = useQuery({
    queryKey: ["sizes"],
    queryFn: () => getAllSizes({ pageSize: 10000 }),
  });
  const sizeOptions = sizeData?.sizes?.map((s) => s.label) || [];

  const availabilityOptions = ["In Stock", "Out of Stock"];

  useEffect(() => {
    if (productsData) {
      setFilteredProducts(productsData.products);
    }
  }, [productsData]);

  const handleFilterChange = (category, option) => {
    setSelectedFilters((prev) => {
      const isSelected = prev[category]?.includes(option);
      return {
        ...prev,
        [category]: isSelected
          ? prev[category].filter((item) => item !== option)
          : [...prev[category], option],
      };
    });
  };

  // counting total pages
  const totalPages = Math.ceil(productsData?.count / 50);

  return (
    <div className="all-products-container">
      <Header />
      <div className="all-prod-home">
        <Slider />

        <div className="all-prod-title-filters">
          <h2 className="all-prod-title">All Products</h2>
          <div className="title-sort-container">
            <p>Sort By:</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-selector"
            >
              <option value="">Select</option>
              <option value="price-asc">Price Low to High ⬆️</option>
              <option value="price-desc">Price High to Low ⬇️</option>
              <option value="title-asc">Ascending Order(A → Z) 🔤</option>
              <option value="title-desc">Descending Order(Z → A) 🔡</option>
            </select>
          </div>
        </div>

        <div className="all-prod-grid-container">
          <div className="all-prod-menus">
            <div className="filter-titles">
              <div className="title-and-remove-btn">
                <p>Filters</p>
                {Object.values(selectedFilters).some(
                  (arr) => arr.length > 0
                ) && (
                  <button
                    className="remove-all-btn"
                    onClick={() =>
                      setSelectedFilters({
                        "Fabric Name": [],
                        Color: [],
                        Size: [],
                        Availability: [],
                      })
                    }
                  >
                    Remove All
                  </button>
                )}
              </div>
              <div className="active-filters-container">
                {" "}
                {Object.values(selectedFilters).some(
                  (arr) => arr.length > 0
                ) && (
                  <div className="active-filters">
                    {Object.entries(selectedFilters).map(([cat, values]) =>
                      values.map((val) => (
                        <span key={`${cat}-${val}`} className="active-filter">
                          {val}
                          <button
                            className="remove-btn"
                            onClick={() => handleFilterChange(cat, val)}
                          >
                            ❌
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            <DropdownFilter
              title="Fabric Name"
              options={brandOptions}
              selectedOptions={selectedFilters["Fabric Name"]}
              onChange={handleFilterChange}
            />

            <DropdownFilter
              title="Color"
              options={colorData?.colors || []} // full color objects with name + hexCode
              selectedOptions={selectedFilters["Color"]}
              onChange={handleFilterChange}
              isColor={true}
            />

            <DropdownFilter
              title="Size"
              options={sizeOptions}
              selectedOptions={selectedFilters["Size"]}
              onChange={handleFilterChange}
            />
            <DropdownFilter
              title="Availability"
              options={availabilityOptions}
              selectedOptions={selectedFilters["Availability"]}
              onChange={handleFilterChange}
            />
            <DropdownFilter title="Price" options={[]}>
              <div className="price-range-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </DropdownFilter>
          </div>

          <div className="product-list">
            {isLoading ? (
              <p>Loading...</p>
            ) : productsData?.products?.length > 0 ? (
              productsData?.products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products found.</p>
            )}

            {/* pagination container */}
            <div className="all-products-pagination">
              <div id="all-products-rows">
                <p>All {productsData?.count} product(s) selected.</p>
              </div>

              <div className="all-products-pages">
                <p>
                  Page {page} of {totalPages}
                </p>
                <div className="forward-back-btns">
                  <MdKeyboardDoubleArrowLeft onClick={() => setPage(1)} />
                  <MdKeyboardArrowLeft
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  />
                  <MdKeyboardArrowRight
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: page === totalPages ? "not-allowed" : "pointer",
                      opacity: page === totalPages ? 0.4 : 1,
                    }}
                  />
                  <MdKeyboardDoubleArrowRight
                    onClick={() => setPage(totalPages)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
