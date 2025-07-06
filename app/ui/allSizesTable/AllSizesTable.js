"use client";

import { useQuery } from "@tanstack/react-query";
import "./AllSizesTable.css";

import SpinnerMini from "@/app/_components/spinnerMini/SpinnerMini";
import TableRow from "./TableRow";
import { useState } from "react";

function AllSizesTable({
  isPending,
  sizes,
  deleteTenRows,
  setDeleteTenRows,
  selectedRows,
  setSelectedRows,
}) {
  const [activeSizeId, setActiveSizeId] = useState(null);

  // console.log(sizes);
  const toggleSelectAll = () => {
    if (selectedRows.length === sizes.sizes.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(sizes.sizes.map((c) => c.id));
    }
  };
  return (
    <div className="all-sizes-table">
      <table className="all-sizes-table-main">
        <thead>
          <tr className="all-sizes-table-row">
            <th className="all-sizes-table-heading">
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={selectedRows.length === sizes?.sizes?.length}
              />
            </th>
            <th className="all-sizes-table-heading">Id</th>
            <th className="all-sizes-table-heading">Size Name</th>

            <th className="all-sizes-table-heading">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isPending ? (
            <tr>
              <td colSpan="15">
                <SpinnerMini height={11.4} />
              </td>
            </tr>
          ) : sizes?.sizes?.length === 0 ? (
            <tr id="no-result-found-row">
              <td id="no-result-found-txt" colSpan="15">
                No results found.
              </td>
            </tr>
          ) : (
            sizes.sizes.map((size) => (
              <TableRow
                key={size.id}
                size={size}
                activeSizeId={activeSizeId}
                setActiveSizeId={setActiveSizeId}
                isSelected={selectedRows.includes(size.id)}
                onSelect={() => {
                  if (selectedRows.includes(size.id)) {
                    setSelectedRows(
                      selectedRows.filter((id) => id !== size.id)
                    );
                  } else {
                    setSelectedRows([...selectedRows, size.id]);
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

export default AllSizesTable;
