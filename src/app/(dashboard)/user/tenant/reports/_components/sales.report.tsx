import { SalesReportHeader } from "./sales-report-components/sales.report.header";
import { SalesReportData } from "./sales-report-components/sales.report.data";
import { SalesReportChart } from "./sales-report-components/sales.report.chart";

export function SalesReport() {
  return (
    <section className="w-full space-y-4">
      <SalesReportHeader />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <SalesReportData />

        {/* Chart - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <SalesReportChart />
        </div>
      </div>
    </section>
  );
}
