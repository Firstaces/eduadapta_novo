import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const next = (router.query.next as string) || "/cliente";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: senha }),
    });
    if (res.ok) {
      router.replace(next);
    } else {
      const j = await res.json().catch(() => ({}));
      setErro(j?.message || "Senha inválida");
    }
  }

  return (
    <>
      <Head>
        <title>Login da Área do Cliente</title>
      </Head>
      <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow"
        >
          <h1 className="text-xl font-bold mb-4">Área do Cliente</h1>
          <label className="block text-sm font-medium mb-1">
            Senha de teste
          </label>
          <input
            type="password"
            className="w-full border rounded-lg p-2 mb-3"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite a senha"
            required
          />
          {erro && <p className="text-sm text-red-600 mb-3">{erro}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 font-semibold"
          >
            Entrar
          </button>
          <p className="text-xs text-slate-500 mt-3">
            Você será redirecionado para: <code>{next}</code>
          </p>
        </form>
      </main>
    </>
  );
}
