// pages/index.tsx
import type { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async () => {
  return { redirect: { destination: "/landing/index.html", permanent: false } };
};
export default function Home() {
  return null;
}
