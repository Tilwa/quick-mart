export async function getAllColors({ search = "" }) {
  try {
    // const params = new URLSearchParams();
    // if (search) params.append("search", search);

    const res = await fetch(`/api/colors`);
    if (!res.ok) throw new Error("Failed to fetch colors");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching colors:", error);
    throw error;
  }
}

// export async function getAllColors({ page = 1, search = "", sortBy = "" }) {
//   try {
//     const params = new URLSearchParams();
//     if (search) params.append("search", search);
//     if (page) params.append("page", page);
//     if (sortBy) params.append("sortBy", sortBy);

//     const res = await fetch(`/api/colors?${params.toString()}`);
//     if (!res.ok) throw new Error("Failed to fetch colors");

//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching colors:", error);
//     throw error;
//   }
// }
