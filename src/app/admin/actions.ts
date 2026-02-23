"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

// --- FUNGSI DASHBOARD (Sudah ada sebelumnya) ---
export async function getDashboardStats() {
  try {
    const countKlinik = await prisma.berita.count({ where: { kategori: "KLINIK" } });
    const countKartini = await prisma.berita.count({ where: { kategori: "KARTINI" } });
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

    return { countKlinik, countKartini, countLayanan, latestKlinik, latestKartini };
  } catch (error) {
    return null;
  }
}

// --- FUNGSI LAYANAN (TAMBAHKAN INI) ---

// 1. Ambil Data Layanan
export async function getLayanan() {
  return await prisma.layanan.findMany({
    orderBy: { id: "desc" },
  });
}

// 2. Tambah Layanan (Fungsi yang hilang tadi)
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
        nama: formData.get("nama") as string,
        harga: formData.get("harga") as string,
        jadwal: formData.get("jadwal") as string,
        keterangan: formData.get("keterangan") as string,
        gambar: `/uploads/${filename}`,
      },
    });
    
    revalidatePath("/admin/layanan");
    revalidatePath("/admin"); // Agar dashboard ikut update
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// 3. Hapus Layanan
export async function deleteLayanan(id: string) {
  try {
    const item = await prisma.layanan.findUnique({ where: { id } });
    if (item?.gambar) {
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

// 4. Update Layanan
export async function updateLayanan(id: string, formData: FormData) {
  try {
    const existing = await prisma.layanan.findUnique({ where: { id } });
    if (!existing) return { error: "Data tidak ditemukan" };

    let gambarPath = existing.gambar;
    const file = formData.get("gambar") as File;

    if (file && file.size > 0) {
      const oldPath = path.join(process.cwd(), "public", existing.gambar);
      await fs.unlink(oldPath).catch(() => null);

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + "_" + file.name.replace(/\s+/g, "_");
      await fs.writeFile(path.join(process.cwd(), "public/uploads", filename), buffer);
      gambarPath = `/uploads/${filename}`;
    }

    await prisma.layanan.update({
      where: { id },
      data: {
        nama: formData.get("nama") as string,
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