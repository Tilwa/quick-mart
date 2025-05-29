// export async function deleteProduct(id) {
//   try {
//     const res = await fetch("/api/products", {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ id }),
//     });

//     if (!res.ok) {
//       throw new Error("Failed to delete product");
//     }
//     return await res.json();
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     throw error;
//   }
// }
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
