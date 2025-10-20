// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from "next";

type Body = { email?: string; senha?: string };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  // No Pages Router, req.body já vem como objeto quando o Content-Type é application/json.
  const body: Body =
    typeof req.body === "string"
      ? safeParse(req.body)
      : (req.body as Body) || {};

  const email = body.email ?? "";
  const senha = body.senha ?? "";

  const ok =
    email === process.env.EA_TEST_EMAIL && senha === process.env.EA_TEST_PASS;
  if (!ok)
    return res
      .status(401)
      .json({ ok: false, message: "Credenciais inválidas" });

  // 7 dias
  const maxAge = 60 * 60 * 24 * 7;

  // Cookie HttpOnly para o middleware ler
  res.setHeader(
    "Set-Cookie",
    `ea_auth=1; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax`
  );

  return res.status(200).json({ ok: true });
}

function safeParse(s: string): Body {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
