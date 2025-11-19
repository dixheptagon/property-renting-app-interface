"use client";

import { PropertyReportHeader } from "./property-report-components/property.report.header";
import { CalendarCard } from "./property-report-components/calendar.card";
import { PropertyReportData } from "./property-report-components/propert.report.data";
import { usePropertyReportSearchParams } from "../_hooks/use.property.report.search.params";
import EmptyState from "./property-report-components/empty.state";
import { SelectedDateInfo } from "./property-report-components/selected.date.info";

export default function PropertyReport() {
  const { filters } = usePropertyReportSearchParams();

  return (
    <section className="space-y-6">
      <PropertyReportHeader />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Calendar Card */}
        <CalendarCard />

        {/* Stats Grid */}
        <div className="space-y-6">
          {filters.property_date && filters.property_roomId ? (
            <>
              <PropertyReportData />
              <SelectedDateInfo />
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </section>
  );
}
