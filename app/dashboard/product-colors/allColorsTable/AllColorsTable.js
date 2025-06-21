"use client";

import { useQuery } from "@tanstack/react-query";
import "./AllColorsTable.css";

import SpinnerMini from "@/app/_components/spinnerMini/SpinnerMini";
import TableRow from "./TableRow";
import { useState } from "react";

function AllColorsTable({
  isLoading,
  colors,
  deleteTenRows,
  setDeleteTenRows,
  selectedRows,
  setSelectedRows,
}) {
  const [activeColorId, setActiveColorId] = useState(null);

  // console.log(colors);
  const toggleSelectAll = () => {
    if (selectedRows.length === colors.colors.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(colors.colors.map((c) => c.id));
    }
  };
  return (
    <div className="all-colors-table">
      <table className="all-colors-table-main">
        <thead>
          <tr className="all-colors-table-row">
            <th className="all-colors-table-heading">
              <input
                type="checkbox"
                onChange={toggleSelectAll}
                checked={selectedRows.length === colors?.colors?.length}
              />
            </th>
            <th className="all-colors-table-heading">Id</th>
            <th className="all-colors-table-heading">Color Name</th>
            <th className="all-colors-table-heading">Color </th>
            <th className="all-colors-table-heading">Color Code</th>

            <th className="all-colors-table-heading">Actions</th>
          </tr>
        </thead>
        <tbody>
          {colors?.colors?.length === 0 ? (
            <tr id="no-result-found-row">
              <td id="no-result-found-txt" colSpan="15">
                No results found.
              </td>
            </tr>
          ) : (
            colors?.colors?.map((color) => (
              <TableRow
                activeColorId={activeColorId}
                setActiveColorId={setActiveColorId}
                key={color.id}
                color={color}
                isSelected={selectedRows.includes(color.id)}
                onSelect={() => {
                  if (selectedRows.includes(color.id)) {
                    setSelectedRows(
                      selectedRows.filter((id) => id !== color.id)
                    );
                  } else {
                    setSelectedRows([...selectedRows, color.id]);
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

export default AllColorsTable;
