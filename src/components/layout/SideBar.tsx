"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react"; // Tambah useEffect & useState
import { Search, Menu, LogOut, ChevronDown, ChevronRight } from "lucide-react"; // Tambah icon Chevron

export default function SideBar() {
  const pathname = usePathname();
  const bluePrimary = "#00387d";

  // State untuk mengontrol dropdown Berita
  // Default: Terbuka jika URL mengandung kata '/admin/berita', tertutup jika tidak.
  const [isBeritaOpen, setIsBeritaOpen] = useState(false);

  // Effect agar dropdown otomatis terbuka saat halaman di-refresh/diakses langsung
  useEffect(() => {
    if (pathname.includes("/admin/berita")) {
      setIsBeritaOpen(true);
    }
  }, [pathname]);

  return (
    <aside
      className="w-72 flex-shrink-0 text-white flex flex-col transition-all duration-300 h-screen sticky top-0 z-50 shadow-xl"
      style={{ backgroundColor: bluePrimary }}
    >
      {/* --- HEADER SIDEBAR (LOGO) --- */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 bg-white rounded-full p-1 shadow-sm">
            <Image
              src="/images/logo-pkbi.png"
              alt="Logo PKBI"
              fill
              className="object-contain p-1"
            />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight tracking-tight">
              PKBI JEPARA
            </h1>
            <p className="text-[10px] opacity-80 font-medium">
              Klinik Pratama Wahana Sejahtera
            </p>
          </div>
        </div>
        <button className="md:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* --- SEARCH BAR --- */}
      <div className="px-4 mb-6">
        <div className="relative group">
          <input
            type="text"
            placeholder="Cari..."
            className="w-full bg-blue-800/40 text-white rounded-full py-2.5 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-blue-200/60 text-sm border border-blue-600/30 transition-all group-hover:bg-blue-800/60"
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-blue-300" />
        </div>
      </div>

      {/* --- MENU NAVIGATION --- */}
      <nav className="px-4 flex-1 space-y-2 overflow-y-auto custom-scrollbar pb-4">
        {/* 1. DASHBOARD */}
        <Link
          href="/admin"
          className={`flex items-center px-6 py-3 rounded-full font-bold transition-all duration-200 ${
            pathname === "/admin"
              ? "bg-white text-[#00387d] shadow-lg translate-x-1"
              : "text-white hover:bg-white/10 hover:translate-x-1"
          }`}
        >
          DASHBOARD
        </Link>

        {/* 2. LAYANAN */}
        <Link
          href="/admin/layanan"
          className={`flex items-center px-6 py-3 rounded-full font-bold transition-all duration-200 ${
            pathname === "/admin/layanan"
              ? "bg-white text-[#00387d] shadow-lg translate-x-1"
              : "text-white hover:bg-white/10 hover:translate-x-1"
          }`}
        >
          LAYANAN
        </Link>

        {/* 3. DROPDOWN BERITA */}
        <div className="mt-2">
          {/* Tombol Utama Dropdown */}
          <button
            onClick={() => setIsBeritaOpen(!isBeritaOpen)}
            className={`w-full flex items-center justify-between px-6 py-3 rounded-full font-bold transition-all duration-200 ${
              pathname.includes("/admin/berita")
                ? "bg-blue-600/50 text-white" // Style jika child aktif
                : "text-white hover:bg-white/10"
            }`}
          >
            <span>BERITA</span>
            {/* Icon Panah Berputar */}
            {isBeritaOpen ? (
              <ChevronDown className="w-5 h-5 transition-transform duration-300" />
            ) : (
              <ChevronRight className="w-5 h-5 transition-transform duration-300" />
            )}
          </button>

          {/* Isi Dropdown (Anak Menu) */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isBeritaOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-[#002859] rounded-2xl py-2 mx-2 space-y-1">
              {/* Child: Klinik */}
              <Link
                href="/admin/berita/klinik"
                className={`block px-6 py-2 text-sm font-medium transition-colors border-l-4 ml-2 ${
                  pathname === "/admin/berita/klinik"
                    ? "border-blue-400 text-blue-200 bg-white/5"
                    : "border-transparent text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                KLINIK
              </Link>

              {/* Child: Kartini */}
              <Link
                href="/admin/berita/kartini"
                className={`block px-6 py-2 text-sm font-medium transition-colors border-l-4 ml-2 ${
                  pathname === "/admin/berita/kartini"
                    ? "border-blue-400 text-blue-200 bg-white/5"
                    : "border-transparent text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                KARTINI
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* --- FOOTER (LOGOUT) --- */}
      <div className="p-4 mt-auto border-t border-blue-600/30">
        <form action="/auth/logout" method="post">
          <button className="w-full bg-white px-6 py-3 rounded-full font-bold text-center shadow-md transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group text-[#00387d]">
            <LogOut className="w-4 h-4 group-hover:text-red-600 transition-colors" />
            <span className="group-hover:text-red-600 transition-colors">
              LOGOUT
            </span>
          </button>
        </form>
      </div>
    </aside>
  );
}
