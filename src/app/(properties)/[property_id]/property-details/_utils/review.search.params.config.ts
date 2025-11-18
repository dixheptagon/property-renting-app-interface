// config/reviewSearchConfig.ts

import { SearchParamsConfig } from "../_hooks/use.manage.search.params";

export type ReviewFilters = {
  page: number; //1
  limit: number; //20
  rating: number[]; // [1,2,3] → rating 1,2,3
  date_from: string | null; //2023-01-01
  date_to: string | null; //2023-01-31
  sort_by: string | null; //created_at
  sort_dir: "asc" | "desc" | null;
  search: string | null; //"john"
};

export const reviewSearchConfig: SearchParamsConfig<ReviewFilters> = {
  defaults: {
    page: 1,
    limit: 10,
    rating: [],
    date_from: null,
    date_to: null,
    sort_by: null,
    sort_dir: "desc",
    search: null,
  },

  parse: (params) => ({
    page: parseInt(params.get("page") || "1", 10),
    limit: parseInt(params.get("limit") || "10", 10),
    rating: params
      .getAll("rating")
      .map(Number)
      .filter((n) => n >= 1 && n <= 5),
    date_from: params.get("date_from") || null,
    date_to: params.get("date_to") || null,
    sort_by: params.get("sort_by") || null,
    sort_dir: (params.get("sort_dir") as "asc" | "desc") || "desc",
    search: params.get("search") || null,
  }),

  serialize: (key, value) => {
    if (value === null || value === undefined || value === "") return null;
    if (key === "page" && value === 1) return null;
    if (key === "limit" && value === 10) return null;
    if (key === "sort_dir" && value === "desc") return null;
    return value;
  },
};
