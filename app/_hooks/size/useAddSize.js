export async function addSize({ label }) {
  try {
    const res = await fetch("/api/sizes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label }),
    });
    if (!res.ok) throw new Error("Failed to add size");
    return await res.json();
  } catch (error) {
    console.error("Error adding size:", error);
    throw error;
  }
}
