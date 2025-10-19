import { Star, MessageSquare, TrendingUp } from "lucide-react";
import React from "react";
import { ReviewsChart } from "./review.chart";

export default function ReviewStats() {
  const stats = [
    {
      title: "Total Reviews",
      value: "10,000",
      subtitle: "Reviews",
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-600",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      title: "Average Rating",
      value: "4.5",
      subtitle: "out of 5.0",
      icon: Star,
      color: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50",
      textColor: "text-amber-600",
      borderColor: "border-amber-200",
    },
  ];

  return (
    <section className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3">
      {/* Stats Cards */}
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`group relative flex flex-col items-center justify-center overflow-hidden rounded-xl border-2 ${stat.borderColor} ${stat.bgLight} p-8 shadow-lg`}
          >
            {/* Icon Badge */}
            <div
              className={`mb-4 rounded-full bg-gradient-to-br ${stat.color} p-4 shadow-md`}
            >
              <Icon className="h-8 w-8 text-white" />
            </div>

            {/* Title */}
            <h2 className="mb-2 text-sm font-medium tracking-wide text-gray-600 uppercase">
              {stat.title}
            </h2>

            {/* Value */}
            <p className={`text-5xl font-bold ${stat.textColor} mb-1`}>
              {stat.value}
            </p>

            {/* Subtitle */}
            <p className="text-sm text-gray-500">{stat.subtitle}</p>

            {/* Decorative line */}
            <div
              className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${stat.color} `}
            ></div>

            {/* Decorative corner accent */}
            <div
              className={`absolute top-0 right-0 h-20 w-20 bg-gradient-to-br ${stat.color} opacity-20 blur-3xl`}
            ></div>
          </div>
        );
      })}

      {/* Chart Card */}
      <div className="group relative col-span-2 overflow-hidden rounded-xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg md:col-span-1">
        <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-10 blur-3xl"></div>
        <div className="relative flex h-full flex-col p-6">
          {/* Chart Header */}
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">
              Statistic Rating
            </h3>
          </div>

          {/* Chart Component */}
          <div className="flex-1">
            <ReviewsChart />
          </div>
        </div>
      </div>
    </section>
  );
}
