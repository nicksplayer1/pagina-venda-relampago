"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type AdminLoginFormProps = {
  errorMessage?: string;
};

export default function AdminLoginForm({
  errorMessage = "",
}: AdminLoginFormProps) {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(errorMessage);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Senha inválida.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setMessage("Erro ao entrar.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
        <p className="mb-2 text-sm text-zinc-400">Área protegida</p>
        <h1 className="mb-6 text-2xl font-bold">Entrar no admin</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-zinc-300">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none"
              placeholder="Digite a senha"
              required
            />
          </div>

          {message ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-300">
              {message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-500 px-5 py-3 font-medium text-black transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </main>
  );
}
