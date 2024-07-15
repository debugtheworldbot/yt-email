import { SubmitButton } from "@/components/Submit";
import { neon } from "@neondatabase/serverless";
import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});
export default async function Home() {
  async function create(formData: FormData) {
    "use server";
    const sql = neon(process.env.DATABASE_URL!);
    const validatedFields = schema.safeParse({
      email: formData.get("email"),
    });
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    const res = await sql(
      "INSERT INTO emails (email) VALUES ($1) RETURNING short_id",
      [validatedFields.data.email],
    );
    const id: string = res[0].short_id;

    redirect(`/${id}?from=create`);
  }
  return (
    <main className="min-h-screen sm:p-24 flex flex-col items-center justify-center">
      <Link
        href="https://x.com/mws/status/1811816494529237248"
        target="_blank"
        className="text-2xl font-medium hover:underline"
      >
        YouTube removed your channel{"'"}s Business Email section.
      </Link>
      <h1 className="text-xl max-w-2xl mt-2">
        Don{`'`}t worry. This site helps YouTubers manage their email and
        <i className="font-medium"> avoid bots/scammers</i>.
        Sponsors/advertisers can use it to find your email.
      </h1>
      <Link href="/ff92ee66" className="mb-6 text-lg">
        demo email link: <span className="underline">mailof.me/ff92ee66</span>
      </Link>
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
