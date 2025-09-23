import Head from "next/head";
// importe pelo caminho relativo pra garantir:
import ActivityPlayer from "../../../components/interactive/ActivityPlayer";
// importe o JSON (precisa de resolveJsonModule no tsconfig)
import data from "../../../data/atividades/matematica/07-volume-cilindro.json";

export default function M07Interativo() {
  return (
    <>
      <Head>
        <title>{data.titulo} — Versão Interativa</title>
        <meta
          name="description"
          content="Versão online interativa da atividade."
        />
      </Head>

      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="mb-4">
          <h1 className="text-3xl font-extrabold">Versão online interativa</h1>
          <p className="text-gray-600">
            Responda, receba feedback e imprima seu resultado.
          </p>
        </div>
        <ActivityPlayer data={data as any} storageKey={`edua:${data.codigo}`} />
      </main>
    </>
  );
}
