"use client";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAddProduct } from "@/app/_hooks/product/useAddProduct";
import "./page.css";
import Spinner from "@/app/_components/spinner/Spinner";

export default function AddProduct() {
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
  const { mutate: addProduct, isLoading: isCreating } = useAddProduct({
    onAddProduct: () => reset(),
  });

  function onSubmit(data) {
    addProduct(data);
  }

  if (isCreating) return <Spinner />;

  return (
    <div className="add-product-container">
      <p className="path-link">{formattedPath}</p>
      <h1 className="add-product-title">Add New Product</h1>
      <div className="add-new-product">
        <div className="add-product-form-container">
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
                />
                <InputField
                  label="Original Price *"
                  id="originalPrice"
                  type="number"
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

            {/* Buttons */}
            <div className="add-form-btn">
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
      </div>
    </div>
  );
}

// Reusable input component
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
      <label>{label}</label>
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
