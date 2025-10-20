// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const isCliente = url.pathname.startsWith("/cliente");
  if (!isCliente) return NextResponse.next();

  const auth = req.cookies.get("ea_auth")?.value;
  if (auth === "1") return NextResponse.next();

  // redireciona para login com ?next=<rota>
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("next", url.pathname + url.search);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/cliente/:path*"],
};
