"use client";

import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { formatPriceInput } from "../../lib/price";
import { saveCreatedPage } from "../../lib/my-pages";

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

type InsertedPage = {
  id?: string;
  title: string;
  slug: string;
  price?: string | null;
  image_url?: string | null;
};

export default function CreatePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUploadImage() {
    if (!imageFile) {
      setMessage("Escolha uma imagem primeiro.");
      return;
    }

    setUploadingImage(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", imageFile);

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Erro ao enviar imagem.");
        setUploadingImage(false);
        return;
      }

      setImageUrl(result.imageUrl);
      setMessage("Imagem enviada com sucesso.");
    } catch {
      setMessage("Erro ao enviar imagem.");
    } finally {
      setUploadingImage(false);
    }
  }

  async function createWithPayload(payload: {
    title: string;
    price: string;
    description: string;
    image_url: string;
    whatsapp_number: string;
    slug: string;
  }) {
    return await supabase
      .from("pages")
      .insert([payload])
      .select("id, title, slug, price, image_url")
      .single();
  }

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

    if (!imageUrl.trim()) {
      setMessage("Envie uma imagem ou cole uma URL.");
      setLoading(false);
      return;
    }

    let finalSlug = baseSlug;

    const payload = {
      title: title.trim(),
      price: formatPriceInput(price),
      description: description.trim(),
      image_url: imageUrl.trim(),
      whatsapp_number: whatsappNumber.trim(),
      slug: finalSlug,
    };

    let result = await createWithPayload(payload);

    if (result.error && result.error.code === "23505") {
      finalSlug = `${baseSlug}-${Date.now().toString().slice(-6)}`;
      result = await createWithPayload({
        ...payload,
        slug: finalSlug,
      });
    }

    if (result.error) {
      setMessage("Erro ao salvar: " + result.error.message);
      setLoading(false);
      return;
    }

    const inserted = result.data as InsertedPage | null;

    if (inserted) {
      saveCreatedPage(inserted);
    } else {
      saveCreatedPage({
        title: payload.title,
        slug: finalSlug,
        price: payload.price,
        image_url: payload.image_url,
      });
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
              onChange={(e) => setPrice(formatPriceInput(e.target.value))}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
              placeholder="Ex: R$ 49,90"
              inputMode="numeric"
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

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <label className="mb-2 block text-sm text-zinc-300">
              Upload da imagem
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="hidden"
            />

            <div className="mb-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl border border-zinc-700 px-4 py-3 text-sm transition hover:bg-zinc-800"
              >
                Escolher imagem
              </button>

              <button
                type="button"
                onClick={handleUploadImage}
                disabled={uploadingImage || !imageFile}
                className="rounded-xl border border-zinc-700 px-4 py-3 text-sm transition hover:bg-zinc-800 disabled:opacity-60"
              >
                {uploadingImage ? "Enviando imagem..." : "Enviar imagem"}
              </button>
            </div>

            <p className="text-sm text-zinc-400">
              {imageFile ? imageFile.name : "Nenhuma imagem escolhida"}
            </p>

            {imageUrl ? (
              <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-800">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="h-56 w-full object-cover"
                />
              </div>
            ) : null}
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-300">
              Ou cole a URL da imagem
            </label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
              placeholder="https://..."
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
            <p className="text-sm text-zinc-300">{message}</p>
          ) : null}
        </form>
      </div>
    </main>
  );
}
