"use client";

import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X } from "lucide-react";
import { Section } from "../../_types/property.navbar";
import { MobileLogo } from "./initial-navbar-components/logo";

export default function ScrolledNavbar({
  scrollToSection,
  activeSection,
  sections,
}: {
  scrollToSection: (sectionId: string) => void;
  activeSection: string;
  sections: Section[];
}) {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="text-md flex w-full justify-center gap-12 bg-white/80 font-semibold text-gray-700 shadow-lg backdrop-blur-md md:pt-4">
        {isMobile ? (
          <>
            <MobileLogo />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mr-4 ml-auto pt-6 pb-6 text-blue-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </>
        ) : (
          sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`relative pb-7 transition-all duration-300 hover:border-b-3 hover:border-blue-800/30 hover:text-blue-800 ${
                activeSection === section.id
                  ? "border-b-3 border-blue-800 text-blue-800"
                  : "border-b-3 border-transparent"
              }`}
            >
              {section.label}
            </button>
          ))
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && (
        <div
          className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity ${
            mobileMenuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      {isMobile && (
        <div
          className={`fixed top-0 right-0 z-60 h-full w-[280px] transform bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col pt-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  scrollToSection(section.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-6 py-3 text-left transition-all duration-300 hover:bg-gray-100 ${
                  activeSection === section.id
                    ? "bg-blue-50 text-blue-800"
                    : "text-gray-700"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
