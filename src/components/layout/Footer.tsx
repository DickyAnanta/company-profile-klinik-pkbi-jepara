import { Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0b2359] text-white pt-12 relative mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gradient Border Effect 
         (Efek bias cahaya pink di atas footer, posisi absolute negative margin)
      */}
        <div className="h-24 w-full bg-gradient-to-b from-pink-200/50 to-transparent absolute -top-24 left-0 pointer-events-none"></div>

        <div className="px-6 md:px-16 pb-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm relative z-10">
          {/* Kolom 1: Alamat */}
          <div>
            <h4 className="font-bold text-lg mb-4 uppercase text-pink-100">
              Klinik Kami
            </h4>
            <p className="leading-relaxed max-w-xs text-gray-200">
              Jalan Shima Nomor 15 A, Pengkol III, Pengkol,
              <br /> Kecamatan Jepara, Kabupaten Jepara
            </p>
          </div>

          {/* Kolom 2: Kontak */}
          <div className="mt-6 md:mt-16">
            {/* Note: Margin top ditambahkan manual agar sejajar visual design */}
            <h4 className="font-bold text-lg mb-4 uppercase text-pink-100">
              Kontak Kami
            </h4>
            <div className="space-y-2 text-gray-200">
              <p>+62 822-8998-5675</p>
              <p>pkbijepara12@gmail.com</p>
            </div>
          </div>

          {/* Kolom 3: Sosmed */}
          <div>
            <h4 className="font-bold text-lg mb-4 uppercase text-pink-100 text-left md:text-right">
              Kunjungi Kami
            </h4>
            <div className="flex gap-4 justify-start md:justify-end">
              {/* Instagram */}
              <a
                href="#"
                className="bg-white p-2 rounded-xl text-[#0b2359] hover:bg-gray-200 transition-colors"
              >
                <Instagram size={28} />
              </a>

              {/* TikTok Custom Icon */}
              <a
                href="#"
                className="bg-white p-2 rounded-xl text-[#0b2359] hover:bg-gray-200 transition-colors flex items-center justify-center w-[44px] h-[44px]"
              >
                <span className="font-extrabold text-lg leading-none">Tt</span>
              </a>

              {/* Youtube */}
              <a
                href="#"
                className="bg-white p-2 rounded-xl text-[#0b2359] hover:bg-gray-200 transition-colors"
              >
                <Youtube size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="bg-[#ffdcdc] py-3 text-center">
          <p className="text-[#0b2359] text-sm font-semibold">
            Copyrightby@TeamTechwiz2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
