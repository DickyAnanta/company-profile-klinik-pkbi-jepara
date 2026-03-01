"use client";

export const dynamic = "force-dynamic"; // Ini boleh tetap ada di bawah "use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import {
  User as UserIcon,
  Stethoscope,
  HeartHandshake,
  Briefcase,
  X,
  MessageCircle,
} from "lucide-react";
// Pastikan path import ini benar sesuai struktur folder Anda
import { getStatistics } from "../admin/actions";

export default function Home() {
  // --- STATE ---
  // Menggunakan tipe data yang lebih aman daripada 'any' jika memungkinkan
  const [stats, setStats] = useState<{ [key: string]: number } | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // --- AMBIL DATA STATISTIK ---
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Pastikan fungsi getStatistics ada dan path importnya benar
        // Jika belum ada backend, stats akan tetap null dan menampilkan 0
        const data = await getStatistics();
        setStats(data);
      } catch (error) {
        // Error ini wajar jika belum ada koneksi database/backend
        console.log("Info: Data statistik belum tersedia atau gagal dimuat.");
      }
    };
    fetchStats();
  }, []);

  // --- DATA KONSULTASI ---
  const adminPhone = "6282289985675";
  const doctorPhone = "628812813021";

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

  // --- VARIAN ANIMASI ---
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }, // Jeda antar munculnya kartu
    },
  };

  // --- VARIAN ANIMASI KARTU BARU ---

  // Varian untuk 2 kartu KIRI (Rotasi dari kiri ke kanan / start -90deg)
  const cardFlipLeft = {
    hidden: { opacity: 0, rotateY: -90 },
    visible: {
      opacity: 1,
      rotateY: 0,
      transition: { type: "spring", stiffness: 80, damping: 12, duration: 0.8 },
    },
  };

  // Varian untuk 2 kartu KANAN (Rotasi dari kanan ke kiri / start 90deg)
  const cardFlipRight = {
    hidden: { opacity: 0, rotateY: 90 },
    visible: {
      opacity: 1,
      rotateY: 0,
      transition: { type: "spring", stiffness: 80, damping: 12, duration: 0.8 },
    },
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
              priority // Tambahkan priority untuk gambar LCP (Largest Contentful Paint)
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/80 to-white"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center pt-14">
            <motion.h2
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-3xl md:text-[40px] font-extrabold leading-tight mb-8 uppercase"
              style={{ color: c.blueText }}
            >
              Klinik Pratama Wahana Sejahtera <br /> PKBI Jepara
            </motion.h2>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-[14px] md:text-[15px] font-medium text-gray-800 max-w-3xl mb-10 leading-relaxed"
            >
              Selamat datang di layanan Klinik Pratama Wahana Sejahtera PKBI
              Jepara.
              <br className="hidden md:block" />
              Pelayanan kesehatan yang berfokus pada kesehatan reproduksi dan
              keluarga berencana.
            </motion.p>

            <motion.button
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPopupOpen(true)}
              className="py-3 px-12 rounded-full font-extrabold text-lg shadow-lg transition-transform uppercase mb-16 border-b-[4px] border-white/50"
              style={{
                background: `linear-gradient(to right, ${c.peachGrad1}, ${c.peachGrad2})`,
                color: c.blueText,
              }}
            >
              KONSULTASI
            </motion.button>

            {/* --- CARDS STATISTIK (Split Direction Flip Animation) --- */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              // Margin negatif agar animasi mulai sedikit lebih awal sebelum elemen benar-benar masuk viewport
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="pt-24 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl"
            >
              {[
                {
                  icon: UserIcon,
                  label: "Pasien",
                  value: stats?.pasien,
                  extra: "+",
                },
                {
                  icon: Stethoscope,
                  label: "Dokter",
                  value: stats?.dokter,
                  isDoctor: true,
                },
                {
                  icon: HeartHandshake,
                  label: "Relawan",
                  value: stats?.relawan,
                  extra: "+",
                },
                {
                  icon: Briefcase,
                  label: "Mitra",
                  value: stats?.mitra,
                  extra: "+",
                },
              ].map((item, index) => {
                // Logika untuk menentukan arah rotasi berdasarkan index
                // Index 0 & 1 (dua kiri) pakai cardFlipLeft
                // Index 2 & 3 (dua kanan) pakai cardFlipRight
                const isLeftCard = index < 2;
                const selectedVariant = isLeftCard
                  ? cardFlipLeft
                  : cardFlipRight;
                // Arah tilt saat hover menyesuaikan arah masuknya kartu
                const hoverTilt = isLeftCard ? -10 : 10;

                return (
                  <motion.div
                    key={index}
                    variants={selectedVariant} // Gunakan varian yang sudah dipilih
                    whileHover={{ scale: 1.05, rotateY: hoverTilt }}
                    className="rounded-[24px] p-8 text-white flex flex-col items-center shadow-xl transition-all cursor-default"
                    style={{
                      background: `linear-gradient(to bottom, ${c.cardGrad1}, ${c.cardGrad2})`,
                      perspective: "1000px", // Penting untuk efek 3D
                    }}
                  >
                    <div className="relative mb-2">
                      <item.icon
                        size={70}
                        strokeWidth={1.5}
                        className={item.isDoctor ? "" : "mb-2"}
                      />
                      {item.isDoctor && (
                        <span className="absolute -top-1 -right-2 text-2xl font-black">
                          +
                        </span>
                      )}
                    </div>
                    <span className="text-4xl font-extrabold">
                      {item.value ?? 0}
                      {item.extra}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest mt-1">
                      {item.label}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </header>

      {/* --- CONTENT SECTION --- */}
      <section className="py-12 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:w-3/5"
            >
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
                JEPARA - Klinik Wahana Sejahtera PKBI Jepara dan Pusat Pelayanan
                Keluarga Sejahtera (Satyagatra) Hasrat Bangsri berhasil meraih
                juara 1 nasional dari Badan Kependudukan dan Keluarga Berencana
                Nasional (BKKBN). Penghargaan tersebut diberikan atas kontribusi
                luar biasa dalam peningkatan pelayanan Keluarga Berencana (KB),
                dan praktik penyelenggaraan program satyagatra.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:w-2/5 flex justify-center md:justify-end md:-mt-12 relative"
            >
              <div className="w-[300px] h-[450px] rounded-xl flex items-center justify-center relative">
                <Image
                  src="/images/doctor.png"
                  alt="Dokter"
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- MODAL POPUP --- */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          style={{ zIndex: 9999 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden relative"
          >
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

            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 text-[#102a6e] rounded-full flex items-center justify-center mb-4">
                <MessageCircle size={36} strokeWidth={2} />
              </div>
              <p className="text-[#102a6e] font-medium text-[14px] mb-8">
                Silakan pilih layanan konsultasi di bawah ini agar kami dapat
                melayani Anda dengan lebih tepat.
              </p>

              <div className="flex flex-col gap-4 w-full">
                <a
                  href={adminLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white py-3.5 px-6 rounded-2xl font-bold text-sm shadow-md hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-3"
                >
                  <UserIcon size={20} /> HUBUNGI ADMIN
                </a>
                <a
                  href={doctorLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#102a6e] text-white py-3.5 px-6 rounded-2xl font-bold text-sm shadow-md hover:bg-[#0b1c4a] transition-all flex items-center justify-center gap-3"
                >
                  <Stethoscope size={20} /> KONSULTASI DOKTER
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}
