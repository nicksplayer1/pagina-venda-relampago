import Link from "next/link";
import MyPagesSection from "../components/MyPagesSection";
import FeedbackSection from "../components/FeedbackSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="px-4 py-8 md:px-6 md:py-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-[28px] border border-zinc-800 bg-zinc-900 px-4 py-4 md:px-6">
          <div>
            <p className="text-sm text-zinc-400">Página de venda relâmpago</p>
            <h1 className="text-lg font-semibold md:text-xl">
              Venda com link simples
            </h1>
          </div>

          <a
            href="#feedback"
            className="rounded-xl border border-zinc-700 px-4 py-2 text-sm transition hover:bg-zinc-800"
          >
            Feedback
          </a>
        </div>
      </section>

      <section className="px-4 pb-8 pt-4 md:px-6 md:pb-12 md:pt-6">
        <div className="mx-auto max-w-6xl rounded-[36px] border border-zinc-800 bg-zinc-900 px-6 py-12 text-center md:px-10 md:py-20">
          <span className="inline-flex rounded-full border border-zinc-700 bg-zinc-950 px-4 py-2 text-xs text-zinc-300">
            Página de venda relâmpago
          </span>

          <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-bold leading-tight md:text-7xl">
            Crie uma página de venda em poucos minutos
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-xl">
            Monte uma página simples para vender no WhatsApp, Instagram, TikTok
            ou onde quiser. Preencha os dados do produto, envie a imagem, gere
            o link e compartilhe.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/create"
              className="rounded-2xl bg-green-500 px-6 py-4 text-center text-base font-semibold text-black transition hover:opacity-90"
            >
              Criar minha página
            </Link>

            <Link
              href="#minhas-paginas"
              className="rounded-2xl border border-zinc-700 px-6 py-4 text-center text-base font-medium transition hover:bg-zinc-800"
            >
              Ver minhas páginas
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-4 md:px-6 md:py-6">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          <div className="rounded-[28px] border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-lg font-semibold">1. Preencha</p>
            <p className="mt-2 text-sm leading-7 text-zinc-400">
              Digite nome, preço, descrição, imagem e botão do WhatsApp.
            </p>
          </div>

          <div className="rounded-[28px] border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-lg font-semibold">2. Gere o link</p>
            <p className="mt-2 text-sm leading-7 text-zinc-400">
              O sistema cria uma página pronta e gera um link público bonito.
            </p>
          </div>

          <div className="rounded-[28px] border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-lg font-semibold">3. Compartilhe</p>
            <p className="mt-2 text-sm leading-7 text-zinc-400">
              Envie no WhatsApp, Instagram, TikTok ou onde quiser divulgar.
            </p>
          </div>
        </div>
      </section>

      <section id="minhas-paginas">
        <MyPagesSection />
      </section>

      <section className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
              Vantagens
            </p>
            <h3 className="mt-3 text-3xl font-bold md:text-4xl">
              Simples de criar e rápido de vender
            </h3>

            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
                ✓ Admin para criar, editar e excluir páginas
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
                ✓ Link com preview ao compartilhar
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
                ✓ Upload de imagem e preço formatado
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
                ✓ Atendimento direto pelo WhatsApp
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-zinc-800 bg-zinc-900 p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
              Exemplo de uso
            </p>
            <h3 className="mt-3 text-3xl font-bold md:text-4xl">
              Use para vender sem complicação
            </h3>

            <p className="mt-6 text-base leading-8 text-zinc-400">
              Ideal para catálogo rápido, produto único, promoção, afiliado,
              dropshipping, vendas por direct ou campanhas com link curto.
            </p>
          </div>
        </div>
      </section>

      <section id="feedback">
        <FeedbackSection />
      </section>
    </main>
  );
}
