"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// 1. Ambil Data Berita Kartini
export async function getBeritaKartini() {
  try {
    return await prisma.berita.findMany({
      where: { kategori: "KARTINI" },
      orderBy: { tanggal: "desc" },
    });
  } catch (error) {
    console.error("Gagal ambil data:", error);
    return [];
  }
}

// 2. Tambah Berita Kartini
export async function createBeritaKartini(formData: FormData) {
  try {
    const file = formData.get("gambar") as File;
    const buffer = Buffer.from(await file.arrayBuffer());
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
        kategori: "KARTINI",
        gambar: `/uploads/${filename}`,
      },
    });
    revalidatePath("/admin/berita/kartini");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

// 3. Hapus Berita Kartini [PENTING: Pastikan di-export!]
export async function deleteBeritaKartini(id: string) {
  try {
    const berita = await prisma.berita.findUnique({ where: { id } });
    if (berita?.gambar) {
      const filePath = path.join(process.cwd(), "public", berita.gambar);
      await fs.unlink(filePath).catch(() => null);
    }
    await prisma.berita.delete({ where: { id } });
    revalidatePath("/admin/berita/kartini");
    return { success: true };
  } catch (error: any) {
    return { error: "Gagal menghapus: " + error.message };
  }
}

// 4. Update Berita Kartini
export async function updateBeritaKartini(id: string, formData: FormData) {
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
      await fs.writeFile(
        path.join(process.cwd(), "public/uploads", filename),
        buffer,
      );
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

    revalidatePath("/admin/berita/kartini");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
