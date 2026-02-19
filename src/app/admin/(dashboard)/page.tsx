"use client";

import { Activity, Newspaper, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { getDashboardStats } from "../actions"; // Pastikan path import benar

export default function AdminDashboard() {
  const bluePrimary = "#00387d";
  const [stats, setStats] = useState<any>(null);

  // Mengambil data dashboard dari database
  useEffect(() => {
    getDashboardStats().then((data) => {
      setStats(data);
    });
  }, []);

  // Tampilan loading saat menyinkronkan data
  if (!stats) {
    return (
      <div className="min-h-full flex items-center justify-center italic text-blue-900 font-bold">
        Menyinkronkan data PKBI Jepara...
      </div>
    );
  }

  return (
    <div className="min-h-full font-sans p-4">
      {/* --- HEADER JUDUL DASHBOARD --- */}
      <div className="mb-12">
        <h1
          className="text-3xl font-bold italic tracking-wide mb-2"
          style={{ color: bluePrimary }}
        >
          Dashboard
        </h1>
        <div
          className="h-[3px] w-full rounded-full"
          style={{ backgroundColor: bluePrimary }}
        ></div>
      </div>

      {/* --- GRID UTAMA (3 KOLOM) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* ================= KOLOM 1: LAYANAN ================= */}
        <div
          className="relative rounded-[30px] border-[3px] p-5 pt-8 bg-white"
          style={{ borderColor: bluePrimary }}
        >
          <div
            className="absolute -top-5 left-6 px-8 py-2 rounded-full text-white font-bold text-sm shadow-sm z-10"
            style={{ backgroundColor: bluePrimary }}
          >
            Layanan
          </div>

          <div
            className="rounded-[20px] p-6 text-white shadow-md h-[180px] flex flex-col justify-center items-center text-center relative overflow-hidden"
            style={{ backgroundColor: bluePrimary }}
          >
            <Activity className="absolute -right-4 -bottom-4 w-32 h-32 text-white opacity-[0.07]" />
            <div className="relative z-10 px-2 flex flex-col items-center">
              <h3 className="text-sm font-medium opacity-90">Jumlah Layanan</h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[5rem] font-bold leading-none">
                  {stats.countLayanan}
                </span>
                <span className="text-sm font-medium opacity-90">
                  Layanan Aktif
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= KOLOM 2: BERITA KLINIK ================= */}
        <div
          className="relative rounded-[30px] border-[3px] p-5 pt-8 bg-white h-full flex flex-col gap-6"
          style={{ borderColor: bluePrimary }}
        >
          <div
            className="absolute -top-5 left-6 px-8 py-2 rounded-full text-white font-bold text-sm shadow-sm z-10"
            style={{ backgroundColor: bluePrimary }}
          >
            Berita Klinik
          </div>

          <div
            className="rounded-[20px] p-6 text-white shadow-md h-[180px] flex flex-col justify-center items-center text-center relative overflow-hidden"
            style={{ backgroundColor: bluePrimary }}
          >
            <Newspaper className="absolute -right-4 -bottom-4 w-28 h-28 text-white opacity-[0.07]" />
            <h3 className="text-sm font-medium opacity-90 relative z-10">
              Jumlah Berita Klinik
            </h3>
            <span className="text-[4rem] font-bold leading-none mt-1 relative z-10">
              {stats.countKlinik}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div
              className="self-start px-6 py-1.5 rounded-full text-white font-bold text-xs"
              style={{ backgroundColor: bluePrimary }}
            >
              Berita Terbaru
            </div>
            
            {stats.latestKlinik.length > 0 ? (
              stats.latestKlinik.map((berita: any) => (
                <div
                  key={berita.id}
                  className="group relative w-full h-36 rounded-2xl border-[3px] overflow-hidden shadow-sm transition-transform hover:scale-[1.02]"
                  style={{ borderColor: bluePrimary }}
                >
                  <img
                    src={berita.gambar}
                    alt={berita.judul}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00387d] via-[#00387d]/40 to-transparent"></div>
                  <div className="absolute inset-0 p-3 flex flex-col justify-end">
                    <p className="text-white font-bold text-[10px] leading-tight uppercase italic line-clamp-2">
                      {berita.judul}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full h-36 rounded-2xl border-[3px] border-dashed border-gray-200 flex items-center justify-center text-gray-300 italic text-xs">
                Belum ada berita klinik
              </div>
            )}
          </div>
        </div>

        {/* ================= KOLOM 3: BERITA KARTINI ================= */}
        <div
          className="relative rounded-[30px] border-[3px] p-5 pt-8 bg-white h-full flex flex-col gap-6"
          style={{ borderColor: bluePrimary }}
        >
          <div
            className="absolute -top-5 left-6 px-8 py-2 rounded-full text-white font-bold text-sm shadow-sm z-10"
            style={{ backgroundColor: bluePrimary }}
          >
            Berita Kartini
          </div>

          <div
            className="rounded-[20px] p-6 text-white shadow-md h-[180px] flex flex-col justify-center items-center text-center relative overflow-hidden"
            style={{ backgroundColor: bluePrimary }}
          >
            <Users className="absolute -right-4 -bottom-4 w-28 h-28 text-white opacity-[0.07]" />
            <h3 className="text-sm font-medium opacity-90 relative z-10">
              Jumlah Berita Kartini
            </h3>
            <span className="text-[4rem] font-bold leading-none mt-1 relative z-10">
              {stats.countKartini}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div
              className="self-start px-6 py-1.5 rounded-full text-white font-bold text-xs"
              style={{ backgroundColor: bluePrimary }}
            >
              Berita Terbaru
            </div>

            {stats.latestKartini.length > 0 ? (
              stats.latestKartini.map((berita: any) => (
                <div
                  key={berita.id}
                  className="group relative w-full h-36 rounded-2xl border-[3px] overflow-hidden shadow-sm transition-transform hover:scale-[1.02]"
                  style={{ borderColor: bluePrimary }}
                >
                  <img
                    src={berita.gambar}
                    alt={berita.judul}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00387d] via-[#00387d]/40 to-transparent"></div>
                  <div className="absolute inset-0 p-3 flex flex-col justify-end">
                    <p className="text-white font-bold text-[10px] leading-tight uppercase italic line-clamp-2">
                      {berita.judul}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full h-36 rounded-2xl border-[3px] border-dashed border-gray-200 flex items-center justify-center text-gray-300 italic text-xs">
                Belum ada berita kartini
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}