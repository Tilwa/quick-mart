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

//********************************************** USER AUTHENTICATION ENDS HERE **************************************************//
