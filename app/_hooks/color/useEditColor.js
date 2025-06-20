export async function editColorWithId({ colorData, colorId }) {
  const res = await fetch(`/api/colors/${colorId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(colorData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update color");
  }

  return res.json();
}
