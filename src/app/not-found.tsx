import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto flex max-w-3xl flex-col items-center rounded-[32px] border border-zinc-800 bg-zinc-900 px-6 py-16 text-center">
        <span className="mb-4 rounded-full border border-zinc-700 bg-zinc-950 px-4 py-2 text-xs text-zinc-400">
          Erro 404
        </span>

        <h1 className="text-4xl font-bold md:text-5xl">
          Página não encontrada
        </h1>

        <p className="mt-4 max-w-xl text-zinc-400">
          Esse link não existe, foi removido ou digitado errado.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-2xl bg-green-500 px-6 py-4 text-center font-semibold text-black transition hover:opacity-90"
          >
            Voltar para o início
          </Link>

          <Link
            href="/create"
            className="rounded-2xl border border-zinc-700 px-6 py-4 text-center font-medium transition hover:bg-zinc-800"
          >
            Criar página
          </Link>
        </div>
      </div>
    </main>
  );
}
