import { SubmitButton } from "@/components/Submit";
import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";

const host = process.env.HOST || "http://localhost:3000";
export default async function Home() {
  async function create(formData: FormData) {
    "use server";
    const sql = neon(process.env.DATABASE_URL!);
    const email = formData.get("email");
    const res = await sql(
      "INSERT INTO emails (email) VALUES ($1) RETURNING short_id",
      [email],
    );
    const id: string = res[0].short_id;

    redirect(`${host}/${id}`);
  }
  return (
    <main className="min-h-screen p-24 flex flex-col items-center justify-center">
      <form action={create}>
        <div>
          Email:
          <input
            name="email"
            required
            className="ml-2 rounded p-2 w-[500px]"
            type="email"
          />
        </div>
        <SubmitButton />
      </form>
    </main>
  );
}
