"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { useScrolled } from "@/hooks/use.scrolled";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo, MobileLogo } from "./navbar-component/logo";
import { AuthButtons, MobileAuthButton } from "./navbar-component/auth.button";
import { Menu, X } from "lucide-react";
import SearchBar from "./navbar-component/search.bar";

export default function Navbar() {
  const router = useRouter();

  const scrolled = useScrolled();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAuth = () => {
    router.push("/check-email");
  };

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full bg-white/50 shadow-lg backdrop-blur-md transition-all duration-300`}
      >
        <nav className="mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Logo />

          {/* Desktop Searchbar */}
          <SearchBar />

          {/* Desktop Auth Buttons */}
          <AuthButtons scrolled={scrolled} handleAuth={handleAuth} />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden ${scrolled ? "text-gray-700" : "z-60 text-blue-800"}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden ${
          mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 z-60 h-full w-[280px] transform bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Mobile Menu Header */}
          {/* <MobileLogo /> */}

          {/* Mobile Auth Buttons */}
          <MobileAuthButton
            handleAuth={handleAuth}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </div>
      </div>
    </>
  );
}
