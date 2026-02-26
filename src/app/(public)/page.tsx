"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  User as UserIcon,
  Stethoscope,
  HeartHandshake,
  Briefcase,
  X,
  MessageCircle,
} from "lucide-react";
import { getStatistics } from "../admin/actions";

export default function Home() {
  // --- STATE ---
  const [stats, setStats] = useState<any>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // --- AMBIL DATA STATISTIK ---
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStatistics();
        setStats(data);
      } catch (error) {
        console.error("Gagal mengambil statistik:", error);
      }
    };
    fetchStats();
  }, []);

  // --- DATA KONSULTASI (Dari file ConsultButton Anda) ---
  const adminPhone = "6282289985675"; // Nomor Admin Klinik
  const doctorPhone = "628812813021"; // Nomor Dokter

  const adminMessage =
    "Halo Admin Klinik PKBI Jepara, saya ingin bertanya mengenai informasi layanan dan jadwal operasional.";
  const doctorMessage =
    "Halo Dokter Klinik PKBI Jepara, saya ingin berkonsultasi mengenai kesehatan saya.";

  const adminLink = `https://wa.me/${adminPhone}?text=${encodeURIComponent(adminMessage)}`;
  const doctorLink = `https://wa.me/${doctorPhone}?text=${encodeURIComponent(doctorMessage)}`;

  // --- KODE WARNA ---
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
      <header className="pt-32 relative w-full pb-32">
        <div className="absolute inset-0 z-0 h-[700px] w-full bg-gray-100 pointer-events-none">
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
              className="text-3xl md:text-[40px] font-extrabold leading-tight mb-8 uppercase"
              style={{ color: c.blueText }}
            >
              Klinik Pratama Wahana Sejahtera <br /> PKBI Jepara
            </h2>

            <p className="text-[14px] md:text-[15px] font-medium text-gray-800 max-w-3xl mb-10 leading-relaxed">
              Selamat datang di layanan Klinik Pratama Wahana Sejahtera PKBI
              Jepara.
              <br className="hidden md:block" />
              Pelayanan kesehatan yang berfokus pada kesehatan reproduksi dan
              keluarga berencana.
            </p>

            {/* --- TOMBOL KONSULTASI --- */}
            <button
              onClick={() => setIsPopupOpen(true)}
              className="py-3 px-12 rounded-full font-extrabold text-lg shadow-lg hover:scale-105 transition-transform uppercase mb-16 border-b-[4px] border-white/50"
              style={{
                background: `linear-gradient(to right, ${c.peachGrad1}, ${c.peachGrad2})`,
                color: c.blueText,
              }}
            >
              KONSULTASI
            </button>

            {/* --- CARDS STATISTIK --- */}
            <div className="pt-24 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl">
              <div
                className="rounded-[24px] p-8 text-white flex flex-col items-center shadow-xl transform hover:-translate-y-2 transition-all"
                style={{
                  background: `linear-gradient(to bottom, ${c.cardGrad1}, ${c.cardGrad2})`,
                }}
              >
                <UserIcon size={70} strokeWidth={1.5} className="mb-2" />
                <span className="text-4xl font-extrabold">
                  {stats?.pasien ?? 0}+
                </span>
                <span className="text-xs font-bold uppercase tracking-widest mt-1">
                  Pasien
                </span>
              </div>

              <div
                className="rounded-[24px] p-8 text-white flex flex-col items-center shadow-xl transform hover:-translate-y-2 transition-all"
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
                <span className="text-4xl font-extrabold">
                  {stats?.dokter ?? 0}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest mt-1">
                  Dokter
                </span>
              </div>

              <div
                className="rounded-[24px] p-8 text-white flex flex-col items-center shadow-xl transform hover:-translate-y-2 transition-all"
                style={{
                  background: `linear-gradient(to bottom, ${c.cardGrad1}, ${c.cardGrad2})`,
                }}
              >
                <HeartHandshake size={70} strokeWidth={1.5} className="mb-2" />
                <span className="text-4xl font-extrabold">
                  {stats?.relawan ?? 0}+
                </span>
                <span className="text-xs font-bold uppercase tracking-widest mt-1">
                  Relawan
                </span>
              </div>

              <div
                className="rounded-[24px] p-8 text-white flex flex-col items-center shadow-xl transform hover:-translate-y-2 transition-all"
                style={{
                  background: `linear-gradient(to bottom, ${c.cardGrad1}, ${c.cardGrad2})`,
                }}
              >
                <Briefcase size={70} strokeWidth={1.5} className="mb-2" />
                <span className="text-4xl font-extrabold">
                  {stats?.mitra ?? 0}+
                </span>
                <span className="text-xs font-bold uppercase tracking-widest mt-1">
                  Mitra
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- CONTENT SECTION --- */}
      <section className="py-12 bg-white relative z-20">
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
              <div className="w-[300px] h-[450px] rounded-xl flex items-center justify-center relative">
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

      {/* ========================================= */}
      {/* MODAL / POPUP KONSULTASI (Menyatu di Sini) */}
      {/* ========================================= */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden relative transform transition-all animate-in zoom-in-95 duration-300">
            {/* Header Popup */}
            <div className="bg-[#102a6e] p-6 text-white text-center relative">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-4 right-4 bg-white/20 p-1.5 rounded-full hover:bg-white/40 transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl font-bold mb-1">Konsultasi Online</h3>
              <p className="text-xs opacity-80">Klinik PKBI Jepara</p>
            </div>

            {/* Body Popup */}
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 text-[#102a6e] rounded-full flex items-center justify-center mb-4 shadow-sm">
                <MessageCircle size={36} strokeWidth={2} />
              </div>

              <p className="text-[#102a6e] font-medium text-[14px] mb-8">
                Silakan pilih layanan konsultasi di bawah ini agar kami dapat
                melayani Anda dengan lebih tepat.
              </p>

              {/* Kumpulan Tombol Pilihan */}
              <div className="flex flex-col gap-4 w-full">
                {/* Tombol Admin */}
                <a
                  href={adminLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white py-3.5 px-6 rounded-2xl font-bold text-sm shadow-md hover:bg-[#20bd5a] hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                >
                  <UserIcon size={20} />
                  HUBUNGI ADMIN
                </a>

                {/* Tombol Dokter */}
                <a
                  href={doctorLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#102a6e] text-white py-3.5 px-6 rounded-2xl font-bold text-sm shadow-md hover:bg-[#0b1c4a] hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                >
                  <Stethoscope size={20} />
                  KONSULTASI DOKTER
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
