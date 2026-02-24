import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";

// --- INISIALISASI PRISMA ---
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default async function DetailBeritaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const berita = await prisma.berita.findUnique({
    where: { id: id },
  });

  if (!berita) {
    return notFound();
  }

  const tanggalFormat = new Date(berita.tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    // py-8 untuk HP, py-12 untuk Laptop
    <div className="min-h-screen bg-white py-8 md:py-12 font-sans">
      {/* KONTAINER RESPONSIVE:
        px-4 (HP Kecil) -> px-6 (Tablet) -> lg:px-8 (Laptop) 
      */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================= */}
        {/* TOMBOL KEMBALI */}
        {/* ========================================= */}
        <Link
          href="/berita"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-6 md:mb-8 transition-colors text-sm md:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 md:h-5 md:w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Kembali ke Daftar Berita
        </Link>

        {/* ========================================= */}
        {/* LABEL KATEGORI */}
        {/* ========================================= */}
        <div className="mb-3 md:mb-4">
          <span className="bg-purple-100 text-purple-700 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider border border-purple-200">
            Kategori: {berita.kategori}
          </span>
        </div>

        {/* ========================================= */}
        {/* JUDUL RESPONSIVE */}
        {/* ========================================= */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#00387d] mb-4 leading-snug md:leading-tight">
          {berita.judul}
        </h1>

        {/* ========================================= */}
        {/* TAGLINE & TANGGAL */}
        {/* flex-col (numpuk di HP) -> md:flex-row (sejajar di Laptop) */}
        {/* ========================================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b-[2px] border-slate-100 pb-4 md:pb-6 mb-6 md:mb-8 gap-2 md:gap-4">
          {berita.tagline && (
            <p className="text-slate-500 italic font-medium text-sm md:text-base">
              "{berita.tagline}"
            </p>
          )}
          <span className="text-xs md:text-sm text-slate-400 font-semibold whitespace-nowrap">
            Dipublikasikan: {tanggalFormat}
          </span>
        </div>

        {/* ========================================= */}
        {/* GAMBAR UTAMA (ASPECT-VIDEO agar otomatis proporsional) */}
        {/* ========================================= */}
        {berita.gambar && (
          <div className="w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden mb-8 md:mb-10 shadow-md border border-slate-100 relative bg-slate-50">
            <img
              src={berita.gambar}
              alt={berita.judul}
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        )}

        {/* ========================================= */}
        {/* ISI / KETERANGAN BERITA */}
        {/* ========================================= */}
        <div className="text-slate-700 leading-relaxed text-base md:text-[17px] whitespace-pre-wrap text-justify break-words">
          {berita.keterangan}
        </div>
      </div>
    </div>
  );
}
