"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatDate } from "../../_utils/format.date";
import { SalesReportPeriod } from "../../_types/sales.report";

export const description = "A multiple bar chart";

interface SalesReportChartProps {
  salesReportPeriods?: {
    startDate?: string;
    endDate?: string;
    periods?: Array<{
      period: string;
      completed: number;
      cancelled: number;
    }>;
    totalOrders?: number;
  };
}

export function SalesReportChart({
  salesReportPeriods,
}: SalesReportChartProps) {
  const chartData =
    salesReportPeriods?.periods?.map((period: SalesReportPeriod) => ({
      period: period.period,
      completed: period.completed,
      cancelled: period.cancelled,
    })) || [];

  const chartConfig = {
    completed: {
      label: "completed",
      color: "var(--chart-2)",
    },
    cancelled: {
      label: "cancelled",
      color: "var(--chart-5)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Analysis</CardTitle>
        <CardDescription>
          {salesReportPeriods?.startDate && salesReportPeriods?.endDate
            ? `${formatDate(new Date(salesReportPeriods.startDate))} - ${formatDate(new Date(salesReportPeriods.endDate))}`
            : "Date range not available"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 15)} // Truncate long period names
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
            <Bar dataKey="cancelled" fill="var(--color-cancelled)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Total orders: {salesReportPeriods?.totalOrders}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing completed and cancelled orders by period
        </div>
      </CardFooter>
    </Card>
  );
}
