"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import { getWord, updateWord } from "@/app/_lib/actions";

export default function WordPage() {
  const router = useRouter();
  const { id } = useParams();
  const wordId = Number(id);

  const [wordData, setWordData] = useState({
    word: "",
    meaning: "",
    difficulty: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWord() {
      if (!wordId) {
        setError("Invalid ID");
        return;
      }

      const fetchedWord = await getWord(wordId);

      if (fetchedWord.error) {
        setError(fetchedWord.error);
      } else {
        setWordData(fetchedWord); // ✅ Correctly setting the entire fetchedWord object
      }
    }

    fetchWord();
  }, [wordId]);

  async function handleUpdate(event) {
    event.preventDefault();

    if (!wordData.word || !wordData.meaning || !wordData.difficulty) {
      toast.error("All fields are required!");
      return;
    }

    try {
      await updateWord(wordId, wordData);
      toast.success("Word updated successfully!");
      router.push("/dashboard/all-words");
    } catch (err) {
      toast.error("Failed to update word!");
    }
  }

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="m-6">
      <h2 className="text-xl font-bold mb-4">Update Word</h2>

      <form
        onSubmit={handleUpdate}
        className="mt-6 p-4 border rounded-lg shadow bg-gray-100"
      >
        <label className="block mb-2">
          Word:
          <input
            type="text"
            name="word"
            value={wordData.word}
            onChange={(e) => setWordData({ ...wordData, word: e.target.value })}
            className="w-full p-2 border rounded mt-1 bg-white"
            required
          />
        </label>

        <label className="block mb-2">
          Meaning:
          <input
            type="text"
            name="meaning"
            value={wordData.meaning}
            onChange={(e) =>
              setWordData({ ...wordData, meaning: e.target.value })
            }
            className="w-full p-2 border rounded mt-1 bg-white"
            required
          />
        </label>

        <label className="block mb-2">
          Difficulty:
          <input
            type="text"
            name="difficulty"
            value={wordData.difficulty}
            onChange={(e) =>
              setWordData({ ...wordData, difficulty: e.target.value })
            }
            className="w-full p-2 border rounded mt-1 bg-white"
            required
          />
        </label>

        <div className="flex justify-end ">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2  rounded "
            onClick={() => router.push("/dashboard/all-words")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded ml-3"
          >
            Update Word
          </button>
        </div>
      </form>
    </div>
  );
}
