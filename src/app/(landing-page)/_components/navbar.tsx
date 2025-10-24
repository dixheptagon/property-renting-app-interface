"use client";

import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MobileNavigationLink,
  NavigationLink,
} from "./navbar-ui/navigation.link";
import { AuthButtons, MobileAuthButton } from "./navbar-ui/auth.button";
import { Logo, MobileLogo } from "./navbar-ui/logo";

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleAuth = () => {
    router.push("/check-email");
  };

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/85 shadow-lg backdrop-blur-md"
            : "bg-gradient-to-b from-black/50 to-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <NavigationLink scrolled={scrolled} />

          {/* Desktop Auth Buttons */}
          <AuthButtons scrolled={scrolled} handleAuth={handleAuth} />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden ${scrolled ? "text-gray-700" : "text-white"}`}
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
        className={`fixed top-0 right-0 z-40 h-full w-[280px] transform bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Mobile Menu Header */}
          <MobileLogo />

          {/* Mobile Navigation Links */}
          <MobileNavigationLink setMobileMenuOpen={setMobileMenuOpen} />

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
