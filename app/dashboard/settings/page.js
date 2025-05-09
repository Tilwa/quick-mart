import { auth } from "@/app/_lib/auth";
import { getUser, updateUser } from "@/app/_lib/actions";
import { redirect } from "next/navigation";

export default async function UserPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await getUser(session.user.email);

  if (!user) {
    return <p className="text-red-500">User not found.</p>;
  }

  async function handleUpdate(formData) {
    "use server";

    const email = formData.get("email");
    const name = formData.get("name");
    const image = formData.get("image");

    if (!email || !name || !image) {
      return { error: "All fields are required" };
    }

    try {
      const result = await updateUser({ email, name, image });
      if (result.error) {
        // Handle error (e.g., show a notification)
      } else {
        // Handle success (e.g., show a notification)
      }
    } catch (err) {
      // Handle error (e.g., show a notification)
    }
  }

  return (
    <div className="m-6">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>

      <form
        action={handleUpdate}
        className="mt-6 p-4 border rounded-lg shadow bg-gray-100"
      >
        <label className="block mb-2">
          Email:
          <input
            type="text"
            name="email"
            defaultValue={user.email}
            className="w-full p-2 border rounded mt-1 bg-gray-200"
            disabled
          />
        </label>

        <label className="block mb-2">
          Full Name:
          <input
            type="text"
            name="name"
            defaultValue={user.name}
            className="w-full p-2 border rounded mt-1 bg-white"
            required
          />
        </label>

        <label className="block mb-2">
          Image URL:
          <input
            type="text"
            name="image"
            defaultValue={user.image}
            className="w-full p-2 border rounded mt-1 bg-white"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
        >
          Update User
        </button>
      </form>
    </div>
  );
}
