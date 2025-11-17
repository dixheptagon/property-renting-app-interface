import { TrendingUp, Home, CheckCircle, XCircle } from "lucide-react";

export function PropertyReportData() {
  const stats = [
    {
      title: "Booked",
      value: 10,
      icon: XCircle,
      color: "from-red-500 to-rose-600",
      bgLight: "bg-red-50",
      textColor: "text-red-600",
      borderColor: "border-red-200",
    },
    {
      title: "Available",
      value: 2,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-600",
      bgLight: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      title: "Total Properties",
      value: 12,
      icon: Home,
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      title: "Occupancy Rate",
      value: `${((10 / 12) * 100).toFixed(1)}%`,
      icon: TrendingUp,
      color: "from-purple-500 to-violet-600",
      bgLight: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-xl border ${stat.borderColor} ${stat.bgLight} p-6 shadow-md`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className={`mt-2 text-4xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
              <div
                className={`rounded-xl bg-linear-to-br ${stat.color} p-3 shadow-md`}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div
              className={`absolute bottom-0 left-0 h-1 w-full bg-linear-to-r ${stat.color}`}
            ></div>
          </div>
        );
      })}
    </div>
  );
}
