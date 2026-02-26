"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { History, Eye, Target, Award, ChevronRight, Medal } from "lucide-react";

export default function AboutPage() {
  // --- KONFIGURASI STYLE ---
  const c = {
    blueDark: "#0b2359",
    blueText: "#102a6e",
    peachGrad1: "#ffafbd",
    peachGrad2: "#ffc3a0",
    cardGrad1: "#1e3a8a",
    cardGrad2: "#4c6ef5",
  };

  // --- VARIAN ANIMASI BOLD (FIXED WITH AS CONST) ---
  const springPop = {
    hidden: { opacity: 0, scale: 0.5, y: 100 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 12 },
    },
  } as const;

  return (
    <main className="min-h-screen bg-white font-sans overflow-x-hidden text-[#102a6e]">
      {/* --- HERO SECTION --- */}
      <header className="pt-32 relative w-full pb-24">
        <div className="absolute inset-0 z-0 h-[500px] w-full bg-gray-100 pointer-events-none">
          <div className="w-full h-full relative opacity-70 mix-blend-multiply">
            <Image
              src="/images/bg-hero.jpg"
              alt="bg"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/80 to-white"></div>
        </div>

        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring" as const, stiffness: 80, duration: 1 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center pt-14"
        >
          <h2
            className="text-5xl md:text-7xl font-extrabold italic leading-tight mb-4 uppercase tracking-tighter"
            style={{ color: c.blueText }}
          >
            Tentang Kami
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="h-2.5 rounded-full mb-8 mx-auto"
            style={{ backgroundColor: c.blueText }}
          />
          <p className="text-[14px] md:text-[16px] font-bold text-gray-800 max-w-2xl mx-auto leading-relaxed uppercase tracking-widest opacity-80">
            Mengenal Lebih Dekat Klinik Pratama Wahana Sejahtera PKBI Jepara
          </p>
        </motion.div>
      </header>

      {/* --- SECTION 1: SEJARAH --- */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <motion.div
              initial={{ x: -200, opacity: 0, rotate: -10 }}
              whileInView={{ x: 0, opacity: 1, rotate: 2 }}
              viewport={{ once: true }}
              transition={{ type: "spring" as const, duration: 1.5 }}
              className="md:w-1/2 relative"
            >
              <div className="w-full h-[450px] rounded-[3rem] overflow-hidden shadow-2xl border-[10px] border-white">
                <Image
                  src="/images/history.jpg"
                  alt="Sejarah"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-[2.5rem] shadow-2xl flex items-center gap-4">
                <History size={40} style={{ color: c.blueText }} />
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Berdiri Sejak
                  </p>
                  <p
                    className="text-2xl font-black italic"
                    style={{ color: c.blueText }}
                  >
                    19XX
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="md:w-1/2"
            >
              <h3
                className="text-4xl font-extrabold mb-8 leading-tight uppercase italic"
                style={{ color: c.blueText }}
              >
                Sejarah & <br /> Latar Belakang
              </h3>
              <div
                className="text-justify text-[14px] leading-7 font-semibold space-y-6"
                style={{ color: c.blueText }}
              >
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: VISI MISI --- */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold mb-20 leading-tight uppercase text-center italic"
            style={{ color: c.blueText }}
          >
            Visi & Misi Kami
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* VISI */}
            <motion.div
              variants={springPop as Variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -10 }}
              className="rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden"
              style={{
                background: `linear-gradient(to bottom right, ${c.cardGrad1}, ${c.cardGrad2})`,
              }}
            >
              <Eye size={120} className="absolute -right-8 -top-8 opacity-10" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md shadow-inner">
                  <Eye size={36} strokeWidth={2.5} />
                </div>
                <h4 className="text-3xl font-extrabold mb-6 uppercase italic tracking-tighter">
                  Visi
                </h4>
                <p className="text-lg font-bold leading-relaxed opacity-90 italic">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis."
                </p>
              </div>
            </motion.div>

            {/* MISI */}
            <motion.div
              variants={springPop as Variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.03, y: -10 }}
              className="rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden"
              style={{
                background: `linear-gradient(to bottom right, ${c.cardGrad1}, ${c.cardGrad2})`,
              }}
            >
              <Target
                size={120}
                className="absolute -right-8 -top-8 opacity-10"
              />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md shadow-inner">
                  <Target size={36} strokeWidth={2.5} />
                </div>
                <h4 className="text-3xl font-extrabold mb-6 uppercase italic tracking-tighter">
                  Misi
                </h4>
                <ul className="space-y-4 font-bold text-lg">
                  {[1, 2, 3].map((i) => (
                    <li key={i} className="flex items-start gap-4">
                      <ChevronRight
                        size={24}
                        className="shrink-0 mt-1 text-blue-300"
                      />
                      <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        sed do eiusmod.
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: PRESTASI --- */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h3
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold mb-20 uppercase italic tracking-tighter"
            style={{ color: c.blueText }}
          >
            Prestasi & Penghargaan
          </motion.h3>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-2 rounded-[3.5rem] p-12 text-white flex flex-col md:flex-row items-center gap-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden"
              style={{
                background: `linear-gradient(to right, ${c.cardGrad1}, ${c.cardGrad2})`,
              }}
            >
              <Award
                size={180}
                className="absolute -left-10 -bottom-10 opacity-10 rotate-12"
              />
              <div className="relative z-10 bg-white/20 p-8 rounded-[2.5rem] backdrop-blur-md">
                <Award size={100} className="text-yellow-400" />
              </div>
              <div className="relative z-10 text-center md:text-left">
                <span className="bg-yellow-400 text-blue-900 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-6 inline-block">
                  Juara 1 Nasional
                </span>
                <h3 className="text-3xl md:text-4xl font-black mb-4 italic uppercase tracking-tighter">
                  Penghargaan Program Bangga Kencana BKKBN
                </h3>
                <p className="text-lg font-semibold opacity-90 leading-relaxed italic">
                  Meraih juara 1 nasional dari BKKBN atas kontribusi luar biasa
                  dalam pelayanan Keluarga Berencana.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-white border-[6px] border-dashed border-gray-100 rounded-[3.5rem] p-12 flex flex-col items-center justify-center text-center shadow-sm"
            >
              <Medal size={80} className="text-blue-100 mb-6" />
              <h4
                className="text-xl font-black italic uppercase tracking-tight"
                style={{ color: c.blueText }}
              >
                Akreditasi Paripurna
              </h4>
              <p className="text-sm font-bold text-gray-400 mt-4 leading-relaxed">
                Lorem ipsum dolor sit amet elit.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
