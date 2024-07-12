export default function Home() {
  return (
    <main className="min-h-screen p-24 flex flex-col items-center justify-center">
      <form>
        <div>
          Email:
          <input required className="ml-2 rounded p-2 w-[500px]" type="email" />
        </div>
        <button
          type="submit"
          className="border block mx-auto rounded py-2 px-4 text-lg mt-6 bg-green-400 text-white"
        >
          create link
        </button>
      </form>
    </main>
  );
}
