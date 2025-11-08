import { CheckCircle, Calendar } from "lucide-react";
import type { QuickStatsProps } from "../_types/my.bookings";

export default function QuickStats({
  totalCompleted,
  activeBookings,
}: QuickStatsProps) {
  const stats = [
    {
      label: "Active",
      value: activeBookings,
      icon: <CheckCircle className="h-8 w-8 opacity-80" />,
      gradient: "from-blue-500 to-blue-600",
    },
    {
      label: "Completed",
      value: totalCompleted,
      icon: <Calendar className="h-8 w-8 opacity-80" />,
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-3">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`rounded-xl bg-gradient-to-br ${stat.gradient} p-6 text-white shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
