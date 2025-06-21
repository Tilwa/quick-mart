// **************************************DELETE SIZE BY ID CODE STARTS********************************************* //

export async function deleteSizeWithId(sizeId) {
  try {
    if (!sizeId) throw new Error("Missing sizeId");

    const res = await fetch(`/api/sizes/${sizeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to delete size");
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Error deleting size:", error.message);
    throw error;
  }
}

// **************************************DELETE SIZE BY ID CODE ENDS********************************************* //

// **************************************DELETE MULTIPLE SIZE CODE STARTS********************************************* //

export async function deleteMultipleSizes(selectedRows) {
  console.log("Deleting sizes with IDs:", selectedRows);

  try {
    const res = await fetch("/api/sizes/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selectedRows }),
    });

    if (!res.ok) throw new Error("Failed to delete sizes");

    return true; // return a flag so you can check success
  } catch (err) {
    // alert("Deletion failed");
    console.error(err);
    return false;
  }
}

// **************************************DELETE MULTIPLE SIZE CODE ENDS********************************************* //
