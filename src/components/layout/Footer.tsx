import React from "react";
import { Instagram, Youtube } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0b2359] text-white pt-12 relative mt-24">
      {/* GRADIENT EFFECT
        h-[750px] & -top-[750px]: Agar cahaya pink naik tinggi mendekati foto dokter.
      */}
      <div className="h-40 w-full bg-gradient-to-t from-pink-200/70 to-transparent absolute -top-40 left-0 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CONTAINER UTAMA (FLEXBOX)
            justify-between: Memisahkan konten Kiri (Alamat+Kontak) dan Kanan (Sosmed) sejauh mungkin.
        */}
        <div className="px-6 md:px-16 pb-12 flex flex-col md:flex-row justify-between gap-12">
          {/* --- BAGIAN KIRI (Group Alamat & Kontak) --- */}
          <div className="space-y-8">
            {/* Alamat */}
            <div>
              <h4 className="font-bold text-lg mb-4 uppercase text-pink-100">
                Klinik Kami
              </h4>
              <p className="leading-relaxed max-w-xs text-gray-200">
                Jalan Shima Nomor 15 A, Pengkol III, Pengkol,
                <br /> Kecamatan Jepara, Kabupaten Jepara
              </p>
            </div>

            {/* Kontak */}
            <div>
              <h4 className="font-bold text-lg mb-4 uppercase text-pink-100">
                Kontak Kami
              </h4>
              <div className="space-y-2 text-gray-200">
                <p>+62 822-8998-5675</p>
                <p>pkbijepara12@gmail.com</p>
              </div>
            </div>
          </div>

          {/* --- BAGIAN KANAN (Sosmed) --- */}
          <div className="md:text-right">
            <h4 className="font-bold text-lg mb-4 uppercase text-pink-100">
              Kunjungi Kami
            </h4>

            {/* Icons Wrapper */}
            <div className="flex gap-4 justify-start md:justify-end items-center">
              {/* Instagram */}
              <a
                href="#"
                className="bg-white p-2 rounded-xl text-[#0b2359] hover:bg-gray-200 transition-colors"
              >
                <Instagram size={28} />
              </a>

              {/* TikTok Custom Icon */}
              <a
                href="#"
                className="bg-white p-2 rounded-xl text-[#0b2359] hover:bg-gray-200 transition-colors flex items-center justify-center w-[44px] h-[44px]"
              >
                <span className="font-extrabold text-lg leading-none">Tt</span>
              </a>

              {/* Youtube */}
              <a
                href="#"
                className="bg-white p-2 rounded-xl text-[#0b2359] hover:bg-gray-200 transition-colors"
              >
                <Youtube size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
      </div>
      <div className="bg-[#ffdcdc] py-3 text-center">
        <p className="text-[#0b2359] text-sm font-semibold">
          Copyright by @TeamTechwiz2026
        </p>
      </div>
    </footer>
  );
};

export default Footer;
