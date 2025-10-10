"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 h-16 w-full bg-white shadow-sm transition-all duration-300">
      {/* Navbar Utama */}
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between p-4 transition-all duration-300 ${
          isScrolled ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <h1 className="text-xl font-semibold text-pink-600">airbnb</h1>
        <div className="flex items-center gap-4 text-sm font-medium">
          <span>Ke mana saja</span>
          <span>Minggu mana pun</span>
          <span>Tambahkan tamu</span>
        </div>
      </div>

      {/* Navbar Setelah Scroll */}
      <div
        className={`absolute top-0 mx-auto flex w-full items-center justify-center gap-8 border-t border-gray-200 bg-white py-4 text-sm font-semibold text-gray-700 transition-all duration-300 ${
          isScrolled
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <button className="hover:text-black">Foto</button>
        <button className="hover:text-black">Fasilitas</button>
        <button className="hover:text-black">Ulasan</button>
        <button className="hover:text-black">Lokasi</button>
      </div>
    </header>
  );
}
