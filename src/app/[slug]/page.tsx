import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { formatPriceDisplay } from "../../lib/price";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function getPageBySlug(slug: string) {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) return null;
  return data;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPageBySlug(slug);

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  const pageUrl = `${siteUrl}/${slug}`;

  if (!data) {
    return {
      metadataBase: new URL(siteUrl),
      title: "Página não encontrada",
      description: "Esta página não foi encontrada.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = data.title || "Produto";
  const price = formatPriceDisplay(data.price);
  const description =
    (data.description?.trim() || `Confira ${title} e fale no WhatsApp para comprar.`).slice(0, 160);

  const imageUrl = data.image_url || `${siteUrl}/favicon.ico`;

  return {
    metadataBase: new URL(siteUrl),
    title: `${title} | ${price}`,
    description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${title} | ${price}`,
      description,
      url: pageUrl,
      siteName: "Página de venda relâmpago",
      type: "website",
      locale: "pt_BR",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${price}`,
      description,
      images: [imageUrl],
    },
  };
}

export default async function PublicPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getPageBySlug(slug);

  if (!data) {
    notFound();
  }

  const whatsappNumber = String(data.whatsapp_number ?? "").replace(/\D/g, "");

  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        `Olá! Tenho interesse em ${data.title}`
      )}`
    : "#";

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <section className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 rounded-[32px] border border-zinc-800 bg-zinc-900 p-4 shadow-2xl md:grid-cols-2 md:p-8">
            <div className="overflow-hidden rounded-[28px] border border-zinc-800 bg-zinc-950">
              {data.image_url ? (
                <img
                  src={data.image_url}
                  alt={data.title || "Produto"}
                  className="h-full min-h-[320px] w-full object-cover md:min-h-[520px]"
                />
              ) : (
                <div className="flex min-h-[320px] items-center justify-center text-zinc-500 md:min-h-[520px]">
                  Sem imagem
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <span className="mb-4 inline-flex w-fit rounded-full border border-zinc-700 bg-zinc-950 px-4 py-2 text-xs text-zinc-300">
                Oferta especial
              </span>

              <h1 className="text-3xl font-bold leading-tight md:text-5xl">
                {data.title || "Nome do produto"}
              </h1>

              <p className="mt-4 text-3xl font-bold text-green-400 md:text-4xl">
                {formatPriceDisplay(data.price)}
              </p>

              <p className="mt-5 whitespace-pre-line text-base leading-7 text-zinc-300 md:text-lg">
                {data.description || "A descrição do produto vai aparecer aqui."}
              </p>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
                  ✓ Atendimento rápido pelo WhatsApp
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
                  ✓ Link simples para compartilhar
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
                  ✓ Página direta e fácil de visualizar
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-green-500 px-6 py-4 text-center text-base font-semibold text-black transition hover:opacity-90"
                >
                  Comprar agora
                </a>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-zinc-700 px-6 py-4 text-center text-base font-medium transition hover:bg-zinc-800"
                >
                  Falar no WhatsApp
                </a>
              </div>

              <p className="mt-4 text-sm text-zinc-500">
                Atendimento simples e rápido.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-4 md:px-6 md:pb-6">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          <div className="rounded-[28px] border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-lg font-semibold">1. Veja o produto</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Analise a imagem, confira o valor e veja a descrição de forma rápida.
            </p>
          </div>

          <div className="rounded-[28px] border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-lg font-semibold">2. Tire dúvidas</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Fale direto pelo WhatsApp para pedir detalhes e combinar a compra.
            </p>
          </div>

          <div className="rounded-[28px] border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-lg font-semibold">3. Finalize rápido</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Um fluxo simples para vender sem complicação e sem páginas confusas.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-8 md:px-6 md:py-12">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-zinc-800 bg-zinc-900 p-6 md:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
              Pronto para comprar?
            </p>

            <h2 className="mt-3 text-2xl font-bold md:text-4xl">
              Fale agora e receba atendimento pelo WhatsApp
            </h2>

            <p className="mt-4 text-zinc-400">
              Clique no botão abaixo para continuar.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-green-500 px-6 py-4 text-center text-base font-semibold text-black transition hover:opacity-90"
              >
                Quero comprar
              </a>

              <Link
                href="/create"
                className="rounded-2xl border border-zinc-700 px-6 py-4 text-center text-base font-medium transition hover:bg-zinc-800"
              >
                Criar outra página
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
