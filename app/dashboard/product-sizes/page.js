"use client";
import { usePathname, useRouter } from "next/navigation";

import "./page.css";

import { RiAddLargeFill } from "react-icons/ri";
import { FaSortAlphaDown } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "@/app/_components/spinner/Spinner";
import { useForm } from "react-hook-form";
import SpinnerMiniButton from "@/app/_components/spinnerMiniButton/SpinnerMiniButton";
import { getAllSizes } from "@/app/_hooks/size/useGetAllSizes";
import { deleteMultipleSizes } from "@/app/_hooks/size/useDeleteSize";
import { addSize } from "@/app/_hooks/size/useAddSize";
import AllSizesTable from "@/app/ui/allSizesTable/AllSizesTable";

function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [deleteTenRows, setDeleteTenRows] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeViewMenu, setActiveViewMenu] = useState(false);

  const [showSizeModal, setShowSizeModal] = useState(false);

  const router = useRouter();

  // Get the current pathname
  const pathname = usePathname();
  const formattedPath = pathname.slice(1).split("/").join(" > ");

  // fetching all sizes initially

  const {
    isPending: fetchingSizes,
    data: sizes,
    error,
  } = useQuery({
    queryKey: ["sizes", page, searchTerm, sortBy],
    queryFn: () =>
      getAllSizes({ page, search: searchTerm, sortBy, pageSize: 10 }),
  });
  //console.log(colors.sizes);

  // toggle when menu button clicked
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setActiveViewMenu((prev) => !prev);
  };

  // counting total pages
  const totalPages = Math.ceil(sizes?.count / 10);

  // using queryClient for trigger refetch sizes
  const queryClient = useQueryClient();

  // deleting multiple rows
  async function handleDeleteMultipleRows(e) {
    e.preventDefault();

    if (selectedRows.length === 0) {
      // ✅ safe alert in browser
      if (typeof window !== "undefined") {
        window.alert("Please select at least one row to delete.");
      }
      return;
    }

    // ✅ browser-safe confirm
    let confirmDelete = true;
    if (typeof window !== "undefined") {
      confirmDelete = window.confirm("Do you want to delete selected sizes?");
    }

    if (!confirmDelete) return;

    try {
      const success = await deleteMultipleSizes(selectedRows);

      if (success) {
        toast.success(`Size(s) deleted successfully!`);
        queryClient.invalidateQueries({ queryKey: ["sizes"] });
        setSelectedRows([]);
      } else {
        toast.error(`❌ Failed to delete sizes`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(`❌ ${err.message || "Something went wrong"}`);
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: addSize,
    onSuccess: () => {
      toast.success("Size added successfully!");

      queryClient.invalidateQueries(["sizes"]);
      setShowSizeModal(false);
      reset();
      router.push("/dashboard/product-sizes");
    },
    onError: (err) => {
      toast.error(`❌ Failed: ${error.message}`);
      console.error(err);
    },
  });

  const onSubmit = (data) => mutate(data);

  // if (isLoading) return <Spinner />;

  return (
    <div className="all-sizes-container">
      <div className="all-sizes-card">
        <div className="all-sizes-top">
          <div className="edit-product-path">
            <p>{formattedPath}</p>
          </div>
          <div className="edit-product-title">All Sizes</div>
          <div className="all-sizes-top-bottom">
            <div>
              {/* search sizes bar */}
              <input
                type="text"
                id="all-sizes-search"
                placeholder="Search sizes here..."
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  setPage(1); // ✅ always reset page on new search

                  // Optional: Debounce or delay firing query unless search is meaningful
                  if (value.length < 3 && value.length !== 0) return;
                }}
                onFocus={(e) => e.target.select()}
              />

              {!selectedRows.length > 0
                ? ""
                : selectedRows.length > 0 && (
                    <button
                      className="all-sizes-status-filter"
                      onClick={handleDeleteMultipleRows}
                    >
                      Delete{" "}
                      {selectedRows.length > 0 ? selectedRows.length : 10}{" "}
                      row(s)
                    </button>
                  )}
            </div>

            {/* toggle view button */}
            <div className="view-menu-wrapper" ref={menuRef}>
              <div className="view-by-btns">
                {" "}
                <button id="all-sizes-view" onClick={toggleMenu}>
                  View By
                </button>
                <button
                  id="add-size-btn"
                  onClick={() => setShowSizeModal(true)}
                >
                  <p>Add Size</p> <RiAddLargeFill />
                </button>
              </div>
              {activeViewMenu && (
                <div id="view-by-menus">
                  <ul id="view-by-menu-list">
                    <li onClick={() => setSortBy("label-asc")}>
                      Ascending Order{" "}
                      <FaSortAlphaDown
                        className="view-by-icons"
                        id="view-by-icons-asc"
                      />
                    </li>
                    <li onClick={() => setSortBy("label-desc")}>
                      Descending Order{" "}
                      <FaSortAlphaDownAlt className="view-by-icons" />
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="all-sizes-middle">
          <AllSizesTable
            isPending={fetchingSizes}
            sizes={sizes}
            deleteTenRows={deleteTenRows}
            setDeleteTenRows={setDeleteTenRows}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        </div>

        <div className="all-sizes-bottom">
          <p id="all-sizes-rows">
            {" "}
            {selectedRows.length} of {sizes?.count} row(s) selected.
          </p>

          <div className="all-sizes-pages">
            <p>Rows per page 10</p>
            <p>
              Page {page} of {totalPages}
            </p>
            <div className="forward-back-btns">
              <MdKeyboardDoubleArrowLeft onClick={() => setPage(1)} />
              <MdKeyboardArrowLeft
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              />
              <MdKeyboardArrowRight
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{
                  background: "none",
                  border: "none",
                  cursor: page === totalPages ? "not-allowed" : "pointer",
                  opacity: page === totalPages ? 0.4 : 1,
                }}
              />
              <MdKeyboardDoubleArrowRight onClick={() => setPage(totalPages)} />
            </div>
          </div>
        </div>
      </div>

      {/* show Color Modal */}
      {showSizeModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button
              className="modal-close"
              onClick={() => setShowSizeModal(false)}
            >
              ✕
            </button>
            <h2 id="add-size-modal-title">Add New Size</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <InputField
                  label="Size Name *"
                  id="label"
                  type="text"
                  register={register}
                  error={errors.label}
                  requiredMessage="Size name is required ⛔"
                />
              </div>

              <div className="btns-update-product">
                <button type="reset" className="cancel-size-button">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="add-size-button"
                  disabled={isPending}
                >
                  {isPending ? (
                    <span className="creating-size">
                      Adding... <SpinnerMiniButton />
                    </span>
                  ) : (
                    "Add Size"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;

// Reusable input field
function InputField({
  label,
  id,
  type = "text",
  register,
  error,
  required = true,
  requiredMessage,
}) {
  return (
    <div className="add-size-form-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-and-error-container">
        <input
          type={type}
          id={id}
          placeholder={`Enter your ${id}`}
          {...register(id, required ? { required: requiredMessage } : {})}
        />
        {error && <p className="error-message">{error.message}</p>}
      </div>
    </div>
  );
}
