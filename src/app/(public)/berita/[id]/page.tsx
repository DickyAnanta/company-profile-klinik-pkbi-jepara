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
    <div className="min-h-screen bg-white py-8 md:py-12 font-sans overflow-hidden">
      {/* ========================================= */}
      {/* CSS ANIMASI RINGAN (Server-Side Friendly) */}
      {/* ========================================= */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0; /* Mulai dalam keadaan transparan */
          }
          .delay-100 { animation-delay: 100ms; }
          .delay-200 { animation-delay: 200ms; }
          .delay-300 { animation-delay: 300ms; }
          .delay-400 { animation-delay: 400ms; }
        `,
        }}
      />

      {/* KONTAINER RESPONSIVE */}
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================= */}
        {/* TOMBOL KEMBALI (Muncul Pertama) */}
        {/* ========================================= */}
        <div className="animate-fade-in-up">
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
        </div>

        {/* ========================================= */}
        {/* KATEGORI & JUDUL (Muncul Kedua) */}
        {/* ========================================= */}
        <div className="animate-fade-in-up delay-100">
          <div className="mb-3 md:mb-4">
            <span className="bg-purple-100 text-purple-700 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider border border-purple-200">
              Kategori: {berita.kategori}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#00387d] mb-4 leading-snug md:leading-tight">
            {berita.judul}
          </h1>
        </div>

        {/* ========================================= */}
        {/* TAGLINE & TANGGAL (Muncul Ketiga) */}
        {/* ========================================= */}
        <div className="animate-fade-in-up delay-200 flex flex-col md:flex-row md:items-center justify-between border-b-[2px] border-slate-100 pb-4 md:pb-6 mb-6 md:mb-8 gap-2 md:gap-4">
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
        {/* GAMBAR UTAMA (Muncul Keempat) */}
        {/* ========================================= */}
        {berita.gambar && (
          <div className="animate-fade-in-up delay-300 w-full aspect-video rounded-2xl md:rounded-3xl overflow-hidden mb-8 md:mb-10 shadow-md border border-slate-100 relative bg-slate-50">
            <img
              src={berita.gambar}
              alt={berita.judul}
              className="absolute inset-0 w-full h-full object-contain hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        )}

        {/* ========================================= */}
        {/* ISI BERITA (Muncul Kelima) */}
        {/* ========================================= */}
        <div className="animate-fade-in-up delay-400 text-slate-700 leading-relaxed text-base md:text-[17px] whitespace-pre-wrap text-justify break-words">
          {berita.keterangan}
        </div>
      </div>
    </div>
  );
}
