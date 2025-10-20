// pages/sair.tsx
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // apaga cookie e volta para /login
  res.setHeader("Set-Cookie", [
    "ea_auth=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax",
  ]);
  return {
    redirect: { destination: "/login", permanent: false },
  };
};

export default function Sair() {
  return null;
}
