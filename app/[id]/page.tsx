import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      Page:{id}
      example@example.com
      <button className="border block mx-auto rounded py-2 px-4 text-lg mt-6 bg-green-400 text-white">
        COPY
      </button>
    </main>
  );
}
