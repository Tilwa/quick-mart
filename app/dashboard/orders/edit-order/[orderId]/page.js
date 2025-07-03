"use client";

import { useForm } from "react-hook-form";
import Spinner from "@/app/_components/spinner/Spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import "./page.css";

import getDriveDirectLink from "@/app/utils/getDriveDirectLink";
import { getOrderById } from "@/app/_hooks/order/useGetOrderById";
import { editUpdateOrder } from "@/app/_hooks/order/useEditOrder";

function Page() {
  const router = useRouter();

  // getting orderId and path link
  const pathname = usePathname();
  const orderId = Number(pathname.split("/").pop());
  const formattedPath = pathname.slice(1).split("/").join(" > ");

  // getting orderById from prisma
  function useOrder(orderId) {
    return useQuery({
      queryKey: ["order", orderId],
      queryFn: () => getOrderById(orderId),
      enabled: !!orderId,
    });
  }
  const { data: order, isLoading: isFetching, error } = useOrder(orderId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      name: "",
      mobile: "",
      quantity: "",
      emirate: "",
      address: "",
      price: "",
      productId: "",
      productTitle: "",
      variantColor: "",
      variantSize: "",
      variantImage: "",
      status: "",
    },
  });

  useEffect(() => {
    if (order) {
      reset({
        id: order.id || "",
        name: order.name || "",
        mobile: order.mobile || "",
        quantity: order.quantity || "",
        emirate: order.emirate || "",
        address: order.address || "",
        price: order.price || "",
        productId: order.productId || "",
        productTitle: order.productTitle || "",
        variantColor: order.variantColor || "",
        variantSize: order.variantSize || "",
        variantImage: order.variantImage || "",
        status: order.status || "",
      });
    }
  }, [order, reset]);

  //updating orderData to the database
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate } = useMutation({
    mutationFn: editUpdateOrder,
    onSuccess: () => {
      toast.success("order updated successfully!");

      queryClient.invalidateQueries({ queryKey: ["order", orderId] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      reset();

      router.push("/dashboard/orders");
    },
    onError: (error) => {
      toast.error(`❌ Failed: ${error.message}`);
    },
  });

  function onSubmit(data) {
    mutate({
      orderData: {
        ...data,
      },
      orderId,
    });
  }

  // checking conditions
  if (!orderId) return <div>Order ID not found</div>;
  // if (!order)
  //   return <div>orders not found in cache. Go back and retry.</div>;
  // if (isFetching || isUpdating) return <Spinner />;

  return (
    <div className="edit-order-container">
      <div className="edit-order-card">
        <div className="edit-order-top">
          <div className="edit-order-path">
            <p>{formattedPath}</p>
          </div>
          <div className="edit-order-title">Edit Order</div>
        </div>

        <div className="edit-order-middle">
          <form className="add-order-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="add-order-form-group-container">
              {/* Left Fields */}
              <div className="add-order-form-group-container-left">
                <InputField
                  label="Name"
                  id="name"
                  register={register}
                  error={errors.name}
                  requiredMessage="Name is required ⛔"
                />
                <InputField
                  label="Mobile No"
                  id="mobile"
                  register={register}
                  error={errors.mobile}
                  requiredMessage="Mobile is required ⛔"
                />
                <InputField
                  label="Quantity"
                  type="number"
                  id="quantity"
                  register={register}
                  error={errors.quantity}
                  requiredMessage="Quantity is required ⛔"
                />
                <InputField
                  label="State"
                  id="emirate"
                  register={register}
                  error={errors.emirate}
                  requiredMessage="State is required ⛔"
                />
                <InputField
                  label="Address"
                  id="address"
                  register={register}
                  error={errors.address}
                  requiredMessage="Address is required ⛔"
                />
                <InputField
                  label="Price"
                  id="price"
                  register={register}
                  error={errors.price}
                  requiredMessage="Price is required ⛔"
                />
              </div>
              {/* Right Fields */}
              <div className="add-order-form-group-container-right">
                <InputField
                  label="Product Id"
                  id="productId"
                  type="number"
                  register={register}
                  error={errors.productId}
                  required={false}
                />
                <InputField
                  label="Product Title"
                  id="productTitle"
                  register={register}
                  error={errors.productTitle}
                  requiredMessage="Product Title is required ⛔"
                />
                <InputField
                  label="Variant Color"
                  id="variantColor"
                  register={register}
                  error={errors.variantColor}
                  required={false}
                />
                <InputField
                  label="Variant Size"
                  id="variantSize"
                  register={register}
                  error={errors.variantSize}
                  required={false}
                />
                <InputField
                  label="Variant Image"
                  id="variantImage"
                  register={register}
                  error={errors.variantImage}
                  required={false}
                />
                <InputField
                  label="Status"
                  id="status"
                  register={register}
                  error={errors.status}
                  required={false}
                />
              </div>{" "}
            </div>
            {/* Buttons */}{" "}
            <div className="btns-update-order">
              <button type="reset" className="cancel-order-button">
                Cancel
              </button>
              <button
                type="submit"
                className="add-order-button"
                disabled={isUpdating}
              >
                Update order
              </button>
            </div>
          </form>
        </div>
        {/* <div className="edit-order-bottom">1</div> */}
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
    <div className="add-order-form-group">
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
