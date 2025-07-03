// **************************************DELETE ORDER BY ID CODE STARTS********************************************* //

export async function deleteOrder(id) {
  try {
    const baseUrl =
      typeof window !== "undefined"
        ? window.location.origin
        : process.env.NEXTAUTH_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/orders/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete order");
    }

    return await res.json();
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
}

// **************************************DELETE ORDER BY ID CODE ENDS********************************************* //

// **************************************DELETE MULTIPLE ORDERS CODE STARTS********************************************* //

export async function deleteMultipleOrders(selectedRows) {
  try {
    const res = await fetch("/api/orders/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selectedRows }),
    });

    if (!res.ok) throw new Error("Failed to delete");

    return true; // return a flag so you can check success
  } catch (err) {
    // alert("Deletion failed");
    console.error(err);
    return false;
  }
}

// **************************************DELETE MULTIPLE ORDERS CODE ENDS********************************************* //
