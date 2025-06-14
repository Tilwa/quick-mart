"use server";
export async function getAllProducts(page = 1, search = "") {
  try {
    const query = new URLSearchParams({
      page: page.toString(),
      search,
    }).toString();
    const res = await fetch(`/api/products?${query}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], count: 0 };
  }
}
