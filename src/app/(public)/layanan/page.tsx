import { PrismaClient } from "@prisma/client";
export const dynamic = "force-dynamic";

// --- INISIALISASI PRISMA ---
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// --- Sub-komponen ServiceCard ---
// (Menggunakan tag <img> standar agar aman dengan file upload lokal)
interface ServiceCardProps {
  title: string;
  imageUrl: string;
  bgColor: string;
}

function ServiceCard({ title, imageUrl, bgColor }: ServiceCardProps) {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden shadow-lg border border-slate-100 transform transition hover:scale-105 duration-300">
      <div className="relative h-44 w-full bg-slate-100">
        <img
          src={imageUrl || "/placeholder.jpg"}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className={`${bgColor} py-4 text-center px-2`}>
        <h3 className="font-bold text-blue-900 uppercase text-xs md:text-sm tracking-widest leading-tight">
          {title}
        </h3>
      </div>
    </div>
  );
}

// --- Komponen Utama Halaman Layanan ---
// Ditambahkan 'async' agar bisa mengambil data dari database
export default async function LayananPage() {
  // 1. MENGAMBIL DATA DARI DATABASE
  const listLayanan = await prisma.layanan.findMany({
    orderBy: { createdAt: "asc" }, // Urutkan dari yang pertama kali ditambahkan
  });

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <main className="max-w-6xl mx-auto px-4 pt-10 pb-8">
        {/* 2. TITLE SECTION */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-blue-900 mb-2 tracking-tight">
            JENIS PELAYANAN
          </h1>
          <p className="text-xl text-blue-700 font-bold italic opacity-90">
            Klinik Pratama Wahana Sejahtera PKBI Jepara
          </p>
        </div>

        {/* 3. INFO OPERASIONAL & LOKASI (Bento Box Style) */}
        <div className="border-[3px] border-blue-900 rounded-[40px] p-6 md:p-10 mb-10 grid md:grid-cols-2 gap-8 shadow-xl bg-white">
          {/* Kolom Kiri: Jam Operasional */}
          <div className="flex flex-col">
            <div className="bg-blue-700 text-white rounded-2xl py-3 px-6 mb-6 shadow-md font-extrabold w-full text-center tracking-widest uppercase">
              Jam Operasional Kerja
            </div>
            <div className="grid grid-cols-2 gap-4 flex-1 items-stretch">
              <div className="bg-rose-200 p-6 rounded-3xl text-center shadow-sm border border-rose-300 flex flex-col justify-center items-center transition-colors hover:bg-rose-300/50">
                <p className="text-blue-900 font-extrabold text-[10px] md:text-xs mb-2 uppercase tracking-tighter">
                  Jadwal Pelayanan
                </p>
                <p className="text-blue-900 text-xl md:text-2xl font-black leading-none">
                  Senin - Sabtu
                </p>
                <div className="h-[2px] w-8 bg-blue-900/20 my-3"></div>
                <p className="text-blue-800 font-bold text-sm md:text-base">
                  09.00 - 13.00 WIB
                </p>
              </div>

              <div className="bg-rose-200 p-6 rounded-3xl text-center shadow-sm border border-rose-300 flex flex-col justify-center items-center transition-colors hover:bg-rose-300/50">
                <p className="text-blue-900 font-extrabold text-[10px] md:text-xs mb-2 uppercase tracking-tighter">
                  Praktek Dokter
                </p>
                <p className="text-blue-900 text-xl md:text-2xl font-black leading-none">
                  Senin - Kamis
                </p>
                <div className="h-[2px] w-8 bg-blue-900/20 my-3"></div>
                <p className="text-blue-800 font-bold text-sm md:text-base">
                  09.00 - 12.00 WIB
                </p>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Lokasi */}
          <div className="flex flex-col">
            <div className="bg-blue-700 text-white rounded-2xl py-3 px-6 mb-6 shadow-md font-extrabold w-full text-center tracking-widest uppercase">
              Lokasi
            </div>
            <div className="rounded-3xl overflow-hidden border-2 border-slate-200 h-[250px] shadow-inner relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1134.7876882209706!2d110.6728392!3d-6.586146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e711f01c78cdb51%3A0x6b77df7643b19451!2sKlinik%20Pratama%20Wahana%20Sejahtera%20PKBI%20Jepara!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Klinik PKBI Jepara"
                className="grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
          </div>
        </div>

        {/* 4. GRID LAYANAN (Dinamis dari Database) */}
        {listLayanan.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {listLayanan.map((item, index) => {
              // Menentukan warna kotak secara berselang-seling
              // Jika index genap (0, 2, 4) -> rose-200
              // Jika index ganjil (1, 3, 5) -> blue-200
              const isEven = index % 2 === 0;
              const bgColor = isEven ? "bg-rose-200" : "bg-blue-200";

              return (
                <ServiceCard
                  key={item.id}
                  title={item.namaLayanan}
                  imageUrl={item.gambar || ""}
                  bgColor={bgColor}
                />
              );
            })}
          </div>
        ) : (
          <div className="w-full py-16 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl">
            <p className="text-gray-400 italic font-medium">
              Belum ada layanan yang ditambahkan.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
