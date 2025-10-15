import Image from "next/image";
import staysia_logo from "../../../../../public/logo/staysia-logo.png";
import { Circle } from "lucide-react";
export default function BookingNavbar() {
  return (
    <>
      <nav className="fixed top-0 left-0 z-50 h-16 w-full bg-white shadow-sm transition-all duration-300">
        <div className="mx-auto flex max-w-7xl justify-between">
          {/* Logo */}
          <div className="p-4">
            <Image
              src={staysia_logo}
              alt="Staysia Logo"
              width={120}
              height={120}
            />
          </div>

          {/* Steps */}
          <div className="flex items-center gap-4 p-4 text-sm font-medium text-gray-500">
            <div className="flex items-center justify-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
                1
              </span>
              <span className="text-blue-600">Booking</span>
              <hr className="w-8 rounded-2xl border-2 border-blue-600" />
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 text-sm text-white">
                2
              </span>
              <span>Pay</span>
              <hr className="w-8 rounded-2xl border-2 border-gray-500" />
            </div>
            <div className="flex items-center justify-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 text-sm text-white">
                3
              </span>
              <span>Confirmed</span>
            </div>
          </div>

          {/* Profile Icon */}
          <div className="flex items-center justify-center gap-3 p-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm text-white"></span>
            <span className="text-blue-600">username</span>
          </div>
        </div>
      </nav>
    </>
  );
}
