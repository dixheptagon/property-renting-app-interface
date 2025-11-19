import { propertyReportSearchConfig } from "../_utils/property.report.search.params";
import { useSearchParamsManager } from "./use.manage.search.params";

export const usePropertyReportSearchParams = () => {
  const { current, update, reset, raw } = useSearchParamsManager(
    propertyReportSearchConfig
  );

  const setDate = (date: string | undefined) => update({ property_date: date });

  const setPropertyId = (propertyId: string | undefined) =>
    update({
      property_propertyId: propertyId,
      property_roomId: undefined,
      property_date: undefined,
    });

  const setRoomId = (roomId: string | undefined) =>
    update({ property_roomId: roomId });

  const clearFilters = () =>
    update({
      property_date: "",
      property_propertyId: "",
      property_roomId: "",
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
