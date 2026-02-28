import {
  Activity,
  Newspaper,
  Users,
  Stethoscope,
  Heart,
  Settings,
  Briefcase,
} from "lucide-react";
import { PrismaClient } from "@prisma/client";
import { getStatistics, updateStatistics } from "./actions"; // Import fungsi Server Actions

export const dynamic = "force-dynamic";
// --- INISIALISASI PRISMA ---
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default async function AdminDashboard() {
  const bluePrimary = "#00387d";

  // --- MENGAMBIL DATA DARI DATABASE ---

  // 1. Mengambil data statistik (Pasien, Dokter, Relawan, Mitra)
  const realStats = await getStatistics();

  // 2. Jumlah Layanan
  const countLayanan = await prisma.layanan.count();

  // 3. Data Berita Klinik (Jumlah & 2 Berita Terbaru)
  const countKlinik = await prisma.berita.count({
    where: { kategori: "KLINIK" },
  });
  const latestKlinik = await prisma.berita.findMany({
    where: { kategori: "KLINIK" },
    orderBy: { tanggal: "desc" },
    take: 2,
  });

  // 4. Data Berita Kartini (Jumlah & 2 Berita Terbaru)
  const countKartini = await prisma.berita.count({
    where: { kategori: "KARTINI" },
  });
  const latestKartini = await prisma.berita.findMany({
    where: { kategori: "KARTINI" },
    orderBy: { tanggal: "desc" },
    take: 2,
  });

  return (
    <div className="min-h-full font-sans p-4 animate-in fade-in duration-500">
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

      {/* --- PENGATURAN STATISTIK BERANDA (4 KOLOM) --- */}
      <div
        className="mb-12 relative rounded-[30px] border-[3px] p-6 pt-10 bg-white shadow-sm"
        style={{ borderColor: bluePrimary }}
      >
        <div
          className="absolute -top-5 left-6 px-8 py-2 rounded-full text-white font-bold text-sm shadow-sm z-10 flex items-center gap-2"
          style={{ backgroundColor: bluePrimary }}
        >
          <Settings size={16} /> Pengaturan Statistik Beranda
        </div>

        <form
          action={updateStatistics}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end"
        >
          {/* Input Pasien */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">
              Jumlah Pasien
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                name="pasien"
                type="number"
                defaultValue={realStats?.pasien}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-gray-100 outline-none focus:border-blue-400 transition-all bg-gray-50/50 font-bold text-sm"
              />
            </div>
          </div>

          {/* Input Dokter */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">
              Jumlah Dokter
            </label>
            <div className="relative">
              <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                name="dokter"
                type="number"
                defaultValue={realStats?.dokter}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-gray-100 outline-none focus:border-blue-400 transition-all bg-gray-50/50 font-bold text-sm"
              />
            </div>
          </div>

          {/* Input Relawan */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">
              Jumlah Relawan
            </label>
            <div className="relative">
              <Heart className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                name="relawan"
                type="number"
                defaultValue={realStats?.relawan}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-gray-100 outline-none focus:border-blue-400 transition-all bg-gray-50/50 font-bold text-sm"
              />
            </div>
          </div>

          {/* Input Mitra (Kunci Perbaikan: name="mitra") */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">
              Jumlah Mitra
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                name="mitra"
                type="number"
                defaultValue={realStats?.mitra}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-gray-100 outline-none focus:border-blue-400 transition-all bg-gray-50/50 font-bold text-sm"
              />
            </div>
          </div>

          <div className="md:col-span-2 lg:col-span-4 flex justify-end mt-2">
            <button
              type="submit"
              className="w-full md:w-auto bg-[#00387d] text-white px-12 py-3 rounded-xl font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all text-xs uppercase tracking-wider"
            >
              Simpan Perubahan Statistik
            </button>
          </div>
        </form>
      </div>

      {/* --- GRID UTAMA (3 KOLOM) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* KOLOM 1: LAYANAN */}
        <div
          className="relative rounded-[30px] border-[3px] p-5 pt-8 bg-white"
          style={{ borderColor: bluePrimary }}
        >
          <div
            className="absolute -top-5 left-6 px-8 py-2 rounded-full text-white font-bold text-sm z-10"
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
                  {countLayanan}
                </span>
                <span className="text-sm font-medium opacity-90">
                  Layanan Aktif
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* KOLOM 2: BERITA KLINIK */}
        <div
          className="relative rounded-[30px] border-[3px] p-5 pt-8 bg-white h-full flex flex-col gap-6"
          style={{ borderColor: bluePrimary }}
        >
          <div
            className="absolute -top-5 left-6 px-8 py-2 rounded-full text-white font-bold text-sm z-10"
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
              {countKlinik}
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <div
              className="self-start px-6 py-1.5 rounded-full text-white font-bold text-xs"
              style={{ backgroundColor: bluePrimary }}
            >
              Berita Terbaru
            </div>
            {latestKlinik.length > 0 ? (
              latestKlinik.map((berita: any) => (
                <div
                  key={berita.id}
                  className="group relative w-full h-36 rounded-2xl border-[3px] overflow-hidden shadow-sm transition-transform hover:scale-[1.02]"
                  style={{ borderColor: bluePrimary }}
                >
                  <img
                    src={berita.gambar || ""}
                    alt={berita.judul}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00387d] via-[#00387d]/40 to-transparent p-3 flex flex-col justify-end">
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

        {/* KOLOM 3: BERITA KARTINI */}
        <div
          className="relative rounded-[30px] border-[3px] p-5 pt-8 bg-white h-full flex flex-col gap-6"
          style={{ borderColor: bluePrimary }}
        >
          <div
            className="absolute -top-5 left-6 px-8 py-2 rounded-full text-white font-bold text-sm z-10"
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
              {countKartini}
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <div
              className="self-start px-6 py-1.5 rounded-full text-white font-bold text-xs"
              style={{ backgroundColor: bluePrimary }}
            >
              Berita Terbaru
            </div>
            {latestKartini.length > 0 ? (
              latestKartini.map((berita: any) => (
                <div
                  key={berita.id}
                  className="group relative w-full h-36 rounded-2xl border-[3px] overflow-hidden shadow-sm transition-transform hover:scale-[1.02]"
                  style={{ borderColor: bluePrimary }}
                >
                  <img
                    src={berita.gambar || ""}
                    alt={berita.judul}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00387d] via-[#00387d]/40 to-transparent p-3 flex flex-col justify-end">
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
