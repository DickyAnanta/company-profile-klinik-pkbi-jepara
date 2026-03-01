"use client";

import Image from "next/image";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "@/app/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-white text-[#00387d] font-extrabold py-3 px-12 w-full md:w-auto rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all uppercase tracking-wider text-sm md:text-base disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? "Loading..." : "LOGIN"}
    </button>
  );
}

export default function LoginPage() {
  const colors = { bluePrimary: "#00387d" };
  const [state, formAction] = useActionState(loginAction, null);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-gray-100 p-4 md:p-0">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/bg-hero.jpg"
            alt="Background Gedung"
            fill
            className="object-cover blur-[4px] md:blur-[6px]"
            priority
          />
          <div className="absolute inset-0 bg-white/40"></div>
        </div>
      </div>

      {/* CARD */}
      <div className="relative z-10 w-full max-w-[900px] h-auto md:h-[500px] bg-white rounded-[20px] md:rounded-[30px] shadow-2xl overflow-hidden flex flex-col-reverse md:flex-row transition-all duration-300">
        {/* --- BAGIAN KIRI (BIRU - FORM) --- */}
        <div
          className="w-full md:w-[45%] p-8 md:p-10 flex flex-col justify-center items-center text-white relative" // HAPUS 'md:items-start', GANTI jadi 'items-center'
          style={{ backgroundColor: colors.bluePrimary }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-white/5 skew-x-[-10deg] hidden md:block"></div>

          {/* JUDUL: Dibuat Text Center Sepenuhnya */}
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 tracking-wide text-center w-full">
            Login disini ya!
          </h2>

          {/* PESAN ERROR */}
          {state?.message && (
            <div className="bg-red-500 text-white text-sm px-4 py-2 rounded-md mb-4 w-full text-center animate-pulse">
              {state.message}
            </div>
          )}

          {/* FORM */}
          <form
            action={formAction}
            className="w-full space-y-4 md:space-y-5 relative z-10"
          >
            <div>
              <input
                name="username"
                type="text"
                placeholder="Username"
                required
                className="w-full py-3 px-6 rounded-full text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm transition-all text-center md:text-left" // Opsi: text-center biar input juga rapi di tengah kalau mau
              />
            </div>

            <div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                required
                className="w-full py-3 px-6 rounded-full text-sm md:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm transition-all text-center md:text-left"
              />
            </div>

            {/* Tombol Login */}
            <div className="pt-4 w-full flex justify-center">
              <SubmitButton />
            </div>
          </form>
        </div>

        {/* --- BAGIAN KANAN (PUTIH - LOGO) --- */}
        <div className="w-full md:w-[55%] bg-white p-8 md:p-10 flex flex-col justify-center items-center text-center">
          <div className="relative w-32 h-32 md:w-56 md:h-56 mb-3 md:mb-4">
            <div className="w-full h-full flex items-center justify-center">
              <Image
                src="/images/logo-pkbi.png"
                alt="Logo PKBI"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div style={{ color: colors.bluePrimary }}>
            <p className="text-[10px] md:text-sm font-bold tracking-wide mb-1 opacity-80">
              Klinik Pratama Wahana Sejahtera
            </p>
            <h1 className="text-2xl md:text-4xl font-extrabold mb-2 tracking-tight">
              PKBI JEPARA
            </h1>
            <p className="text-[9px] md:text-xs font-bold tracking-wider opacity-90 max-w-[250px] md:max-w-none mx-auto">
              Sahabat Menuju Keluarga Kecil Sehat Sejahtera
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
