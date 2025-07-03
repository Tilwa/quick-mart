export async function getAllOrders({
  page = 1,
  search = "",
  sortBy = "",
  pageSize = 10,
}) {
  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (page) params.append("page", page);
    if (sortBy) params.append("sortBy", sortBy);
    if (pageSize) params.append("pageSize", pageSize);

    const res = await fetch(`/api/orders?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch orders");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}
