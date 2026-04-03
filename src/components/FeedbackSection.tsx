"use client";

import { useState } from "react";

const feedbackEmail = "alphanicks1@gmail.com";
const gmailHref =
  "https://mail.google.com/mail/?view=cm&fs=1&to=alphanicks1@gmail.com&su=Feedback%20do%20site&body=Oi!%20Quero%20deixar%20um%20feedback%20sobre%20o%20site.";

export default function FeedbackSection() {
  const [message, setMessage] = useState("");

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(feedbackEmail);
      setMessage("E-mail copiado.");
      setTimeout(() => setMessage(""), 2000);
    } catch {
      setMessage("Não foi possível copiar o e-mail.");
      setTimeout(() => setMessage(""), 2000);
    }
  }

  return (
    <section className="px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-6xl rounded-[36px] border border-zinc-800 bg-zinc-900 px-6 py-12 text-center md:px-10">
        <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
          Feedback
        </p>

        <h3 className="mt-3 text-3xl font-bold md:text-5xl">
          Encontrou algo para melhorar?
        </h3>

        <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
          Seu feedback ajuda a deixar a ferramenta melhor e mais simples de usar.
        </p>

        <p className="mt-6 text-sm text-zinc-500">
          E-mail para feedback: {feedbackEmail}
        </p>

        {message ? (
          <div className="mx-auto mt-4 max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
            {message}
          </div>
        ) : null}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={gmailHref}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-green-500 px-6 py-4 text-center text-base font-semibold text-black transition hover:opacity-90"
          >
            Abrir Gmail
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="rounded-2xl border border-zinc-700 px-6 py-4 text-center text-base font-medium transition hover:bg-zinc-800"
          >
            Copiar e-mail
          </button>
        </div>
      </div>
    </section>
  );
}
