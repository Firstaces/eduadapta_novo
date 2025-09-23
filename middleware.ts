// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Proteja somente o que você quiser:
  const protegido =
    pathname.startsWith("/cliente") || pathname.startsWith("/atividades");

  if (!protegido) return NextResponse.next();

  // Se já tem o cookie, deixa passar
  const auth = req.cookies.get("client_auth")?.value;
  if (auth === "ok") return NextResponse.next();

  // Redireciona para /login mantendo o "next"
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = `?next=${encodeURIComponent(
    req.nextUrl.pathname + req.nextUrl.search
  )}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/cliente/:path*", "/atividades/:path*"], // ajuste se quiser proteger menos/mais
};
