"use server";

import { revalidatePath } from "next/cache";

//********************************************** USER AUTHENTICATION START HERE **************************************************//

import { auth, signIn, signOut } from "@/app/_lib/auth";

export async function signInAction() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

// ✅ Create a new user
export async function createUser(newUser) {
  try {
    const res = await fetch(`${BASE_URL}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    return res.json();
  } catch (error) {
    console.error("CreateUser Error:", error);
    return { error: "User could not be created" };
  }
}

// ✅ Get a user by email
// utils/getUser.js
export async function getUser(email) {
  if (!email) return { error: "Email is required" };

  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/users/${email}`);

    if (!res.ok) {
      console.error("Error fetching user:", res.statusText);
      return { error: "User not found" };
    }

    const user = await res.json();
    return user;
  } catch (error) {
    console.error("Fetch error:", error);
    return { error: "Error fetching user" };
  }
}

// ✅ Update user data
export async function updateUser(formData) {
  try {
    const email = formData.get("email");
    const name = formData.get("name");
    const image = formData.get("image");

    if (!email || !name || !image) {
      return { error: "All fields are required" };
    }

    const res = await fetch(`/api/users/${email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.error || "Failed to update user" };
    }

    return await res.json();
  } catch (error) {
    console.error("Update error:", error);
    return { error: "Failed to update user" };
  }
}

//********************************************** USER AUTHENTICATION ENDS HERE **************************************************//
