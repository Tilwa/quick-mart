"use client";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import "./page.css";
import Spinner from "@/app/_components/spinner/Spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addProduct } from "@/app/_hooks/product/useAddProduct";
import SpinnerMini from "@/app/_components/spinnerMini/SpinnerMini";
import getDriveDirectLink from "@/app/utils/getDriveDirectLink";
import { getAllColors } from "@/app/_hooks/color/useGetAllColors";
import { useEffect, useState } from "react";
import { getAllSizes } from "@/app/_hooks/size/useGetAllSizes";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import SpinnerMiniButton from "@/app/_components/spinnerMiniButton/SpinnerMiniButton";

export default function AddProduct() {
  const [selectedColors, setSelectedColors] = useState([]);
  const [searchTermColor, setSearchTermColor] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [searchTermSize, setSearchTermSize] = useState("");

  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [hasFetchedColors, setHasFetchedColors] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [hasFetchedSizes, setHasFetchedSizes] = useState(false);

  const router = useRouter();
  // Get the current pathname
  const pathname = usePathname();
  const formattedPath = pathname.slice(1).split("/").join(" > ");

  // fetching all colors
  const {
    isPending: isFetchingColors,
    data: colorData,
    error: errorColor,
  } = useQuery({
    queryKey: ["colors", searchTermColor],
    queryFn: () => getAllColors({ search: searchTermColor }),
  });

  // fetching all sizes
  const {
    isPending: isFetchingSize,
    data: sizeData,
    error: errorSize,
  } = useQuery({
    queryKey: ["sizes", searchTermSize],
    queryFn: () => getAllSizes({ search: searchTermSize }),
  });

  // Form handling
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Add product mutation
  const queryClient = useQueryClient();
  const {
    mutate,
    isPending: isCreating,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast.success("Product added successfully!");

      queryClient.invalidateQueries({ queryKey: ["colors"] });
      queryClient.invalidateQueries({ queryKey: ["sizes"] });
      setSelectedColors([]);
      setSelectedSizes([]);
      reset();
      router.push("/dashboard/all-products");
    },
    onError: (error) => {
      toast.error(`❌ Failed: ${error.message}`);
    },
  });

  // console.log("isCreating:", isCreating);

  function onSubmit(data) {
    // Convert drive links before submitting to DB
    const updatedData = {
      ...data,
      colorIds: selectedColors.map((c) => c.id),
      sizeIds: selectedSizes.map((c) => c.id),
      image1: getDriveDirectLink(data.image1),
      image2: getDriveDirectLink(data.image2),
      image3: getDriveDirectLink(data.image3),
      image4: getDriveDirectLink(data.image4),
      image5: getDriveDirectLink(data.image5),
    };

    mutate(updatedData);
  }

  // UseEffect to fetch when dropdown is opened
  useEffect(() => {
    if (showColorDropdown && !hasFetchedColors) {
      queryClient.prefetchQuery({
        queryKey: ["colors", ""],
        queryFn: () => getAllColors({ search: "" }),
      });
      setHasFetchedColors(true);
    }
  }, [showColorDropdown, hasFetchedColors, queryClient]);

  // UseEffect to fetch when dropdown is opened
  useEffect(() => {
    if (showSizeDropdown && !hasFetchedSizes) {
      queryClient.prefetchQuery({
        queryKey: ["sizes", ""],
        queryFn: () => getAllSizes({ search: "" }),
      });
      setHasFetchedSizes(true);
    }
  }, [showSizeDropdown, hasFetchedSizes, queryClient]);

  if (isFetchingColors || isFetchingSize) return <Spinner height={15} />;
  return (
    <div className="edit-product-container">
      <div className="edit-product-card">
        <div className="edit-product-top">
          <div className="edit-product-path">
            <p>{formattedPath}</p>
          </div>
          <div className="edit-product-title">Add Product</div>
        </div>

        <div className="edit-product-middle">
          <form className="add-product-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="add-product-form-group-container">
              {/* Left Fields */}
              <div className="add-product-form-group-container-left">
                <InputField
                  label="Title *"
                  id="title"
                  register={register}
                  error={errors.title}
                  requiredMessage="Title is required ⛔"
                />
                <InputField
                  label="Description *"
                  id="description"
                  register={register}
                  error={errors.description}
                  requiredMessage="Description is required ⛔"
                />
                <InputField
                  label="Brand (optional)"
                  id="brand"
                  register={register}
                  error={errors.brand}
                  required={false}
                />
                <InputField
                  label="Category *"
                  id="category"
                  register={register}
                  error={errors.category}
                  requiredMessage="Category is required ⛔"
                />
                <InputField
                  label="Offer Price *"
                  id="offerPrice"
                  type="number"
                  step="0.01"
                  register={register}
                  error={errors.offerPrice}
                  requiredMessage="Offer price is required ⛔"
                />
                <InputField
                  label="Original Price *"
                  id="originalPrice"
                  type="number"
                  step="0.01"
                  register={register}
                  error={errors.originalPrice}
                  requiredMessage="Original price is required ⛔"
                />
              </div>

              {/* Right Fields */}
              <div className="add-product-form-group-container-right">
                <InputField
                  label="In Stock (optional)"
                  id="inStock"
                  type="number"
                  register={register}
                  error={errors.inStock}
                  required={false}
                />
                <InputField
                  label="Image01 *"
                  id="image1"
                  register={register}
                  error={errors.image1}
                  requiredMessage="Image1 is required ⛔"
                />
                <InputField
                  label="Image02 (optional)"
                  id="image2"
                  register={register}
                  error={errors.image2}
                  required={false}
                />
                <InputField
                  label="Image03 (optional)"
                  id="image3"
                  register={register}
                  error={errors.image3}
                  required={false}
                />
                <InputField
                  label="Image04 (optional)"
                  id="image4"
                  register={register}
                  error={errors.image4}
                  required={false}
                />
                <InputField
                  label="Image05 (optional)"
                  id="image5"
                  register={register}
                  error={errors.image5}
                  required={false}
                />
              </div>
            </div>
            {/* both dropdown starts from here */}
            <div className="colors-sizes-container">
              {/* color dropdown starts here */}
              <div className="color-container">
                <div className="color-dropdown-container">
                  <button
                    type="button"
                    className="dropdown-toggle"
                    onClick={() => setShowColorDropdown(!showColorDropdown)}
                  >
                    Select Colors{" "}
                    <span>
                      {showColorDropdown === true ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                    </span>
                  </button>

                  {showColorDropdown && (
                    <div className="color-dropdown-content">
                      <input
                        type="text"
                        placeholder="Search color here..."
                        value={searchTermColor}
                        onChange={(e) => setSearchTermColor(e.target.value)}
                        className="dropdown-toggle-input"
                      />

                      <div className="color-options">
                        {colorData?.colors?.map((color) => {
                          const alreadySelected = selectedColors.find(
                            (c) => c.id === color.id
                          );
                          return (
                            <div key={color.id}>
                              <button
                                style={{
                                  backgroundColor: color.hexCode,
                                }}
                                type="button"
                                disabled={
                                  alreadySelected || selectedColors.length >= 5
                                }
                                onClick={() =>
                                  setSelectedColors((prev) => [...prev, color])
                                }
                              >
                                {color.name}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Selected */}
                  <div className="selected-colors">
                    {selectedColors.map((color) => (
                      <div key={color.id} className="tag">
                        {color.name}
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedColors((prev) =>
                              prev.filter((c) => c.id !== color.id)
                            )
                          }
                        >
                          ✖
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* color dropdown ends here */}{" "}
              {/* sizes dropdown starts here */}
              <div className="size-container">
                <div className="size-dropdown-container">
                  <button
                    type="button"
                    className="dropdown-toggle"
                    onClick={() => setShowSizeDropdown(!showSizeDropdown)}
                  >
                    Select Sizes{" "}
                    <span>
                      {showColorDropdown === true ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                    </span>
                  </button>

                  {showSizeDropdown && (
                    <div className="size-dropdown-content">
                      <input
                        type="text"
                        placeholder="Search size here..."
                        value={searchTermSize}
                        onChange={(e) => setSearchTermSize(e.target.value)}
                        className="dropdown-toggle-input"
                      />

                      <div className="size-options">
                        {sizeData?.sizes?.map((size) => {
                          const alreadySelected = selectedSizes.find(
                            (c) => c.id === size.id
                          );
                          return (
                            <div key={size.id}>
                              <button
                                type="button"
                                disabled={
                                  alreadySelected || selectedSizes.length >= 5
                                }
                                onClick={() =>
                                  setSelectedSizes((prev) => [...prev, size])
                                }
                              >
                                {size.label}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Selected */}
                  <div className="selected-sizes">
                    {selectedSizes.map((size) => (
                      <div key={size.id} className="tag">
                        {size.label}
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedSizes((prev) =>
                              prev.filter((c) => c.id !== size.id)
                            )
                          }
                        >
                          ✖
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* size dropdown ends here */}
            </div>
            {/* Buttons */}{" "}
            <div className="btns-update-product">
              <button type="reset" className="cancel-product-button">
                Cancel
              </button>
              <button
                type="submit"
                className="add-product-button"
                disabled={isCreating}
              >
                {isCreating ? (
                  <span className="creating-product">
                    Creating... <SpinnerMiniButton />
                  </span>
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
        {/* <div className="edit-product-bottom">1</div> */}
      </div>
    </div>
  );
}

// Reusable input field
function InputField({
  label,
  id,
  type = "text",
  register,
  error,
  required = true,
  requiredMessage,
  ...rest // ✅ captures any extra props like step, min, max etc.
}) {
  return (
    <div className="add-product-form-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-and-error-container">
        <input
          type={type}
          id={id}
          placeholder={`Enter your ${id}`}
          {...register(id, required ? { required: requiredMessage } : {})}
          {...rest} // ✅ apply the rest props here, like step="0.01"
        />
        {error && <p className="error-message">{error.message}</p>}
      </div>
    </div>
  );
}
