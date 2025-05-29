export async function getAllProducts() {
  try {
    const res = await fetch("/api/products"); // Change to your actual endpoint
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
