import { CheckCircle, DollarSign, ShoppingCart, XCircle } from "lucide-react";
import { formatPrice } from "../../_utils/format.price";

export function SalesReportData() {
  const stats = [
    {
      title: "Total Revenue",
      value: formatPrice(1500000),
      icon: <DollarSign className="h-6 w-6" />,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      bgIcon: DollarSign,
      bgIconColor: "text-emerald-500",
    },
    {
      title: "Total Orders",
      value: "120",
      icon: <ShoppingCart className="h-6 w-6" />,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
      bgIcon: ShoppingCart,
      bgIconColor: "text-blue-500",
    },
    {
      title: "Completed Orders",
      value: "107",
      icon: <CheckCircle className="h-6 w-6" />,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      bgIcon: CheckCircle,
      bgIconColor: "text-green-500",
    },
    {
      title: "Cancelled Orders",
      value: "13",
      icon: <XCircle className="h-6 w-6" />,
      gradient: "from-red-500 to-rose-600",
      bgGradient: "from-red-50 to-rose-50",
      bgIcon: XCircle,
      bgIconColor: "text-red-500",
    },
  ];

  return (
    //  Stats Grid - 2 columns on all sizes, takes 1 col on large screens
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
              <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>

          {/* Decorative bottom accent */}
          <div className={`mt-10 h-1 bg-linear-to-r ${stat.gradient}`} />

          {/* Decorative Icon background */}
          <div className="absolute -right-6 bottom-0">
            <stat.bgIcon
              className={`h-42 w-42 opacity-20 ${stat.bgIconColor}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
