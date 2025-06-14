export async function addProduct(productData) {
  try {
    const baseUrl =
      typeof window === "undefined"
        ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        : ""; // empty string means use relative path on client

    const res = await fetch(`${baseUrl}/api/products`, {
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
