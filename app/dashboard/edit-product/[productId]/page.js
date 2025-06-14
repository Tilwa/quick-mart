"use client";

import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useForm } from "react-hook-form";
import Spinner from "@/app/_components/spinner/Spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./page.css";
import { editUpdateProduct } from "@/app/_hooks/product/useEditProduct";
import { getProductById } from "@/app/_hooks/product/useGetProductById";
import getDriveDirectLink from "@/app/utils/getDriveDirectLink";
import { getAllSizes } from "@/app/_hooks/size/useGetAllSizes";
import { getAllColors } from "@/app/_hooks/color/useGetAllColors";

function Page() {
  const router = useRouter();
  const [selectedColors, setSelectedColors] = useState([]);
  const [searchTermColor, setSearchTermColor] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [searchTermSize, setSearchTermSize] = useState("");

  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const [hasFetchedColors, setHasFetchedColors] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [hasFetchedSizes, setHasFetchedSizes] = useState(false);

  // getting productId and path link
  const pathname = usePathname();
  const productId = Number(pathname.split("/").pop());
  const formattedPath = pathname.slice(1).split("/").join(" > ");

  // getting productById from prisma
  function useProduct(productId) {
    return useQuery({
      queryKey: ["product", productId],
      queryFn: () => getProductById(productId),
      enabled: !!productId,
    });
  }
  const { data: product, isLoading: isFetching, error } = useProduct(productId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      brand: "",
      category: "",
      offerPrice: "",
      originalPrice: "",
      inStock: "",
      image1: "",
      image2: "",
      image3: "",
      image4: "",
      image5: "",
      colors: "",
      sizes: "",
      id: "",
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        title: product.title || "",
        description: product.description || "",
        brand: product.brand || "",
        category: product.category || "",
        offerPrice: product.offerPrice || "",
        originalPrice: product.originalPrice || "",
        inStock: product.inStock || "",
        image1: product.image1 || "",
        image2: product.image2 || "",
        image3: product.image3 || "",
        image4: product.image4 || "",
        image5: product.image5 || "",
        colors: product.colors || [],
        sizes: product.sizes || [],
        id: product.id || "",
      });

      // 🟢 Extract nested color and size objects
      const selectedColorObjects = product.colors?.map((c) => c.color) || [];
      const selectedSizeObjects = product.sizes?.map((s) => s.size) || [];

      setSelectedColors(selectedColorObjects);
      setSelectedSizes(selectedSizeObjects);
    }
  }, [product, reset]);

  //updating productData to the database
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate } = useMutation({
    mutationFn: editUpdateProduct,
    onSuccess: () => {
      toast.success("Product updated successfully!");

      queryClient.invalidateQueries({ queryKey: ["colors"] });
      queryClient.invalidateQueries({ queryKey: ["sizes"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setSelectedColors([]);
      setSelectedSizes([]);
      reset();

      router.push("/dashboard/all-products");
    },
    onError: (error) => {
      toast.error(`❌ Failed: ${error.message}`);
    },
  });

  // fetching all colors
  const {
    isLoading: isFetchingColors,
    data: colorData,
    error: errorColor,
  } = useQuery({
    queryKey: ["colors", searchTermColor],
    queryFn: () => getAllColors({ search: searchTermColor }),
  });

  // fetching all sizes
  const {
    isLoading: isFetchingSize,
    data: sizeData,
    error: errorSize,
  } = useQuery({
    queryKey: ["sizes", searchTermSize],
    queryFn: () => getAllSizes({ search: searchTermSize }),
  });

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

  function onSubmit(data) {
    mutate({
      productData: {
        ...data,
        colors: selectedColors.map((c) => ({
          colorId: c.color?.id || c.id, // safe fallback
        })),
        sizes: selectedSizes.map((s) => ({
          sizeId: s.size?.id || s.id, // safe fallback
        })),
        image1: getDriveDirectLink(data.image1),
        image2: getDriveDirectLink(data.image2),
        image3: getDriveDirectLink(data.image3),
        image4: getDriveDirectLink(data.image4),
        image5: getDriveDirectLink(data.image5),
      },
      productId,
    });
  }

  // checking conditions
  if (!productId) return <div>Product ID not found</div>;
  // if (!product)
  //   return <div>Products not found in cache. Go back and retry.</div>;
  // if (isFetching || isUpdating) return <Spinner />;

  return (
    <div className="edit-product-container">
      <div className="edit-product-card">
        <div className="edit-product-top">
          <div className="edit-product-path">
            <p>{formattedPath}</p>
          </div>
          <div className="edit-product-title">Edit Product</div>
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
                  register={register}
                  error={errors.offerPrice}
                  requiredMessage="Offer price is required ⛔"
                  step="0.01" // Accept decimals
                  inputMode="decimal" // Mobile keyboards
                />
                <InputField
                  label="Original Price *"
                  id="originalPrice"
                  type="number"
                  register={register}
                  error={errors.originalPrice}
                  requiredMessage="Original price is required ⛔"
                  step="0.01" // Accept decimals
                  inputMode="decimal" // Mobile keyboards
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
              </div>{" "}
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
                        {colorData?.map((color) => {
                          const alreadySelected = selectedColors.find(
                            (c) => c.id === color.id
                          );
                          return (
                            <div key={color.id}>
                              <button
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
                        {sizeData?.map((size) => {
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
                disabled={isUpdating}
              >
                Update product
              </button>
            </div>
          </form>
        </div>
        {/* <div className="edit-product-bottom">1</div> */}
      </div>
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
    <div className="add-product-form-group">
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
