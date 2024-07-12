import { SubmitButton } from "@/components/Submit";
import { neon } from "@neondatabase/serverless";
import { redirect } from "next/navigation";

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

    redirect(`/${id}`);
  }
  return (
    <main className="min-h-screen sm:p-24 flex flex-col items-center justify-center">
      <form className="w-full" action={create}>
        <div className="flex justify-center items-center text-lg">
          Email:
          <input
            name="email"
            required
            className="ml-2 rounded p-2 sm:w-[500px]"
            type="email"
          />
        </div>
        <SubmitButton />
      </form>
    </main>
  );
}
