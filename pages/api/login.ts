import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { password } = req.body || {};
  const expected = process.env.CLIENT_TEST_PASSWORD;
  if (!expected) {
    return res.status(500).json({ message: "Senha de teste não configurada." });
  }

  if (password !== expected) {
    return res.status(401).json({ message: "Senha inválida" });
  }

  // Seta cookie HttpOnly por 7 dias
  res.setHeader("Set-Cookie", [
    `client_auth=ok; Path=/; HttpOnly; SameSite=Lax; Max-Age=${
      60 * 60 * 24 * 7
    }; ${process.env.VERCEL ? "Secure;" : ""}`,
  ]);

  return res.status(200).json({ ok: true });
}
