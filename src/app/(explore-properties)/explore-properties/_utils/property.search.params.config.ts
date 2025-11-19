// config/reviewSearchConfig.ts

import { SearchParamsConfig } from "../_hooks/use.manage.search.params";

export type PropertyParams = {
  location: string | undefined; //"New York"
  checkin: string | undefined | null; //"2023-01-01"
  checkout: string | undefined | null; //"2023-01-31"
  category: string | undefined; //"apartment"
  sortBy: string | undefined; //created_at
  page: number; //1
  limit: number; //20
};

export const propertySearchConfig: SearchParamsConfig<PropertyParams> = {
  defaults: {
    location: "",
    checkin: "",
    checkout: "",
    category: "",
    sortBy: "",
    page: 1,
    limit: 12,
  },

  parse: (params) => ({
    location: params.get("location") || "",
    checkin: params.get("checkin") || "",
    checkout: params.get("checkout") || "",
    category: params.get("category") || "",
    amenities: params.get("amenities") || "",
    rules: params.get("rules") || "",
    sort_by: params.get("sortBy") || "",
    page: parseInt(params.get("page") || "1", 10),
    limit: parseInt(params.get("limit") || "12", 10),
  }),

  serialize: (key, value) => {
    if (value === null || value === undefined || value === "") return null;
    if (key === "page" && value === 1) return null;
    if (key === "limit" && value === 10) return null;
    if (key === "sort_dir" && value === "desc") return null;
    return value;
  },
};
