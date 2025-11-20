import { Plus, CalendarX } from "lucide-react";

export default function ButtonSetUnavailability() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4">
      <button className="group relative w-full overflow-hidden rounded-xl border-2 border-dashed border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 transition-all duration-300 hover:scale-[1.02] hover:border-blue-500 hover:shadow-xl active:scale-[0.98] md:p-8">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>

        {/* Content */}
        <div className="relative flex flex-col items-center justify-center gap-3 md:flex-row md:gap-4">
          {/* Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-90 md:h-14 md:w-14">
            <Plus className="h-6 w-6 md:h-7 md:w-7" strokeWidth={3} />
          </div>

          {/* Text */}
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold text-gray-800 transition-colors group-hover:text-blue-600 md:text-xl">
              Add New Unavailability Date
            </h2>
            <p className="mt-1 text-sm text-gray-600 md:text-base">
              Schedule room maintenance or renovation periods
            </p>
          </div>

          {/* Decorative Icon */}
          <div className="ml-auto hidden lg:block">
            <CalendarX className="h-8 w-8 text-blue-300 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-500" />
          </div>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transition-transform duration-700 group-hover:translate-x-full"></div>
      </button>
    </div>
  );
}
