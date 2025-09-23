// pages/index.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>EduAdapta</h1>
      <p>Escolha uma opção:</p>
      <ul>
        <li>
          <Link href="/login">Login da área do cliente</Link>
        </li>
        <li>
          <Link href="/cliente/matematica">Cliente › Matemática</Link>
        </li>
        <li>
          <Link href="/cliente/portugues">Cliente › Português</Link>
        </li>
        <li>
          <Link href="/cliente/ciencias">Cliente › Ciências</Link>
        </li>
      </ul>
    </main>
  );
}
