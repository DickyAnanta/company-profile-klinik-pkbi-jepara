import SideBar from "@/components/layout/SideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Sidebar tetap muncul di semua halaman admin */}
      <SideBar />

      <main className="flex-1 min-w-0 pt-[130px] lg:pt-0 transition-all duration-300">
        <div className="h-full p-4 md:p-8">
          {/* Ini adalah tempat dimana page.tsx (Dashboard/Layanan/Berita) akan muncul */}
          {children} 
        </div>
      </main>
    </div>
  );
}