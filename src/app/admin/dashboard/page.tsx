export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Sederhana */}
      <aside className="w-64 bg-blue-800 text-white p-6 hidden md:block">
        <h1 className="text-xl font-bold mb-8">Admin PKBI</h1>
        <nav className="space-y-4">
          <a href="#" className="block py-2 px-4 bg-blue-700 rounded">Dashboard</a>
          <a href="#" className="block py-2 px-4 hover:bg-blue-700 rounded">Kelola Berita</a>
          <a href="#" className="block py-2 px-4 hover:bg-blue-700 rounded">Profil Klinik</a>
        </nav>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Selamat Datang, Admin!</h2>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            Keluar
          </button>
        </header>

        {/* Statistik Ringkas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
            <p className="text-sm text-gray-500 uppercase font-bold">Total Berita</p>
            <p className="text-3xl font-bold">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
            <p className="text-sm text-gray-500 uppercase font-bold">Kunjungan Hari Ini</p>
            <p className="text-3xl font-bold">145</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-yellow-500">
            <p className="text-sm text-gray-500 uppercase font-bold">Pesan Masuk</p>
            <p className="text-3xl font-bold">5</p>
          </div>
        </div>
      </main>
    </div>
  );
}