// config/salesReportSearchConfig.ts

import { SearchParamsConfig } from "../_hooks/use.manage.search.params";

export type propertyReportFilters = {
  property_date: string | undefined; //2023-01-01
  property_propertyId: string | undefined; //"123"
  property_roomId: string | undefined; //"123"
};

export const propertyReportSearchConfig: SearchParamsConfig<propertyReportFilters> =
  {
    defaults: {
      property_date: "",
      property_propertyId: "",
      property_roomId: "",
    },

    parse: (params) => ({
      property_date: params.get("property_date") || "",
      property_propertyId: params.get("property_propertyId") || "",
      property_roomId: params.get("property_roomId") || "",
    }),

    serialize: (key, value) => {
      if (value === "" || value === undefined || value === "") return "";
      return value;
    },
  };
