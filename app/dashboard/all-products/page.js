"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import "./page.css";
import Spinner from "@/app/_components/spinner/Spinner";
import Pagination from "@/app/ui/pagination/Pagination";
import { useFetchProduct } from "@/app/_hooks/product/useFetchProduct";
import { useDeleteProduct } from "@/app/_hooks/product/useDeleteProduct";
import { useEditProduct } from "@/app/_hooks/product/useEditProduct";

import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function AllProducts() {
  // Get the current pathname
  const pathname = usePathname();
  const formattedPath = pathname.slice(1).split("/").join(" > ");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [isFormEditing, setIsFormEditing] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { isLoading, data } = useFetchProduct(page);
  const products = data?.products || [];
  const count = data?.count || 0;

  const { isDeleting, deleteProduct } = useDeleteProduct();
  const { isEditing, editProduct } = useEditProduct();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleEditClick = (row) => {
    setCurrentEdit(row);
    setIsFormEditing(true);
    setValue("product", row.product);
    setValue("meaning", row.meaning);
    setValue("difficulty", row.difficulty);
  };

  const handleCancelEdit = () => {
    setCurrentEdit(null);
    setIsFormEditing(false);
  };

  const onSubmit = (data) => {
    editProduct({
      editProductData: { ...data, id: currentEdit.id },
      id: currentEdit.id,
    });
    handleCancelEdit();
  };

  const filteredProducts = products
    .filter((row) =>
      searchTerm.length >= 2
        ? row.product.toLowerCase().includes(searchTerm.toLowerCase())
        : true
    )
    .sort((a, b) => {
      if (sortOption === "a-z") return a.product.localeCompare(b.product);
      if (sortOption === "z-a") return b.product.localeCompare(a.product);
      return 0;
    });

  if (isLoading) return <Spinner />;

  return (
    <div className="all-products-container">
      <p className="path-link">{formattedPath}</p>
      <h1 className="all-products-title">All Products</h1>

      {/* Search & Sort */}
      <div className="all-products-search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="sort-products"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort products by order</option>
          <option value="a-z">Sort by name (A-Z)</option>
          <option value="z-a">Sort by name (Z-A)</option>
        </select>
      </div>

      {/* Table */}
      <div className="all-products-table-container">
        <div className="all-products-table">
          <div className="all-products-table-header">
            <div className="all-products-table-cell">
              <input type="checkbox" />
            </div>
            <div className="all-products-table-cell">Id</div>
            <div className="all-products-table-cell">Title</div>
            <div className="all-products-table-cell">Description</div>
            <div className="all-products-table-cell">Brand</div>
            <div className="all-products-table-cell">Category</div>
            <div className="all-products-table-cell">Offer Price</div>
            <div className="all-products-table-cell">Original Price</div>
            <div className="all-products-table-cell">In Stock</div>
            <div className="all-products-table-cell">Image 1</div>
            <div className="all-products-table-cell">Image 2</div>
            <div className="all-products-table-cell">Image 3</div>
            <div className="all-products-table-cell">Image 4</div>
            <div className="all-products-table-cell">Image 5</div>
            <div className="all-products-table-cell">Actions</div>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="not-found">Not Found</p>
          ) : (
            filteredProducts.map((row) => (
              <div key={row.id} className="all-products-table-row">
                <div className="all-products-table-cell">
                  <input type="checkbox" />
                </div>
                <div className="all-products-table-cell">{row.id}</div>
                <div className="all-products-table-cell">{row.title}</div>
                <div className="all-products-table-cell">{row.description}</div>
                <div className="all-products-table-cell">{row.brand}</div>
                <div className="all-products-table-cell">{row.category}</div>
                <div className="all-products-table-cell">{row.offerPrice}</div>
                <div className="all-products-table-cell">
                  {row.originalPrice}
                </div>
                <div className="all-products-table-cell">{row.inStock}</div>
                <div className="all-products-table-cell">{row.image1}</div>
                <div className="all-products-table-cell">{row.image2}</div>
                <div className="all-products-table-cell">{row.image3}</div>
                <div className="all-products-table-cell">{row.image4}</div>
                <div className="all-products-table-cell">{row.image5}</div>
                <div className="all-products-table-cell actions">
                  <div className="table-actions">
                    <button
                      className="table-actions-edit"
                      onClick={() => handleEditClick(row)}
                      disabled={isEditing}
                    >
                      <FaEdit style={{ fill: "#e2f1e7" }} />
                      <p className="table-content">Edit</p>
                    </button>
                    <button
                      className="table-actions-del"
                      disabled={isDeleting}
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this product?"
                          )
                        ) {
                          deleteProduct(row.id);
                        }
                      }}
                    >
                      <MdDelete style={{ fill: "#e2f1e7" }} />
                      <p className="table-content">Delete</p>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Pagination */}
          <Pagination count={count} />
        </div>
      </div>

      {/* Edit Popup */}
      {isFormEditing && (
        <div className="popup">
          <div className="popup-content">
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="product">Name</label>
                <input
                  type="text"
                  id="product"
                  {...register("product", { required: "Name is required ⛔" })}
                />
                {errors.product && <span>{errors.product.message}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="meaning">Description</label>
                <input
                  type="text"
                  id="meaning"
                  {...register("meaning", {
                    required: "Description is required ⛔",
                  })}
                />
                {errors.meaning && <span>{errors.meaning.message}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="difficulty">Difficulty</label>
                <input
                  type="text"
                  id="difficulty"
                  {...register("difficulty", {
                    required: "Difficulty is required ⛔",
                  })}
                />
                {errors.difficulty && <span>{errors.difficulty.message}</span>}
              </div>
              <div className="popup-actions">
                <button
                  type="button"
                  className="cancel-edit-button"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
                <button type="submit" className="save-edit-button">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllProducts;
