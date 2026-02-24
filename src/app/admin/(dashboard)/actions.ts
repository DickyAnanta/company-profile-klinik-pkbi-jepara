"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function updateStatistics(formData: FormData) {
  try {
    // 1. Ambil semua data sekaligus untuk pengecekan
    const p = formData.get("pasien");
    const d = formData.get("dokter");
    const r = formData.get("relawan");
    const m = formData.get("mitra");

    // 2. LIHAT DI TERMINAL VS CODE: Apakah angka yang kamu ketik muncul di sini?
    console.log("--- DEBUG DATA FORM ---");
    console.log("Pasien:", p);
    console.log("Dokter:", d);
    console.log("Relawan:", r);
    console.log("Mitra:", m);
    console.log("-----------------------");

    // 3. Konversi ke angka dan kirim ke database
    await prisma.statistic.update({
      where: { id: 1 },
      data: {
        pasien: Number(p) || 0,
        dokter: Number(d) || 0,
        relawan: Number(r) || 0,
        mitra: Number(m) || 0, // Pastikan kolom 'mitra' sudah ada di MySQL
      },
    });

    // 4. Paksa Next.js untuk membuang data lama (Cache)
    revalidatePath("/admin");
    revalidatePath("/");
    
    return { success: true };
  } catch (error: any) {
    console.error("GAGAL UPDATE DB:", error.message);
    return { success: false, error: error.message };
  }
}

// Fungsi ambil data tetap seperti sebelumnya
export async function getStatistics() {
  const stats = await prisma.statistic.findFirst({ where: { id: 1 } });
  return stats || { pasien: 0, dokter: 0, relawan: 0, mitra: 0 };
}