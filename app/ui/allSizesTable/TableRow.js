import SpinnerMini from "@/app/_components/spinnerMini/SpinnerMini";
import Image from "next/image";

import { HiDotsHorizontal } from "react-icons/hi";

import "./TableRow.css"; // Assuming you have a CSS file for styling
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { deleteColorWithId } from "@/app/_hooks/color/useDeleteColor";
import { deleteSizeWithId } from "@/app/_hooks/size/useDeleteSize";

function TableRow({
  size,
  activeSizeId,
  setActiveSizeId,
  isSelected,
  onSelect,
}) {
  const { id: sizeId, label } = size;

  // Convert Google Drive view links to direct image links

  const toggleMenu = () => {
    if (activeSizeId === sizeId) {
      setActiveSizeId(null);
    } else {
      setActiveSizeId(sizeId);
    }
  };

  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteSizeWithId,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["sizes"],
      });
      toast.success("Size deleted successfully!");
    },
    onError: (error) => {
      toast.error(`❌ Failed: ${error.message}`);
    },
  });

  function handleDeleteSize(sizeId) {
    let confirmDelete;
    if (typeof window !== "undefined") {
      confirmDelete = window.confirm("Do you want to delete selected size?");
    }
    if (confirmDelete) {
      mutate(sizeId, {
        onSuccess: () => {
          // ✅ Trigger refetch of sizes
          queryClient.invalidateQueries({ queryKey: ["sizes"] });
        },
        onError: (err) => {
          console.error("Deletion failed:", err);
          alert("Failed to delete size.");
        },
      });
    }
  }

  return (
    <tr className="all-sizes-table-row">
      <td className="all-sizes-table-data">
        <input type="checkbox" checked={isSelected} onChange={onSelect} />
      </td>
      <td className="all-sizes-table-data">{sizeId}</td>
      <td className="all-sizes-table-data">{label}</td>

      <td className="all-sizes-table-data edit-delete-actions">
        <HiDotsHorizontal onClick={toggleMenu} id="edit-del-icon" />
        {activeSizeId === sizeId && (
          <div id="size-menus">
            <ul id="size-menu-list">
              <Link
                href={`/dashboard/product-sizes/edit-size/${sizeId}`}
                id="edit-size-link"
              >
                <li>Edit</li>
              </Link>

              <li
                onClick={() => handleDeleteSize(sizeId)}
                disabled={isDeleting}
              >
                Delete
              </li>
            </ul>
          </div>
        )}
      </td>
    </tr>
  );
}

export default TableRow;
