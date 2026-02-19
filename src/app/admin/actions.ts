"use server";

import { prisma } from "@/lib/prisma"; // Menggunakan instance prisma yang sudah kamu punya

export async function getDashboardStats() {
  try {
    // 1. Hitung total data secara dinamis dari database
    const countKlinik = await prisma.berita.count({ where: { kategori: "KLINIK" } });
    const countKartini = await prisma.berita.count({ where: { kategori: "KARTINI" } });
    
    // 2. Ambil 2 berita terbaru untuk ditampilkan di dashboard
    const latestKlinik = await prisma.berita.findMany({
      where: { kategori: "KLINIK" },
      orderBy: { tanggal: "desc" },
      take: 2,
    });

    const latestKartini = await prisma.berita.findMany({
      where: { kategori: "KARTINI" },
      orderBy: { tanggal: "desc" },
      take: 2,
    });

    return {
      countKlinik,
      countKartini,
      latestKlinik,
      latestKartini,
      countLayanan: 7 // Ganti dengan query database jika tabel layanan sudah siap
    };
  } catch (error) {
    console.error("Gagal mengambil statistik dashboard:", error);
    return null;
  }
}