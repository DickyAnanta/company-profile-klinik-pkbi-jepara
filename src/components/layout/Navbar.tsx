"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation"; // <-- Tambahkan ini

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // <-- Ambil rute halaman saat ini

  // Fungsi untuk mengecek apakah link aktif atau tidak
  // Jika URL saat ini cocok dengan href menu, kembalikan warna merah. Jika tidak, warna biru.
  const getLinkClass = (href: string) => {
    // Penyesuaian khusus untuk halaman detail berita (agar menu Berita tetap merah)
    // Walaupun URL-nya misal: /berita/clx123...
    const isActive = pathname === href || pathname.startsWith(`${href}/`);

    return isActive
      ? "text-red-500 opacity-100 font-bold" // Warna saat aktif (sedang dibuka / diklik)
      : "text-[#102a6e] hover:text-red-500 transition-colors"; // Warna default
  };

  return (
    <nav className="bg-gradient-to-r from-[#ffe4e6] via-white to-white py-4 px-4 md:px-12 shadow-sm relative z-40 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* --- LOGO AREA --- */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 border-2 border-[#102a6e] rounded-full flex items-center justify-center text-[#102a6e] font-bold text-[8px] group-hover:bg-[#102a6e] group-hover:text-white transition-colors">
              <span className="scale-75">PKBI</span>
            </div>
            <h1 className="text-2xl font-bold text-[#102a6e] tracking-wide">
              PKBI
            </h1>
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden md:flex gap-6 text-sm font-semibold uppercase tracking-tight">
            <Link href="/" className={getLinkClass("/")}>
              Beranda
            </Link>
            <Link href="/berita" className={getLinkClass("/berita")}>
              Berita
            </Link>
            <Link href="/layanan" className={getLinkClass("/layanan")}>
              Layanan
            </Link>
            <Link
              href="/youth-center"
              className={getLinkClass("/youth-center")}
            >
              Youth Center
            </Link>
            <Link href="/kontak" className={getLinkClass("/kontak")}>
              Kontak
            </Link>
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <button
            className="md:hidden text-[#102a6e]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* --- MOBILE DROPDOWN --- */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center py-6 gap-4 font-semibold text-sm uppercase border-t-2 border-slate-100">
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className={getLinkClass("/")}
            >
              Beranda
            </Link>
            <Link
              href="/berita"
              onClick={() => setIsOpen(false)}
              className={getLinkClass("/berita")}
            >
              Berita
            </Link>
            <Link
              href="/layanan"
              onClick={() => setIsOpen(false)}
              className={getLinkClass("/layanan")}
            >
              Layanan
            </Link>
            <Link
              href="/youth-center"
              onClick={() => setIsOpen(false)}
              className={getLinkClass("/youth-center")}
            >
              Youth Center
            </Link>
            <Link
              href="/kontak"
              onClick={() => setIsOpen(false)}
              className={getLinkClass("/kontak")}
            >
              Kontak
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
