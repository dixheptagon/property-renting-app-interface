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

export const description = "A multiple bar chart";

const chartData = [
  { month: "January", completted: 186, cancel: 80 },
  { month: "February", completted: 305, cancel: 200 },
  { month: "March", completted: 237, cancel: 120 },
  { month: "April", completted: 73, cancel: 190 },
  { month: "May", completted: 209, cancel: 130 },
  { month: "June", completted: 214, cancel: 140 },
];

const chartConfig = {
  completted: {
    label: "Completted",
    color: "var(--chart-2)",
  },
  cancel: {
    label: "cancel",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function SalesReportChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Property Analysis</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="completted"
              fill="var(--color-completted)"
              radius={4}
            />
            <Bar dataKey="cancel" fill="var(--color-cancel)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          You had 8,792 visitors for the month of June.
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total orders and cancelled
        </div>
      </CardFooter>
    </Card>
  );
}
