import {
  Calendar,
  CheckCircle,
  DollarSign,
  Home,
  ShoppingCart,
  XCircle,
} from "lucide-react";
import { formatPrice } from "../_utils/format.price";
import { OrdersChart } from "./orders.chart";
import { stat } from "fs";
import { Button } from "@/components/ui/button";
import { ReportDateRangePicker } from "./ui/date.range.picker";

const stats = [
  {
    title: "Total Revenue",
    value: formatPrice(1500000),
    icon: <DollarSign className="h-6 w-6" />,
    gradient: "from-emerald-500 to-teal-600",
    bgGradient: "from-emerald-50 to-teal-50",
    dateRange: "Oct 12, 2025 to Oct 19, 2025",
  },
  {
    title: "Total Orders",
    value: "120",
    icon: <ShoppingCart className="h-6 w-6" />,
    gradient: "from-blue-500 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    dateRange: "Oct 12, 2025 to Oct 19, 2025",
  },
  {
    title: "Completed Orders",
    value: "107",
    icon: <CheckCircle className="h-6 w-6" />,
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50",
    dateRange: "Oct 12, 2025 to Oct 19, 2025",
  },
  {
    title: "Cancelled Orders",
    value: "13",
    icon: <XCircle className="h-6 w-6" />,
    gradient: "from-red-500 to-rose-600",
    bgGradient: "from-red-50 to-rose-50",
    dateRange: "Oct 12, 2025 to Oct 19, 2025",
  },
];

export function SalesReport() {
  return (
    <section className="mt-6 w-full space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Sales Report
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor and analyze your sales activity
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button className="group/btn transition-all hover:bg-blue-700 hover:shadow-lg">
            <Home className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-12" />
            Property Name
          </Button>
          <ReportDateRangePicker />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Stats Grid - 2 columns on all sizes, takes 1 col on large screens */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border-2 border-gray-100 bg-white shadow-lg"
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${stat.bgGradient} opacity-40`}
              />

              <div className="relative space-y-4 p-5">
                {/* Header with icon */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-sm font-semibold tracking-wide text-gray-600 uppercase">
                      {stat.title}
                    </h2>
                  </div>
                  <div
                    className={`rounded-xl bg-linear-to-br ${stat.gradient} p-2.5 text-white shadow-lg`}
                  >
                    {stat.icon}
                  </div>
                </div>

                {/* Value */}
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>

                  {/* Trend indicator */}
                  <div className="flex items-center gap-2 rounded-lg border-1 bg-white p-2 shadow-md">
                    <Calendar className="h-4 w-4" />
                    <p className="text-sm font-semibold">{stat.dateRange}</p>
                  </div>
                </div>
              </div>

              {/* Decorative bottom accent */}
              <div className={`h-1 bg-gradient-to-r ${stat.gradient}`} />
            </div>
          ))}
        </div>

        {/* Chart - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <OrdersChart />
        </div>
      </div>
    </section>
  );
}
