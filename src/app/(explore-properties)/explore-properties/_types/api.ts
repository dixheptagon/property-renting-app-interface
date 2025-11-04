export interface PropertyListResponse {
  data: import("./property").Property[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: {
    applied: {
      category?: string;
      amenities?: string[];
      rules?: string[];
      location?: string;
      checkin?: string;
      checkout?: string;
      sortBy?: string;
    };
    available: {
      categories: string[];
      amenities: Array<{
        value: string;
        label: string;
        icon?: string;
      }>;
      rules: Array<{
        value: string;
        label: string;
        icon?: string;
      }>;
    };
  };
}

export interface PropertyListParams {
  location?: string;
  checkin?: string;
  checkout?: string;
  category?: string;
  amenities?: string;
  rules?: string;
  sortBy?: string;
  page?: string;
  limit?: string;
}
