"use server";

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function getDashboardStats() {
  try {
    // 1. MENGAMBIL JUMLAH LAYANAN AKTIF DARI DATABASE
    const countLayanan = await prisma.layanan.count();

    // 2. MENGAMBIL DATA BERITA KLINIK (Jumlah & 2 Berita Terbaru)
    const countKlinik = await prisma.berita.count({
      where: { kategori: "KLINIK" },
    });
    const latestKlinik = await prisma.berita.findMany({
      where: { kategori: "KLINIK" },
      orderBy: { tanggal: "desc" }, // Urutkan dari yang paling baru
      take: 2, // Cukup ambil 2 saja untuk dashboard
    });

    // 3. MENGAMBIL DATA BERITA KARTINI (Jumlah & 2 Berita Terbaru)
    const countKartini = await prisma.berita.count({
      where: { kategori: "KARTINI" },
    });
    const latestKartini = await prisma.berita.findMany({
      where: { kategori: "KARTINI" },
      orderBy: { tanggal: "desc" },
      take: 2,
    });

    // Mengembalikan semua data sekaligus ke frontend (page.tsx)
    return {
      countLayanan,
      countKlinik,
      latestKlinik,
      countKartini,
      latestKartini,
    };
  } catch (error) {
    console.error("Gagal mengambil data dashboard:", error);
    // Jika terjadi error, kembalikan nilai default agar halaman tidak crash
    return {
      countLayanan: 0,
      countKlinik: 0,
      latestKlinik: [],
      countKartini: 0,
      latestKartini: [],
    };
  }
}
