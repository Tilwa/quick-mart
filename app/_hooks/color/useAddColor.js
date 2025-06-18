export async function addColor({ name, hexCode }) {
  try {
    const res = await fetch("/api/colors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, hexCode }),
    });
    if (!res.ok) throw new Error("Failed to add color");
    return await res.json();
  } catch (error) {
    console.error("Error adding color:", error);
    throw error;
  }
}
