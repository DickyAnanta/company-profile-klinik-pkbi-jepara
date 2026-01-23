import Image from "next/image";
import {
  Phone,
  Mail,
  Instagram,
  Youtube,
  User,
  Stethoscope,
  HeartHandshake,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  // CONFIG WARNA
  const c = {
    blueDark: "#0b2359", // Header & Footer Background
    blueText: "#102a6e", // Teks Utama
    peachGrad1: "#ffafbd", // Tombol Konsultasi (Kiri)
    peachGrad2: "#ffc3a0", // Tombol Konsultasi (Kanan)
    cardGrad1: "#1e3a8a", // Kartu (Atas)
    cardGrad2: "#4c6ef5", // Kartu (Bawah)
    footerLine: "#ffdcdc", // Copyright bar
  };

  return (
    <main className="min-h-screen bg-white font-sans overflow-x-hidden text-[#102a6e]">
      {/* --- 3. HERO SECTION --- */}
      <header className="pt-32 relative w-full pb-32">
        {/* Background Image (Full Width) */}
        <div className="absolute inset-0 z-0 h-[700px] w-full bg-gray-100 pointer-events-none">
          <div className="w-full h-full relative opacity-70 mix-blend-multiply">
            {/* Placeholder Gambar Background */}
            <div className="absolute inset-0 bg-gray-300">
              {/* UNCOMMENT JIKA GAMBAR ADA: */}
              <Image
                src="/images/bg-hero.jpg"
                alt="bg"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/80 to-white"></div>
        </div>

        {/* CONTAINER ADDED (Content) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center pt-14">
            {/* Judul */}
            <h2
              className="text-3xl md:text-[40px] font-extrabold leading-tight mb-8"
              style={{ color: c.blueText }}
            >
              KLINIK PRATAMA WAHANA SEJAHTERA <br /> PKBI JEPARA
            </h2>

            {/* Deskripsi */}
            <p className="text-[14px] md:text-[15px] font-medium text-gray-800 max-w-3xl mb-10 leading-relaxed">
              Selamat datang di layanan Klinik Pratama Wahana Sejahtera PKBI
              Jepara.
              <br className="hidden md:block" />
              Pelayanan kesehatan yang berfokus pada kesehatan reproduksi dan
              keluarga berencana. Klinik ini berupaya memberikan layanan yang
              ramah, inklusif, dan berbasis hak, terutama bagi perempuan,
              remaja, dan kelompok rentan.
            </p>

            {/* Tombol Gradient */}
            <button
              className="py-3 px-12 rounded-full font-extrabold text-lg shadow-lg hover:scale-105 transition-transform uppercase mb-16 border-b-[4px] border-white/50"
              style={{
                background: `linear-gradient(to right, ${c.peachGrad1}, ${c.peachGrad2})`,
                color: c.blueText,
              }}
            >
              KONSULTASI
            </button>

            {/* --- CARDS (GRID SYSTEM) --- */}
            <div className="pt-24 pb-12 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
              {/* Card 1 */}
              <div
                className="rounded-[30px] p-8 text-white flex flex-col items-center shadow-xl transform hover:-translate-y-2 transition-all"
                style={{
                  background: `linear-gradient(to bottom, ${c.cardGrad1}, ${c.cardGrad2})`,
                }}
              >
                <User size={70} strokeWidth={1.5} className="mb-2" />
                <span className="text-4xl font-extrabold">1000+</span>
                <span className="text-xs font-bold uppercase tracking-widest mt-1">
                  Pasien
                </span>
              </div>
              {/* Card 2 */}
              <div
                className="rounded-[30px] p-8 text-white flex flex-col items-center shadow-xl transform hover:-translate-y-2 transition-all"
                style={{
                  background: `linear-gradient(to bottom, ${c.cardGrad1}, ${c.cardGrad2})`,
                }}
              >
                <div className="relative mb-2">
                  <Stethoscope size={70} strokeWidth={1.5} />
                  <span className="absolute -top-1 -right-2 text-2xl font-black">
                    +
                  </span>
                </div>
                <span className="text-4xl font-extrabold">4</span>
                <span className="text-xs font-bold uppercase tracking-widest mt-1">
                  Dokter
                </span>
              </div>
              {/* Card 3 */}
              <div
                className="rounded-[30px] p-8 text-white flex flex-col items-center shadow-xl transform hover:-translate-y-2 transition-all"
                style={{
                  background: `linear-gradient(to bottom, ${c.cardGrad1}, ${c.cardGrad2})`,
                }}
              >
                <HeartHandshake size={70} strokeWidth={1.5} className="mb-2" />
                <span className="text-4xl font-extrabold">50+</span>
                <span className="text-xs font-bold uppercase tracking-widest mt-1">
                  Relawan
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- 4. CONTENT SECTION --- */}
      <section className="py-12 bg-white relative z-20">
        {/* CONTAINER ADDED */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="md:w-3/5">
              <h3
                className="text-3xl font-extrabold mb-6 leading-tight"
                style={{ color: c.blueText }}
              >
                Klinik Pratama Wahana Sejahtera <br /> PKBI JEPARA
              </h3>
              <p
                className="text-justify text-[14px] leading-7 font-semibold space-y-4"
                style={{ color: c.blueText }}
              >
                JEPARA -Klinik Wahana Sejahtera PKBI Jepara dan Pusat Pelayanan
                Keluarga Sejahtera (Satyagatra) Hasrat Bangsri berhasil meraih
                juara 1 nasional dari Badan Kependudukan dan Keluarga Berencana
                Nasional (BKKBN). Penghargaan tersebut diberikan atas kontribusi
                luar biasa dalam peningkatan pelayanan Keluarga Berencana (KB),
                dan praktik penyelenggaraan program satyagatra. Penghargaan
                diserahkan oleh Deputi Bidang Keluarga Sejahtera dan
                pemberdayaan Keluarga, pada Apresiasi dan Penghargaan Program
                Bangga Kencana pada rangkaian peringatan Hari Keluarga Nasional,
                di Hotel PO Semarang.
              </p>
            </div>
            <div className="md:w-2/5 flex justify-center md:justify-end md:-mt-12 relative">
              <div className="w-[300px] h-[450px]  rounded-xl flex items-center justify-center relative">
                {/* Placeholder Gambar */}
                <span className="text-gray-400 text-xs text-center p-4">
                  Pastikan file 'doctor.png'
                  <br />
                  ada di folder public
                </span>
                {/* UNCOMMENT JIKA GAMBAR ADA: */}
                <Image
                  src="/images/doctor.png"
                  alt="Dokter"
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
