"use client";

import { createBeritaKartini, getBeritaKartini, deleteBeritaKartini, updateBeritaKartini } from "./actions"; 
import { useState, useEffect } from "react";

export default function BeritaKartiniPage() {
  const [listBerita, setListBerita] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  const loadData = async () => {
    const data = await getBeritaKartini();
    setListBerita(data);
  };

  useEffect(() => { loadData(); }, []);

  const handleEdit = (item: any) => {
    setEditData(item);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Hapus berita Kartini ini?")) {
      const result = await deleteBeritaKartini(id);
      if (result.success) loadData();
    }
  };

  async function handleSubmit(formData: FormData) {
    setIsUploading(true);
    const result = editData 
      ? await updateBeritaKartini(editData.id, formData)
      : await createBeritaKartini(formData);

    if (result?.success) {
      setShowForm(false);
      setEditData(null);
      loadData();
    } else {
      alert(result?.error || "Terjadi kesalahan saat menyimpan data.");
    }
    setIsUploading(false);
  }

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center border-b-2 border-purple-500 pb-2 mb-8">
        <h1 className="text-blue-600 font-bold text-xl italic">Berita</h1>
        <button 
          onClick={() => { setShowForm(!showForm); if(showForm) setEditData(null); }} 
          className="bg-blue-400 text-white px-6 py-2 rounded-xl font-bold shadow-sm"
        >
          {showForm ? "✕ TUTUP" : "+ TAMBAH"}
        </button>
      </div>

      <h2 className="text-blue-800 italic font-semibold mb-6">Kartini</h2>

      {/* Form Tambah/Edit */}
      {showForm && (
        <div className="mb-10 p-8 border-2 border-blue-100 rounded-[2rem] bg-gray-50/50 animate-in fade-in slide-in-from-top-4 duration-300">
          <form action={handleSubmit} className="space-y-6 max-w-5xl">
            <div className="flex items-center gap-4">
              <label className="w-24 text-gray-700 font-medium">Judul :</label>
              <input name="judul" defaultValue={editData?.judul} type="text" required className="flex-1 border-2 border-blue-400 rounded-xl p-2 outline-none" />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-24 text-gray-700 font-medium">Tagline :</label>
              <input name="tagline" defaultValue={editData?.tagline} type="text" required className="flex-1 border-2 border-blue-400 rounded-xl p-2 outline-none" />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-24 text-gray-700 font-medium">Tanggal :</label>
              <input name="tanggal" defaultValue={editData ? new Date(editData.tanggal).toISOString().split('T')[0] : ""} type="date" required className="flex-1 border-2 border-blue-400 rounded-xl p-2 outline-none" />
            </div>
            <div className="flex items-start gap-4">
              <label className="w-24 text-gray-700 mt-2 font-medium">Ket :</label>
              <textarea name="keterangan" defaultValue={editData?.keterangan} rows={3} required className="flex-1 border-2 border-blue-400 rounded-xl p-2 outline-none" />
            </div>
            <div className="flex items-center gap-4">
              <label className="w-24 text-gray-700 font-medium">Gambar :</label>
              <div className="flex-1">
                 <input name="gambar" type="file" accept="image/*" required={!editData} className="text-sm file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:bg-blue-900 file:text-white file:font-bold cursor-pointer" />
                 {editData && <p className="text-xs text-gray-500 mt-1">*Kosongkan jika tidak ingin mengganti gambar</p>}
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button disabled={isUploading} className="bg-blue-900 text-white px-12 py-3 rounded-full font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all">
                {isUploading ? "Memproses..." : editData ? "Update Berita Kartini" : "Simpan Berita Kartini"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid Daftar Berita */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {listBerita.length > 0 ? (
          listBerita.map((item) => (
            <div key={item.id} className="group relative aspect-square bg-blue-900 rounded-[2.5rem] overflow-hidden shadow-md transition-transform hover:scale-105">
              <img src={item.gambar} className="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity group-hover:opacity-70" alt="" />
              
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                {/* Tombol Edit */}
                <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white p-2 rounded-full shadow-lg hover:bg-yellow-600">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                   </svg>
                </button>
                {/* Tombol Hapus */}
                <button onClick={() => handleDelete(item.id)} className="bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <p className="text-white font-bold text-sm leading-tight uppercase">{item.judul}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 rounded-[2.5rem]">
            <p className="text-gray-400 italic font-medium">Belum ada berita Kartini yang ditambahkan.</p>
          </div>
        )}
      </div>
    </div>
  );
}