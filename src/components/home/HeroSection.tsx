import Image from "next/image";
import { User, Stethoscope, HeartHandshake } from "lucide-react";

const HeroSection = () => {
  return (
    <header className="relative w-full overflow-hidden">
      {/* --- BACKGROUND AREA --- */}
      <div className="absolute inset-0 z-0">
        {/* Background Image - Pastikan file ada di public/images/ */}
        <div className="absolute inset-0 bg-[url('/images/bg-hero.jpg')] bg-cover bg-center opacity-30 mix-blend-multiply"></div>
        {/* Gradient Overlay: Memberikan efek putih pudar di bagian bawah agar menyatu dengan konten */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white"></div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center text-center pt-12 pb-32 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#102a6e] leading-tight mb-6">
          KLINIK PRATAMA WAHANA SEJAHTERA <br /> PKBI JEPARA
        </h2>

        <p className="text-sm md:text-base max-w-3xl text-gray-800 mb-8 leading-relaxed">
          Selamat datang di layanan Klinik Pratama Wahana Sejahtera PKBI Jepara.
          <br />
          Pelayanan kesehatan yang berfokus pada kesehatan reproduksi dan
          keluarga berencana. Klinik ini berupaya memberikan layanan yang ramah,
          inklusif, dan berbasis hak, terutama bagi perempuan, remaja, dan
          kelompok rentan.
        </p>

        {/* Tombol Konsultasi */}
        <button className="bg-gradient-to-r from-[#ffafbd] to-[#ffc3a0] text-[#102a6e] font-bold py-2 px-8 rounded-full shadow-md hover:shadow-lg transition-transform hover:scale-105 uppercase text-lg mb-16 border-b-4 border-white/50">
          KONSULTASI
        </button>

        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl px-4">
          {/* Card 1: Pasien */}
          <div className="bg-gradient-to-b from-[#1e3a8a] to-[#5c7cfa] rounded-2xl p-6 text-white flex flex-col items-center shadow-xl transform hover:-translate-y-1 transition-all">
            <User size={64} strokeWidth={1.5} className="mb-2" />
            <span className="text-3xl font-bold">1000+</span>
            <span className="text-sm font-medium uppercase tracking-widest">
              Pasien
            </span>
          </div>

          {/* Card 2: Dokter */}
          <div className="bg-gradient-to-b from-[#1e3a8a] to-[#5c7cfa] rounded-2xl p-6 text-white flex flex-col items-center shadow-xl transform hover:-translate-y-1 transition-all">
            <div className="relative mb-2">
              <Stethoscope size={64} strokeWidth={1.5} />
              {/* Icon Plus kecil dekoratif */}
              <div className="absolute -top-1 right-4 text-white font-bold text-xl">
                +
              </div>
            </div>
            <span className="text-3xl font-bold">4</span>
            <span className="text-sm font-medium uppercase tracking-widest">
              Dokter
            </span>
          </div>

          {/* Card 3: Relawan */}
          <div className="bg-gradient-to-b from-[#1e3a8a] to-[#5c7cfa] rounded-2xl p-6 text-white flex flex-col items-center shadow-xl transform hover:-translate-y-1 transition-all">
            <div className="flex justify-center mb-2">
              <HeartHandshake size={64} strokeWidth={1.5} />
            </div>
            <span className="text-3xl font-bold">50+</span>
            <span className="text-sm font-medium uppercase tracking-widest">
              Relawan
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
