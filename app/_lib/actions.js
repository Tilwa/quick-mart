"use server";

import { revalidatePath } from "next/cache";

//********************************************** VOCABULARY CRUD START HERE **************************************************//

const BASE_URL = process.env.NEXTAUTH_URL || ""; // Ensure API works on both local & production

// ✅ Get all words
export async function getWords() {
  try {
    const res = await fetch(`${BASE_URL}/api/words`);
    return res.json();
  } catch (error) {
    console.error("Error fetching words:", error);
    return { error: "Failed to fetch words" };
  }
}

// ✅ Create a word
export async function createWord(wordData) {
  try {
    const res = await fetch(`${BASE_URL}/api/words`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wordData),
    });
    return res.json();
  } catch (error) {
    console.error("Error creating word:", error);
    return { error: "Failed to create word" };
  }
}

// ✅ Update a word by ID
export async function updateWord(id, wordData) {
  try {
    const res = await fetch(`${BASE_URL}/api/words/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wordData),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error updating word:", error);
    return { error: "Failed to update word" };
  }
}

// ✅ Delete a word by ID
export async function deleteWord(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/words/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`Failed to delete word: ${res.statusText}`);
    }

    const data = await res.json();

    // ✅ Revalidate the page so UI updates automatically
    revalidatePath("/dashboard/all-words");

    return data;
  } catch (error) {
    console.error("Error deleting word:", error);
    return { error: "Failed to delete word" };
  }
}

// ✅ Fetch a single word by ID
export async function getWord(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/words/${id}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching word:", error);
    return { error: "Failed to fetch word" };
  }
}

//********************************************** VOCABULARY CRUD ENDS HERE **************************************************//
