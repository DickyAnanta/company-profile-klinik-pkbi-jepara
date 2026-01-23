import Image from "next/image";

const AwardSection = () => {
  return (
    <section className="py-16 px-4 md:px-12 max-w-7xl mx-auto bg-white">
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* --- LEFT CONTENT (TEXT) --- */}
        <div className="md:w-3/5">
          <h3 className="text-2xl md:text-3xl font-bold text-[#102a6e] mb-6">
            Klinik Pratama Wahana Sejahtera <br /> PKBI JEPARA
          </h3>

          <div className="text-justify text-sm md:text-[15px] leading-7 font-medium text-[#102a6e] space-y-4">
            <p>
              JEPARA -Klinik Wahana Sejahtera PKBI Jepara dan Pusat Pelayanan
              Keluarga Sejahtera (Satyagatra) Hasrat Bangsri berhasil meraih
              juara 1 nasional dari Badan Kependudukan dan Keluarga Berencana
              Nasional (BKKBN). Penghargaan tersebut diberikan atas kontribusi
              luar biasa dalam peningkatan pelayanan Keluarga Berencana (KB),
              dan praktik penyelenggaraan program satyagatra. Penghargaan
              diserahkan oleh Deputi Bidang Keluarga Sejahtera dan pemberdayaan
              Keluarga, pada Apresiasi dan Penghargaan Program Bangga Kencana
              pada rangkaian peringatan Hari Keluarga Nasional, di Hotel PO
              Semarang. Pelaksana Harian Kepala Dinas Pemberdayaan Perempuan,
              Perlindungan Anak, Pengendalian Penduduk dan Keluarga Berencana
              (DP3AP2KB) Kabupaten Jepara, Hadi Sarwoko menyampaikan rasa
              bangganya atas pencapaian tersebut.
            </p>
          </div>

          {/* Tombol Testimoni */}
          <div className="mt-8">
            <button className="bg-gradient-to-b from-[#4c6ef5] to-[#1e3a8a] text-white font-bold text-lg py-2 px-12 rounded-lg shadow-lg border border-blue-900 uppercase tracking-wide hover:opacity-90 transition-opacity">
              TESTIMONI
            </button>
          </div>
        </div>

        {/* --- RIGHT CONTENT (IMAGE) --- */}
        <div className="md:w-2/5 flex justify-center md:justify-end relative mt-8 md:mt-0">
          <div className="relative w-[300px] h-[400px]">
            {/* Pastikan gambar background transparan (PNG) */}
            {/* Ganti dengan <Image /> jika file sudah ada */}
            <div className="w-full h-full relative">
              <Image
                src="/images/doctor.png"
                alt="Dokter PKBI"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardSection;
