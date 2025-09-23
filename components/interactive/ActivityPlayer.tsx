import { useEffect, useMemo, useState } from "react";
import QuestionNumeric, { NumericQuestion } from "./QuestionNumeric";
import QuestionMcq, { McqQuestion } from "./QuestionMcq";

type Raw = {
  codigo: string;
  titulo: string;
  tempo?: string;
  objetivo?: string;
  intro?: string;
  questoes: (NumericQuestion | McqQuestion)[];
};

type Answers = Record<string, string | number | null>;

export default function ActivityPlayer({
  data,
  storageKey,
}: {
  data: Raw;
  storageKey: string;
}) {
  const [answers, setAnswers] = useState<Answers>({});
  const [revealed, setRevealed] = useState(false);

  // carregar progresso
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setAnswers(JSON.parse(saved));
      } catch {}
    }
  }, [storageKey]);

  // salvar progresso
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(answers));
  }, [answers, storageKey]);

  const total = data.questoes.length;
  const acertos = useMemo(() => {
    if (!revealed) return 0;
    let ok = 0;
    for (const q of data.questoes) {
      if (q.tipo === "numeric") {
        const raw = (answers[q.id] as string) ?? "";
        const num = parseFloat(String(raw).replace(",", "."));
        const tol = (q as NumericQuestion).tolerancia ?? 0;
        const target = (q as NumericQuestion).resposta;
        if (!isNaN(num) && Math.abs(num - target) <= tol) ok++;
      } else if (q.tipo === "mcq") {
        if (answers[q.id] === (q as McqQuestion).correta) ok++;
      }
    }
    return ok;
  }, [revealed, answers, data.questoes]);

  const progresso = revealed
    ? Math.round((acertos / total) * 100)
    : Math.round((Object.keys(answers).length / total) * 100);

  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6">
      <header className="mb-4">
        <h2 className="text-2xl font-extrabold text-gray-900">{data.titulo}</h2>
        <div className="text-gray-600">{data.objetivo}</div>
        {data.tempo && (
          <div className="text-sm text-gray-500">Tempo: {data.tempo}</div>
        )}
        {data.intro && <p className="mt-2 text-gray-700">{data.intro}</p>}
      </header>

      <div
        className="h-2 w-full bg-gray-100 rounded mb-4 overflow-hidden"
        aria-label="Progresso"
      >
        <div
          className="h-2 bg-blue-600"
          style={{ width: `${progresso}%` }}
          aria-valuenow={progresso}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      <div className="space-y-4">
        {data.questoes.map((q, idx) => (
          <div key={q.id} className="space-y-2">
            <div className="text-sm text-gray-500">
              Questão {idx + 1} de {total}
            </div>
            {q.tipo === "numeric" ? (
              <QuestionNumeric
                q={q as NumericQuestion}
                value={(answers[q.id] as string) ?? ""}
                onChange={(v) => setAnswers((s) => ({ ...s, [q.id]: v }))}
                reveal={revealed}
              />
            ) : (
              <QuestionMcq
                q={q as McqQuestion}
                value={(answers[q.id] as number) ?? null}
                onChange={(i) => setAnswers((s) => ({ ...s, [q.id]: i }))}
                reveal={revealed}
              />
            )}
          </div>
        ))}
      </div>

      <footer className="mt-6 flex flex-wrap gap-2">
        {!revealed ? (
          <>
            <button
              onClick={() => setRevealed(true)}
              className="px-4 py-2 rounded-lg bg-green-600 text-white"
            >
              Verificar respostas
            </button>
            <button
              onClick={() => {
                setAnswers({});
                localStorage.removeItem(storageKey);
              }}
              className="px-4 py-2 rounded-lg bg-gray-200"
            >
              Limpar
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              Imprimir
            </button>
          </>
        ) : (
          <>
            <div className="px-3 py-2 rounded bg-green-50 text-green-800">
              Resultado: <strong>{acertos}</strong> de <strong>{total}</strong>{" "}
              ({Math.round((acertos / total) * 100)}%)
            </div>
            <button
              onClick={() => setRevealed(false)}
              className="px-4 py-2 rounded-lg bg-gray-200"
            >
              Ocultar feedback
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              Imprimir
            </button>
          </>
        )}
      </footer>

      <style jsx global>{`
        @media print {
          button {
            display: none !important;
          }
          .no-print {
            display: none !important;
          }
          body {
            background: #fff;
            color: #111;
          }
        }
      `}</style>
    </div>
  );
}
