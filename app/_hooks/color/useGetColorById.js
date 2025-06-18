export async function getColorWithId(id) {
  try {
    const res = await fetch(`/api/colors/${id}`);
    if (!res.ok) throw new Error("Failed to fetch color");
    return await res.json();
  } catch (error) {
    console.error("Error fetching color:", error);
    throw error;
  }
}
