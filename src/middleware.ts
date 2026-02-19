import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 1. Ambil token session dari cookie
  const token = request.cookies.get("session_token")?.value;

  // 2. Tentukan halaman mana saja yang ingin diproteksi
  const isDashboardPage = request.nextUrl.pathname.startsWith("/admin");

  // 3. JIKA mencoba masuk dashboard TAPI tidak punya token -> Tendang ke Login
  if (isDashboardPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 4. JIKA sudah login (punya token) TAPI mencoba akses halaman login -> Masukkan ke Admin
  if (request.nextUrl.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

// Konfigurasi agar middleware hanya berjalan pada rute tertentu
export const config = {
  matcher: ["/admin/:path*", "/login"],
};