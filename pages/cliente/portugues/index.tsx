// pages/cliente/portugues/index.tsx
import fs from "fs";
import path from "path";
import type { GetStaticProps } from "next";

type Item = { title: string; href: string; order: number };

function slugTitleFromFilename(name: string) {
  const base = name.replace(/\.html$/i, "");
  const m = base.match(/^(\d+)\s*-\s*(.+)$/);
  if (m) {
    return {
      order: Number(m[1]),
      title: `${m[1]} • ${m[2].replace(/-/g, " ")}`,
    };
  }
  return { order: 9999, title: base.replace(/-/g, " ") };
}

export const getStaticProps: GetStaticProps = async () => {
  const root = path.join(process.cwd(), "public", "atividades", "portugues");
  const manifests = path.join(root, "manifests");

  const items: Item[] = [];
  const safeList = (dir: string, webPrefix: string) => {
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir)) {
      if (!name.toLowerCase().endsWith(".html")) continue;
      const { order, title } = slugTitleFromFilename(name);
      items.push({ order, title, href: `${webPrefix}/${encodeURI(name)}` });
    }
  };

  safeList(root, "/atividades/portugues");
  safeList(manifests, "/atividades/portugues/manifests");

  items.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
  return { props: { items } };
};

export default function Portugues({ items }: { items: Item[] }) {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Kit Português</h1>

      <ul>
        {items.map((it) => (
          <li key={it.href} style={{ marginBottom: 8 }}>
            <a href={it.href} target="_blank" rel="noopener">
              {it.title}
            </a>
          </li>
        ))}
      </ul>

      {/* ajuste/remoção se não existir a rota interativa */}
      <div style={{ marginTop: 24 }}>
        <a href="/cliente/portugues/01-interativo">
          Aula Interativa: Português (P01)
        </a>
      </div>

      <div style={{ marginTop: 24 }}>
        <a href="/sair">Sair</a>
      </div>
    </main>
  );
}
