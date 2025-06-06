"use server";

// **************************************DELETE PRODUCT BY ID CODE STARTS********************************************* //

export async function deleteProduct(id) {
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete product");
    }

    return await res.json();
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
// **************************************DELETE PRODUCTS BY ID CODE ENDS********************************************* //

// **************************************DELETE MULTIPLE PRODUCTS CODE STARTS********************************************* //

export async function deleteMultipleRows(selectedRows) {
  try {
    const res = await fetch("/api/products/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selectedRows }),
    });

    if (!res.ok) throw new Error("Failed to delete");

    return true; // return a flag so you can check success
  } catch (err) {
    alert("Deletion failed");
    console.error(err);
    return false;
  }
}

// **************************************DELETE MULTIPLE PRODUCTS CODE ENDS********************************************* //
