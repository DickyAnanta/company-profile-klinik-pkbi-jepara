import { Phone, Mail, Instagram, Youtube } from 'lucide-react';
import Image from 'next/image';

// --- Sub-komponen ServiceCard untuk efisiensi kode ---
interface ServiceCardProps {
  title: string;
  imageUrl: string;
  bgColor: string;
}

function ServiceCard({ title, imageUrl, bgColor }: ServiceCardProps) {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden shadow-lg border border-slate-100 transform transition hover:scale-105 duration-300">
      <div className="relative h-44 w-full bg-slate-100">
        <Image 
          src={imageUrl} 
          alt={title} 
          fill 
          className="object-cover"
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
export default function LayananPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <main className="max-w-6xl mx-auto px-4 pt-10 pb-8">
        
        {/* 2. TITLE SECTION */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-blue-900 mb-2 tracking-tight">JENIS PELAYANAN</h1>
          <p className="text-xl text-blue-700 font-bold italic opacity-90">Klinik Pratama Wahana Sejahtera PKBI Jepara</p>
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
                <p className="text-blue-900 font-extrabold text-[10px] md:text-xs mb-2 uppercase tracking-tighter">Jadwal Pelayanan</p>
                <p className="text-blue-900 text-xl md:text-2xl font-black leading-none">Senin - Sabtu</p>
                <div className="h-[2px] w-8 bg-blue-900/20 my-3"></div>
                <p className="text-blue-800 font-bold text-sm md:text-base">09.00 - 13.00 WIB</p>
              </div>

              <div className="bg-rose-200 p-6 rounded-3xl text-center shadow-sm border border-rose-300 flex flex-col justify-center items-center transition-colors hover:bg-rose-300/50">
                <p className="text-blue-900 font-extrabold text-[10px] md:text-xs mb-2 uppercase tracking-tighter">Praktek Dokter</p>
                <p className="text-blue-900 text-xl md:text-2xl font-black leading-none">Senin - Kamis</p>
                <div className="h-[2px] w-8 bg-blue-900/20 my-3"></div>
                <p className="text-blue-800 font-bold text-sm md:text-base">09.00 - 12.00 WIB</p>
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2030268.128156084!2d107.46370944951602!3d-6.346442954367482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e711f109a1d8611%3A0x1c8dab87e40ab8c7!2sKlinik%20Wahana%20Sejahtera%20PKBI%20Jepara!5e0!3m2!1sid!2sid!4v1769141095315!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Klinik PKBI Jepara"
                className="grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
          </div>
        </div>

        {/* 4. GRID LAYANAN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <ServiceCard title="KB IMPLAN" imageUrl="/img/kb-implan.jpg" bgColor="bg-rose-200" />
          <ServiceCard title="KB IUD" imageUrl="/img/kb-iud.jpg" bgColor="bg-blue-200" />
          <ServiceCard title="KB SUNTIK" imageUrl="/img/kb-suntik.jpg" bgColor="bg-rose-200" />
          <ServiceCard title="TES KESEHATAN" imageUrl="/img/tes-kesehatan.jpg" bgColor="bg-blue-200" />
          <ServiceCard title="USG IUD" imageUrl="/img/usg-iud.jpg" bgColor="bg-rose-200" />
          <ServiceCard title="USG HAMIL" imageUrl="/img/usg-hamil.jpg" bgColor="bg-blue-200" />
        </div>
      </main>
    </div>
  );
}