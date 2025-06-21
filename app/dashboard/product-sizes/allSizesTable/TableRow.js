import SpinnerMini from "@/app/_components/spinnerMini/SpinnerMini";
import Image from "next/image";

import { HiDotsHorizontal } from "react-icons/hi";

import "./TableRow.css"; // Assuming you have a CSS file for styling
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { deleteColorWithId } from "@/app/_hooks/color/useDeleteColor";

function TableRow({
  color,
  activeColorId,
  setActiveColorId,
  isSelected,
  onSelect,
}) {
  const { id: colorId, name, hexCode } = color;

  // Convert Google Drive view links to direct image links

  const toggleMenu = () => {
    if (activeColorId === colorId) {
      setActiveColorId(null);
    } else {
      setActiveColorId(colorId);
    }
  };

  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteColorWithId,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["colors"],
      });
      toast.success("Color deleted successfully!");
    },
    onError: (error) => {
      toast.error(`❌ Failed: ${error.message}`);
    },
  });

  function handleDeleteColor(colorId) {
    let confirmDelete;
    if (typeof window !== "undefined") {
      confirmDelete = window.confirm("Do you want to delete selected color?");
    }
    if (confirmDelete) {
      mutate(colorId, {
        onSuccess: () => {
          // ✅ Trigger refetch of colors
          queryClient.invalidateQueries({ queryKey: ["colors"] });
        },
        onError: (err) => {
          console.error("Deletion failed:", err);
          alert("Failed to delete color.");
        },
      });
    }
  }

  return (
    <tr className="all-colors-table-row">
      <td className="all-colors-table-data">
        <input type="checkbox" checked={isSelected} onChange={onSelect} />
      </td>
      <td className="all-colors-table-data">{colorId}</td>
      <td className="all-colors-table-data">{name}</td>
      <td className="all-colors-table-data">
        <span style={{ backgroundColor: hexCode }} id="color-hex-container">
          {hexCode}
        </span>
      </td>
      <td className="all-colors-table-data">{hexCode}</td>

      <td className="all-colors-table-data edit-delete-actions">
        <HiDotsHorizontal onClick={toggleMenu} id="edit-del-icon" />
        {activeColorId === colorId && (
          <div id="color-menus">
            <ul id="color-menu-list">
              <Link
                href={`/dashboard/edit-color/${colorId}`}
                id="edit-color-link"
              >
                <li>Edit</li>
              </Link>

              <li
                onClick={() => handleDeleteColor(colorId)}
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
