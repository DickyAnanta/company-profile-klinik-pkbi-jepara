"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

// Inisialisasi Prisma mandiri (tanpa import dari lib/prisma)
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// 1. Ambil Data Layanan
export async function getLayanan() {
  try {
    return await prisma.layanan.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Gagal ambil data:", error);
    return [];
  }
}

// 2. Tambah Layanan
export async function createLayanan(formData: FormData) {
  try {
    let gambarPath = "";
    const file = formData.get("gambar") as File | null;

    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + "_" + file.name.replace(/\s+/g, "_");

      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });
      await fs.writeFile(path.join(uploadDir, filename), buffer);

      gambarPath = `/uploads/${filename}`;
    }

    await prisma.layanan.create({
      data: {
        namaLayanan: formData.get("namaLayanan") as string,
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

// 3. Hapus Layanan
export async function deleteLayanan(id: string) {
  try {
    const layanan = await prisma.layanan.findUnique({ where: { id } });

    if (layanan?.gambar) {
      const filePath = path.join(process.cwd(), "public", layanan.gambar);
      await fs.unlink(filePath).catch(() => null);
    }

    await prisma.layanan.delete({ where: { id } });
    revalidatePath("/admin/layanan");
    return { success: true };
  } catch (error: any) {
    return { error: "Gagal menghapus: " + error.message };
  }
}

// 4. Update Layanan
export async function updateLayanan(id: string, formData: FormData) {
  try {
    const existing = await prisma.layanan.findUnique({ where: { id } });
    if (!existing) return { error: "Data tidak ditemukan" };

    let gambarPath = existing.gambar || "";
    const file = formData.get("gambar") as File | null;

    if (file && file.size > 0) {
      if (existing.gambar) {
        const oldPath = path.join(process.cwd(), "public", existing.gambar);
        await fs.unlink(oldPath).catch(() => null);
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + "_" + file.name.replace(/\s+/g, "_");
      await fs.writeFile(
        path.join(process.cwd(), "public/uploads", filename),
        buffer,
      );

      gambarPath = `/uploads/${filename}`;
    }

    await prisma.layanan.update({
      where: { id },
      data: {
        namaLayanan: formData.get("namaLayanan") as string,
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
