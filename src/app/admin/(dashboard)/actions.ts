"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Gunakan pola global agar koneksi database tidak bocor/stale
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function updateStatistics(formData: FormData) {
  try {
    const p = formData.get("pasien");
    const d = formData.get("dokter");
    const r = formData.get("relawan");
    const m = formData.get("mitra");

    // Gunakan upsert: Jika ID 1 ada maka UPDATE, jika tidak ada maka CREATE
    await prisma.statistic.upsert({
      where: { id: 1 },
      update: {
        pasien: Number(p) || 0,
        dokter: Number(d) || 0,
        relawan: Number(r) || 0,
        mitra: Number(m) || 0,
      },
      create: {
        id: 1,
        pasien: Number(p) || 0,
        dokter: Number(d) || 0,
        relawan: Number(r) || 0,
        mitra: Number(m) || 0,
      },
    });

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("GAGAL UPDATE DB:", error.message);
    return { success: false, error: error.message };
  }
}

export async function getStatistics() {
  // Ambil record pertama yang id-nya 1
  const stats = await prisma.statistic.findUnique({ where: { id: 1 } });
  return stats || { pasien: 0, dokter: 0, relawan: 0, mitra: 0 };
}