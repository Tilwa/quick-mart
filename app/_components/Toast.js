"use client";
import toast from "react-hot-toast";

export default function ToastSuccess({ message }) {
  return (
    <button onClick={() => toast.success(message || "Success!")}>
      Show Success Toast
    </button>
  );
}
