"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="border block mx-auto rounded py-2 px-4 text-lg mt-6 bg-green-400 text-white disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Creating..." : "Create Link"}
    </button>
  );
}
