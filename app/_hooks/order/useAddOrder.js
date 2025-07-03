export async function addOrder(orderData) {
  try {
    const baseUrl =
      typeof window === "undefined"
        ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
        : ""; // empty string means use relative path on client

    const res = await fetch(`${baseUrl}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) {
      throw new Error("Failed to add order");
    }

    return await res.json();
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
}
