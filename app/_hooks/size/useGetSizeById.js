export async function getSizeById(sizeId) {
  if (!sizeId) {
    throw new Error("Size ID is required");
  }
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/sizes/${sizeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch size");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching size:", error);
    throw error;
  }
}
