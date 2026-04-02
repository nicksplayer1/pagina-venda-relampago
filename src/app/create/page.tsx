"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [ctaText, setCtaText] = useState("Comprar agora");
  const [imageUrl, setImageUrl] = useState("");

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-zinc-400">Criar página</p>
            <h1 className="text-3xl font-bold">Monte sua página de venda</h1>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-900"
          >
            Voltar
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-xl font-semibold">Dados do produto</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Nome do produto
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Mini liquidificador portátil"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none placeholder:text-zinc-500 focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">Preço</label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Ex: R$ 79,90"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none placeholder:text-zinc-500 focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Descrição
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva o produto e os benefícios"
                  rows={5}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none placeholder:text-zinc-500 focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Número do WhatsApp
                </label>
                <input
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Ex: 5564999999999"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none placeholder:text-zinc-500 focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  Texto do botão
                </label>
                <input
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  placeholder="Ex: Comprar agora"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none placeholder:text-zinc-500 focus:border-zinc-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-300">
                  URL da imagem
                </label>
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none placeholder:text-zinc-500 focus:border-zinc-500"
                />
              </div>

              <button
                type="button"
                className="mt-2 w-full rounded-xl bg-white px-5 py-3 font-medium text-black opacity-70"
              >
                Criar página
              </button>

              <p className="text-sm text-zinc-500">
                Neste passo o botão ainda não salva. Vamos ligar no banco no próximo bloco.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="mb-6 text-xl font-semibold">Prévia</h2>

            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
              <div className="aspect-video w-full bg-zinc-900">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={title || "Imagem do produto"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                    Sua imagem vai aparecer aqui
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold">
                  {title || "Nome do produto"}
                </h3>

                <p className="mt-3 text-3xl font-semibold text-green-400">
                  {price || "R$ 0,00"}
                </p>

                <p className="mt-4 whitespace-pre-line text-zinc-300">
                  {description || "A descrição do produto vai aparecer aqui."}
                </p>

                <button
                  type="button"
                  className="mt-6 w-full rounded-xl bg-white px-5 py-3 font-medium text-black"
                >
                  {ctaText || "Comprar agora"}
                </button>

                <p className="mt-3 text-center text-sm text-zinc-500">
                  WhatsApp: {whatsapp || "não informado"}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}