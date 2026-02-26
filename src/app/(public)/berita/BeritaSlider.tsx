"use client";

import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Ikon Panah

export default function BeritaSlider({
  title,
  beritaList,
  cardPeach,
}: {
  title: string;
  beritaList: any[];
  cardPeach: string;
}) {
  // Referensi untuk mengontrol elemen yang bisa di-scroll
  const sliderRef = useRef<HTMLDivElement>(null);

  // Fungsi untuk menggeser slider ke kiri atau kanan
  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      // Menentukan seberapa jauh geserannya (sekitar lebar 1.5 kartu)
      const scrollAmount = direction === "left" ? -350 : 350;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-20">
      {/* HEADER & TOMBOL NAVIGASI */}
      <div className="w-full border-b-[2px] border-purple-500 pb-2 mb-10 flex justify-between items-end gap-4">
        <h2 className="text-blue-600 font-bold text-2xl italic tracking-wide">
          {title}
        </h2>

        {/* Tombol Kiri & Kanan (Hanya muncul jika ada berita) */}
        {beritaList.length > 0 && (
          <div className="flex gap-2 mb-1">
            <button
              onClick={() => scroll("left")}
              className="p-1.5 md:p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700 transition-colors shadow-sm"
              title="Geser Kiri"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-1.5 md:p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-700 transition-colors shadow-sm"
              title="Geser Kanan"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>

      {/* KONTEN SLIDER */}
      {beritaList.length > 0 ? (
        <div
          ref={sliderRef} // Menyambungkan ref ke div ini
          className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-8 hide-scroll cursor-grab active:cursor-grabbing"
        >
          {beritaList.map((item) => (
            <Link
              href={`/berita/${item.id}`}
              key={item.id}
              className="block flex-none w-[65%] sm:w-[calc(50%-10px)] md:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] snap-start h-auto"
            >
              <div
                className="p-3 md:p-3.5 rounded-[1.5rem] shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col group cursor-pointer h-full"
                style={{ backgroundColor: cardPeach }}
              >
                <div className="relative w-full aspect-[4/5] rounded-[1.25rem] overflow-hidden mb-3">
                  <img
                    src={item.gambar || "/placeholder.jpg"}
                    alt={item.judul}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="px-1 pb-1">
                  <p className="text-[#334155] text-xs font-medium leading-relaxed line-clamp-3">
                    {item.judul}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="w-full py-16 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-3xl">
          <p className="text-gray-400 italic font-medium">
            Belum ada {title.toLowerCase()} yang diterbitkan.
          </p>
        </div>
      )}
    </div>
  );
}
