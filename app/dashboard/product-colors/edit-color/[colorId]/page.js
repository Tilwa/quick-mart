"use client";

import { useForm } from "react-hook-form";
import Spinner from "@/app/_components/spinner/Spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import "./page.css";

import { getColorById } from "@/app/_hooks/color/useGetColorById";
import { editColorWithId } from "@/app/_hooks/color/useEditColor";

function Page() {
  const router = useRouter();

  // getting colorId and path link
  const pathname = usePathname();
  const colorId = Number(pathname.split("/").pop());
  const formattedPath = pathname.slice(1).split("/").join(" > ");

  // getting colorById from prisma
  function useColor(colorId) {
    return useQuery({
      queryKey: ["colors", colorId],
      queryFn: () => getColorById(colorId),
      enabled: !!colorId,
    });
  }
  const { data: color, isLoading: isFetching, error } = useColor(colorId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      name: "",
      hexCode: "",
    },
  });

  useEffect(() => {
    if (color) {
      reset({
        id: color.id || "",
        name: color.name || "",
        hexCode: color.hexCode || "",
      });
    }
  }, [color, reset]);

  //updating colorData to the database
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate } = useMutation({
    mutationFn: editColorWithId,
    onSuccess: () => {
      toast.success("Color updated successfully!");

      queryClient.invalidateQueries({ queryKey: ["colors"] });

      reset();

      router.push("/dashboard/product-colors");
    },
    onError: (error) => {
      toast.error(`❌ Failed: ${error.message}`);
    },
  });

  function onSubmit(data) {
    if (!colorId) {
      toast.error("Color ID is not available.");
      return;
    }
    mutate({ colorData: data, colorId });
  }

  // checking conditions
  if (!colorId) return <div>Color ID not found</div>;
  // if (!color)
  //   return <div>Colors not found in cache. Go back and retry.</div>;
  // if (isFetching || isUpdating) return <Spinner />;

  return (
    <div className="edit-color-container">
      <div className="edit-color-card">
        <div className="edit-color-top">
          <div className="edit-color-path">
            <p>{formattedPath}</p>
          </div>
          <div className="edit-color-title">Edit Color</div>
        </div>

        <div className="edit-color-middle">
          <form className="add-color-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="add-color-form-group-container">
              {/* Left Fields */}
              <div className="add-color-form-group-container-left">
                <InputField
                  label="Color ID "
                  id="id"
                  register={register}
                  error={errors.id}
                  requiredMessage="ID is required ⛔"
                  disabled={true}
                />
                <InputField
                  label="Name *"
                  id="name"
                  register={register}
                  error={errors.name}
                  requiredMessage="Name is required ⛔"
                />
                <InputField
                  label="Color Code *"
                  id="hexCode"
                  register={register}
                  error={errors.hexCode}
                  requiredMessage="Color code is required ⛔"
                />
              </div>
              {/* Right Fields */}
            </div>
            {/* Buttons */}{" "}
            <div className="btns-update-color">
              <button type="reset" className="cancel-color-button">
                Cancel
              </button>
              <button
                type="submit"
                className="add-color-button"
                disabled={isUpdating}
              >
                Update color
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
    <div className="add-color-form-group">
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
