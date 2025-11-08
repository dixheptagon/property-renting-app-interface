"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PurchaseStatus } from "../_types/purchase.status";

export const usePurchaseSearchParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = (
    updates: Record<string, string | string[] | number | null>
  ) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        newSearchParams.delete(key);
      } else if (Array.isArray(value)) {
        // Remove existing array params
        newSearchParams.delete(`${key}[]`);
        // Add new array values
        value.forEach((item) => {
          newSearchParams.append(`${key}[]`, item);
        });
      } else {
        newSearchParams.set(key, value.toString());
      }
    });

    router.push(`?${newSearchParams.toString()}`, { scroll: false });
  };

  const setPage = (page: number) => {
    updateSearchParams({ page });
  };

  const setLimit = (limit: number) => {
    updateSearchParams({ limit, page: 1 }); // Reset to page 1 when changing limit
  };

  const setStatusFilter = (statuses: PurchaseStatus[]) => {
    updateSearchParams({ status: statuses, page: 1 });
  };

  const toggleStatus = (
    status: PurchaseStatus,
    currentStatuses: PurchaseStatus[]
  ) => {
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter((s) => s !== status)
      : [...currentStatuses, status];

    setStatusFilter(newStatuses);
  };

  const clearStatusFilters = () => {
    updateSearchParams({ status: null, page: 1 });
  };

  const setSortBy = (sortBy: string, sortDir?: "asc" | "desc") => {
    updateSearchParams({
      sort_by: sortBy,
      sort_dir: sortDir || "desc",
      page: 1,
    });
  };

  const setDateRange = (dateFrom: string, dateTo: string) => {
    updateSearchParams({
      date_from: dateFrom || null,
      date_to: dateTo || null,
      page: 1,
    });
  };

  const clearAllFilters = () => {
    updateSearchParams({
      status: null,
      date_from: null,
      date_to: null,
      sort_by: null,
      sort_dir: null,
      page: 1,
      limit: null,
    });
  };

  return {
    updateSearchParams,
    setPage,
    setLimit,
    setStatusFilter,
    toggleStatus,
    clearStatusFilters,
    setSortBy,
    setDateRange,
    clearAllFilters,
  };
};
