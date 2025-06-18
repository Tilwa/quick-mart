export async function editColorWithId(id, { name, hexCode }) {
  try {
    const res = await fetch(`/api/colors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, hexCode }),
    });
    if (!res.ok) throw new Error("Failed to update color");
    return await res.json();
  } catch (error) {
    console.error("Error updating color:", error);
    throw error;
  }
}
