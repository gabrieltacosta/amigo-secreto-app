import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  if (request.headers.has("next-action")) {
    return NextResponse.next();
  }
  
  // O Better Auth pode usar prefixos diferentes em produção (HTTPS)
  const sessionToken =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  const pathname = request.nextUrl.pathname;

  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isDashboardRoute = pathname.startsWith("/dashboard");

  // 1. Redireciona para o login APENAS se não houver sessão e a rota for o dashboard
  if (!sessionToken && isDashboardRoute) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Se já tem sessão e tenta acessar o login/register, manda pro dashboard
  if (sessionToken && isAuthRoute) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // 3. Qualquer outra rota (como "/", "/privacy", "/api/auth") cai aqui e passa livremente
  return NextResponse.next();
}

export const config = {
  // Removido o catch-all global. O middleware agora só roda onde realmente importa.
  matcher: ["/dashboard/:path*", "/register", "/login"],
};