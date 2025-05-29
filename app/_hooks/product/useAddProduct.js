export async function addProduct(productData) {
  try {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!res.ok) {
      throw new Error("Failed to add product");
    }
    return await res.json();
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}
