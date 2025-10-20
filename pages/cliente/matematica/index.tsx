// pages/cliente/matematica/index.tsx
import fs from "fs";
import path from "path";
import type { GetStaticProps } from "next";

type Item = { title: string; href: string; order: number };

function slugTitleFromFilename(name: string) {
  // ex.: "01 - combustivel-funcao-linear.html" → {order: 1, title: "01 • combustivel-funcao-linear"}
  const base = name.replace(/\.html$/i, "");
  const m = base.match(/^(\d+)\s*-\s*(.+)$/); // captura "01 - ..." ou "15- ..."
  if (m) {
    return { order: Number(m[1]), title: `${m[1]} • ${m[2].replace(/-/g, " ")}` };
  }
  // fallback: sem número no início
  return { order: 9999, title: base.replace(/-/g, " ") };
}

export const getStaticProps: GetStaticProps = async () => {
  const dir1 = path.join(process.cwd(), "public", "atividades", "matematica");
  const dir2 = path.join(dir1, "manifests");

  const items: Item[] = [];

  const safeList = (dir: string, webPrefix: string) => {
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir)) {
      if (!name.toLowerCase().endsWith(".html")) continue;
      const { order, title } = slugTitleFromFilename(name);
      items.push({ order, title, href: `${webPrefix}/${encodeURI(name)}` });
    }
  };

  // coleta /atividades/matematica e /atividades/matematica/manifests
  safeList(dir1, "/atividades/matematica");
  safeList(dir2, "/atividades/matematica/manifests");

  items.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

  return { props: { items } };
};

export default function Matematica({ items }: { items: Item[] }) {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Kit Matemática</h1>
      <ul>
        {items.map((it) => (
          <li key={it.href} style={{ marginBottom: 8 }}>
            <a href={it.href} target="_blank" rel="noopener">
              {it.title}
            </a>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 24 }}>
        <a href="/cliente/matematica/07-interativo">Aula Interativa: Volume do Cilindro (M07)</a>
      </div>

      <div style={{ marginTop: 24 }}>
        <a href="/sair">Sair</a>
      </div>
    </main>
  );
}
