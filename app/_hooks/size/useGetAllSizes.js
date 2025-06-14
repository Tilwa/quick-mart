export async function getAllSizes({ search = "" }) {
  try {
    // const params = new URLSearchParams();
    // if (search) params.append("search", search);

    const res = await fetch(`/api/sizes`);
    if (!res.ok) throw new Error("Failed to fetch sizes");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching sizes:", error);
    throw error;
  }
}

// export async function getAllSizes({ page = 1, search = "", sortBy = "" }) {
//   try {
//     const params = new URLSearchParams();
//     if (search) params.append("search", search);
//     if (page) params.append("page", page);
//     if (sortBy) params.append("sortBy", sortBy);

//     const res = await fetch(`/api/sizes?${params.toString()}`);
//     if (!res.ok) throw new Error("Failed to fetch sizes");

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching sizes:", error);
//     throw error;
//   }
// }
