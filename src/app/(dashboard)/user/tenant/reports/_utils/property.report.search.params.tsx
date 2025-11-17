// config/salesReportSearchConfig.ts

import { SearchParamsConfig } from "../_hooks/use.manage.search.params";

export type propertyReportFilters = {
  property_date: string | null; //2023-01-01
  property_propertyId: string | null; //"123"
  property_roomId: string | null; //"123"
};

export const propertyReportSearchConfig: SearchParamsConfig<propertyReportFilters> =
  {
    defaults: {
      property_date: null,
      property_propertyId: null,
      property_roomId: null,
    },

    parse: (params) => ({
      property_date: params.get("property_date") || null,
      property_propertyId: params.get("property_propertyId") || null,
      property_roomId: params.get("property_roomId") || null,
    }),

    serialize: (key, value) => {
      if (value === null || value === undefined || value === "") return null;
      return value;
    },
  };
