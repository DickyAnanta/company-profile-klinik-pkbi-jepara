"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import {
  getLayanan,
  createLayanan,
  deleteLayanan,
  updateLayanan,
} from "./actions"; // Sesuaikan path jika berbeda

export default function LayananPage() {
  const [listLayanan, setListLayanan] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const loadData = async () => {
    try {
      const data = await getLayanan();
      setListLayanan(data || []);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(formData: FormData) {
    setIsProcessing(true);
    const result = editData
      ? await updateLayanan(editData.id, formData)
      : await createLayanan(formData);

    if (result?.success) {
      setShowForm(false);
      setEditData(null);
      loadData();
    } else {
      alert(result?.error || "Gagal menyimpan data.");
    }
    setIsProcessing(false);
  }

  const handleEdit = (item: any) => {
    setEditData(item);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Hapus layanan ini beserta gambarnya?")) {
      const result = await deleteLayanan(id);
      if (result?.success) loadData();
    }
  };

  return (
    <div className="max-w-full overflow-hidden p-4 md:p-8 font-sans">
      {/* --- HEADER: Persis seperti Berita Klinik --- */}
      <div className="flex flex-row justify-between items-center border-b-2 border-purple-500 pb-4 mb-8 gap-4">
        <h1 className="text-[#00387d] font-bold text-xl md:text-2xl italic leading-none">
          Layanan
        </h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) setEditData(null);
          }}
          className="mt-1 md:mt-0 bg-blue-400 text-white px-5 md:px-8 py-2.5 rounded-xl font-bold shadow-md text-[10px] md:text-base whitespace-nowrap hover:bg-blue-500 transition-all active:scale-95"
        >
          {showForm ? "✕ TUTUP" : "+ TAMBAH"}
        </button>
      </div>

      {/* --- SUB-HEADER: Persis penempatan tulisan "Klinik" --- */}
      <h2 className="text-[#00387d] italic font-semibold mb-6 text-lg">
        Daftar Layanan
      </h2>

      {/* --- FORM TAMBAH/EDIT --- */}
      {showForm && (
        <div className="mb-10 p-5 md:p-8 border-2 border-blue-100 rounded-[2rem] bg-gray-50/50 animate-in fade-in slide-in-from-top-4 duration-300">
          <form
            action={handleSubmit}
            className="space-y-5 md:space-y-6 max-w-5xl"
          >
            {/* 1. NAMA LAYANAN */}
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
              <label className="text-gray-700 font-bold text-sm md:w-24">
                Nama :
              </label>
              <input
                name="namaLayanan"
                defaultValue={editData?.namaLayanan}
                type="text"
                required
                className="w-full flex-1 border-2 border-blue-400 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-100 transition-all bg-white"
              />
            </div>

            {/* 2. HARGA */}
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
              <label className="text-gray-700 font-bold text-sm md:w-24">
                Harga :
              </label>
              <input
                name="harga"
                defaultValue={editData?.harga}
                type="text"
                required
                className="w-full flex-1 border-2 border-blue-400 rounded-xl p-2.5 outline-none bg-white"
              />
            </div>

            {/* 3. JADWAL */}
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
              <label className="text-gray-700 font-bold text-sm md:w-24">
                Jadwal :
              </label>
              <input
                name="jadwal"
                defaultValue={editData?.jadwal}
                type="text"
                required
                className="w-full flex-1 border-2 border-blue-400 rounded-xl p-2.5 outline-none bg-white"
              />
            </div>

            {/* 4. KETERANGAN */}
            <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-4">
              <label className="text-gray-700 font-bold text-sm md:w-24 md:mt-2">
                Ket :
              </label>
              <textarea
                name="keterangan"
                defaultValue={editData?.keterangan}
                rows={4}
                required
                className="w-full flex-1 border-2 border-blue-400 rounded-xl p-2.5 outline-none bg-white"
              />
            </div>

            {/* 5. GAMBAR */}
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
              <label className="text-gray-700 font-bold text-sm md:w-24">
                Gambar :
              </label>
              <div className="flex-1 w-full">
                <input
                  name="gambar"
                  type="file"
                  accept="image/*"
                  required={!editData}
                  className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#00387d] file:text-white file:font-bold cursor-pointer"
                />
                {editData && (
                  <p className="text-[10px] text-gray-500 mt-1 italic">
                    *Kosongkan jika tidak ingin mengganti gambar
                  </p>
                )}
              </div>
            </div>

            {/* Tombol Simpan */}
            <div className="flex justify-center md:justify-end pt-4">
              <button
                disabled={isProcessing}
                className="w-full md:w-auto bg-[#00387d] text-white px-12 py-3 rounded-full font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all text-sm"
              >
                {isProcessing
                  ? "Memproses..."
                  : editData
                    ? "Update Layanan"
                    : "Simpan Layanan"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- GRID DAFTAR LAYANAN --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {listLayanan && listLayanan.length > 0 ? (
          listLayanan.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square bg-[#00387d] rounded-[2.5rem] overflow-hidden shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              {item.gambar && (
                <img
                  src={item.gambar}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity group-hover:opacity-70"
                  alt=""
                />
              )}

              {/* Tombol Aksi */}
              <div className="absolute top-4 right-4 flex gap-2 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity z-20">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-yellow-500 text-white p-2.5 rounded-full shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white p-2.5 rounded-full shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>

              {/* Teks Judul & Harga */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end pointer-events-none">
                <p className="text-white font-bold text-xs md:text-sm leading-tight uppercase line-clamp-2">
                  {item.namaLayanan}
                </p>
                <p className="text-white/80 text-[10px] md:text-xs mt-1 font-medium">
                  {item.harga}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 rounded-[2.5rem]">
            <p className="text-gray-400 italic font-medium text-sm">
              Belum ada layanan yang ditambahkan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
