// src/app/(auth)/login/actions.ts
"use server";

import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  
  // Variabel bantuan untuk mengecek status login
  let loginSukses = false;

  try {
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);
    
    // Cari admin di database
    const [rows]: any = await connection.execute(
      "SELECT * FROM admin WHERE username = ?",
      [username]
    );

    await connection.end();

    if (rows.length === 0) {
      return { error: "Username tidak ditemukan!" };
    }

    const user = rows[0];
    
    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return { error: "Password salah!" };
    }

    // Jika sampai sini, berarti login benar
    loginSukses = true;

  } catch (err: any) {
    console.error("Database Error:", err.message);
    return { error: "Gagal menyambung ke database!" };
  }

  // JANGAN ditaruh di dalam try-catch
  if (loginSukses) {
    redirect("/admin/dashboard");
  }
}