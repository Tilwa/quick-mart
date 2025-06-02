export async function getAllProducts({ page = 1, search = "", sortBy = "" }) {
  try {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (page) params.append("page", page);
    if (sortBy) params.append("sortBy", sortBy);

    const res = await fetch(`/api/products?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
