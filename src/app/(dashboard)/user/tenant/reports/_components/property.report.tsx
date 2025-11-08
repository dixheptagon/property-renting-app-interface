"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  TrendingUp,
  Home,
  CheckCircle,
  XCircle,
  Calendar1,
  Bed,
} from "lucide-react";
import React from "react";

export default function PropertyReport() {
  const today = new Date();
  const [date, setDate] = React.useState<Date | undefined>(today);

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
    <section className="mt-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Property Report
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your property bookings
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button className="group/btn transition-all hover:bg-blue-700 hover:shadow-lg">
            <Home className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-12" />
            Property Name
          </Button>
          <Button className="group/btn transition-all hover:bg-blue-700 hover:shadow-lg">
            <Bed className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-12" />
            Room Type
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Calendar Card */}
        <div className="t overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center gap-2">
            <Calendar1 className="h-5 w-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-900">Select Date</h2>
          </div>
          <Calendar
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={setDate}
            disabled={{
              before: today,
            }}
            className="mx-auto rounded-lg"
          />
        </div>

        {/* Stats Grid */}
        <div className="space-y-6">
          {/* Stats Cards */}
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
                      <p
                        className={`mt-2 text-4xl font-bold ${stat.textColor}`}
                      >
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
                    className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${stat.color}`}
                  ></div>
                </div>
              );
            })}
          </div>

          {/* Selected Date Info */}
          {date && (
            <div className="rounded-xl border border-gray-200 bg-linear-to-br from-gray-50 to-gray-100 p-6 shadow-md">
              <h3 className="mb-2 text-sm font-medium text-gray-600">
                Selected Date
              </h3>
              <p className="text-xl font-bold">
                {date.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
