"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LogOut, ChevronDown } from "lucide-react";
import { logoutAction } from "@/app/actions/auth";

export default function SideBar() {
  const pathname = usePathname();
  const bluePrimary = "#00387d";
  const [isBeritaOpen, setIsBeritaOpen] = useState(false);

  // Efek ini hanya dijalankan sekali saat halaman pertama kali dimuat
  // Untuk memastikan jika user sedang di halaman berita, menu otomatis terbuka di desktop
  useEffect(() => {
    if (pathname.includes("/admin/berita")) {
      setIsBeritaOpen(true);
    }
  }, []);

  const handleLogout = async () => {
    if (confirm("Apakah Anda yakin ingin keluar dari sistem admin PKBI?")) {
      await logoutAction();
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full lg:w-72 lg:h-screen lg:sticky z-50 shadow-xl flex flex-col transition-all duration-300"
      style={{ backgroundColor: bluePrimary }}
    >
      {/* --- BARIS 1: LOGO (Tengah di Mobile, Kiri di Desktop) --- */}
      <div className="p-4 lg:p-6 flex items-center justify-center lg:justify-between relative">
        <div className="flex items-center gap-3 lg:flex-row flex-col text-center lg:text-left">
          <div className="relative w-10 h-10 bg-white rounded-full p-1 shadow-md">
            <Image
              src="/images/logo-pkbi.png"
              alt="Logo PKBI"
              fill
              className="object-contain p-1"
            />
          </div>
          <div>
            {/* Ditambahkan text-white di sini */}
            <h1 className="font-bold text-sm lg:text-lg leading-tight uppercase text-white">
              PKBI JEPARA
            </h1>
            {/* Ditambahkan text-white di sini */}
            <p className="hidden lg:block text-[10px] opacity-80 font-medium text-white">
              Klinik Pratama Wahana Sejahtera
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="lg:hidden absolute right-4 p-2 bg-white/10 rounded-full text-white"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>

      {/* --- BARIS 2: NAVIGASI UTAMA --- */}
      <div className="flex lg:flex-col overflow-x-auto lg:overflow-y-auto px-2 lg:px-4 gap-2 pb-3 lg:pb-4 scrollbar-hide">
        <Link
          href="/admin"
          className={`whitespace-nowrap flex items-center px-5 lg:px-6 py-2 lg:py-3 rounded-full font-bold text-[11px] lg:text-sm transition-all ${
            pathname === "/admin"
              ? "bg-white text-[#00387d] shadow-md"
              : "text-white hover:bg-white/10"
          }`}
        >
          DASHBOARD
        </Link>

        <Link
          href="/admin/layanan"
          className={`whitespace-nowrap flex items-center px-5 lg:px-6 py-2 lg:py-3 rounded-full font-bold text-[11px] lg:text-sm transition-all ${
            pathname === "/admin/layanan"
              ? "bg-white text-[#00387d] shadow-md"
              : "text-white hover:bg-white/10"
          }`}
        >
          LAYANAN
        </Link>

        <div className="flex flex-col w-full">
          <button
            onClick={() => setIsBeritaOpen(!isBeritaOpen)}
            className={`whitespace-nowrap flex items-center justify-between px-5 lg:px-6 py-2 lg:py-3 rounded-full font-bold text-[11px] lg:text-sm transition-all ${
              pathname.includes("/admin/berita")
                ? "bg-blue-600/50 text-white"
                : "text-white hover:bg-white/10"
            }`}
          >
            <span>BERITA</span>
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-300 ${isBeritaOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* --- SUB-MENU UNTUK DESKTOP (Accordion) --- */}
          <div
            className={`
            hidden lg:block overflow-hidden transition-all duration-300 ease-in-out
            ${isBeritaOpen ? "max-h-40 mt-2" : "max-h-0"}
          `}
          >
            <div className="bg-[#002859] rounded-2xl py-2 mx-2 space-y-1">
              <Link
                href="/admin/berita/klinik"
                className={`block px-6 py-2 text-sm font-medium transition-colors border-l-4 ml-2 ${
                  pathname === "/admin/berita/klinik"
                    ? "border-blue-400 text-blue-200 bg-white/5"
                    : "border-transparent text-gray-300 hover:text-white"
                }`}
              >
                KLINIK
              </Link>
              <Link
                href="/admin/berita/kartini"
                className={`block px-6 py-2 text-sm font-medium transition-colors border-l-4 ml-2 ${
                  pathname === "/admin/berita/kartini"
                    ? "border-blue-400 text-blue-200 bg-white/5"
                    : "border-transparent text-gray-300 hover:text-white"
                }`}
              >
                KARTINI
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden lg:block mt-auto pt-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full bg-white px-6 py-3 rounded-full font-bold text-[#00387d] flex items-center justify-center gap-2 shadow-lg hover:bg-gray-100"
          >
            <LogOut className="w-4 h-4" />
            <span>LOGOUT</span>
          </button>
        </div>
      </div>

      {/* --- BARIS 3: SUB-MENU UNTUK MOBILE (Horizontal Bar) --- */}
      {isBeritaOpen && (
        <div className="lg:hidden flex justify-center gap-4 bg-[#002859] py-3 border-t border-white/10 animate-in slide-in-from-top-2 shadow-inner">
          <Link
            href="/admin/berita/klinik"
            onClick={() => setIsBeritaOpen(false)}
            className={`text-[10px] font-bold px-5 py-2 rounded-full transition-all ${
              pathname === "/admin/berita/klinik"
                ? "bg-white text-[#00387d] shadow-md"
                : "text-blue-200 hover:bg-white/5"
            }`}
          >
            KLINIK
          </Link>
          <Link
            href="/admin/berita/kartini"
            onClick={() => setIsBeritaOpen(false)}
            className={`text-[10px] font-bold px-5 py-2 rounded-full transition-all ${
              pathname === "/admin/berita/kartini"
                ? "bg-white text-[#00387d] shadow-md"
                : "text-blue-200 hover:bg-white/5"
            }`}
          >
            KARTINI
          </Link>
        </div>
      )}
    </nav>
  );
}
