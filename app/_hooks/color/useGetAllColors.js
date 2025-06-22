export async function getAllColors({
  search = "",
  page = null,
  sortBy = "",
  pageSize = 10,
} = {}) {
  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (page !== null) params.append("page", page);
    if (sortBy) params.append("sortBy", sortBy);
    if (pageSize) params.append("pageSize", pageSize);

    const res = await fetch(`/api/colors?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch colors");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching colors:", error);
    throw error;
  }
}
