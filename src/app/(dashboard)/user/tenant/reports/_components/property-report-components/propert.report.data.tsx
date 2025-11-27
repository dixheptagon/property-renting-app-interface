import { TrendingUp, Home, CheckCircle, XCircle } from "lucide-react";
import { usePropertyReport } from "../../_hooks/use.property.report";

export function PropertyReportData() {
  const { propertyReportData, isLoading, isError } = usePropertyReport();

  if (isError || !propertyReportData) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="col-span-full py-8 text-center">
          <p className="text-gray-500">Failed to load property report data</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Booked",
      value: propertyReportData.booked_units || 0,
      icon: XCircle,
      color: "from-red-500 to-rose-600",
      bgLight: "bg-red-50",
      textColor: "text-red-600",
      borderColor: "border-red-200",
    },
    {
      title: "Available",
      value: propertyReportData.available_units || 0,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-600",
      bgLight: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      title: "Total Units",
      value: propertyReportData.total_units || 0,
      icon: Home,
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      title: "Occupancy Rate",
      value: `${propertyReportData.occupancy_rate || 0}%`,
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
