export async function getFilteredProducts({
  page = 1,
  search = "",
  sortBy = "",
  pageSize = 50,
  filters = {},
  minPrice,
  maxPrice,
  availability,
}) {
  const params = new URLSearchParams();

  if (search) params.append("search", search);
  if (page) params.append("page", page);
  if (sortBy) params.append("sortBy", sortBy);
  if (pageSize) params.append("pageSize", pageSize);

  filters.brand?.forEach((b) => params.append("brand", b));
  filters.color?.forEach((c) => params.append("color", c));
  filters.size?.forEach((s) => params.append("size", s));
  filters.title?.forEach((t) => params.append("title", t));

  if (availability) params.append("availability", availability);
  if (minPrice) params.append("minPrice", minPrice);
  if (maxPrice) params.append("maxPrice", maxPrice);

  const res = await fetch(`/api/products/filtered?${params.toString()}`);

  if (!res.ok) throw new Error("Failed to fetch filtered products");

  return await res.json();
}
