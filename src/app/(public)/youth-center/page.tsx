"use client";

import Image from "next/image";
import { 
  Users, 
  MapPin, 
  HeartPulse, 
  MessageSquare, 
  Globe,
  Zap
} from "lucide-react";

export default function YouthCenterPage() {
  // --- KODE WARNA (Konsisten dengan Home & About) ---
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
      
      {/* --- HERO SECTION --- */}
      <header className="pt-32 relative w-full pb-24">
        <div className="absolute inset-0 z-0 h-[500px] w-full bg-gray-100 pointer-events-none">
          <div className="w-full h-full relative opacity-70 mix-blend-multiply">
            <Image
              src="/images/bg-hero.jpg" // Bisa diganti foto kegiatan remaja jika ada
              alt="bg youth center"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-1.5 rounded-full mb-6">
            <Zap size={16} className="text-blue-800" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Ruang Aman Remaja</span>
          </div>
          <h2
            className="text-4xl md:text-7xl font-extrabold leading-tight mb-4 uppercase tracking-tighter italic"
            style={{ color: c.blueText }}
          >
            Youth Center
          </h2>
          <p className="text-[14px] md:text-[18px] font-bold text-gray-800 max-w-2xl mx-auto leading-relaxed uppercase tracking-widest opacity-80">
            Pusat Informasi & Pelayanan Kesehatan Reproduksi Remaja
          </p>
        </div>
      </header>

      {/* --- SECTION 1: APA ITU YOUTH CENTER? --- */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-3/5">
              <h3 className="text-3xl font-extrabold mb-8 leading-tight uppercase" style={{ color: c.blueText }}>
                Wadah Ekspresi <br /> & Edukasi Remaja
              </h3>
              <p className="text-justify text-[14px] leading-7 font-semibold mb-6" style={{ color: c.blueText }}>
                Youth Center merupakan pusat kegiatan remaja PKBI yang didedikasikan sebagai ruang aman bagi anak muda. 
                Kami menyediakan informasi komprehensif mengenai kesehatan seksual dan reproduksi (HKSR) guna membekali remaja dengan pengetahuan yang tepat dan bertanggung jawab.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600">
                    <HeartPulse size={24} />
                  </div>
                  <span className="font-bold text-sm uppercase">Layanan HKSR</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                    <MessageSquare size={24} />
                  </div>
                  <span className="font-bold text-sm uppercase">Konseling Sebaya</span>
                </div>
              </div>
            </div>
            <div className="md:w-2/5">
              <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white -rotate-3">
                <Image
                  src="/images/youth-activity.jpg" // Ganti dengan foto remaja PKBI
                  alt="Kegiatan Remaja"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: JARINGAN NASIONAL (Point 17 Provinsi) --- */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8 text-blue-800 opacity-20">
            <Globe size={120} strokeWidth={1} />
          </div>
          <h3 className="text-3xl font-extrabold mb-6 uppercase tracking-tight" style={{ color: c.blueText }}>
            Jaringan Nasional yang Luas
          </h3>
          <p className="max-w-3xl mx-auto text-[14px] font-semibold leading-7 mb-12" style={{ color: c.blueText }}>
            Youth Center PKBI telah berkembang pesat di hampir seluruh wilayah Indonesia. 
            Hingga saat ini, kami setidaknya telah menjangkau **17 Provinsi** di seluruh tanah air, memastikan akses informasi kesehatan reproduksi tersedia bagi setiap remaja tanpa terkecuali.
          </p>
          
          <div className="inline-flex items-center gap-4 bg-white px-10 py-5 rounded-[2rem] shadow-lg border-b-4 border-blue-900">
            <MapPin className="text-red-500" size={32} />
            <div className="text-left">
              <p className="text-4xl font-black italic tracking-tighter" style={{ color: c.blueText }}>17 PROVINSI</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Jangkauan Youth Center PKBI</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: LAYANAN KAMI (Menggunakan Card Gradasi) --- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-extrabold uppercase mb-4" style={{ color: c.blueText }}>Layanan Remaja</h3>
            <div className="h-1.5 w-20 bg-blue-800 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div 
              className="rounded-[2.5rem] p-10 text-white shadow-xl flex flex-col items-center text-center transform hover:-translate-y-2 transition-all"
              style={{ background: `linear-gradient(to bottom, ${c.cardGrad1}, ${c.cardGrad2})` }}
            >
              <HeartPulse size={60} strokeWidth={1.5} className="mb-6" />
              <h4 className="text-xl font-extrabold uppercase mb-4">Layanan Kesehatan</h4>
              <p className="text-xs font-semibold leading-relaxed opacity-80 uppercase tracking-wider">
                Akses layanan kesehatan reproduksi yang ramah, rahasia, dan tanpa diskriminasi bagi remaja.
              </p>
            </div>

            {/* Card 2 */}
            <div 
              className="rounded-[2.5rem] p-10 text-white shadow-xl flex flex-col items-center text-center transform hover:-translate-y-2 transition-all"
              style={{ background: `linear-gradient(to bottom, ${c.cardGrad1}, ${c.cardGrad2})` }}
            >
              <Users size={60} strokeWidth={1.5} className="mb-6" />
              <h4 className="text-xl font-extrabold uppercase mb-4">Pendidik Sebaya</h4>
              <p className="text-xs font-semibold leading-relaxed opacity-80 uppercase tracking-wider">
                Belajar bersama melalui diskusi interaktif antar remaja untuk membangun kesadaran HKSR.
              </p>
            </div>

            {/* Card 3 */}
            <div 
              className="rounded-[2.5rem] p-10 text-white shadow-xl flex flex-col items-center text-center transform hover:-translate-y-2 transition-all"
              style={{ background: `linear-gradient(to bottom, ${c.cardGrad1}, ${c.cardGrad2})` }}
            >
              <Zap size={60} strokeWidth={1.5} className="mb-6" />
              <h4 className="text-xl font-extrabold uppercase mb-4">Minat Bakat</h4>
              <p className="text-xs font-semibold leading-relaxed opacity-80 uppercase tracking-wider">
                Pengembangan potensi remaja melalui berbagai kegiatan positif dan kreatif di Youth Center.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 bg-[#102a6e] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-10 uppercase italic">
            Ingin bergabung menjadi <br /> Relawan Remaja PKBI?
          </h3>
          <button
            className="py-4 px-16 rounded-full font-extrabold text-xl shadow-2xl hover:scale-105 transition-transform uppercase border-b-[4px] border-white/50"
            style={{
              background: `linear-gradient(to right, ${c.peachGrad1}, ${c.peachGrad2})`,
              color: c.blueText,
            }}
          >
            HUBUNGI KAMI SEKARANG
          </button>
        </div>
      </section>
    </main>
  );
}