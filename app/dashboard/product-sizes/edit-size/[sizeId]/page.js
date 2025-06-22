"use client";

import { useForm } from "react-hook-form";
import Spinner from "@/app/_components/spinner/Spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import "./page.css";

import { getSizeById } from "@/app/_hooks/size/useGetSizeById";
import { editSizesWithId } from "@/app/_hooks/size/useEditSize";

function Page() {
  const router = useRouter();

  // getting sizeId and path link
  const pathname = usePathname();
  const sizeId = Number(pathname.split("/").pop());
  const formattedPath = pathname.slice(1).split("/").join(" > ");

  // getting sizeById from prisma
  function useSize(sizeId) {
    return useQuery({
      queryKey: ["sizes", sizeId],
      queryFn: () => getSizeById(sizeId),
      enabled: !!sizeId,
    });
  }
  const { data: size, isLoading: isFetching, error } = useSize(sizeId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      label: "",
    },
  });

  useEffect(() => {
    if (size) {
      reset({
        id: size.id || "",
        label: size.label || "",
      });
    }
  }, [size, reset]);

  //updating sizeData to the database
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate } = useMutation({
    mutationFn: editSizesWithId,
    onSuccess: () => {
      toast.success("Size updated successfully!");

      queryClient.invalidateQueries({ queryKey: ["sizes"] });

      reset();

      router.push("/dashboard/product-sizes");
    },
    onError: (error) => {
      toast.error(`❌ Failed: ${error.message}`);
    },
  });

  function onSubmit(data) {
    if (!sizeId) {
      toast.error("Size ID is not available.");
      return;
    }
    mutate({ sizeData: data, sizeId });
  }

  // checking conditions
  if (!sizeId) return <div>Size ID not found</div>;
  // if (!size)
  //   return <div>sizes not found in cache. Go back and retry.</div>;
  // if (isFetching || isUpdating) return <Spinner />;

  return (
    <div className="edit-size-container">
      <div className="edit-size-card">
        <div className="edit-size-top">
          <div className="edit-size-path">
            <p>{formattedPath}</p>
          </div>
          <div className="edit-size-title">Edit Size</div>
        </div>

        <div className="edit-size-middle">
          <form className="add-size-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="add-size-form-group-container">
              {/* Left Fields */}
              <div className="add-size-form-group-container-left">
                <InputField
                  label="size ID "
                  id="id"
                  register={register}
                  error={errors.id}
                  requiredMessage="ID is required ⛔"
                  disabled={true}
                />
                <InputField
                  label="Label Name *"
                  id="label"
                  register={register}
                  error={errors.label}
                  requiredMessage="Size name is required ⛔"
                />
              </div>
              {/* Right Fields */}
            </div>
            {/* Buttons */}{" "}
            <div className="btns-update-size">
              <button type="reset" className="cancel-size-button">
                Cancel
              </button>
              <button
                type="submit"
                className="add-size-button"
                disabled={isUpdating}
              >
                Update size
              </button>
            </div>
          </form>
        </div>
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
  disabled = false,
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
          disabled={disabled}
        />
        {error && <p className="error-message">{error.message}</p>}
      </div>
    </div>
  );
}
