import { CalendarPlus } from "lucide-react";

export default function ButtonPeakPrice() {
  return (
    <button
      className={`group relative flex w-full transform flex-col items-center justify-center rounded-2xl bg-blue-50 p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95 sm:p-12 lg:p-16`}
    >
      {/* Decorative background gradient on hover */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
      ></div>

      {/* Icon container */}
      <div
        className={`relative z-10 rounded-full bg-white p-6 shadow-md transition-transform duration-300 group-hover:rotate-12`}
      >
        <CalendarPlus
          className={`h-12 w-12 text-blue-500 sm:h-14 sm:w-14 lg:h-16 lg:w-16`}
        />
      </div>

      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <h3
          className={`text-lg font-bold text-blue-600 transition-transform duration-300 group-hover:translate-y-[-2px] sm:text-xl`}
        >
          Add New
        </h3>
        <h4 className="mt-1 text-sm font-semibold text-gray-600 sm:text-base">
          Peak Season Price
        </h4>
      </div>

      {/* Corner accent */}
      <div
        className={`absolute top-3 right-3 h-2 w-2 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 opacity-50`}
      ></div>
      <div
        className={`absolute bottom-3 left-3 h-2 w-2 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 opacity-50`}
      ></div>
    </button>
  );
}
