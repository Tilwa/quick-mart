"use client";

import { useQuery } from "@tanstack/react-query";

export const useFetchProduct = (page = 1) =>
  useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      const res = await fetch(`/api/products?page=${page}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });
