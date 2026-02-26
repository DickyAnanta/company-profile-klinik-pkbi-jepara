"use client";

import { useState } from "react";
import { X, MessageCircle, Stethoscope, User } from "lucide-react";

export default function ConsultButton({ colors }: { colors: any }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const adminPhone = "6282289985675"; // Nomor Admin Klinik
  const doctorPhone = "628812813021"; // Nomor Dokter

  // Pesan otomatis yang muncul di chat WA
  const adminMessage =
    "Halo Admin Klinik PKBI Jepara, saya ingin bertanya mengenai informasi layanan dan jadwal operasional.";
  const doctorMessage =
    "Halo Dokter Klinik PKBI Jepara, saya ingin berkonsultasi mengenai kesehatan saya.";

  // Generate Link
  const adminLink = `https://wa.me/${adminPhone}?text=${encodeURIComponent(adminMessage)}`;
  const doctorLink = `https://wa.me/${doctorPhone}?text=${encodeURIComponent(doctorMessage)}`;

  return (
    <>
      {/* --- TOMBOL UTAMA --- */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className="py-3 px-12 rounded-full font-extrabold text-lg shadow-lg hover:scale-105 transition-transform uppercase mb-16 border-b-[4px] border-white/50"
        style={{
          background: `linear-gradient(to right, ${colors.peachGrad1}, ${colors.peachGrad2})`,
          color: colors.blueText,
        }}
      >
        KONSULTASI
      </button>

      {/* --- MODAL / POPUP --- */}
      {isPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden relative transform transition-all animate-in zoom-in-95 duration-300">
            {/* Header Popup */}
            <div className="bg-[#102a6e] p-6 text-white text-center relative">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="absolute top-4 right-4 bg-white/20 p-1.5 rounded-full hover:bg-white/40 transition-colors"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl font-bold mb-1">Konsultasi Online</h3>
              <p className="text-xs opacity-80">Klinik PKBI Jepara</p>
            </div>

            {/* Body Popup */}
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 text-[#102a6e] rounded-full flex items-center justify-center mb-4 shadow-sm">
                <MessageCircle size={36} strokeWidth={2} />
              </div>

              <p className="text-[#102a6e] font-medium text-[14px] mb-8">
                Silakan pilih layanan konsultasi di bawah ini agar kami dapat
                melayani Anda dengan lebih tepat.
              </p>

              {/* Kumpulan Tombol Pilihan */}
              <div className="flex flex-col gap-4 w-full">
                {/* Tombol Admin */}
                <a
                  href={adminLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white py-3.5 px-6 rounded-2xl font-bold text-sm shadow-md hover:bg-[#20bd5a] hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                >
                  <User size={20} />
                  HUBUNGI ADMIN
                </a>

                {/* Tombol Dokter */}
                <a
                  href={doctorLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#102a6e] text-white py-3.5 px-6 rounded-2xl font-bold text-sm shadow-md hover:bg-[#0b1c4a] hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                >
                  <Stethoscope size={20} />
                  KONSULTASI DOKTER
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
