"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createWord } from "@/app/_lib/actions";

export default function AddWord() {
  const router = useRouter();
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!word || !meaning) {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);

    // Call the server action
    const result = await createWord({ word, meaning, difficulty });

    if (result?.error) {
      toast.error("Failed to add word!");
    } else {
      toast.success("New Word Added");
      router.push("/dashboard/all-words");
    }

    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add New Word</h2>
      <form
        onSubmit={handleAdd}
        className="mt-6 p-4 border rounded-lg shadow bg-gray-100"
      >
        <label className="block mb-2">
          Word:
          <input
            type="text"
            id="word"
            name="word"
            className="border p-2 w-full rounded "
            value={word}
            onChange={(e) => setWord(e.target.value)}
            required
          />
        </label>

        <label className="block mb-2">
          Meaning:
          <input
            type="text"
            id="meaning"
            name="meaning"
            className="border p-2 w-full rounded"
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
            required
          />
        </label>

        <label className="block mb-4">
          Difficulty:
          <select
            className="border p-2 w-full rounded"
            id="difficulty"
            name="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>

        <div className="flex justify-end">
          <button
            type="button"
            className="bg-gray-500 text-white px-3 py-1 rounded mr-2"
            onClick={() => router.push("/dashboard/all-words")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-orange-500 text-white px-3 py-1 rounded"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Word"}
          </button>
        </div>
      </form>
    </div>
  );
}
