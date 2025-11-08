"use client";
import Image from "next/image";
import { ChevronLeft, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function HandleOrderNavbar() {
  const router = useRouter();
  const username = "John Doe";

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-white shadow-md transition-all duration-300">
      {/* Main Navbar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo & Back Button */}
          <div className="flex items-center gap-4">
            {/* Back Button - Hidden on mobile */}
            <Button
              className="group hidden h-10 w-10 items-center justify-center rounded-lg bg-gray-200 transition-colors hover:bg-gray-300 sm:flex"
              onClick={() => router.back()}
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 transition-transform group-hover:-translate-x-0.5" />
            </Button>

            {/* Logo */}
            <div className="relative">
              <Image
                src="/logo/staysia-logo.png"
                alt="Staysia Logo"
                width={100}
                height={100}
                className="w-24 sm:w-28 md:w-32"
              />
            </div>
          </div>

          {/* Center: Title with Badge */}
          <div className="hidden items-center gap-3 md:flex">
            <div className="flex items-center gap-2 rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-lg font-semibold text-transparent">
                Handle Order
              </h1>
            </div>
          </div>

          {/* Right: Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Username - Hidden on small mobile */}
            <span className="hidden text-sm font-medium text-gray-700 sm:block">
              {username}
            </span>

            {/* Avatar */}
            <div className="group relative">
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                {username
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>

              {/* Hover ring effect */}
              <div className="absolute inset-0 -z-10 scale-0 rounded-full bg-blue-500/20 opacity-0 transition-all duration-300 group-hover:scale-125 group-hover:opacity-100" />
            </div>

            {/* Mobile Menu Button */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 transition-colors hover:bg-gray-300 sm:hidden"
              onClick={() => router.push("/tenant/order-list")}
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 transition-transform group-hover:-translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Title Bar */}
      <div className="border-t border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 md:hidden">
        <div className="mx-auto max-w-7xl px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-sm font-semibold text-transparent">
              Handle Order
            </h1>
          </div>
        </div>
      </div>
    </nav>
  );
}
