"use client";

import { useScrolled } from "@/hooks/use.scrolled";
import { AuthButtons, MobileAuthButton } from "./navbar-components/auth.button";
import { Logo, MobileLogo } from "./navbar-components/logo";
import { ReservationStep } from "./navbar-components/reservation.step";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
export default function BookingNavbar() {
  const router = useRouter();
  const scrolled = useScrolled();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAuth = () => {
    router.push("/check-email");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 h-16 w-full bg-white shadow-sm transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <div className="shrink-0">
            <Logo />
          </div>

          {/* Steps - Hidden on mobile, visible on md+ */}
          <div className="hidden md:flex">
            <ReservationStep currentStep={1} />
          </div>

          {/* Auth Button */}
          <div className="shrink-0">
            <AuthButtons scrolled={false} handleAuth={handleAuth} />
          </div>
        </div>

        {/* Mobile Steps - Visible only on mobile */}
        <div className="flex justify-between md:hidden">
          {/* Mobile Logo */}
          <MobileLogo />

          <ReservationStep currentStep={1} />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`mr-3 text-blue-800 lg:hidden ${scrolled ? "" : "z-60"}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

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
            <div className="flex items-center justify-between border-b p-4">
              <MobileLogo />

              <button
                className="rounded-md stroke-2 p-2 text-blue-800 transition hover:bg-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X />
              </button>
            </div>

            {/* Mobile Auth Buttons */}
            <MobileAuthButton
              handleAuth={handleAuth}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </div>
        </div>
      </nav>
    </>
  );
}
