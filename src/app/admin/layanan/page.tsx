"use client";

import { useState, useEffect } from "react";
import { getLayanan, createLayanan, deleteLayanan, updateLayanan } from "../actions";

export default function LayananPage() {
  const [listLayanan, setListLayanan] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const loadData = async () => {
    const data = await getLayanan();
    setListLayanan(data);
  };

  useEffect(() => { loadData(); }, []);

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

  return (
    <div className="max-w-full overflow-hidden">
      {/* --- HEADER: Responsif & Proporsional --- */}
<div className="flex flex-row justify-between items-center border-b-2 border-purple-500 pb-4 mb-8 gap-4">
  <h1 className="text-[#00387d] font-bold text-xl md:text-2xl italic leading-none">
    Layanan
  </h1>
  
  {/* Menambahkan mt-1 pada mobile agar tombol turun sedikit */}
  <button 
    onClick={() => { setShowForm(!showForm); if(showForm) setEditData(null); }} 
    className="mt-1 md:mt-0 bg-blue-400 text-white px-5 md:px-8 py-2.5 rounded-xl font-bold shadow-md text-[10px] md:text-base whitespace-nowrap hover:bg-blue-500 transition-all active:scale-95"
  >
    {showForm ? "✕ TUTUP" : "+ TAMBAH"}
  </button>
</div>

      {/* --- FORM TAMBAH/EDIT: Perbaikan Proporsi --- */}
      {showForm && (
        <div className="mb-10 p-4 md:p-8 border-2 border-blue-100 rounded-[2rem] bg-gray-50/50">
          <h2 className="text-[#00387d] italic font-semibold mb-6 text-base md:text-lg">Daftar Layanan</h2>
          
          <form action={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Input Group: Stack di mobile (flex-col), Row di desktop (md:flex-row) */}
            
            {/* 1. NAMA */}
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
              <label className="text-gray-700 font-bold text-sm md:w-24">Nama :</label>
              <input 
                name="nama" 
                defaultValue={editData?.nama} 
                type="text" 
                required 
                className="w-full border-2 border-blue-400 rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-100" 
              />
            </div>

            {/* 2. HARGA */}
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
              <label className="text-gray-700 font-bold text-sm md:w-24">Harga :</label>
              <input 
                name="harga" 
                defaultValue={editData?.harga} 
                type="text" 
                required 
                className="w-full border-2 border-blue-400 rounded-xl p-2.5 outline-none" 
              />
            </div>

            {/* 3. JADWAL */}
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
              <label className="text-gray-700 font-bold text-sm md:w-24">Jadwal :</label>
              <input 
                name="jadwal" 
                defaultValue={editData?.jadwal} 
                type="text" 
                required 
                className="w-full border-2 border-blue-400 rounded-xl p-2.5 outline-none" 
              />
            </div>

            {/* 4. KETERANGAN */}
            <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-4">
              <label className="text-gray-700 font-bold text-sm md:w-24 md:mt-2">Ket :</label>
              <textarea 
                name="keterangan" 
                defaultValue={editData?.keterangan} 
                rows={4} 
                required 
                className="w-full border-2 border-blue-400 rounded-xl p-2.5 outline-none" 
              />
            </div>

            {/* 5. GAMBAR */}
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
              <label className="text-gray-700 font-bold text-sm md:w-24">Gambar :</label>
              <input 
                name="gambar" 
                type="file" 
                accept="image/*" 
                required={!editData} 
                className="w-full text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#00387d] file:text-white file:font-bold" 
              />
            </div>

            {/* Tombol Simpan */}
            <div className="flex justify-center md:justify-end pt-4">
              <button 
                disabled={isProcessing} 
                className="w-full md:w-auto bg-[#00387d] text-white px-10 py-3 rounded-full font-bold shadow-lg active:scale-95 transition-all text-sm"
              >
                {isProcessing ? "Memproses..." : editData ? "Update Layanan" : "Simpan Layanan"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- GRID DAFTAR LAYANAN (Sama seperti sebelumnya) --- */}
      {/* ... bagian grid daftar layanan ... */}
    </div>
  );
}