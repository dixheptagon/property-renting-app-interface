"use client";

import { Calendar } from "@/components/ui/calendar";
import { Calendar1 } from "lucide-react";
import React, { useMemo } from "react";
import { usePropertyReportSearchParams } from "../../_hooks/use.property.report.search.params";

export function CalendarCard() {
  const today = new Date();

  const { setDate: setPropertyDate, filters } = usePropertyReportSearchParams();

  const date = useMemo(() => {
    return filters.property_date ? new Date(filters.property_date) : undefined;
  }, [filters.property_date]);

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    setPropertyDate(date.toISOString());
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
