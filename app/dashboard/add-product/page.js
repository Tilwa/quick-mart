"use client";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import "./page.css";
import Spinner from "@/app/_components/spinner/Spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addProduct } from "@/app/_hooks/product/useAddProduct";
import SpinnerMini from "@/app/_components/spinnerMini/SpinnerMini";
import getDriveDirectLink from "@/app/utils/getDriveDirectLink";

export default function AddProduct() {
  const router = useRouter();

  // Get the current pathname
  const pathname = usePathname();
  const formattedPath = pathname.slice(1).split("/").join(" > ");

  // Form handling
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Add product mutation

  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast.success("Product added successfully!");
      queryClient.invalidateQueries({
        queryKey: ["product"],
      });

      reset();

      router.push("/dashboard/all-products");
    },
    onError: (error) => {
      toast.error(`❌ Failed: ${error.message}`);
    },
  });

  function onSubmit(data) {
    // Convert drive links before submitting to DB
    const updatedData = {
      ...data,
      image1: getDriveDirectLink(data.image1),
      image2: getDriveDirectLink(data.image2),
      image3: getDriveDirectLink(data.image3),
      image4: getDriveDirectLink(data.image4),
      image5: getDriveDirectLink(data.image5),
    };

    mutate(updatedData);
  }

  if (isCreating) return <SpinnerMini />;
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
              </div>
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
                Add product
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
