"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Ikon untuk mobile menu

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#ffe4e6] via-white to-white py-4 px-4 md:px-12 shadow-sm relative z-40 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* --- LOGO AREA --- */}
          <Link href="/" className="flex items-center gap-2 group">
            {/* Logo Placeholder (CSS Only) - Ganti <Image> jika punya file logo */}
            <div className="w-10 h-10 border-2 border-[#102a6e] rounded-full flex items-center justify-center text-[#102a6e] font-bold text-[8px] group-hover:bg-[#102a6e] group-hover:text-white transition-colors">
              <span className="scale-75">PKBI</span>
            </div>
            <h1 className="text-2xl font-bold text-[#102a6e] tracking-wide">
              PKBI
            </h1>
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden md:flex gap-6 text-sm font-semibold text-[#102a6e] uppercase tracking-tight">
            <Link
              href="/about"
              className="text-red-500 hover:opacity-80 transition-opacity"
            >
              Tentang Kami
            </Link>
            <Link
              href="/berita"
              className="hover:text-red-500 transition-colors"
            >
              Berita
            </Link>
            <Link
              href="/layanan"
              className="hover:text-red-500 transition-colors"
            >
              Layanan
            </Link>
            <Link
              href="/youth-center"
              className="hover:text-red-500 transition-colors"
            >
              Youth Center
            </Link>
            <Link
              href="/kontak"
              className="hover:text-red-500 transition-colors"
            >
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
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center py-6 gap-4 text-[#102a6e] font-semibold text-sm uppercase">
            <Link href="/about" onClick={() => setIsOpen(false)}>
              Tentang Kami
            </Link>
            <Link href="/berita" onClick={() => setIsOpen(false)}>
              Berita
            </Link>
            <Link href="/layanan" onClick={() => setIsOpen(false)}>
              Layanan
            </Link>
            <Link href="/youth-center" onClick={() => setIsOpen(false)}>
              Youth Center
            </Link>
            <Link href="/kontak" onClick={() => setIsOpen(false)}>
              Kontak
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
