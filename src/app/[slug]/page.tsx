import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PublicPage({ params }: PageProps) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const whatsappNumber = String(data.whatsapp_number ?? "").replace(/\D/g, "");

  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        `Olá! Tenho interesse em ${data.title}`
      )}`
    : "#";

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto max-w-4xl rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
        {data.image_url ? (
          <div className="mb-6 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
            <img
              src={data.image_url}
              alt={data.title || "Produto"}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}

        <h1 className="text-3xl font-bold">
          {data.title || "Nome do produto"}
        </h1>

        <p className="mt-3 text-3xl font-semibold text-green-400">
          {data.price || "R$ 0,00"}
        </p>

        <p className="mt-4 whitespace-pre-line text-zinc-300">
          {data.description || "A descrição do produto vai aparecer aqui."}
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-green-500 px-5 py-3 text-center font-medium text-black transition hover:opacity-90"
          >
            Comprar agora
          </a>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-zinc-700 px-5 py-3 text-center text-zinc-100 transition hover:bg-zinc-800"
          >
            WhatsApp
          </a>
        </div>

        <div className="mt-8">
          <Link
            href="/create"
            className="text-sm text-zinc-400 hover:text-white"
          >
            Criar outra página
          </Link>
        </div>
      </div>
    </main>
  );
}
