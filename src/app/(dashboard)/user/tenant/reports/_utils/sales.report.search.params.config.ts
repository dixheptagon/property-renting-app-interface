// config/salesReportSearchConfig.ts

import { SearchParamsConfig } from "../_hooks/use.manage.search.params";

export type SalesReportFilters = {
  sales_date_from: string | null; //2023-01-01
  sales_date_to: string | null; //2023-01-31
  sales_propertyId: string | undefined; //"123"
};

export const salesReportSearchConfig: SearchParamsConfig<SalesReportFilters> = {
  defaults: {
    sales_date_from: null,
    sales_date_to: null,
    sales_propertyId: "",
  },

  parse: (params) => ({
    sales_date_from: params.get("sales_date_from") || null,
    sales_date_to: params.get("sales_date_to") || null,
    sales_propertyId: params.get("sales_propertyId") || "",
  }),

  serialize: (key, value) => {
    if (value === null || value === undefined || value === "") return null;
    return value;
  },
};
