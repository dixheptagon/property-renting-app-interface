"use client";

import { Calendar } from "@/components/ui/calendar";
import { Calendar1 } from "lucide-react";
import React from "react";
import { usePropertyReportSearchParams } from "../../_hooks/use.property.report.search.params";

export function CalendarCard() {
  const today = new Date();
  const [date, setDate] = React.useState<Date | undefined>(today);

  const { setDate: setPropertyDate } = usePropertyReportSearchParams();

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);

    if (!date) return;
    setPropertyDate(date.toISOString().split("T")[0]);
  };

  return (
    <div className="t overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center gap-2">
        <Calendar1 className="h-5 w-5 text-gray-700" />
        <h2 className="text-lg font-semibold text-gray-900">Select Date</h2>
      </div>
      <Calendar
        mode="single"
        defaultMonth={date}
        selected={date}
        onSelect={handleDateChange}
        disabled={{
          before: today,
        }}
        className="mx-auto rounded-lg"
      />
    </div>
  );
}
