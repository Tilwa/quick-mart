export async function editUpdateOrder({ orderData, orderId }) {
  // console.log(orderData, orderId);

  const res = await fetch(`/api/orders/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update order");
  }

  return res.json();
}
