export interface PropertyListResponse {
  data: any;
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
      location: string;
    };
    available: {
      categories: string[];
      amenities: string[];
      rules: string[];
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
