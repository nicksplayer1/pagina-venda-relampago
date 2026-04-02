"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";
import { formatPriceInput } from "../../../lib/price";

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

export default function AdminEditPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = String(params?.id ?? "");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadItem() {
    if (!id) return;

    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      setMessage("Erro ao carregar página.");
      setLoading(false);
      return;
    }

    setTitle(data.title ?? "");
    setSlug(data.slug ?? "");
    setPrice(formatPriceInput(data.price ?? ""));
    setDescription(data.description ?? "");
    setImageUrl(data.image_url ?? "");
    setWhatsappNumber(data.whatsapp_number ?? "");
    setLoading(false);
  }

  useEffect(() => {
    loadItem();
  }, [id]);

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const finalSlug = slugify(slug || title);

    if (!finalSlug) {
      setMessage("Digite um slug ou nome válido.");
      setSaving(false);
      return;
    }

    if (!imageUrl.trim()) {
      setMessage("Envie uma imagem ou cole uma URL.");
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from("pages")
      .update({
        title: title.trim(),
        slug: finalSlug,
        price: formatPriceInput(price),
        description: description.trim(),
        image_url: imageUrl.trim(),
        whatsapp_number: whatsappNumber.trim(),
      })
      .eq("id", id);

    if (error) {
      setMessage("Erro ao salvar: " + error.message);
      setSaving(false);
      return;
    }

    setSlug(finalSlug);
    setPrice(formatPriceInput(price));
    setMessage("Página atualizada com sucesso.");
    setSaving(false);
  }

  async function handleLogout() {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/admin-login");
    router.refresh();
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100">
        <div className="mx-auto max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
          Carregando página...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm text-zinc-400">Painel admin</p>
            <h1 className="text-2xl font-bold">Editar página</h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin"
              className="rounded-xl border border-zinc-700 px-4 py-2 text-sm transition hover:bg-zinc-800"
            >
              Voltar
            </Link>

            <button
              onClick={() => router.push(`/${slug}`)}
              className="rounded-xl bg-green-500 px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
            >
              Abrir página
            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-red-700 px-4 py-2 text-sm transition hover:bg-zinc-800"
            >
              Sair
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-300">
              Nome do produto
            </label>
            <input
              value={title}
              onChange={(e) => {
                const value = e.target.value;
                setTitle(value);
                if (!slug) setSlug(slugify(value));
              }}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
              placeholder="Nome do produto"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-300">Slug</label>
            <input
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
              placeholder="nome-do-produto"
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
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-zinc-300">
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[140px] w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
              placeholder="Descrição do produto"
            />
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
            <label className="mb-2 block text-sm text-zinc-300">
              Upload da imagem
            </label>

            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="mb-3 block w-full text-sm"
            />

            <button
              type="button"
              onClick={handleUploadImage}
              disabled={uploadingImage || !imageFile}
              className="rounded-xl border border-zinc-700 px-4 py-3 text-sm transition hover:bg-zinc-800 disabled:opacity-60"
            >
              {uploadingImage ? "Enviando imagem..." : "Enviar imagem"}
            </button>

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
            />
          </div>

          {message ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
              {message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-green-500 px-5 py-3 font-medium text-black transition hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Salvando..." : "Salvar alterações"}
          </button>
        </form>
      </div>
    </main>
  );
}
