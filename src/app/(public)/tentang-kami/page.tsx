"use client";

import Image from "next/image";
import { 
  History, 
  Target, 
  Award, 
  Eye, 
  ChevronRight,
  Medal
} from "lucide-react";

export default function AboutPage() {
  // --- KODE WARNA (Identik dengan Home Anda) ---
  const c = {
    blueDark: "#0b2359",
    blueText: "#102a6e",
    peachGrad1: "#ffafbd",
    peachGrad2: "#ffc3a0",
    cardGrad1: "#1e3a8a",
    cardGrad2: "#4c6ef5",
  };

  return (
    <main className="min-h-screen bg-white font-sans overflow-x-hidden text-[#102a6e]">
      
      {/* --- HERO SECTION (Sama dengan Home) --- */}
      <header className="pt-32 relative w-full pb-24">
        <div className="absolute inset-0 z-0 h-[500px] w-full bg-gray-100 pointer-events-none">
          <div className="w-full h-full relative opacity-70 mix-blend-multiply">
            <Image
              src="/images/bg-hero.jpg"
              alt="bg"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/80 to-white"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center pt-14">
            <h2
              className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 uppercase tracking-tighter"
              style={{ color: c.blueText }}
            >
              Tentang Kami
            </h2>
            <div className="h-2 w-24 rounded-full mb-8" style={{ backgroundColor: c.blueText }}></div>
            <p className="text-[14px] md:text-[16px] font-bold text-gray-800 max-w-2xl leading-relaxed uppercase tracking-widest opacity-80">
              Mengenal Lebih Dekat Klinik Pratama Wahana Sejahtera PKBI Jepara
            </p>
          </div>
        </div>
      </header>

      {/* --- SECTION 1: SEJARAH & LATAR BELAKANG --- */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2 relative">
              <div className="w-full h-[400px] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src="/images/history-thumb.jpg" // Ganti dengan foto sejarah/klinik
                  alt="Sejarah PKBI"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Badge Dekorasi */}
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-blue-50">
                  <History size={32} style={{ color: c.blueText }} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Berdiri Sejak</p>
                  <p className="text-xl font-extrabold" style={{ color: c.blueText }}>19XX</p>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <h3 className="text-3xl font-extrabold mb-8 leading-tight uppercase" style={{ color: c.blueText }}>
                Sejarah & <br /> Latar Belakang
              </h3>
              <div className="text-justify text-[14px] leading-7 font-semibold space-y-6" style={{ color: c.blueText }}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: VISI & MISI (Menggunakan Gradient Cards Statistik Anda) --- */}
      <section className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-extrabold mb-16 leading-tight uppercase text-center" style={{ color: c.blueText }}>
            Visi & Misi Kami
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* VISI CARD */}
            <div 
              className="rounded-[2.5rem] p-12 text-white shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-300"
              style={{ background: `linear-gradient(to bottom right, ${c.cardGrad1}, ${c.cardGrad2})` }}
            >
              <Eye size={120} className="absolute -right-8 -top-8 opacity-10 group-hover:rotate-12 transition-transform" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Eye size={36} strokeWidth={2.5} />
                </div>
                <h4 className="text-2xl font-extrabold mb-4 uppercase tracking-tight">Visi</h4>
                <p className="text-sm font-semibold leading-relaxed opacity-90 italic">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo."
                </p>
              </div>
            </div>

            {/* MISI CARD */}
            <div 
              className="rounded-[2.5rem] p-12 text-white shadow-2xl relative overflow-hidden group hover:-translate-y-2 transition-all duration-300"
              style={{ background: `linear-gradient(to bottom right, ${c.cardGrad1}, ${c.cardGrad2})` }}
            >
              <Target size={120} className="absolute -right-8 -top-8 opacity-10 group-hover:rotate-12 transition-transform" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Target size={36} strokeWidth={2.5} />
                </div>
                <h4 className="text-2xl font-extrabold mb-4 uppercase tracking-tight">Misi</h4>
                <ul className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-semibold opacity-90">
                      <ChevronRight size={18} className="shrink-0 mt-0.5" />
                      <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: PRESTASI & PENGHARGAAN --- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-3/5">
              <h3 className="text-3xl font-extrabold mb-8 leading-tight uppercase" style={{ color: c.blueText }}>
                Prestasi & <br /> Penghargaan
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-4 items-start p-4 rounded-2xl border-2 border-gray-100 hover:border-blue-100 transition-colors">
                    <div className="p-3 rounded-xl bg-yellow-50 text-yellow-600">
                      <Award size={24} />
                    </div>
                    <div>
                      <h5 className="font-extrabold text-sm uppercase mb-1">Juara 1 Nasional BKKBN</h5>
                      <p className="text-xs font-semibold text-gray-500 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="md:w-2/5 flex justify-center">
              <div 
                className="w-full max-w-[320px] aspect-[3/4] rounded-[3rem] p-10 text-white flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden"
                style={{ background: `linear-gradient(to bottom, ${c.cardGrad1}, ${c.cardGrad2})` }}
              >
                <Medal size={150} className="absolute opacity-10 -bottom-10 -left-10 rotate-12" />
                <Award size={80} strokeWidth={1} className="mb-6 text-yellow-400" />
                <p className="text-xs font-black uppercase tracking-[0.2em] mb-2 opacity-70">Apresiasi Tertinggi</p>
                <h4 className="text-xl font-extrabold uppercase leading-tight">
                  Pelayanan KB <br /> Terbaik Nasional
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION (Menggunakan Gaya Tombol Konsultasi Anda) --- */}
      <section className="py-20 bg-[#102a6e] text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-10 uppercase italic">
            Mari Menjadi Bagian Dari <br /> Keluarga Sehat PKBI
          </h3>
        </div>
      </section>
    </main>
  );
}