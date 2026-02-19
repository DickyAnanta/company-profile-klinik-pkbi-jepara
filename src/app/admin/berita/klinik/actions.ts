"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// 1. Fungsi Ambil Data
export async function getBeritaKlinik() {
  try {
    return await prisma.berita.findMany({
      where: { kategori: "KLINIK" },
      orderBy: { tanggal: "desc" },
    });
  } catch (error) {
    return [];
  }
}

// 2. Fungsi Tambah Berita
export async function createBeritaKlinik(formData: FormData) {
  try {
    const file = formData.get("gambar") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = Date.now() + "_" + file.name.replace(/\s+/g, "_");
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });
    await fs.writeFile(path.join(uploadDir, filename), buffer);

    await prisma.berita.create({
      data: {
        judul: formData.get("judul") as string,
        tagline: formData.get("tagline") as string,
        tanggal: new Date(formData.get("tanggal") as string),
        keterangan: formData.get("keterangan") as string,
        kategori: "KLINIK",
        gambar: `/uploads/${filename}`,
      },
    });
    revalidatePath("/admin/berita/klinik");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// 3. Fungsi Hapus Berita (Yang tadi error karena hilang)
export async function deleteBeritaKlinik(id: string) {
  try {
    const berita = await prisma.berita.findUnique({ where: { id } });
    if (berita?.gambar) {
      const filePath = path.join(process.cwd(), "public", berita.gambar);
      await fs.unlink(filePath).catch(() => null);
    }
    await prisma.berita.delete({ where: { id } });
    revalidatePath("/admin/berita/klinik");
    return { success: true };
  } catch (error: any) {
    return { error: "Gagal menghapus: " + error.message };
  }
}

// 4. Fungsi Update Berita
export async function updateBeritaKlinik(id: string, formData: FormData) {
  try {
    const existing = await prisma.berita.findUnique({ where: { id } });
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

    await prisma.berita.update({
      where: { id },
      data: {
        judul: formData.get("judul") as string,
        tagline: formData.get("tagline") as string,
        tanggal: new Date(formData.get("tanggal") as string),
        keterangan: formData.get("keterangan") as string,
        gambar: gambarPath,
      },
    });

    revalidatePath("/admin/berita/klinik");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}