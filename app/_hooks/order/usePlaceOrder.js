import { useMutation } from "@tanstack/react-query";

export function usePlaceOrder() {
  return useMutation({
    mutationFn: async (order) => {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!res.ok) {
        throw new Error("Order failed");
      }

      return res.json();
    },
  });
}
