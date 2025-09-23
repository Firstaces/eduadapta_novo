import { useState } from "react";

export type McqQuestion = {
  id: string;
  tipo: "mcq";
  enunciado: string;
  alternativas: string[];
  correta: number; // índice
  dica?: string;
  solucao?: string;
};

export default function QuestionMcq({
  q,
  value,
  onChange,
  reveal,
}: {
  q: McqQuestion;
  value?: number | null;
  onChange: (i: number) => void;
  reveal: boolean;
}) {
  const [showHint, setShowHint] = useState(false);
  const isCorrect = reveal && value !== null && value === q.correta;

  return (
    <div className="p-4 rounded-lg border bg-white">
      <p className="font-medium text-gray-900 mb-3">{q.enunciado}</p>

      <div className="space-y-2">
        {q.alternativas.map((alt, i) => {
          const selected = value === i;
          const right = reveal && i === q.correta;
          const wrong = reveal && selected && i !== q.correta;
          return (
            <label
              key={i}
              className={`flex items-center gap-2 p-2 rounded border cursor-pointer
                ${selected ? "border-blue-400 bg-blue-50" : "border-gray-200"}
                ${right ? "outline outline-2 outline-green-400" : ""}
                ${wrong ? "outline outline-2 outline-red-400" : ""}
              `}
            >
              <input
                type="radio"
                name={q.id}
                checked={selected}
                onChange={() => onChange(i)}
              />
              <span className="text-gray-800">{alt}</span>
            </label>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowHint((s) => !s)}
          className="text-sm px-2 py-1 rounded bg-yellow-100 hover:bg-yellow-200"
        >
          {showHint ? "Ocultar dica" : "Mostrar dica"}
        </button>

        {reveal && isCorrect && (
          <span className="text-sm px-2 py-1 rounded bg-green-100 text-green-800">
            Correto ✅
          </span>
        )}
        {reveal && !isCorrect && value !== null && (
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
          <strong>Comentário:</strong> {q.solucao}
        </div>
      )}
    </div>
  );
}
