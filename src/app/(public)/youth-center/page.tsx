"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  MapPin,
  HeartPulse,
  MessageSquare,
  Globe,
  Zap,
  X,
  Instagram,
  Send,
} from "lucide-react";

export default function YouthCenterPage() {
  // --- STATE UNTUK POPUP ---
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // --- PENGATURAN INSTAGRAM ---
  const igUsername = "youthcenter.kartini";
  const igLink = `https://ig.me/m/${igUsername}`;

  // --- KODE WARNA ---
  const c = {
    blueDark: "#0b2359",
    blueText: "#102a6e",
    peachGrad1: "#ffafbd",
    peachGrad2: "#ffc3a0",
    cardGrad1: "#1e3a8a",
    cardGrad2: "#4c6ef5",
  };

  // --- VARIAN ANIMASI HALUS ---
  const fadeInDown = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 300, delay: 0.1 },
    },
    exit: { opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <main className="min-h-screen bg-white font-sans overflow-x-hidden text-[#102a6e]">
      {/* --- HERO SECTION --- */}
      <header className="pt-32 relative w-full pb-24">
        <div className="absolute inset-0 z-0 h-[500px] w-full bg-gray-100 pointer-events-none">
          <div className="w-full h-full relative opacity-70 mix-blend-multiply">
            <Image
              src="/images/bg-hero.jpg"
              alt="bg youth center"
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white"></div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInDown}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-1.5 rounded-full mb-6">
            <Zap size={16} className="text-blue-800" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Ruang Aman Remaja
            </span>
          </div>

          <h2
            className="text-4xl md:text-7xl font-extrabold leading-tight mb-2 uppercase tracking-tighter italic"
            style={{ color: c.blueText }}
          >
            Youth Center
          </h2>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100px", opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="h-2 rounded-full mb-8 mx-auto"
            style={{ backgroundColor: c.blueText }}
          />

          <p className="text-[14px] md:text-[18px] font-bold text-gray-800 max-w-2xl mx-auto leading-relaxed uppercase tracking-widest opacity-80 mb-8">
            Pusat Informasi & Pelayanan Kesehatan Reproduksi Remaja
          </p>

          {/* TOMBOL 1: Di Bagian Atas (Hero) */}
          <button
            onClick={() => setIsPopupOpen(true)}
            className="py-3 px-10 rounded-full font-extrabold text-lg shadow-lg hover:scale-105 transition-transform uppercase border-b-[4px] border-white/50"
            style={{
              background: `linear-gradient(to right, ${c.peachGrad1}, ${c.peachGrad2})`,
              color: c.blueText,
            }}
          >
            HUBUNGI KAMI
          </button>
        </motion.div>
      </header>

      {/* --- SECTION 1: APA ITU YOUTH CENTER? --- */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="md:w-3/5"
            >
              <h3
                className="text-3xl font-extrabold mb-8 leading-tight uppercase"
                style={{ color: c.blueText }}
              >
                Wadah Ekspresi <br /> & Edukasi Remaja
              </h3>
              <p
                className="text-justify text-[14px] leading-7 font-semibold mb-6"
                style={{ color: c.blueText }}
              >
                Youth Center merupakan pusat kegiatan remaja PKBI yang
                didedikasikan sebagai ruang aman bagi anak muda. Kami
                menyediakan informasi komprehensif mengenai kesehatan seksual
                dan reproduksi (HKSR) guna membekali remaja dengan pengetahuan
                yang tepat dan bertanggung jawab.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600">
                    <HeartPulse size={24} />
                  </div>
                  <span className="font-bold text-sm uppercase tracking-wide">
                    Layanan HKSR
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                    <MessageSquare size={24} />
                  </div>
                  <span className="font-bold text-sm uppercase tracking-wide">
                    Konseling Sebaya
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:w-2/5"
            >
              <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white">
                <Image
                  src="/images/youth-activity.jpg"
                  alt="Kegiatan Remaja"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: JARINGAN NASIONAL --- */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8 text-blue-800"
          >
            <Globe size={120} strokeWidth={1} />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h3
              className="text-3xl font-extrabold mb-6 uppercase tracking-tight"
              style={{ color: c.blueText }}
            >
              Jaringan Nasional yang Luas
            </h3>
            <p
              className="max-w-3xl mx-auto text-[14px] font-semibold leading-7 mb-12"
              style={{ color: c.blueText }}
            >
              Youth Center PKBI telah berkembang pesat di hampir seluruh wilayah
              Indonesia. Hingga saat ini, kami setidaknya telah menjangkau **17
              Provinsi** di seluruh tanah air, memastikan akses informasi
              kesehatan tersedia bagi setiap remaja.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-4 bg-white px-10 py-5 rounded-[2rem] shadow-lg border-b-4 border-blue-900"
            >
              <MapPin className="text-red-500" size={32} />
              <div className="text-left">
                <p
                  className="text-4xl font-black italic tracking-tighter"
                  style={{ color: c.blueText }}
                >
                  17 PROVINSI
                </p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Jangkauan Youth Center PKBI
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 3: LAYANAN KAMI --- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3
              className="text-3xl font-extrabold uppercase mb-4"
              style={{ color: c.blueText }}
            >
              Layanan Remaja
            </h3>
            <div className="h-1.5 w-20 bg-blue-800 mx-auto rounded-full"></div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Card 1 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="rounded-[2.5rem] p-10 text-white shadow-xl flex flex-col items-center text-center transition-all"
              style={{
                background: `linear-gradient(to bottom, ${c.cardGrad1}, ${c.cardGrad2})`,
              }}
            >
              <HeartPulse size={60} strokeWidth={1.5} className="mb-6" />
              <h4 className="text-xl font-extrabold uppercase mb-4">
                Layanan Kesehatan
              </h4>
              <p className="text-xs font-semibold leading-relaxed opacity-80 uppercase tracking-wider">
                Akses layanan kesehatan reproduksi yang ramah dan rahasia bagi
                remaja.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="rounded-[2.5rem] p-10 text-white shadow-xl flex flex-col items-center text-center transition-all"
              style={{
                background: `linear-gradient(to bottom, ${c.cardGrad1}, ${c.cardGrad2})`,
              }}
            >
              <Users size={60} strokeWidth={1.5} className="mb-6" />
              <h4 className="text-xl font-extrabold uppercase mb-4">
                Pendidik Sebaya
              </h4>
              <p className="text-xs font-semibold leading-relaxed opacity-80 uppercase tracking-wider">
                Belajar bersama melalui diskusi interaktif untuk membangun
                kesadaran HKSR.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              className="rounded-[2.5rem] p-10 text-white shadow-xl flex flex-col items-center text-center transition-all"
              style={{
                background: `linear-gradient(to bottom, ${c.cardGrad1}, ${c.cardGrad2})`,
              }}
            >
              <Zap size={60} strokeWidth={1.5} className="mb-6" />
              <h4 className="text-xl font-extrabold uppercase mb-4">
                Minat Bakat
              </h4>
              <p className="text-xs font-semibold leading-relaxed opacity-80 uppercase tracking-wider">
                Pengembangan potensi melalui berbagai kegiatan positif dan
                kreatif di Youth Center.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 bg-[#102a6e] text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 relative z-10"
        >
          <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-10 uppercase italic">
            Ingin bergabung menjadi <br /> Relawan Remaja PKBI?
          </h3>

          {/* TOMBOL 2: Di Bagian Bawah (CTA) */}
          <motion.button
            onClick={() => setIsPopupOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="py-4 px-16 rounded-full font-extrabold text-xl shadow-2xl transition-transform uppercase border-b-[4px] border-white/50"
            style={{
              background: `linear-gradient(to right, ${c.peachGrad1}, ${c.peachGrad2})`,
              color: c.blueText,
            }}
          >
            HUBUNGI KAMI SEKARANG
          </motion.button>
        </motion.div>
      </section>

      {/* ========================================= */}
      {/* POPUP MODAL INSTAGRAM (Menggunakan Framer Motion) */}
      {/* ========================================= */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setIsPopupOpen(false)} // Klik luar untuk tutup
          >
            <motion.div
              key="modal-box"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam kotak menutup modal
              className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm overflow-hidden relative"
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
                  Youth Center PKBI
                </p>
              </div>

              {/* Body Popup */}
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-pink-50 text-[#e1306c] rounded-2xl flex items-center justify-center mb-5 shadow-sm ring-4 ring-pink-100/50">
                  <Instagram size={36} strokeWidth={2} />
                </div>

                <p className="text-[#102a6e]/80 font-medium text-[14px] mb-8 leading-relaxed px-2">
                  Punya pertanyaan atau ingin tahu lebih lanjut? Silakan
                  kirimkan <strong>Direct Message (DM)</strong> ke Instagram
                  kami.
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
