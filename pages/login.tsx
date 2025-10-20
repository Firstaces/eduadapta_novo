// pages/login.tsx
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("teste@eduadapta.com");
  const [senha, setSenha] = useState("teste123");
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setLoading(true);

    const resp = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    setLoading(false);

    if (!resp.ok) {
      setErro("Email ou senha inválidos.");
      return;
    }

    // espera curtinha para o cookie ‘assentar’
    await new Promise((r) => setTimeout(r, 80));

    const next =
      new URLSearchParams(window.location.search).get("next") || "/cliente";
    window.location.assign(next); // redirecionamento “duro” (middleware já enxerga o cookie)
  }

  return (
    <main
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        fontFamily: "system-ui",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: 360,
          background: "white",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,.08)",
        }}
      >
        <h1 style={{ margin: 0 }}>Área do Cliente</h1>
        <p style={{ marginTop: 8, opacity: 0.8 }}>
          Acesse seus kits adquiridos
        </p>

        <label style={{ display: "block", marginTop: 16 }}>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ddd",
              marginTop: 6,
            }}
          />
        </label>

        <label style={{ display: "block", marginTop: 12 }}>
          <span>Senha</span>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #ddd",
              marginTop: 6,
            }}
          />
        </label>

        {erro && <div style={{ color: "#b00020", marginTop: 10 }}>{erro}</div>}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            marginTop: 16,
            padding: 12,
            borderRadius: 8,
            background: "#1d4ed8",
            color: "white",
            border: "none",
            fontWeight: 600,
          }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <a
          href="/"
          style={{ display: "inline-block", marginTop: 12, opacity: 0.8 }}
        >
          ← Voltar
        </a>
      </form>
    </main>
  );
}
