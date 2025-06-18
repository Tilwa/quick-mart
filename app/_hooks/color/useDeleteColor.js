// **************************************DELETE COLOR BY ID CODE STARTS********************************************* //

export async function deleteColorWithId(colorId) {
  try {
    const res = await fetch(`/api/colors/${colorId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete color");
    return await res.json();
  } catch (error) {
    console.error("Error deleting color:", error);
    throw error;
  }
}

// **************************************DELETE COLOR BY ID CODE ENDS********************************************* //

// **************************************DELETE MULTIPLE COLOR CODE STARTS********************************************* //

export async function deleteMultipleColors(ids) {
  try {
    const res = await fetch("/api/colors/delete-many", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    if (!res.ok) throw new Error("Failed to delete multiple colors");
    return await res.json();
  } catch (error) {
    console.error("Error deleting multiple colors:", error);
    throw error;
  }
}

// **************************************DELETE MULTIPLE COLOR CODE ENDS********************************************* //
