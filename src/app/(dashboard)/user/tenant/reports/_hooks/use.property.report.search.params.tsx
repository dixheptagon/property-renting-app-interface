import { propertyReportSearchConfig } from "../_utils/property.report.search.params";
import { salesReportSearchConfig } from "../_utils/sales.report.search.params.config";
import { useSearchParamsManager } from "./use.manage.search.params";

export const usePropertyReportSearchParams = () => {
  const { current, update, reset, raw } = useSearchParamsManager(
    propertyReportSearchConfig
  );

  const setDate = (date: string | null) =>
    update({ property_date: date }, { resetPage: true });

  const setPropertyId = (propertyId: string | null) =>
    update({ property_propertyId: propertyId });

  const setRoomId = (roomId: string | null) =>
    update({ property_roomId: roomId });

  const clearFilters = () =>
    update({
      property_date: null,
      property_propertyId: null,
      property_roomId: null,
    });

  const clearAll = () => reset();

  return {
    filters: current,
    setDate,
    setPropertyId,
    setRoomId,
    clearFilters,
    clearAll,
    rawParams: raw,
  };
};
