import { reviewSearchConfig } from "../_utils/review.search.params.config";
import { useSearchParamsManager } from "./use.manage.search.params";

export const useReviewSearchParams = () => {
  const { current, update, reset, raw } =
    useSearchParamsManager(reviewSearchConfig);

  const setPage = (page: number) => update({ page });
  const setLimit = (limit: number) =>
    update({ limit, page: 1 }, { resetPage: true });

  const setRatingFilter = (ratings: number[]) =>
    update({ rating: ratings, page: 1 }, { resetPage: true });

  const toggleRating = (rating: number) => {
    const currentRatings = current.rating || [];
    const newRatings = currentRatings.includes(rating)
      ? currentRatings.filter((r) => r !== rating)
      : [...currentRatings, rating];
    setRatingFilter(newRatings);
  };

  const setSearch = (search: string) =>
    update({ search: search || null, page: 1 }, { resetPage: true });

  const setDateRange = (from: string | null, to: string | null) =>
    update({ date_from: from, date_to: to, page: 1 }, { resetPage: true });

  const setSort = (sort_by: string, sort_dir?: "asc" | "desc") =>
    update(
      { sort_by, sort_dir: sort_dir || "desc", page: 1 },
      { resetPage: true }
    );

  const clearFilters = () =>
    update(
      {
        rating: [],
        date_from: null,
        date_to: null,
        sort_by: null,
        sort_dir: "desc",
      },
      { resetPage: true }
    );

  const clearSearch = () =>
    update({ search: null, page: 1 }, { resetPage: true });

  const clearAll = () => reset();

  return {
    filters: current,
    setPage,
    setLimit,
    setRatingFilter,
    toggleRating,
    setSearch,
    setDateRange,
    setSort,
    clearFilters,
    clearSearch,
    clearAll,
    rawParams: raw,
  };
};
