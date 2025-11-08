import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";

export default function OrderHistoryCard() {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:border-purple-400 hover:shadow-xl">
      <div className="absolute top-0 right-0 h-24 w-24 bg-linear-to-br from-purple-500/10 to-pink-500/10 blur-2xl"></div>

      <div className="relative flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 shadow-lg">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-base font-semibold text-gray-900 sm:text-lg">
              View Complete History
            </p>
            <p className="text-sm text-gray-500">
              Check all your past and upcoming bookings
            </p>
          </div>
        </div>
        <Link
          href="/user/purchase-list"
          className="group/link flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 hover:shadow-lg"
        >
          View All
          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
