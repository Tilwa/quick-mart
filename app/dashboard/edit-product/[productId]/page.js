"use client";

import { useForm } from "react-hook-form";
import Spinner from "@/app/_components/spinner/Spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import "./page.css";
import { editUpdateProduct } from "@/app/_hooks/product/useEditProduct";
import { getProductById } from "@/app/_hooks/product/useGetProductById";
import getDriveDirectLink from "@/app/utils/getDriveDirectLink";

function Page() {
  const router = useRouter();

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
  // console.log(product);

  // old way to use product content from reactQuery temporary
  // const queryClient = useQueryClient();
  // const products = queryClient.getQueryData(["product"]);
  // const product = products?.count?.find((p) => p.id === productId);

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
        id: product.id || "",
      });
    }
  }, [product, reset]);

  //updating productData to the database
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate } = useMutation({
    mutationFn: editUpdateProduct,
    onSuccess: () => {
      toast.success("Product updated successfully!");
      queryClient.invalidateQueries(["product", productId]);
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

    mutate({ productData: updatedData, productId });
  }

  // checking conditions
  if (!productId) return <div>Product ID not found</div>;
  // if (!product)
  //   return <div>Products not found in cache. Go back and retry.</div>;
  if (isFetching || isUpdating) return <Spinner />;

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
