"use client";
import React, { useEffect } from "react";

export default function Copy({ data }: { data: string | null }) {
  const [copied, setCopied] = React.useState({ link: false, email: false });
  const [fromCreate, setFromCreate] = React.useState(false);

  useEffect(() => {
    setFromCreate(window.location.search.includes("from=create"));
  }, []);

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
      {fromCreate && (
        <div>
          <p className="text-lg font-medium mt-6">
            {location.origin}
            {location.pathname}
          </p>
          <button
            onClick={() => {
              const host = location.origin + location.pathname;
              navigator.clipboard.writeText(host || "");
              setCopied({ link: true, email: false });
            }}
            className="border block mx-auto rounded py-2 px-4 text-lg mt-2 bg-green-400 text-white"
          >
            COPY SHARE LINK
          </button>
        </div>
      )}
      {(copied.link || copied.email) && (
        <div className="text-green-500 text-center mt-4 text-lg">
          {copied.link ? "link" : "email"} copied!
        </div>
      )}
    </div>
  );
}
