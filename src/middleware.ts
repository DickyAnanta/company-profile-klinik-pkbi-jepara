import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Ambil cookie session
  const session = request.cookies.get("session_token");

  // Jika user mau masuk ke /admin TAPI tidak punya session
  if (request.nextUrl.pathname.startsWith("/admin") && !session) {
    // Tendang balik ke login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Jika user sudah login TAPI mau akses /login lagi
  if (request.nextUrl.pathname.startsWith("/login") && session) {
    // Lempar langsung ke dashboard
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

// Tentukan path mana saja yang kena aturan ini
export const config = {
  matcher: ["/admin/:path*", "/login"],
};
