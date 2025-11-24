import { propertySearchConfig } from "../_utils/property.search.params.config";
import { useSearchParamsManager } from "./use.manage.search.params";

export const usePropertySearchParams = () => {
  const { current, update, reset, raw } =
    useSearchParamsManager(propertySearchConfig);

  const setPage = (page: number) => {
    if (current.page === page) return;
    update({ page });
  };

  const setLimit = (limit: number) => {
    if (current.limit === limit) return;
    update({ limit, page: 1 }, { resetPage: true });
  };

  const setLocation = (location: string) => {
    if (current.location === location) return; // ⛔ STOP LOOP
    update({ location, page: 1 }, { resetPage: true });
  };

  const setDateRange = (from: string | null, to: string | null) => {
    if (current.checkin === from && current.checkout === to) return; // ⛔ STOP LOOP
    update({ checkin: from, checkout: to, page: 1 }, { resetPage: true });
  };

  const setCategory = (category: string) => {
    if (current.category === category) return;
    update({ category, page: 1 }, { resetPage: true });
  };

  const clearLocation = () => {
    if (!current.location) return;
    update({ location: "", page: 1 }, { resetPage: true });
  };

  const clearDateRange = () => {
    if (!current.checkin && !current.checkout) return;
    update({ checkin: "", checkout: "", page: 1 }, { resetPage: true });
  };

  const clearAll = () => reset();

  return {
    filters: current,
    setPage,
    setLimit,
    setLocation,
    setDateRange,
    setCategory,
    clearLocation,
    clearDateRange,
    clearAll,
    rawParams: raw,
  };
};
