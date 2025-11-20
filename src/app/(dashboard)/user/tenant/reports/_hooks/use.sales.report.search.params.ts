import { salesReportSearchConfig } from "../_utils/sales.report.search.params.config";
import { useSearchParamsManager } from "./use.manage.search.params";

export const useSalesReportSearchParams = () => {
  const { current, update, reset, raw } = useSearchParamsManager(
    salesReportSearchConfig
  );

  const setDateRange = (from: string | null, to: string | null) =>
    update({ sales_date_from: from, sales_date_to: to });

  const setPropertyId = (propertyId: string | undefined) =>
    update({ sales_propertyId: propertyId });

  const clearFilters = () =>
    update({
      sales_date_from: null,
      sales_date_to: null,
    });

  const clearAll = () => reset();

  return {
    filters: current,
    setDateRange,
    setPropertyId,
    clearFilters,
    clearAll,
    rawParams: raw,
  };
};
