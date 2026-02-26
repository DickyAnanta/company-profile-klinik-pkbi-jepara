"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

// --- FUNGSI DASHBOARD ---
export async function getDashboardStats() {
  try {
    const countKlinik = await prisma.berita.count({
      where: { kategori: "KLINIK" },
    });
    const countKartini = await prisma.berita.count({
      where: { kategori: "KARTINI" },
    });
    const countLayanan = await prisma.layanan.count();

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
      countLayanan,
      latestKlinik,
      latestKartini,
    };
  } catch (error) {
    return null;
  }
}

// --- FUNGSI LAYANAN ---

export async function getLayanan() {
  return await prisma.layanan.findMany({
    orderBy: { id: "desc" },
  });
}

export async function createLayanan(formData: FormData) {
  try {
    const file = formData.get("gambar") as File;
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + "_" + file.name.replace(/\s+/g, "_");

    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);

    await prisma.layanan.create({
      data: {
        namaLayanan: formData.get("nama") as string,
        harga: formData.get("harga") as string,
        jadwal: formData.get("jadwal") as string,
        keterangan: formData.get("keterangan") as string,
        gambar: `/uploads/${filename}`,
      },
    });

    revalidatePath("/admin/layanan");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteLayanan(id: string) {
  try {
    const item = await prisma.layanan.findUnique({ where: { id } });
    // FIX: Pastikan item.gambar ada (tidak null) sebelum path.join
    if (item && item.gambar) {
      const filePath = path.join(process.cwd(), "public", item.gambar);
      await fs.unlink(filePath).catch(() => null);
    }
    await prisma.layanan.delete({ where: { id } });
    revalidatePath("/admin/layanan");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateLayanan(id: string, formData: FormData) {
  try {
    const existing = await prisma.layanan.findUnique({ where: { id } });
    if (!existing) return { error: "Data tidak ditemukan" };

    let gambarPath = existing.gambar;
    const file = formData.get("gambar") as File;

    if (file && file.size > 0) {
      // FIX: Pastikan existing.gambar tidak null sebelum menghapus file lama
      if (existing.gambar) {
        const oldPath = path.join(process.cwd(), "public", existing.gambar);
        await fs.unlink(oldPath).catch(() => null);
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + "_" + file.name.replace(/\s+/g, "_");

      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(path.join(uploadDir, filename), buffer);

      gambarPath = `/uploads/${filename}`;
    }

    await prisma.layanan.update({
      where: { id },
      data: {
        namaLayanan: formData.get("nama") as string,
        harga: formData.get("harga") as string,
        jadwal: formData.get("jadwal") as string,
        keterangan: formData.get("keterangan") as string,
        gambar: gambarPath,
      },
    });

    revalidatePath("/admin/layanan");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// --- FUNGSI STATISTIK (DIPERBAIKI) ---

export async function getStatistics() {
  try {
    let stats = await prisma.statistic.findFirst({ where: { id: 1 } });
    if (!stats) {
      stats = await prisma.statistic.create({
        // FIX: Tambahkan field 'mitra' agar sesuai Dashboard Admin
        data: { id: 1, pasien: 1000, dokter: 4, relawan: 50, mitra: 10 },
      });
    }
    return stats;
  } catch (error) {
    console.error("Error getStatistics:", error);
    return { pasien: 0, dokter: 0, relawan: 0, mitra: 0 };
  }
}

export async function updateStatistics(formData: FormData) {
  try {
    const pasien = parseInt(formData.get("pasien") as string) || 0;
    const dokter = parseInt(formData.get("dokter") as string) || 0;
    const relawan = parseInt(formData.get("relawan") as string) || 0;
    const mitra = parseInt(formData.get("mitra") as string) || 0;

    await prisma.statistic.update({
      where: { id: 1 },
      data: { pasien, dokter, relawan, mitra },
    });

    revalidatePath("/admin");
    revalidatePath("/");

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
