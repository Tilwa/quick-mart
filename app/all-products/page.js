"use client";

import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import Header from "@/app/_components/header/Header";
import Slider from "@/app/_components/slider/Slider";
import "./page.css";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../_hooks/product/useGetAllProducts";
import Link from "next/link";
import Image from "next/image";
import myImg from "@/public/img1.png";
import DropdownFilter from "../ui/dropdownFilter/DropdownFilter";

function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState({
    "Fabric Name": [],
    Color: [],
    Size: [],
    Price: [],
    Availability: [],
  });

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isClient, setIsClient] = useState(false);

  // fetching all products initially
  const {
    isPending: isProductsLoading,
    data: products,
    error: productsError,
  } = useQuery({
    queryKey: ["products", page, searchTerm, sortBy],
    queryFn: () =>
      getAllProducts({ page, search: searchTerm, sortBy, pageSize: 50 }),
  });

  // fetching all colors initially
  const {
    isPending: isColorsLoading,
    data: colors,
    error: colorsError,
  } = useQuery({
    queryKey: ["colors", page, searchTerm, sortBy],
    queryFn: () =>
      getAllColors({ page, search: searchTerm, sortBy, pageSize: 50 }),
  });

  // fetching all sizes initially
  const {
    isPending: isSizesLoading,
    data: sizes,
    error: sizesError,
  } = useQuery({
    queryKey: ["sizes", page, searchTerm, sortBy],
    queryFn: () =>
      getAllSizes({ page, search: searchTerm, sortBy, pageSize: 50 }),
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleFilterChange = (category, option) => {
    setSelectedFilters((prev) => {
      const isSelected = prev[category].includes(option);
      return {
        ...prev,
        [category]: isSelected
          ? prev[category].filter((item) => item !== option)
          : [...prev[category], option],
      };
    });
  };

  const applyPriceFilter = () => {
    const filteredProducts = products.filter((product) => {
      const price = product.price;
      return (
        (!minPrice || price >= parseFloat(minPrice)) &&
        (!maxPrice || price <= parseFloat(maxPrice))
      );
    });
    setFilteredProducts(filteredProducts);
  };

  useEffect(() => {
    if (!products) return;
    const filtered = products.filter((product) => {
      const price = product.price;
      return (
        (!minPrice || price >= parseFloat(minPrice)) &&
        (!maxPrice || price <= parseFloat(maxPrice))
      );
    });
    setFilteredProducts(filtered);
  }, [minPrice, maxPrice, products]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <div>
      {/* header starts here */}
      {/* <Header /> */}
      {/* header ends here */}

      <div className="all-prod-home">
        <Slider />
        <div className="all-prod-title-filters">
          <h2 className="all-prod-title">All Products</h2>
          {/* DROPDOWN FILTER */}

          <div className="title-sort-container">
            <p>Sort By:</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-selector"
            >
              <option value="All">Select</option>
              <option value="lowToHigh">Price Low to High ⬆️</option>
              <option value="highToLow">Price High to Low ⬇️</option>
              <option value="asc" id="opt-ascending">
                Ascending Products 🔤
              </option>
              <option value="desc">Descending Products 🔡</option>
            </select>
          </div>
        </div>

        <div className="all-prod-grid-container">
          <div className="all-prod-menus">
            <div className="filter-titles">
              <p>Filter </p>
              <p>Remove All</p>

              {Object.entries(selectedFilters).some(
                ([_, values]) => values.length > 0
              ) && (
                <div className="active-filters">
                  {Object.entries(selectedFilters).map(([category, values]) =>
                    values.map((value) => (
                      <span
                        key={`${category}-${value}`}
                        className="active-filter"
                      >
                        {value}
                        <button
                          className="remove-btn"
                          onClick={() => handleFilterChange(category, value)}
                        >
                          ❌
                        </button>
                      </span>
                    ))
                  )}
                  <button
                    className="remove-all-btn"
                    onClick={() =>
                      setSelectedFilters({
                        "Fabric Name": [],
                        Color: [],
                        Size: [],
                        Price: [],
                        Availability: [],
                      })
                    }
                  >
                    Remove All
                  </button>
                </div>
              )}
            </div>

            <DropdownFilter
              title="Fabric Name"
              options={fabricOptions}
              selectedOptions={selectedFilters["Fabric Name"]}
              onChange={handleFilterChange}
            />
            <DropdownFilter
              title="Color"
              options={colorOptions}
              selectedOptions={selectedFilters["Color"]}
              onChange={handleFilterChange}
            />
            <DropdownFilter
              title="Size"
              options={sizeOptions}
              selectedOptions={selectedFilters["Size"]}
              onChange={handleFilterChange}
            />
            <DropdownFilter
              title="Price"
              options={priceOptions}
              selectedOptions={selectedFilters["Price"]}
              onChange={handleFilterChange}
            >
              <input
                type="number"
                placeholder="From"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="To"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </DropdownFilter>
            <DropdownFilter
              title="Availability"
              options={availabilityOptions}
              selectedOptions={selectedFilters["Availability"]}
              onChange={handleFilterChange}
            />
          </div>

          <div className="all-prod-products">
            <div className="grid-item">
              <div className="product-card">
                <div className="discount-badge">25% OFF</div>
                <Image
                  src={myImg}
                  alt="Storage Tin Set"
                  className="product-img"
                  height={200}
                  width={200}
                />

                <div className="brand-logo">TINIFY</div>

                <div className="product-info">
                  <span className="delivery-badge">Free Shipping</span>
                  <p className="category">Storage Tins</p>
                  <h3 className="title">Classic Tin Container Set</h3>
                  <p className="price">49 AED</p>
                  <p className="vat">51 AED - VAT Included</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
