 import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1 text-sm text-zinc-300">
          Página de venda relâmpago
        </span>

        <h1 className="max-w-4xl text-4xl font-bold leading-tight sm:text-6xl">
          Crie uma página de venda em poucos minutos
        </h1>

        <p className="mt-6 max-w-2xl text-base text-zinc-400 sm:text-lg">
          Monte uma página simples para vender no WhatsApp, Instagram ou onde quiser.
          Preencha os dados do produto, gere o link e compartilhe.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/create"
            className="rounded-xl bg-white px-6 py-3 font-medium text-black transition hover:opacity-90"
          >
            Criar minha página
          </Link>

          <a
            href="#como-funciona"
            className="rounded-xl border border-zinc-700 px-6 py-3 font-medium text-white transition hover:bg-zinc-900"
          >
            Ver como funciona
          </a>
        </div>
      </section>

      <section
        id="como-funciona"
        className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3"
      >
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold">1. Preencha</h2>
          <p className="mt-3 text-sm text-zinc-400">
            Digite nome, preço, descrição, imagem e botão de compra.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold">2. Gere o link</h2>
          <p className="mt-3 text-sm text-zinc-400">
            O sistema cria uma página pronta e gera um link público.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-xl font-semibold">3. Compartilhe</h2>
          <p className="mt-3 text-sm text-zinc-400">
            Envie no WhatsApp, Instagram, TikTok ou onde quiser divulgar.
          </p>
        </div>
      </section>
    </main>
  );
}