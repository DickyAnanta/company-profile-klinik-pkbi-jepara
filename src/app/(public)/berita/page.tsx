export const dynamic = "force-dynamic";

import { PrismaClient } from "@prisma/client";
import BeritaSlider from "./BeritaSlider"; //

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
      {/* CSS KHUSUS: Untuk menyembunyikan visual scrollbar bawah */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scroll::-webkit-scrollbar { display: none; }
        .hide-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />

      {/* KONTAINER UTAMA */}
      <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
        {/* Panggil komponen BeritaSlider untuk Klinik */}
        <BeritaSlider
          title="Berita Klinik"
          beritaList={beritaKlinik}
          cardPeach={cardPeach}
        />

        {/* Panggil komponen BeritaSlider untuk Youth Center */}
        <BeritaSlider
          title="Berita Youth Center"
          beritaList={beritaKartini}
          cardPeach={cardPeach}
        />
      </div>
    </div>
  );
}
