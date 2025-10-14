"use client";
import staysia_logo from "../../../../../public/logo/staysia-logo.png";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface Section {
  id: string;
  label: string;
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("photos");

  const sections: Section[] = [
    { id: "photos", label: "Photos" },
    { id: "amenities", label: "Amenities & Rules" },
    { id: "room-type", label: "Choose your room" },
    { id: "location", label: "Location" },
    { id: "reviews-ratings", label: "Reviews & Ratings" },
  ];

  // Handle scroll for navbar visibility
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 200);
  }, []);

  // Scroll to specific section
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveSection(sectionId);
    }
  }, []);

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    // Initialize IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null, // Use viewport as root
        rootMargin: "-50% 0px -50% 0px", // Adjusted for better section detection
        threshold: 0.1, // Trigger when 10% of element is visible
      }
    );

    // Observe all section elements
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);
    elements.forEach((element) => observer.observe(element!));

    // Cleanup observer on unmount
    return () => {
      elements.forEach((element) => observer.unobserve(element!));
      observer.disconnect();
    };
  }, [sections]);

  return (
    <header className="fixed top-0 left-0 z-50 h-16 w-full bg-white shadow-sm transition-all duration-300">
      {/* Main Navbar */}
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between p-4 transition-all duration-300 ${
          isScrolled ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={staysia_logo}
          alt="Staysia Logo"
          width={120}
          height={120}
          priority
        />
        <div className="flex items-center gap-4 text-sm font-medium">
          <span>Ke mana saja</span>
          <span>Minggu mana pun</span>
          <span>Tambahkan tamu</span>
        </div>
      </div>

      {/* Scrolled Navbar */}
      <nav
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
            } ${section.id === "booked" && activeSection === section.id ? "border-b-3 border-blue-500 font-bold text-blue-500" : ""}`}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
