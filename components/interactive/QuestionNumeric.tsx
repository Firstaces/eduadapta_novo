import { useState } from "react";

export type NumericQuestion = {
  id: string;
  tipo: "numeric";
  enunciado: string;
  unidade?: string;
  dica?: string;
  solucao?: string;
  resposta: number; // valor alvo
  tolerancia?: number; // +- faixa aceitável
};

function parsePtNumber(s: string): number | null {
  if (!s) return null;
  // aceita vírgula ou ponto; remove espaços
  const norm = s.replace(/\s/g, "").replace(",", ".");
  const val = Number(norm);
  return isNaN(val) ? null : val;
}

export default function QuestionNumeric({
  q,
  value,
  onChange,
  reveal,
}: {
  q: NumericQuestion;
  value?: string;
  onChange: (v: string) => void;
  reveal: boolean; // se true, mostra certo/errado/solução
}) {
  const [showHint, setShowHint] = useState(false);

  let status: "idle" | "correct" | "wrong" = "idle";
  let isValid = false;
  const num = parsePtNumber(value ?? "");
  if (reveal && num !== null) {
    const tol = q.tolerancia ?? 0;
    if (Math.abs(num - q.resposta) <= tol) {
      status = "correct";
      isValid = true;
    } else {
      status = "wrong";
    }
  }

  return (
    <div className="p-4 rounded-lg border bg-white">
      <p className="font-medium text-gray-900 mb-2">{q.enunciado}</p>

      <div className="flex items-center gap-2">
        <input
          inputMode="decimal"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="px-3 py-2 border rounded-lg w-48"
          placeholder={q.unidade ? `Resposta em ${q.unidade}` : "Resposta"}
          aria-label="Resposta numérica"
        />
        {q.unidade && <span className="text-gray-700">{q.unidade}</span>}

        <button
          type="button"
          onClick={() => setShowHint((s) => !s)}
          className="text-sm px-2 py-1 rounded bg-yellow-100 hover:bg-yellow-200"
        >
          {showHint ? "Ocultar dica" : "Mostrar dica"}
        </button>

        {reveal && status === "correct" && (
          <span className="text-sm px-2 py-1 rounded bg-green-100 text-green-800">
            Correto ✅
          </span>
        )}
        {reveal && status === "wrong" && (
          <span className="text-sm px-2 py-1 rounded bg-red-100 text-red-800">
            Revise ❌
          </span>
        )}
      </div>

      {showHint && q.dica && (
        <div className="mt-2 text-sm text-gray-700 bg-yellow-50 border border-yellow-200 p-2 rounded">
          💡 {q.dica}
        </div>
      )}

      {reveal && q.solucao && (
        <div className="mt-3 text-sm text-gray-700 bg-blue-50 border border-blue-200 p-2 rounded">
          <strong>Solução:</strong> {q.solucao}
        </div>
      )}
    </div>
  );
}
