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
import AllColorsTable from "@/app/ui/allColorsTable/AllColorsTable";
import { getAllColors } from "@/app/_hooks/color/useGetAllColors";
import { useForm } from "react-hook-form";
import { addColor } from "@/app/_hooks/color/useAddColor";
import SpinnerMiniButton from "@/app/_components/spinnerMiniButton/SpinnerMiniButton";
import { deleteMultipleColors } from "@/app/_hooks/color/useDeleteColor";

function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [deleteTenRows, setDeleteTenRows] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeViewMenu, setActiveViewMenu] = useState(false);

  const [showColorModal, setShowColorModal] = useState(false);

  const router = useRouter();

  // Get the current pathname
  const pathname = usePathname();
  const formattedPath = pathname.slice(1).split("/").join(" > ");

  // fetching all colors initially

  const {
    isPending: fetchingColors,
    data: colors,
    error,
  } = useQuery({
    queryKey: ["colors", page, searchTerm, sortBy],
    queryFn: () =>
      getAllColors({ page, search: searchTerm, sortBy, pageSize: 10 }),
  });
  //console.log(colors.colors);

  // toggle when menu button clicked
  const menuRef = useRef(null);
  const toggleMenu = () => {
    setActiveViewMenu((prev) => !prev);
  };

  // counting total pages
  const totalPages = Math.ceil(colors?.count / 10);

  // using queryClient for trigger refetch colors
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
      confirmDelete = window.confirm("Do you want to delete selected colors?");
    }

    if (!confirmDelete) return;

    try {
      const success = await deleteMultipleColors(selectedRows);

      if (success) {
        toast.success(`Color(s) deleted successfully!`);
        queryClient.invalidateQueries({ queryKey: ["colors"] });
        setSelectedRows([]);
      } else {
        toast.error(`❌ Failed to delete colors`);
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
    mutationFn: addColor,
    onSuccess: () => {
      toast.success("Color added successfully!");

      queryClient.invalidateQueries(["colors"]);
      setShowColorModal(false);
      reset();
      router.push("/dashboard/product-colors");
    },
    onError: (err) => {
      toast.error(`❌ Failed: ${error.message}`);
      console.error(err);
    },
  });

  const onSubmit = (data) => mutate(data);

  return (
    <div className="all-colors-container">
      <div className="all-colors-card">
        <div className="all-colors-top">
          <div className="edit-product-path">
            <p>{formattedPath}</p>
          </div>
          <div className="edit-product-title">All Colors</div>
          <div className="all-colors-top-bottom">
            <div>
              {/* search colors bar */}
              <input
                type="text"
                id="all-colors-search"
                placeholder="Search colors here..."
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
                      className="all-colors-status-filter"
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
                <button id="all-colors-view" onClick={toggleMenu}>
                  View By
                </button>
                <button
                  id="add-color-btn"
                  onClick={() => setShowColorModal(true)}
                >
                  <p>Add Color</p> <RiAddLargeFill />
                </button>
              </div>
              {activeViewMenu && (
                <div id="view-by-menus">
                  <ul id="view-by-menu-list">
                    {/* <li onClick={() => setSortBy("price-asc")}>
                      Price Low to High ⬆️
                    </li>
                    <li onClick={() => setSortBy("price-desc")}>
                      Price High to Low ⬇️
                    </li> */}
                    <li onClick={() => setSortBy("name-asc")}>
                      Ascending Order{" "}
                      <FaSortAlphaDown
                        className="view-by-icons"
                        id="view-by-icons-asc"
                      />
                    </li>
                    <li onClick={() => setSortBy("name-desc")}>
                      Descending Order{" "}
                      <FaSortAlphaDownAlt className="view-by-icons" />
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="all-colors-middle">
          <AllColorsTable
            isPending={fetchingColors}
            colors={colors}
            deleteTenRows={deleteTenRows}
            setDeleteTenRows={setDeleteTenRows}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
          />
        </div>

        <div className="all-colors-bottom">
          <p id="all-colors-rows">
            {" "}
            {selectedRows.length} of {colors?.count} row(s) selected.
          </p>

          <div className="all-colors-pages">
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
      {showColorModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button
              className="modal-close"
              onClick={() => setShowColorModal(false)}
            >
              ✕
            </button>
            <h2 id="add-color-modal-title">Add New Color</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <InputField
                  label="Color Name *"
                  id="name"
                  type="text"
                  register={register}
                  error={errors.name}
                  requiredMessage="Color name is required ⛔"
                />
              </div>
              <div>
                <InputField
                  label="Color HEX *"
                  id="hexCode"
                  type="text"
                  register={register}
                  error={errors.hexCode}
                  requiredMessage="Color code is required ⛔"
                />
              </div>

              <div className="btns-update-product">
                <button type="reset" className="cancel-color-button">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="add-color-button"
                  disabled={isPending}
                >
                  {isPending ? (
                    <span className="creating-color">
                      Adding... <SpinnerMiniButton />
                    </span>
                  ) : (
                    "Add Color"
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
    <div className="add-color-form-group">
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
