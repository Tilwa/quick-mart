import SpinnerMini from "@/app/_components/spinnerMini/SpinnerMini";
import Image from "next/image";

import { HiDotsHorizontal } from "react-icons/hi";

import "./TableRow.css"; // Assuming you have a CSS file for styling
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteOrder } from "@/app/_hooks/order/useDeleteOrder";

function TableRow({
  order,
  activeOrderId,
  setActiveOrderId,
  isSelected,
  onSelect,
}) {
  const {
    id: orderId,
    name,
    mobile,
    quantity,
    emirate,
    address,
    price,
    productId,
    productTitle,
    variantColor,
    variantSize,
    variantImage,
    status,
  } = order;

  // Convert Google Drive view links to direct image links

  const toggleMenu = () => {
    if (activeOrderId === orderId) {
      setActiveOrderId(null);
    } else {
      setActiveOrderId(orderId);
    }
  };

  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
      toast.success("Order deleted successfully!");
    },
    onError: (error) => {
      toast.error(`❌ Failed: ${error.message}`);
    },
  });

  function handleDeleteOrder(orderId) {
    let confirmDelete;
    if (typeof window !== "undefined") {
      confirmDelete = window.confirm("Do you want to delete selected order?");
    }
    if (confirmDelete) {
      mutate(orderId, {
        onSuccess: () => {
          // ✅ Trigger refetch of orders
          queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
        onError: (err) => {
          console.error("Deletion failed:", err);
          alert("Failed to delete order.");
        },
      });
    }
  }

  return (
    <tr className="all-orders-table-row">
      <td className="all-orders-table-data">
        <input type="checkbox" checked={isSelected} onChange={onSelect} />
      </td>
      <td className="all-orders-table-data">{orderId}</td>
      <td className="all-orders-table-data">{name}</td>
      <td className="all-orders-table-data">{productTitle}</td>
      <td className="all-orders-table-data">{mobile}</td>
      <td className="all-orders-table-data">{quantity}</td>
      <td className="all-orders-table-data">{emirate}</td>
      <td className="all-orders-table-data">{address}</td>
      <td className="all-orders-table-data">{price}</td>
      <td className="all-orders-table-data">{productId}</td>
      <td className="all-orders-table-data">{variantColor}</td>
      <td className="all-orders-table-data">{variantSize}</td>
      <td className="all-orders-table-data">
        {variantImage && (
          <Image src={variantImage} alt="image1" width={21} height={21} />
        )}
      </td>
      <td className="all-orders-table-data">
        <button
          id="order-status"
          style={{
            backgroundColor:
              status === "pending"
                ? "orange"
                : status === "confirmed"
                ? "dodgerblue"
                : status === "processing"
                ? "gold"
                : status === "shipped"
                ? "deepskyblue"
                : status === "delivered"
                ? "mediumseagreen"
                : status === "completed"
                ? "green"
                : status === "cancelled"
                ? "crimson"
                : status === "returned"
                ? "purple"
                : status === "failed"
                ? "gray"
                : "lightgray", // default
          }}
        >
          {status}
        </button>
      </td>
      <td className="all-orders-table-data edit-delete-actions">
        <HiDotsHorizontal onClick={toggleMenu} id="edit-del-icon" />
        {activeOrderId === orderId && (
          <div id="order-menus">
            <ul id="order-menu-list">
              <Link
                href={`/dashboard/orders/edit-order/${orderId}`}
                id="edit-order-link"
              >
                <li>Edit</li>
              </Link>

              <li
                onClick={() => handleDeleteOrder(orderId)}
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
