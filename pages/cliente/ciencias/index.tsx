// pages/cliente/ciencias/index.tsx
import Head from "next/head";

type Atividade = {
  codigo: string;
  titulo: string;
  href: string;
  descricao?: string;
};

const ATIVIDADES: Atividade[] = [
  {
    codigo: "C01",
    titulo: "Célula: partes e funções",
    href: "/atividades/ciencias/manifests/ciencias-atividade-01.html",
  },
  {
    codigo: "C02",
    titulo: "Tecidos e órgãos",
    href: "/atividades/ciencias/manifests/ciencias-atividade-02.html",
  },
  {
    codigo: "C03",
    titulo: "Sistema digestório",
    href: "/atividades/ciencias/manifests/ciencias-atividade-03.html",
  },
  {
    codigo: "C04",
    titulo: "Sistema respiratório",
    href: "/atividades/ciencias/manifests/ciencias-atividade-04.html",
  },
  {
    codigo: "C05",
    titulo: "Sistema circulatório",
    href: "/atividades/ciencias/manifests/ciencias-atividade-05.html",
  },
  {
    codigo: "C06",
    titulo: "Sistema nervoso",
    href: "/atividades/ciencias/manifests/ciencias-atividade-06.html",
  },
  {
    codigo: "C07",
    titulo: "Reprodução e saúde",
    href: "/atividades/ciencias/manifests/ciencias-atividade-07.html",
  },
  {
    codigo: "C08",
    titulo: "Ecossistemas",
    href: "/atividades/ciencias/manifests/ciencias-atividade-08.html",
  },
  {
    codigo: "C09",
    titulo: "Cadeias alimentares",
    href: "/atividades/ciencias/manifests/ciencias-atividade-09.html",
  },
  {
    codigo: "C10",
    titulo: "Biomas brasileiros",
    href: "/atividades/ciencias/manifests/ciencias-atividade-10.html",
  },
  {
    codigo: "C11",
    titulo: "Fotossíntese",
    href: "/atividades/ciencias/manifests/ciencias-atividade-11.html",
  },
  {
    codigo: "C12",
    titulo: "Respiração celular",
    href: "/atividades/ciencias/manifests/ciencias-atividade-12.html",
  },
  {
    codigo: "C13",
    titulo: "Matéria: estados físicos",
    href: "/atividades/ciencias/manifests/ciencias-atividade-13.html",
  },
  {
    codigo: "C14",
    titulo: "Misturas e separações",
    href: "/atividades/ciencias/manifests/ciencias-atividade-14.html",
  },
  {
    codigo: "C15",
    titulo: "Tabela periódica: o básico",
    href: "/atividades/ciencias/manifests/ciencias-atividade-15.html",
  },
  {
    codigo: "C16",
    titulo: "Forças e movimento",
    href: "/atividades/ciencias/manifests/ciencias-atividade-16.html",
  },
  {
    codigo: "C17",
    titulo: "Formas de energia",
    href: "/atividades/ciencias/manifests/ciencias-atividade-17.html",
  },
  {
    codigo: "C18",
    titulo: "Eletricidade simples",
    href: "/atividades/ciencias/manifests/ciencias-atividade-18.html",
  },
  {
    codigo: "C19",
    titulo: "Ciclo da água",
    href: "/atividades/ciencias/manifests/ciencias-atividade-19.html",
  },
  {
    codigo: "C20",
    titulo: "Método científico (simplificado)",
    href: "/atividades/ciencias/manifests/ciencias-atividade-20.html",
  },
];

export default function CienciasCliente() {
  return (
    <>
      <Head>
        <title>Cliente • Ciências (20 atividades)</title>
      </Head>

      <main
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: 24,
          fontFamily:
            "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
          Ciências — 20 atividades
        </h1>
        <p style={{ color: "#475569", marginBottom: 16 }}>
          Versão online/impressão • arquivos HTML estáticos em{" "}
          <code>/public/atividades/ciencias/manifests</code>
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {ATIVIDADES.map((a) => (
            <article
              key={a.codigo}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: 16,
                background: "#fff",
              }}
            >
              <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700 }}>
                {a.codigo} — {a.titulo}
              </h3>
              {a.descricao && (
                <p style={{ color: "#64748b", margin: "0 0 12px" }}>
                  {a.descricao}
                </p>
              )}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <a
                  href={a.href}
                  style={{
                    padding: "8px 12px",
                    background: "#111827",
                    color: "#fff",
                    borderRadius: 8,
                    textDecoration: "none",
                  }}
                >
                  Abrir
                </a>
                <a
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "8px 12px",
                    background: "#059669",
                    color: "#fff",
                    borderRadius: 8,
                    textDecoration: "none",
                  }}
                >
                  Nova aba
                </a>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
