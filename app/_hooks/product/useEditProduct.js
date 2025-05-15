"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ editProductData }) => {
      const res = await fetch("/api/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editProductData),
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  return {
    editProduct: mutation.mutate,
    isEditing: mutation.isPending,
  };
};
