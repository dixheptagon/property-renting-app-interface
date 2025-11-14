"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

export default function ReviewsStatisticsChart() {
  const chartData = [
    { rating: 5, reviews: 275, fill: "var(--color-1)" },
    { rating: 4, reviews: 200, fill: "var(--color-2)" },
    { rating: 3, reviews: 187, fill: "var(--color-3)" },
    { rating: 2, reviews: 173, fill: "var(--color-4)" },
    { rating: 1, reviews: 90, fill: "var(--color-5)" },
  ];

  const chartConfig = {
    reviews: {
      label: "Reviews",
    },
    5: {
      label: "5",
      color: "var(--chart-1)",
    },
    4: {
      label: "4",
      color: "var(--chart-2)",
    },
    3: {
      label: "3",
      color: "var(--chart-3)",
    },
    2: {
      label: "2",
      color: "var(--chart-4)",
    },
    1: {
      label: "1",
      color: "var(--chart-5)",
    },
  } satisfies ChartConfig;

  return (
    <div className="group relative col-span-2 overflow-hidden rounded-xl border-2 border-indigo-200 bg-linear-to-br from-indigo-50 to-purple-50 shadow-lg md:col-span-1">
      <div className="absolute top-0 right-0 h-32 w-32 bg-linear-to-br from-indigo-500 to-purple-600 opacity-10 blur-3xl"></div>
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
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: 0,
              }}
            >
              <YAxis
                dataKey="rating"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) =>
                  chartConfig[value as keyof typeof chartConfig]?.label
                }
              />
              <XAxis dataKey="reviews" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              <Bar dataKey="reviews" layout="vertical" radius={5} />
            </BarChart>
          </ChartContainer>

          {/* Decorative line */}
          <div
            className={`absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-purple-500 to-pink-600`}
          ></div>
        </div>
      </div>
    </div>
  );
}
