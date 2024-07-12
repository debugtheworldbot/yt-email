import React from "react";
import { neon } from "@neondatabase/serverless";
import Copy from "@/components/Copy";

async function getData(id: string): Promise<string | null> {
  const sql = neon(process.env.DATABASE_URL as string);
  const response = await sql(`SELECT email FROM emails WHERE short_id = $1;`, [
    id,
  ]);
  if (response.length === 0) {
    return null;
  }
  return response[0].email;
}
export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const data = await getData(id);
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      {data}
      <Copy data={data} />
    </main>
  );
}
