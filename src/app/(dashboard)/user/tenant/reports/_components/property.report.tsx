import { PropertyReportHeader } from "./property-report-components/property.report.header";
import { CalendarCard } from "./property-report-components/calendar.card";
import { PropertyReportData } from "./property-report-components/propert.report.data";
import { SelectedDateInfo } from "./property-report-components/selected.date.info";

export default function PropertyReport() {
  return (
    <section className="space-y-6">
      <PropertyReportHeader />

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Calendar Card */}
        <CalendarCard />

        {/* Stats Grid */}
        <div className="space-y-6">
          {/* Stats Cards */}
          <PropertyReportData />

          {/* Selected Date Info */}
          <SelectedDateInfo />
        </div>
      </div>
    </section>
  );
}
