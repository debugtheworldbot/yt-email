"use client";
import React from "react";

export default function Copy({ data }: { data: string | null }) {
  const [copied, setCopied] = React.useState({ link: false, email: false });
  return (
    <div>
      <button
        onClick={() => {
          navigator.clipboard.writeText(data || "");
          setCopied({ link: false, email: true });
        }}
        className="border block mx-auto rounded py-2 px-4 text-lg font-medium mt-6 bg-green-400 text-white"
      >
        COPY EMAIL
      </button>
      <p className="text-lg font-medium mt-6">{window.location.href}</p>
      <button
        onClick={() => {
          const host = window.location.href;
          navigator.clipboard.writeText(host || "");
          setCopied({ link: true, email: false });
        }}
        className="border block mx-auto rounded py-2 px-4 text-lg mt-2 bg-green-400 text-white"
      >
        COPY SHARE LINK
      </button>
      {(copied.link || copied.email) && (
        <div className="text-green-500 text-center mt-4 text-lg">
          {copied.link ? "link" : "email"} copied!
        </div>
      )}
    </div>
  );
}
