export async function getAllSizes({
  search = "",
  page = null,
  sortBy = "",
} = {}) {
  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (page !== null) params.append("page", page);
    if (sortBy) params.append("sortBy", sortBy);

    const res = await fetch(`/api/sizes?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch sizes");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching sizes:", error);
    throw error;
  }
}
