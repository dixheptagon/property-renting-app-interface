"use client";
import { useRouter } from "next/navigation";
import { Logo, MobileLogo } from "./header-component/logo";
import { AuthButtons, MobileAuthButton } from "./header-component/auth.button";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function CreatePropertyHeader() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuth = () => {
    router.push("/check-email");
  };
  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full ${scrolled ? "border-b-2 bg-white/85 backdrop-blur-md" : ""}`}
      >
        <nav className="mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Logo />

          {/* Desktop Auth Buttons */}
          <AuthButtons handleAuth={handleAuth} />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`"text-white" lg:hidden`}
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
