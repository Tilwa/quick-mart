"use client";
import { usePathname } from "next/navigation";

import AllProductsTable from "@/app/ui/allProductsTable/AllProductsTable";
import "./page.css";

function Page() {
  // Get the current pathname
  const pathname = usePathname();
  const formattedPath = pathname.slice(1).split("/").join(" > ");
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
              <input
                type="text"
                id="all-products-search"
                placeholder="Search products here..."
              />
              <button className="all-products-status-filter">Status</button>
              <button className="all-products-status-filter">Filter</button>
            </div>

            <button id="all-products-view">View</button>
          </div>
        </div>
        <div className="all-products-middle">
          <AllProductsTable />
        </div>

        <div className="all-products-bottom">
          <p id="all-products-rows">0 of 100 row(s) selected.</p>

          <div className="all-products-pages">
            <p>Rows per page 10</p>
            <p>Page 1 of 10</p>
            <div>p p p p </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
