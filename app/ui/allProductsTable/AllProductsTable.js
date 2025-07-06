"use client";

import { useQuery } from "@tanstack/react-query";
import "./AllProductsTable.css";
import { getAllProducts } from "@/app/_hooks/product/useGetAllProducts";
import SpinnerMini from "@/app/_components/spinnerMini/SpinnerMini";
import TableRow from "./TableRow";
import { useState } from "react";
import Spinner from "@/app/_components/spinner/Spinner";

function AllProductsTable({
  isPending,
  products,
  deleteTenRows,
  setDeleteTenRows,
  selectedRows,
  setSelectedRows,
}) {
  const [activeProductId, setActiveProductId] = useState(null);

  // console.log(products);
  const toggleSelectAll = () => {
    if (selectedRows.length === products.products.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(products.products.map((p) => p.id));
    }
  };

  // if (isPending) return <Spinner />;
  return (
    <div className="all-products-table">
      <table className="all-products-table-main">
        <thead>
          <tr className="all-products-table-row">
            <th className="all-products-table-heading">
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={selectedRows.length === products?.products?.length}
              />
            </th>
            <th className="all-products-table-heading">Id</th>
            <th className="all-products-table-heading">Title</th>
            <th className="all-products-table-heading">Description</th>
            <th className="all-products-table-heading">Brand</th>
            <th className="all-products-table-heading">Category</th>
            <th className="all-products-table-heading">OfferPrice</th>
            <th className="all-products-table-heading">Price</th>
            <th className="all-products-table-heading">InStock</th>
            <th className="all-products-table-heading">Image1</th>
            <th className="all-products-table-heading">Image2</th>
            <th className="all-products-table-heading">Image3</th>
            <th className="all-products-table-heading">Image4</th>
            <th className="all-products-table-heading">Image5</th>
            <th className="all-products-table-heading">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <tr>
              <td colSpan="15">
                <SpinnerMini height={11.4} />
              </td>
            </tr>
          ) : products?.products?.length === 0 ? (
            <tr id="no-result-found-row">
              <td id="no-result-found-txt" colSpan="15">
                No results found.
              </td>
            </tr>
          ) : (
            products.products.map((product) => (
              <TableRow
                key={product.id}
                product={product}
                activeProductId={activeProductId}
                setActiveProductId={setActiveProductId}
                isSelected={selectedRows.includes(product.id)}
                onSelect={() => {
                  if (selectedRows.includes(product.id)) {
                    setSelectedRows(
                      selectedRows.filter((id) => id !== product.id)
                    );
                  } else {
                    setSelectedRows([...selectedRows, product.id]);
                  }
                }}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AllProductsTable;
