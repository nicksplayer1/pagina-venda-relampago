"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  clearSavedPages,
  getSavedPages,
  removeSavedPage,
  SavedPageItem,
} from "../lib/my-pages";
import { formatPriceDisplay } from "../lib/price";

export default function MyPagesSection() {
  const [pages, setPages] = useState<SavedPageItem[]>([]);
  const [message, setMessage] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    setPages(getSavedPages());
  }, []);

  async function handleCopy(slug: string) {
    const url = `${window.location.origin}/${slug}`;
    await navigator.clipboard.writeText(url);
    setMessage("Link copiado.");
    setTimeout(() => setMessage(""), 2000);
  }

  function handleAskClear() {
    setConfirmClear(true);
  }

  function handleCancelClear() {
    setConfirmClear(false);
  }

  function handleConfirmClear() {
    clearSavedPages();
    setPages([]);
    setConfirmClear(false);
    setMessage("Lista limpa.");
    setTimeout(() => setMessage(""), 2000);
  }

  function handleRemoveOne(slug: string, title: string) {
    const ok = window.confirm(`Remover "${title}" da lista deste navegador?`);
    if (!ok) return;

    removeSavedPage(slug);
    setPages(getSavedPages());
    setMessage("Página removida da lista.");
    setTimeout(() => setMessage(""), 2000);
  }

  if (pages.length === 0) {
    return (
      <section className="px-4 py-4 md:px-6 md:py-6">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-zinc-800 bg-zinc-900 p-6 md:p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
            Minhas páginas
          </p>
          <h3 className="mt-3 text-2xl font-bold md:text-3xl">
            As páginas que você criar vão aparecer aqui
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
            Esta lista fica salva neste navegador para você abrir de novo e copiar
            seus links com facilidade.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-4 md:px-6 md:py-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex flex-col gap-3 rounded-[28px] border border-zinc-800 bg-zinc-900 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
              Minhas páginas
            </p>
            <h3 className="mt-2 text-2xl font-bold">Seus links criados</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Salvos neste navegador para abrir e copiar rapidamente.
            </p>
          </div>

          {confirmClear ? (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleConfirmClear}
                className="rounded-xl bg-red-500 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Confirmar limpar
              </button>

              <button
                onClick={handleCancelClear}
                className="rounded-xl border border-zinc-700 px-4 py-3 text-sm transition hover:bg-zinc-800"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              onClick={handleAskClear}
              className="rounded-xl border border-zinc-700 px-4 py-3 text-sm transition hover:bg-zinc-800"
            >
              Limpar lista
            </button>
          )}
        </div>

        {message ? (
          <div className="mb-4 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-300">
            {message}
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pages.map((item) => (
            <div
              key={item.slug}
              className="overflow-hidden rounded-[28px] border border-zinc-800 bg-zinc-900"
            >
              <div className="relative aspect-[4/3] bg-zinc-950">
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

                <button
                  type="button"
                  onClick={() => handleRemoveOne(item.slug, item.title)}
                  className="absolute right-3 top-3 rounded-full border border-zinc-700 bg-zinc-950/90 px-3 py-2 text-xs transition hover:bg-zinc-800"
                  title="Remover da lista"
                >
                  🗑
                </button>
              </div>

              <div className="p-5">
                <h4 className="line-clamp-2 text-xl font-bold">{item.title}</h4>
                <p className="mt-2 text-green-400">
                  {formatPriceDisplay(item.price)}
                </p>
                <p className="mt-2 break-all text-sm text-zinc-400">/{item.slug}</p>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <Link
                    href={`/${item.slug}`}
                    className="rounded-xl border border-zinc-700 px-4 py-3 text-center text-sm transition hover:bg-zinc-800"
                  >
                    Abrir
                  </Link>

                  <button
                    onClick={() => handleCopy(item.slug)}
                    className="rounded-xl bg-green-500 px-4 py-3 text-sm font-medium text-black transition hover:opacity-90"
                  >
                    Copiar link
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
