export async function editSizesWithId({ sizeData, sizeId }) {
  const res = await fetch(`/api/sizes/${sizeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sizeData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update size");
  }

  return res.json();
}
