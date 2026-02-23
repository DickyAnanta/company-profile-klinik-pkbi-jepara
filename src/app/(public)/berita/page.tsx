import { PrismaClient } from "@prisma/client";
import Link from "next/link"; // <-- 1. Tambahkan import Link di sini

// --- INISIALISASI PRISMA ---
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default async function BeritaPage() {
  // 1. MENGAMBIL DATA BERITA KLINIK
  const beritaKlinik = await prisma.berita.findMany({
    where: { kategori: "KLINIK" },
    orderBy: { tanggal: "desc" },
  });

  // 2. MENGAMBIL DATA BERITA KARTINI
  const beritaKartini = await prisma.berita.findMany({
    where: { kategori: "KARTINI" },
    orderBy: { tanggal: "desc" },
  });

  // KODE WARNA UTAMA
  const cardPeach = "#fdeae9";

  return (
    <div className="min-h-screen bg-white py-12 font-sans overflow-x-hidden">
      {/* KONTAINER UTAMA: Membatasi lebar agar sejajar dengan Navbar & Footer */}
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
        {/* ========================================================= */}
        {/* BAGIAN 1: BERITA KLINIK */}
        {/* ========================================================= */}
        <div className="mb-20">
          {/* JUDUL & GARIS BAWAH */}
          <div className="w-full border-b-[2px] border-purple-500 pb-2 mb-10">
            <h2 className="text-blue-600 font-bold text-2xl italic tracking-wide">
              Berita Klinik
            </h2>
          </div>

          {/* KONTEN GRID BERITA */}
          {beritaKlinik.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
              {beritaKlinik.map((item) => (
                // 2. Bungkus Card dengan komponen Link
                <Link href={`/berita/${item.id}`} key={item.id}>
                  <div
                    className="p-4 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col group cursor-pointer h-full"
                    style={{ backgroundColor: cardPeach }}
                  >
                    <div className="relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-4">
                      <img
                        src={item.gambar || "/placeholder.jpg"}
                        alt={item.judul}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="px-2 pb-2">
                      <p className="text-[#334155] text-[13px] font-medium leading-relaxed line-clamp-3">
                        {item.judul}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="w-full py-16 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl">
              <p className="text-gray-400 italic font-medium">
                Belum ada berita klinik yang diterbitkan.
              </p>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* BAGIAN 2: BERITA KARTINI */}
        {/* ========================================================= */}
        <div>
          {/* JUDUL & GARIS BAWAH */}
          <div className="w-full border-b-[2px] border-purple-500 pb-2 mb-10">
            <h2 className="text-blue-600 font-bold text-2xl italic tracking-wide">
              Berita Kartini
            </h2>
          </div>

          {/* KONTEN GRID BERITA */}
          {beritaKartini.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
              {beritaKartini.map((item) => (
                // 3. Bungkus Card dengan komponen Link
                <Link href={`/berita/${item.id}`} key={item.id}>
                  <div
                    className="p-4 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col group cursor-pointer h-full"
                    style={{ backgroundColor: cardPeach }}
                  >
                    <div className="relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-4">
                      <img
                        src={item.gambar || "/placeholder.jpg"}
                        alt={item.judul}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="px-2 pb-2">
                      <p className="text-[#334155] text-[13px] font-medium leading-relaxed line-clamp-3">
                        {item.judul}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="w-full py-16 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl">
              <p className="text-gray-400 italic font-medium">
                Belum ada berita kartini yang diterbitkan.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
