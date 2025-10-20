// pages/cliente/index.tsx
import Link from "next/link";
export default function ClienteHome() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Minha Área</h1>
      <ul>
        <li>
          <Link href="/cliente/matematica">Matemática</Link>
        </li>
        <li>
          <Link href="/cliente/portugues">Português</Link>
        </li>
        <li>
          <Link href="/cliente/ciencias">Ciências</Link>
        </li>
      </ul>
    </main>
  );
}
