// useAddOrder.js
import { useMutation } from "@tanstack/react-query";

export function useAddOrder() {
  return useMutation({
    mutationFn: async (orderData) => {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to add order");
      }

      return await res.json();
    },
  });
}
