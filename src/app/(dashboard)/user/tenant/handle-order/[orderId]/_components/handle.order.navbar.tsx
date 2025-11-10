"use client";

import { useScrolled } from "@/hooks/use.scrolled";
import { AuthButtons, MobileAuthButton } from "./navbar-components/auth.button";
import { Logo, MobileLogo } from "./navbar-components/logo";
import { ReservationStep } from "./navbar-components/reservation.step";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function OrderDetailsNavbar() {
  const router = useRouter();
  const scrolled = useScrolled();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 h-16 w-full bg-white shadow-sm transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:h-full">
          {/* Logo */}
          <div className="flex shrink-0 items-center gap-4">
            <Button
              className="group hidden h-10 w-10 items-center justify-center rounded-lg bg-gray-200 transition-colors hover:bg-gray-300 md:flex"
              onClick={() => router.back()}
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 transition-transform group-hover:-translate-x-0.5" />
            </Button>

            <Logo />
          </div>

          {/* Center: Title with Badge */}
          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-linear-to-r from-blue-50 to-indigo-50 px-4 py-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <h1 className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-lg font-semibold text-transparent">
                Handle Order
              </h1>
            </div>
          </div>

          {/* Auth Button */}
          <div className="shrink-0">
            <AuthButtons scrolled={false} />
          </div>
        </div>

        {/* Mobile Steps - Visible only on mobile */}
        <div className="grid h-full grid-cols-3 justify-between gap-2 md:hidden">
          {/* Mobile Logo */}
          <div className="mx-4 flex items-center gap-2">
            <Button
              className="group flex h-8 w-8 items-center justify-center rounded-lg bg-gray-200 transition-colors hover:bg-gray-300 md:hidden"
              onClick={() => router.back()}
            >
              <ChevronLeft className="h-4 w-4 text-gray-600 transition-transform group-hover:-translate-x-0.5" />
            </Button>

            <MobileLogo />
          </div>

          {/* Center: Title with Badge */}
          <div className="mx-auto flex items-center gap-3 md:hidden">
            <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-linear-to-r from-blue-50 to-indigo-50 px-4 py-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <h1 className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-lg font-semibold text-transparent">
                Handle Order
              </h1>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`mr-3 flex items-center justify-end text-blue-800 lg:hidden ${scrolled ? "" : "z-60"}`}
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
            <MobileAuthButton setMobileMenuOpen={setMobileMenuOpen} />
          </div>
        </div>
      </nav>
    </>
  );
}
