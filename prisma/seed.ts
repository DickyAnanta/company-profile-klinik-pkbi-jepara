// prisma/seed.ts
import "dotenv/config";
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

async function main() {
  console.log("--- Memulai Automated Seeding (Direct Mode) ---");

  // 1. Ambil URL dari .env
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL tidak ditemukan!");

  // 2. Buat koneksi langsung ke MySQL (XAMPP)
  const connection = await mysql.createConnection(connectionString);

  const username = "admin_pkbi";
  const passwordTeksBiasa = "admin123";
  const hashedPassword = await bcrypt.hash(passwordTeksBiasa, 10);

  console.log("Sedang menyuntikkan data ke database...");

  // 3. Masukkan data menggunakan query SQL otomatis (Automated Koding)
  await connection.execute(
    "INSERT INTO admin (id, username, password) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE username=username",
    [`admin-${Date.now()}`, username, hashedPassword]
  );

  console.log("-----------------------------------------");
  console.log("SUKSES: Akun Admin berhasil dibuat via skrip!");
  console.log("-----------------------------------------");

  await connection.end();
}

main().catch((e) => {
  console.error("Gagal koding seed:", e.message);
  process.exit(1);
});