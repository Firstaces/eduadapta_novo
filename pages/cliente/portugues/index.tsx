// pages/cliente/portugues/index.tsx
import Head from "next/head";

type Atividade = {
  codigo: string;
  titulo: string;
  href: string;
  descricao?: string;
};

const ATIVIDADES: Atividade[] = [
  {
    codigo: "P01",
    titulo: "Leitura guiada de microconto",
    href: "/atividades/portugues/01-leitura-microconto.html",
  },
  {
    codigo: "P02",
    titulo: "Sequência de fatos (tirinha)",
    href: "/atividades/portugues/02-sequencia-tirinha.html",
  },
  {
    codigo: "P03",
    titulo: "Mapa de personagens",
    href: "/atividades/portugues/03-mapa-de-personagens.html",
  },
  {
    codigo: "P04",
    titulo: "Leitura multimodal (tirinhas)",
    href: "/atividades/portugues/04-leitura-multimodal-tirinhas.html",
  },
  {
    codigo: "P05",
    titulo: "Reconto com apoio",
    href: "/atividades/portugues/05-reconto-com-apoios.html",
  },
  {
    codigo: "P06",
    titulo: "Vocabulário em contexto",
    href: "/atividades/portugues/06-vocabulario-em-contexto.html",
  },
  {
    codigo: "P07",
    titulo: "Gêneros do cotidiano",
    href: "/atividades/portugues/07-generos-do-cotidiano.html",
  },
  {
    codigo: "P08",
    titulo: "Produção bilhete",
    href: "/atividades/portugues/08-producao-bilhete-modelo.html",
  },
  {
    codigo: "P09",
    titulo: "Cartaz de convivência",
    href: "/atividades/portugues/09-cartaz-de-convivencia.html",
  },
  {
    codigo: "P10",
    titulo: "Conectivos básicos",
    href: "/atividades/portugues/10-conectivos-basicos.html",
  },
  {
    codigo: "P11",
    titulo: "Pontuação do diálogo",
    href: "/atividades/portugues/11-pontuacao-do-dialogo.html",
  },
  {
    codigo: "P12",
    titulo: "Notícia: manchete e lead",
    href: "/atividades/portugues/12-noticia-manchete-e-lead.html",
  },
  {
    codigo: "P13",
    titulo: "Propaganda: intenção",
    href: "/atividades/portugues/13-propaganda-intencao.html",
  },
  {
    codigo: "P14",
    titulo: "Instruções: receita simples",
    href: "/atividades/portugues/14-instrucoes-receita-simples.html",
  },
  {
    codigo: "P15",
    titulo: "Reescrita para clareza",
    href: "/atividades/portugues/15-reescrita-para-clareza.html",
  },
  {
    codigo: "P16",
    titulo: "Ortografia por padrões",
    href: "/atividades/portugues/16-ortografia-por-padroes.html",
  },
  {
    codigo: "P17",
    titulo: "Expressão oral com apoio",
    href: "/atividades/portugues/17-expressao-oral-com-apoio.html",
  },
  {
    codigo: "P18",
    titulo: "Poema curto (haicai)",
    href: "/atividades/portugues/18-poema-curto-haicai.html",
  },
  {
    codigo: "P19",
    titulo: "Ideia principal e exemplos",
    href: "/atividades/portugues/19-ideia-principal-e-exemplos.html",
  },
  {
    codigo: "P20",
    titulo: "Projeto final: folheto",
    href: "/atividades/portugues/20-projeto-final-folheto.html",
  },
];

export default function PortuguesCliente() {
  return (
    <>
      <Head>
        <title>Cliente • Português (20 atividades)</title>
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
          Português — 20 atividades
        </h1>
        <p style={{ color: "#475569", marginBottom: 16 }}>
          Versão online/impressão • arquivos HTML estáticos em{" "}
          <code>/public/atividades/portugues</code>
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
                    background: "#2563eb",
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
