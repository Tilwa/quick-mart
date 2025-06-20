// **************************************DELETE COLOR BY ID CODE STARTS********************************************* //

export async function deleteColorWithId(colorId) {
  try {
    if (!colorId) throw new Error("Missing colorId");

    const res = await fetch(`/api/colors/${colorId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to delete color");
    }

    return await res.json();
  } catch (error) {
    console.error("❌ Error deleting color:", error.message);
    throw error;
  }
}

// **************************************DELETE COLOR BY ID CODE ENDS********************************************* //

// **************************************DELETE MULTIPLE COLOR CODE STARTS********************************************* //

export async function deleteMultipleColors(selectedRows) {
  console.log("Deleting colors with IDs:", selectedRows);

  try {
    const res = await fetch("/api/colors/delete", {
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

// **************************************DELETE MULTIPLE COLOR CODE ENDS********************************************* //
