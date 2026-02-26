"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"; // <-- Tambahkan AnimatePresence

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const getLinkClass = (href: string) => {
    const isActive = pathname === href || pathname.startsWith(`${href}/`);
    return isActive
      ? "text-red-500 opacity-100 font-bold"
      : "text-[#102a6e] hover:text-red-500 transition-colors";
  };

  // --- Animasi Varian ---
  const menuVariants = {
    closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    opened: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-[#ffe4e6] via-white to-white py-4 px-4 md:px-12 shadow-sm relative z-50 sticky top-0"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* --- LOGO AREA (Animasi Hover Skala) --- */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 border-2 border-[#102a6e] rounded-full flex items-center justify-center text-[#102a6e] font-bold text-[8px] group-hover:bg-[#102a6e] group-hover:text-white transition-colors"
            >
              <span className="scale-75">PKBI</span>
            </motion.div>
            <h1 className="text-2xl font-bold text-[#102a6e] tracking-wide">
              PKBI
            </h1>
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden md:flex gap-6 text-sm font-semibold uppercase tracking-tight">
            {["/", "/berita", "/layanan", "/youth-center", "/tentang-kami"].map((path) => (
              <Link key={path} href={path} className={`relative group ${getLinkClass(path)}`}>
                {path === "/" ? "Beranda" : path.replace("/", "").replace("-", " ")}
                {/* Garis bawah tipis saat hover */}
                <motion.span 
                  className="absolute left-0 -bottom-1 h-[2px] bg-red-500 w-0 group-hover:w-full transition-all duration-300"
                />
              </Link>
            ))}
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-[#102a6e]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>

        {/* --- MOBILE DROPDOWN (Animasi Slide & Fade) --- */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial="closed"
              animate="opened"
              exit="closed"
              variants={menuVariants}
              className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-center py-8 gap-6 font-semibold text-sm uppercase border-t-2 border-slate-100"
            >
              <Link href="/" onClick={() => setIsOpen(false)} className={getLinkClass("/")}>
                Beranda
              </Link>
              <Link href="/berita" onClick={() => setIsOpen(false)} className={getLinkClass("/berita")}>
                Berita
              </Link>
              <Link href="/layanan" onClick={() => setIsOpen(false)} className={getLinkClass("/layanan")}>
                Layanan
              </Link>
              <Link href="/youth-center" onClick={() => setIsOpen(false)} className={getLinkClass("/youth-center")}>
                Youth Center
              </Link>
              <Link href="/tentang-kami" onClick={() => setIsOpen(false)} className={getLinkClass("/tentang-kami")}>
                Tentang Kami
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;