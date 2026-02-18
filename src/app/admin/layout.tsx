import Image from "next/image";
import SideBar from "@/components/layout/SideBar"; // Import Sidebar yang baru dibuat

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* 1. Panggil Komponen Sidebar */}
      <SideBar />

      {/* 2. Konten Utama (Main Page) */}
      <main className="flex-1 relative flex flex-col h-screen overflow-y-auto bg-white">
        {/* Watermark Background (Opsional) */}
        <div className="absolute right-0 bottom-0 w-[500px] h-[500px] opacity-[0.03] pointer-events-none z-0">
          <Image
            src="/images/logo-pkbi.png"
            alt="Watermark"
            fill
            className="object-contain"
          />
        </div>

        {/* Konten Halaman (Page.tsx akan masuk sini) */}
        <div className="relative z-10 p-6 md:p-10 flex-1">{children}</div>
      </main>
    </div>
  );
}
