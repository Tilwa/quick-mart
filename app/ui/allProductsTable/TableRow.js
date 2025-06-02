import SpinnerMini from "@/app/_components/spinnerMini/SpinnerMini";
import Image from "next/image";

import { HiDotsHorizontal } from "react-icons/hi";

import "./TableRow.css"; // Assuming you have a CSS file for styling
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/app/_hooks/product/useDeleteProduct";
import toast from "react-hot-toast";

function TableRow({
  product,
  activeProductId,
  setActiveProductId,
  isSelected,
  onSelect,
}) {
  const {
    id: productId,
    title,
    description,
    brand,
    category,
    offerPrice,
    originalPrice,
    inStock,
    image1,
    image2,
    image3,
    image4,
    image5,
  } = product;

  // Convert Google Drive view links to direct image links
  const img1 = getDriveDirectLink(image1);
  const img2 = getDriveDirectLink(image2);
  const img3 = getDriveDirectLink(image3);
  const img4 = getDriveDirectLink(image4);
  const img5 = getDriveDirectLink(image5);
  const toggleMenu = () => {
    if (activeProductId === productId) {
      setActiveProductId(null);
    } else {
      setActiveProductId(productId);
    }
  };

  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });
      toast.success("Product deleted successfully!");
    },
    onError: (error) => {
      toast.error(`❌ Failed: ${error.message}`);
    },
  });

  function getDriveDirectLink(url) {
    const match = url.match(/\/d\/(.*?)\//);
    if (!match || !match[1]) return url; // fallback to original if not matching
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }

  function handleDeleteProduct(productId) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      mutate(productId, {
        onSuccess: () => {
          // ✅ Trigger refetch of products
          queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (err) => {
          console.error("Deletion failed:", err);
          alert("Failed to delete product.");
        },
      });
    }
  }

  return (
    <tr className="all-products-table-row">
      <td className="all-products-table-data">
        <input type="checkbox" checked={isSelected} onChange={onSelect} />
      </td>
      <td className="all-products-table-data">{productId}</td>
      <td className="all-products-table-data">{title}</td>
      <td className="all-products-table-data">{description}</td>
      <td className="all-products-table-data">{brand}</td>
      <td className="all-products-table-data">{category}</td>
      <td className="all-products-table-data">{offerPrice}</td>
      <td className="all-products-table-data">{originalPrice}</td>
      <td className="all-products-table-data">{inStock}</td>
      <td className="all-products-table-data">
        <Image src={img1} alt="image1" width={21} height={21} />
      </td>
      <td className="all-products-table-data">
        <Image src={img2} alt="image1" width={21} height={21} />
      </td>
      <td className="all-products-table-data">
        <Image src={img3} alt="image1" width={21} height={21} />
      </td>
      <td className="all-products-table-data">
        <Image src={img4} alt="image1" width={21} height={21} />
      </td>
      <td className="all-products-table-data">
        <Image src={img5} alt="image1" width={21} height={21} />
      </td>
      <td className="all-products-table-data edit-delete-actions">
        <HiDotsHorizontal onClick={toggleMenu} id="edit-del-icon" />
        {activeProductId === productId && (
          <div id="product-menus">
            <ul id="product-menu-list">
              <Link
                href={`/dashboard/edit-product/${productId}`}
                id="edit-product-link"
              >
                <li>Edit</li>
              </Link>

              <li
                onClick={() => handleDeleteProduct(productId)}
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
