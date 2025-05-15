// hooks/useAddProduct.js
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAddProduct = ({ onAddProduct }) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add product");
      }

      return response.json();
    },
    onSuccess: (data) => {
      if (onAddProduct) {
        onAddProduct(data);
      }
      toast.success("Product added successfully!");
    },
    onError: (error) => {
      toast.error(`❌ Failed: ${error.message}`);
    },
  });
};
