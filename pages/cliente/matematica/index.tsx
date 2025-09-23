import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import ActivityViewer from "@/components/ActivityViewer";

type Atividade = {
  codigo: string;
  titulo: string;
  href: string;
  descricao?: string;
};

const FALLBACK: Atividade[] = [
  {
    codigo: "M01",
    titulo: "Consumo de Combustível — Função Linear",
    href: "/atividades/matematica/manifests/01-combustivel-funcao-linear.html",
  },
  {
    codigo: "M02",
    titulo: "Gráfico — Interpretação de Dados",
    href: "/atividades/matematica/manifests/02-grafico-interpretacao-dados.html",
  },
  {
    codigo: "M03",
    titulo: "Equação do Segundo Grau",
    href: "/atividades/matematica/manifests/03-equacao-segundo-grau.html",
  },
  {
    codigo: "M04",
    titulo: "Sistema Linear — Vendas",
    href: "/atividades/matematica/manifests/04-sistema-linear-vendas.html",
  },
  {
    codigo: "M05",
    titulo: "Inequações — Orçamento",
    href: "/atividades/matematica/manifests/05-inequacao-orcamento.html",
  },
  {
    codigo: "M06",
    titulo: "Área e Perímetro — Terreno",
    href: "/atividades/matematica/manifests/06-area-perimetro-terreno.html",
  },
  {
    codigo: "M07",
    titulo: "Volume do Cilindro — Reservatório",
    href: "/atividades/matematica/manifests/07-volume-cilindro-reservatorio.html",
  },
  {
    codigo: "M08",
    titulo: "Teorema de Pitágoras — Distância",
    href: "/atividades/matematica/manifests/08-teorema-pitagoras-distancia.html",
  },
  {
    codigo: "M09",
    titulo: "Trigonometria — Rampa",
    href: "/atividades/matematica/manifests/09-trigonometria-rampa.html",
  },
  {
    codigo: "M10",
    titulo: "Circunferência — Pista de Corrida",
    href: "/atividades/matematica/manifests/10-circunferencia-pista-corrida.html",
  },
  {
    codigo: "M11",
    titulo: "Porcentagem — Desconto",
    href: "/atividades/matematica/manifests/11-porcentagem-desconto.html",
  },
  {
    codigo: "M12",
    titulo: "Juros Compostos — Investimento",
    href: "/atividades/matematica/manifests/12-juros-compostos-investimento.html",
  },
  {
    codigo: "M13",
    titulo: "Regra de Três — Produção",
    href: "/atividades/matematica/manifests/13-regra-tres-producao.html",
  },
  {
    codigo: "M14",
    titulo: "Média de Notas — Aprovação",
    href: "/atividades/matematica/manifests/14-media-notas-aprovacao.html",
  },
  {
    codigo: "M15",
    titulo: "Probabilidade — Sorteio",
    href: "/atividades/matematica/manifests/15-probabilidade-sorteio.html",
  },
  {
    codigo: "M16",
    titulo: "Progressão Aritmética — Poupança",
    href: "/atividades/matematica/manifests/16-progressao-aritmetica-poupanca.html",
  },
  {
    codigo: "M17",
    titulo: "Logaritmos — Escala pH",
    href: "/atividades/matematica/manifests/17-logaritmos-escala-ph.html",
  },
  {
    codigo: "M18",
    titulo: "Matrizes — Controle de Estoque",
    href: "/atividades/matematica/manifests/18-matrizes-controle-estoque.html",
  },
  {
    codigo: "M19",
    titulo: "Análise Combinatória — Eventos",
    href: "/atividades/matematica/manifests/19-analise-combinatoria-eventos.html",
  },
  {
    codigo: "M20",
    titulo: "Estatística Descritiva — Notas",
    href: "/atividades/matematica/manifests/20-estatistica-descritiva-notas.html",
  },
];

export default function AreaClienteMatematica() {
  // proteção simples (depois trocamos por cookie via link mágico)
  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    if (token) {
      localStorage.setItem("edua_access", "ok");
      history.replaceState({}, "", location.pathname);
    } else if (!localStorage.getItem("edua_access")) {
      // opcional: redirecionar para /login
      // location.href = "/login";
    }
  }, []);

  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<Atividade | null>(null);
  const [view, setView] = useState<"lista" | "grade">("lista"); // 👈 padrão: lista com títulos

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/manifests/manifest.matematica.json", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("manifest não encontrado");
        const data = await res.json();
        if (!data?.atividades?.length) throw new Error("manifest vazio");
        setAtividades(data.atividades);
      } catch (e) {
        // fallback para garantir que aparece a lista mesmo sem manifest
        setAtividades(FALLBACK);
      }
    })();
  }, []);

  const filtradas = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return atividades;
    return atividades.filter((a) =>
      (a.codigo + " " + a.titulo + " " + (a.descricao || ""))
        .toLowerCase()
        .includes(q)
    );
  }, [query, atividades]);

  return (
    <>
      <Head>
        <title>Área do Cliente — Kit Matemática</title>
        <meta
          name="description"
          content="Acesse as atividades do Kit Matemática (visualização e impressão)."
        />
      </Head>

      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-blue-600">
              EduAdapta
            </span>
            <span className="text-sm text-gray-500">Área do Cliente</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView(view === "lista" ? "grade" : "lista")}
              className="text-sm px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              {view === "lista" ? "Ver em Grade" : "Ver em Lista"}
            </button>
            <button
              className="text-sm text-gray-600 hover:text-gray-900"
              onClick={() => {
                localStorage.removeItem("edua_access");
                location.reload();
              }}
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <section className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Kit Matemática
          </h1>
          <p className="text-gray-600">
            Clique no nome da atividade para abrir, visualizar e imprimir.
          </p>
        </section>

        <div className="mb-4 flex gap-2 items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-96 px-3 py-2 border rounded-lg"
            placeholder="Buscar por número, nome ou tema… (ex.: M07, cilindro, porcentagem)"
            aria-label="Buscar atividade"
          />
        </div>

        {/* LISTA: títulos clicáveis */}
        {view === "lista" && (
          <ul className="divide-y divide-gray-200 bg-white rounded-xl shadow">
            {filtradas.map((a) => (
              <li
                key={a.codigo}
                className="p-4 hover:bg-gray-50 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs text-gray-500">{a.codigo}</div>
                  <button
                    onClick={() => setOpen(a)}
                    className="text-left text-blue-700 hover:underline font-semibold"
                    aria-label={`Abrir ${a.titulo}`}
                  >
                    {a.titulo}
                  </button>
                  {a.descricao && (
                    <div className="text-sm text-gray-600">{a.descricao}</div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOpen(a)}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg"
                  >
                    Abrir
                  </button>
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener"
                    className="px-3 py-1.5 bg-gray-900 text-white rounded-lg"
                  >
                    Nova aba
                  </a>
                </div>
              </li>
            ))}
            {filtradas.length === 0 && (
              <li className="p-4 text-gray-600">
                Nenhuma atividade encontrada.
              </li>
            )}
          </ul>
        )}

        {/* GRADE: cards (opcional) */}
        {view === "grade" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtradas.map((a) => (
              <div
                key={a.codigo}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-1">{a.codigo}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{a.titulo}</h3>
                  <p className="text-gray-600 text-sm">
                    {a.descricao || "\u00A0"}
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => setOpen(a)}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Abrir
                  </button>
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener"
                    className="px-3 py-2 bg-gray-900 text-white rounded-lg"
                  >
                    Nova aba
                  </a>
                </div>
              </div>
            ))}
            {filtradas.length === 0 && (
              <div className="text-gray-600">Nenhuma atividade encontrada.</div>
            )}
          </div>
        )}

        {/* Modal */}
        {open && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl w-[95vw] h-[90vh] max-w-5xl shadow-xl relative">
              <button
                onClick={() => setOpen(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                aria-label="Fechar"
              >
                ✕
              </button>
              <ActivityViewer title={open.titulo} src={open.href} />
            </div>
          </div>
        )}
      </main>

      <style jsx global>{`
        @media print {
          header,
          input,
          button,
          a {
            display: none !important;
          }
          body {
            background: #fff;
          }
        }
      `}</style>
    </>
  );
}
