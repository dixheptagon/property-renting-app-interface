import { propertySearchConfig } from "../_utils/property.search.params.config";
import { useSearchParamsManager } from "./use.manage.search.params";

export const usePropertySearchParams = () => {
  const { current, update, reset, raw } =
    useSearchParamsManager(propertySearchConfig);

  const setPage = (page: number) => update({ page });

  const setLimit = (limit: number) =>
    update({ limit, page: 1 }, { resetPage: true });

  const setLocation = (location: string) =>
    update({ location, page: 1 }, { resetPage: true });

  const setDateRange = (from: string | null, to: string | null) =>
    update({ checkin: from, checkout: to, page: 1 }, { resetPage: true });

  const setCategory = (category: string) =>
    update({ category, page: 1 }, { resetPage: true });

  const setAmenities = (amenities: string) =>
    update({ amenities, page: 1 }, { resetPage: true });

  const setRules = (rules: string) =>
    update({ rules, page: 1 }, { resetPage: true });

  const clearLocation = () =>
    update({ location: "", page: 1 }, { resetPage: true });

  const clearDateRange = () =>
    update({ checkin: "", checkout: "", page: 1 }, { resetPage: true });

  const clearAll = () => {
    reset();
  };

  return {
    filters: current,
    setPage,
    setLimit,
    setLocation,
    setDateRange,
    setCategory,
    setAmenities,
    setRules,
    clearLocation,
    clearDateRange,
    clearAll,
    rawParams: raw,
  };
};
