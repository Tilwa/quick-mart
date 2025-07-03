export async function getOrderById(orderId) {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch order");
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
}
