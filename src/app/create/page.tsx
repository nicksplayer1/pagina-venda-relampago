"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function CreatePage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const baseSlug = slugify(title);

    if (!baseSlug) {
      setMessage("Digite um nome válido para o produto.");
      setLoading(false);
      return;
    }

    let finalSlug = baseSlug;

    const payload = {
      title: title.trim(),
      price: price.trim(),
      description: description.trim(),
      image_url: imageUrl.trim(),
      whatsapp_number: whatsappNumber.trim(),
      slug: finalSlug,
    };

    let { error } = await supabase.from("pages").insert([payload]);

    if (error && error.code === "23505") {
      finalSlug = `${baseSlug}-${Date.now().toString().slice(-6)}`;

      const retry = await supabase.from("pages").insert([
        {
          ...payload,
          slug: finalSlug,
        },
      ]);

      error = retry.error;
    }

    if (error) {
      setMessage("Erro ao salvar: " + error.message);
      setLoading(false);
      return;
    }

    router.push(`/${finalSlug}`);
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
        <h1 className="mb-6 text-2xl font-bold">Criar página do produto</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-300">
              Nome do produto
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
              placeholder="Ex: Escova Removedora de Pelos"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-300">Preço</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
              placeholder="Ex: R$ 49,90"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-300">
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px] w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
              placeholder="Descreva o produto"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-300">
              URL da imagem
            </label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
              placeholder="https://..."
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-300">
              WhatsApp
            </label>
            <input
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
              placeholder="5511999999999"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-500 px-5 py-3 font-medium text-black transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Salvando..." : "Criar página"}
          </button>

          {message ? (
            <p className="text-sm text-red-400">{message}</p>
          ) : null}
        </form>
      </div>
    </main>
  );
}
