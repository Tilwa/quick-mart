"use client";
import { usePathname } from "next/navigation";

import "./page.css";

import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { useRef, useState } from "react";
import { deleteMultipleOrders } from "@/app/_hooks/order/useDeleteOrder";
import toast from "react-hot-toast";
import Spinner from "@/app/_components/spinner/Spinner";
import { getAllOrders } from "@/app/_hooks/order/useGetAllOrders";
import AllOrdersTable from "@/app/ui/allOrdersTable/AllOrdersTable";

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

  // fetching all orders initially
  const {
    isLoading,
    data: orders,
    error,
  } = useQuery({
    queryKey: ["orders", page, searchTerm, sortBy],
    queryFn: () =>
      getAllOrders({ page, search: searchTerm, sortBy, pageSize: 10 }),
  });

  // toggle when menu button clicked
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setActiveViewMenu((prev) => !prev);
  };

  // counting total pages
  const totalPages = Math.ceil(orders?.count / 10);

  // using queryClient for trigger refetch orders
  const queryClient = useQueryClient();

  // deleting multiple rows
  async function handleDeleteMultipleOrdersdeleteMultipleOrders(e) {
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
      confirmDelete = window.confirm("Do you want to delete selected orders?");
    }

    if (!confirmDelete) return;

    try {
      const success = await deleteMultipleOrders(selectedRows);

      if (success) {
        toast.success(`order(s) deleted successfully!`);
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        setSelectedRows([]);
      } else {
        toast.error(`❌ Failed to delete orders`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(`❌ ${err.message || "Something went wrong"}`);
    }
  }

  // if (isLoading) return <Spinner />;

  return (
    <div className="all-orders-container">
      <div className="all-orders-card">
        <div className="all-orders-top">
          <div className="edit-order-path">
            <p>{formattedPath}</p>
          </div>
          <div className="edit-order-title">All orders</div>
          <div className="all-orders-top-bottom">
            <div>
              {/* search orders bar */}
              <input
                type="text"
                id="all-orders-search"
                placeholder="Search orders here..."
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
                      className="all-orders-status-filter"
                      onClick={handleDeleteMultipleOrdersdeleteMultipleOrders}
                    >
                      Delete{" "}
                      {selectedRows.length > 0 ? selectedRows.length : 10}{" "}
                      row(s)
                    </button>
                  )}
            </div>

            {/* toggle view button */}
            <div className="view-menu-wrapper" ref={menuRef}>
              <button id="all-orders-view" onClick={toggleMenu}>
                View By
              </button>

              {activeViewMenu && (
                <div id="view-by-menus">
                  <ul id="view-by-menu-list">
                    <li onClick={() => setSortBy("name-asc")}>
                      Ascending Order Title{" "}
                      <FaSortAlphaDown
                        className="view-by-icons"
                        id="view-by-icons-asc"
                      />
                    </li>
                    <li onClick={() => setSortBy("name-desc")}>
                      Descending Order Title{" "}
                      <FaSortAlphaDownAlt className="view-by-icons" />
                    </li>
                    <li onClick={() => setSortBy("productTitle-asc")}>
                      Ascending Order Name{" "}
                      <FaSortAlphaDown
                        className="view-by-icons"
                        id="view-by-icons-asc"
                      />
                    </li>
                    <li onClick={() => setSortBy("productTitle-desc")}>
                      Descending Order Name{" "}
                      <FaSortAlphaDownAlt className="view-by-icons" />
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="all-orders-middle">
          <AllOrdersTable
            isLoading={isLoading}
            orders={orders}
            deleteTenRows={deleteTenRows}
            setDeleteTenRows={setDeleteTenRows}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        </div>

        <div className="all-orders-bottom">
          <p id="all-orders-rows">
            {" "}
            {selectedRows.length} of {orders?.count} row(s) selected.
          </p>

          <div className="all-orders-pages">
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
