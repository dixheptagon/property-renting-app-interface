"use client";

import { SalesReportHeader } from "./sales-report-components/sales.report.header";
import { SalesReportData } from "./sales-report-components/sales.report.data";
import { SalesReportChart } from "./sales-report-components/sales.report.chart";
import { useSalesReport } from "../_hooks/use.sales.report";
import ErrorState from "./sales-report-components/error.state";

export function SalesReport() {
  const {
    salesReportData,
    salesReportPeriods,
    isLoading,
    isError,
    error,
    refetch,
  } = useSalesReport();

  // Show error state if there's an overall error
  if (isError && !isLoading) {
    return (
      <section className="w-full space-y-4">
        <SalesReportHeader />
        <ErrorState
          error={error?.message || "Failed to load sales report"}
          onRetry={() => refetch()}
        />
      </section>
    );
  }

  return (
    <section className="w-full space-y-4">
      <SalesReportHeader />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <SalesReportData salesReportData={salesReportData} />

        {/* Chart - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <SalesReportChart salesReportPeriods={salesReportPeriods} />
        </div>
      </div>
    </section>
  );
}
