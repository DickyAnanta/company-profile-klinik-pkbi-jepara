import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PKBI Jepara",
  description: "Klinik Pratama Wahana Sejahtera",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-white text-[#1a2b5f]`}>
        {/* Komponen yang persisten di semua halaman */}
        <TopBar />
        <Navbar />

        {/* Halaman berubah-ubah di sini */}
        {children}

        <Footer />
      </body>
    </html>
  );
}
