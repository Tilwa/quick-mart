export async function getColorById(colorId) {
  if (!colorId) {
    throw new Error("Color ID is required");
  }
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/colors/${colorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}
