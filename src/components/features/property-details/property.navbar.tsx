"use client";
import staysia_logo from "../../../../public/logo/staysia-logo.png";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("photos");

  const sections = [
    { id: "photos", label: "Photos" },
    { id: "amenities", label: "Amenities & Rules" },
    { id: "room-type", label: "Choose your room" },
    { id: "location", label: "Location" },
    { id: "reviews-ratings", label: "Reviews & Ratings" },
    { id: "booked", label: "Booked Now" },
  ];

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 z-50 h-16 w-full bg-white shadow-sm transition-all duration-300">
      {/* Navbar Utama */}
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between p-4 transition-all duration-300 ${
          isScrolled ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={staysia_logo}
          alt="airbnb-logo"
          width={120}
          height={120}
        ></Image>
        <div className="flex items-center gap-4 text-sm font-medium">
          <span>Ke mana saja</span>
          <span>Minggu mana pun</span>
          <span>Tambahkan tamu</span>
        </div>
      </div>

      {/* Navbar Setelah Scroll */}
      <div
        className={`text-md absolute bottom-0 flex w-full justify-center gap-12 bg-white font-semibold text-gray-700 transition-all duration-300 ${
          isScrolled
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`relative pb-6 transition-colors hover:border-b-3 hover:border-black/30 hover:text-black ${
              activeSection === section.id
                ? "border-b-3 border-black text-black"
                : ""
            } ${section.id === "booked" ? "border-b-3 border-blue-500 font-bold text-blue-500" : ""}`}
          >
            {section.label}
          </button>
        ))}
        <div></div>
      </div>
    </header>
  );
}
