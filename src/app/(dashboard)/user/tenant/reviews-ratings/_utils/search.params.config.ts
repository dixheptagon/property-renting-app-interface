// config/reviewSearchConfig.ts

import { SearchParamsConfig } from "../_hooks/use.manage.search.params";

export type ReviewFilters = {
  page: number;
  limit: number;
  rating: number[]; // [1,2,3] → rating 1,2,3
  browser: string[]; // ['Chrome', 'Safari']
  date_from: string | null;
  date_to: string | null;
  sort_by: string | null;
  sort_dir: "asc" | "desc" | null;
  search: string | null;
  propertyId: string | null;
};

export const reviewSearchConfig: SearchParamsConfig<ReviewFilters> = {
  defaults: {
    page: 1,
    limit: 10,
    rating: [],
    browser: [],
    date_from: null,
    date_to: null,
    sort_by: null,
    sort_dir: "desc",
    search: null,
    propertyId: null,
  },

  parse: (params) => ({
    page: parseInt(params.get("page") || "1", 10),
    limit: parseInt(params.get("limit") || "10", 10),
    rating: params
      .getAll("rating")
      .map(Number)
      .filter((n) => n >= 1 && n <= 5),
    browser: params.getAll("browser"),
    date_from: params.get("date_from") || null,
    date_to: params.get("date_to") || null,
    sort_by: params.get("sort_by") || null,
    sort_dir: (params.get("sort_dir") as "asc" | "desc") || "desc",
    search: params.get("search") || null,
    propertyId: params.get("propertyId") || null,
  }),

  serialize: (key, value) => {
    if (value === null || value === undefined || value === "") return null;
    if (key === "page" && value === 1) return null;
    if (key === "limit" && value === 10) return null;
    if (key === "sort_dir" && value === "desc") return null;
    return value;
  },
};
