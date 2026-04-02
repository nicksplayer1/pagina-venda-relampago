"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { formatPriceDisplay } from "../../lib/price";

type PageItem = {
  id: string;
  title: string;
  slug: string;
  price: string | null;
  image_url: string | null;
  created_at: string | null;
};

export default function AdminPage() {
  const router = useRouter();
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  async function loadPages() {
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("pages")
      .select("id, title, slug, price, image_url, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage("Erro ao carregar: " + error.message);
      setPages([]);
      setLoading(false);
      return;
    }

    setPages(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadPages();
  }, []);

  const filteredPages = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return pages;

    return pages.filter((item) => {
      return (
        item.title?.toLowerCase().includes(q) ||
        item.slug?.toLowerCase().includes(q) ||
        item.price?.toLowerCase().includes(q)
      );
    });
  }, [pages, search]);

  async function handleDelete(id: string, title: string) {
    const ok = window.confirm(`Excluir a página "${title}"?`);

    if (!ok) return;

    const { error } = await supabase.from("pages").delete().eq("id", id);

    if (error) {
      setMessage("Erro ao excluir: " + error.message);
      return;
    }

    setPages((current) => current.filter((item) => item.id !== id));
    setMessage("Página excluída com sucesso.");
  }

  async function handleCopy(slug: string) {
    const url = `${window.location.origin}/${slug}`;
    await navigator.clipboard.writeText(url);
    setMessage("Link copiado.");
  }

  async function handleLogout() {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/admin-login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-zinc-800 bg-zinc-900 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-2 text-sm text-zinc-400">Painel admin</p>
            <h1 className="text-3xl font-bold">Gerenciar páginas</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Total de páginas: {pages.length}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="rounded-xl border border-zinc-700 px-4 py-3 text-center transition hover:bg-zinc-800"
            >
              Ver site
            </Link>

            <Link
              href="/create"
              className="rounded-xl bg-green-500 px-4 py-3 text-center font-medium text-black transition hover:opacity-90"
            >
              Nova página
            </Link>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-red-700 px-4 py-3 text-center transition hover:bg-zinc-800"
            >
              Sair
            </button>
          </div>
        </div>

        <div className="mb-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome, slug ou preço"
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
          />
        </div>

        {message ? (
          <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300">
            {message}
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            Carregando páginas...
          </div>
        ) : filteredPages.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
            Nenhuma página encontrada.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredPages.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900"
              >
                <div className="aspect-[4/3] bg-zinc-950">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                      Sem imagem
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h2 className="line-clamp-2 text-xl font-bold">{item.title}</h2>

                  <p className="mt-2 text-green-400">{formatPriceDisplay(item.price)}</p>

                  <p className="mt-2 break-all text-sm text-zinc-400">
                    /{item.slug}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    <Link
                      href={`/${item.slug}`}
                      className="rounded-xl border border-zinc-700 px-4 py-3 text-center text-sm transition hover:bg-zinc-800"
                    >
                      Abrir
                    </Link>

                    <button
                      onClick={() => handleCopy(item.slug)}
                      className="rounded-xl border border-zinc-700 px-4 py-3 text-sm transition hover:bg-zinc-800"
                    >
                      Copiar link
                    </button>

                    <Link
                      href={`/admin/${item.id}`}
                      className="rounded-xl bg-blue-500 px-4 py-3 text-center text-sm font-medium text-white transition hover:opacity-90"
                    >
                      Editar
                    </Link>

                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      className="rounded-xl bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
