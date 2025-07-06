"use client";

import { useQuery } from "@tanstack/react-query";
import "./AllOrdersTable.css";
import { getAllOrders } from "@/app/_hooks/order/useGetAllOrders";
import SpinnerMini from "@/app/_components/spinnerMini/SpinnerMini";
import TableRow from "./TableRow";
import { useState } from "react";

function AllOrdersTable({
  isPending,
  orders,
  deleteTenRows,
  setDeleteTenRows,
  selectedRows,
  setSelectedRows,
}) {
  const [activeOrderId, setActiveOrderId] = useState(null);

  // console.log(orders);
  const toggleSelectAll = () => {
    if (selectedRows.length === orders.orders.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(orders.orders.map((p) => p.id));
    }
  };
  return (
    <div className="all-orders-table">
      <table className="all-orders-table-main">
        <thead>
          <tr className="all-orders-table-row">
            <th className="all-orders-table-heading">
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={selectedRows.length === orders?.orders?.length}
              />
            </th>
            <th className="all-orders-table-heading">Id</th>
            <th className="all-orders-table-heading">Name</th>
            <th className="all-orders-table-heading">Product Title</th>
            <th className="all-orders-table-heading">Mobile</th>
            <th className="all-orders-table-heading">Quantity</th>
            <th className="all-orders-table-heading">State</th>
            <th className="all-orders-table-heading">Address</th>
            <th className="all-orders-table-heading">Price</th>
            <th className="all-orders-table-heading">ProductId</th>
            <th className="all-orders-table-heading">Color</th>
            <th className="all-orders-table-heading">Size</th>
            <th className="all-orders-table-heading">Image</th>
            <th className="all-orders-table-heading">Status</th>
            <th className="all-orders-table-heading">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <tr>
              <td colSpan="15">
                <SpinnerMini height={11.4} />
              </td>
            </tr>
          ) : orders?.orders?.length === 0 ? (
            <tr id="no-result-found-row">
              <td id="no-result-found-txt" colSpan="15">
                No results found.
              </td>
            </tr>
          ) : (
            orders.orders.map((order) => (
              <TableRow
                key={order.id}
                order={order}
                activeOrderId={activeOrderId}
                setActiveOrderId={setActiveOrderId}
                isSelected={selectedRows.includes(order.id)}
                onSelect={() => {
                  if (selectedRows.includes(order.id)) {
                    setSelectedRows(
                      selectedRows.filter((id) => id !== order.id)
                    );
                  } else {
                    setSelectedRows([...selectedRows, order.id]);
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

export default AllOrdersTable;
