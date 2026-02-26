"use client";

import { useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  MessageCircle,
  Users,
  Smartphone,
  FileText,
  Megaphone,
  X,
  Instagram,
  Send,
} from "lucide-react";

export default function YouthCenterPage() {
  // State untuk mengontrol buka/tutup popup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // ==========================================
  // PENGATURAN USERNAME INSTAGRAM
  // Ganti dengan username Instagram asli klinik (tanpa tanda @)
  // ==========================================
  const igUsername = "youthcenter.kartini";
  const igLink = `https://ig.me/m/${igUsername}`;

  const features = [
    { icon: BookOpen, title: "PENDIDIKAN" },
    { icon: MessageCircle, title: "KONSELING" },
    { icon: Users, title: "PEMBERDAYAAN" },
    { icon: Smartphone, title: "MEDIA SOSIAL" },
    { icon: FileText, title: "PENELITIAN" },
    { icon: Megaphone, title: "ADVOKASI" },
  ];

  return (
    <main className="font-sans bg-slate-50">
      {/* ========================================= */}
      {/* HERO SECTION */}
      {/* ========================================= */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden">
        {/* Layer Gambar Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/bg-youthcenter.png"
            alt="Youth Center Activities"
            fill
            className="object-cover object-center opacity-70"
            priority
          />
        </div>

        {/* Konten Teks */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-[#1e3a8a]">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide mb-6">
            YOUTH CENTER! <span className="text-[#f9a8d4]">KARTINI!</span>
          </h1>

          <p className="text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto mb-10">
            Program remaja PKBI Daerah Jepara yang memiliki visi mewujudkan
            <strong className="font-bold text-[#f472b6]">
              {" "}
              remaja yang bertanggung jawab, dari, oleh, dan untuk remaja.
            </strong>{" "}
            Kartini aktif mengampanyekan dan mengadvokasi penyediaan pendidikan
            dan layanan kesehatan reproduksi dan seksual bagi remaja di Jepara.
          </p>

          {/* Tombol yang memicu Popup */}
          <button
            onClick={() => setIsPopupOpen(true)}
            className="px-8 py-3 bg-gradient-to-r from-[#f9a8d4] to-[#f472b6] rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          >
            Hubungi Kami
          </button>
        </div>
      </section>

      {/* ========================================= */}
      {/* FEATURE CARDS SECTION */}
      {/* ========================================= */}
      <section className="py-16 px-4 -mt-10 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-10 rounded-[2.5rem] shadow-xl bg-gradient-to-b from-[#1e3a8a] to-[#3b82f6] text-white transition-transform transform hover:-translate-y-2 group cursor-pointer border-2 border-blue-400/20"
              >
                <feature.icon
                  size={64}
                  strokeWidth={1.5}
                  className="mb-6 group-hover:scale-110 transition-transform"
                />
                <h3 className="text-2xl font-bold uppercase tracking-wider">
                  {feature.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* POPUP MODAL INSTAGRAM (Tanpa Framer Motion) */}
      {/* ========================================= */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsPopupOpen(false)} // Klik latar belakang hitam untuk menutup popup
        >
          <div
            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm overflow-hidden relative animate-[pulse_0.2s_ease-in-out_1]"
            onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam kotak agar popup tidak tertutup
          >
            {/* Header Popup (Gradasi Instagram) */}
            <div className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] p-6 text-white text-center relative">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-4 right-4 bg-white/20 p-1.5 rounded-full hover:bg-white/40 transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl font-bold mb-1 tracking-wide">
                Hubungi Kami
              </h3>
              <p className="text-xs opacity-90 font-medium uppercase tracking-wider">
                Youth Center Kartini
              </p>
            </div>

            {/* Body Popup */}
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-pink-50 text-[#e1306c] rounded-2xl flex items-center justify-center mb-5 shadow-sm ring-4 ring-pink-100/50">
                <Instagram size={36} strokeWidth={2} />
              </div>

              <p className="text-[#1e3a8a]/80 font-medium text-[14px] mb-8 leading-relaxed px-2">
                Punya pertanyaan atau ingin tahu lebih lanjut? Silakan kirimkan{" "}
                <strong>Direct Message (DM)</strong> ke Instagram kami.
              </p>

              {/* Tombol Link ke Instagram DM */}
              <a
                href={igLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white py-4 px-6 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
              >
                <Send
                  size={18}
                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                />
                <span className="tracking-wide">KIRIM PESAN (DM)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
