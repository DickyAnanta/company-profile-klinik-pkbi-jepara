"use server";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

/**
 * FUNGSI LOGIN (Kode Aslimu)
 */
export async function loginAction(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { message: "Username dan Password harus diisi!" };
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { username: username },
    });

    if (!admin) {
      return { message: "Username tidak ditemukan!" };
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return { message: "Password salah!" };
    }

    const cookieStore = await cookies();
    cookieStore.set("session_token", "true", { // <--- Perhatikan nama cookie ini
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 Hari
      path: "/",
    });
  } catch (error) {
    console.error("Login Error:", error);
    return { message: "Terjadi kesalahan pada server." };
  }

  redirect("/admin");
}

/**
 * FUNGSI LOGOUT (Tambahan Baru)
 */
export async function logoutAction() {
  const cookieStore = await cookies();
  
  // Menghapus session_token agar user dianggap tidak login lagi
  cookieStore.delete("session_token"); 
  
  // Mengarahkan kembali ke halaman login (auth/login)
  redirect("/login"); 
}