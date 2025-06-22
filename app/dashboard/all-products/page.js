"use client";
import { usePathname } from "next/navigation";

import AllProductsTable from "@/app/ui/allProductsTable/AllProductsTable";
import "./page.css";

import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProducts } from "@/app/_hooks/product/useGetAllProducts";
import { useRef, useState } from "react";
import { deleteMultipleRows } from "@/app/_hooks/product/useDeleteProduct";
import toast from "react-hot-toast";
import Spinner from "@/app/_components/spinner/Spinner";

function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [deleteTenRows, setDeleteTenRows] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeViewMenu, setActiveViewMenu] = useState(false);

  // Get the current pathname
  const pathname = usePathname();
  const formattedPath = pathname.slice(1).split("/").join(" > ");

  // fetching all products initially
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products", page, searchTerm, sortBy],
    queryFn: () =>
      getAllProducts({ page, search: searchTerm, sortBy, pageSize: 10 }),
  });

  // toggle when menu button clicked
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setActiveViewMenu((prev) => !prev);
  };

  // counting total pages
  const totalPages = Math.ceil(products?.count / 10);

  // using queryClient for trigger refetch products
  const queryClient = useQueryClient();

  // deleting multiple rows
  async function handleDeleteMultipleRows(e) {
    e.preventDefault();

    if (selectedRows.length === 0) {
      // ✅ safe alert in browser
      if (typeof window !== "undefined") {
        window.alert("Please select at least one row to delete.");
      }
      return;
    }

    // ✅ browser-safe confirm
    let confirmDelete = true;
    if (typeof window !== "undefined") {
      confirmDelete = window.confirm(
        "Do you want to delete selected products?"
      );
    }

    if (!confirmDelete) return;

    try {
      const success = await deleteMultipleRows(selectedRows);

      if (success) {
        toast.success(`Product(s) deleted successfully!`);
        queryClient.invalidateQueries({ queryKey: ["products"] });
        setSelectedRows([]);
      } else {
        toast.error(`❌ Failed to delete products`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(`❌ ${err.message || "Something went wrong"}`);
    }
  }

  // if (isLoading) return <Spinner />;

  return (
    <div className="all-products-container">
      <div className="all-products-card">
        <div className="all-products-top">
          <div className="edit-product-path">
            <p>{formattedPath}</p>
          </div>
          <div className="edit-product-title">All Products</div>
          <div className="all-products-top-bottom">
            <div>
              {/* search products bar */}
              <input
                type="text"
                id="all-products-search"
                placeholder="Search products here..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  setPage(1); // ✅ always reset page on new search

                  // Optional: Debounce or delay firing query unless search is meaningful
                  if (value.length < 3 && value.length !== 0) return;
                }}
                onFocus={(e) => e.target.select()}
              />

              {!selectedRows.length > 0
                ? ""
                : selectedRows.length > 0 && (
                    <button
                      className="all-products-status-filter"
                      onClick={handleDeleteMultipleRows}
                    >
                      Delete{" "}
                      {selectedRows.length > 0 ? selectedRows.length : 10}{" "}
                      row(s)
                    </button>
                  )}
            </div>

            {/* toggle view button */}
            <div className="view-menu-wrapper" ref={menuRef}>
              <button id="all-products-view" onClick={toggleMenu}>
                View By
              </button>

              {activeViewMenu && (
                <div id="view-by-menus">
                  <ul id="view-by-menu-list">
                    <li onClick={() => setSortBy("price-asc")}>
                      Price Low to High ⬆️
                    </li>
                    <li onClick={() => setSortBy("price-desc")}>
                      Price High to Low ⬇️
                    </li>
                    <li onClick={() => setSortBy("title-asc")}>
                      Ascending Order{" "}
                      <FaSortAlphaDown
                        className="view-by-icons"
                        id="view-by-icons-asc"
                      />
                    </li>
                    <li onClick={() => setSortBy("title-desc")}>
                      Descending Order{" "}
                      <FaSortAlphaDownAlt className="view-by-icons" />
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="all-products-middle">
          <AllProductsTable
            isLoading={isLoading}
            products={products}
            deleteTenRows={deleteTenRows}
            setDeleteTenRows={setDeleteTenRows}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        </div>

        <div className="all-products-bottom">
          <p id="all-products-rows">
            {" "}
            {selectedRows.length} of {products?.count} row(s) selected.
          </p>

          <div className="all-products-pages">
            <p>Rows per page 10</p>
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
              <MdKeyboardDoubleArrowRight onClick={() => setPage(totalPages)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
