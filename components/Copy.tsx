"use client";
import React from "react";

export default function Copy({ data }: { data: string | null }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <div>
      <button
        onClick={() => {
          navigator.clipboard.writeText(data || "");
          setCopied(true);
        }}
        className="border block mx-auto rounded py-2 px-4 text-lg mt-6 bg-green-400 text-white"
      >
        COPY
      </button>
      {copied && <div className="text-green-500">copied!</div>}
    </div>
  );
}
