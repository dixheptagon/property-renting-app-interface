export interface PropertyDetailsResponse {
  data: {
    uid: string;
    category: string;
    title: string;
    description: string;
    address: string;
    city: string;
    country: string;
    postal_code: string;
    latitude: number | null;
    longitude: number | null;
    place_id: string | null;
    map_url: string | null;
    amenities: any;
    custom_amenities: any;
    rules: any;
    custom_rules: any;
    rating_avg: number | null;
    rating_count: number | null;
    base_price: number;
    status: string;
    tenant: {
      id: number;
      name: string;
      profile_picture_url: string;
      image: string;
    };
    images: Array<{
      id: number;
      url: string;
      is_main: boolean;
      order_index: number;
    }>;
    rooms: Array<{
      id: number;
      uid: string;
      property_id: string;
      name: string;
      description: string;
      base_price: number;
      max_guest: number;
      bedrooms: number;
      bathrooms: number;
      beds: number;
      highlight: any;
      custom_highlight: any;
      total_units: number;
      images: Array<{
        id: number;
        url: string;
        is_main: boolean;
        order_index: number;
      }>;
    }>;
    room_unavailabilities: Array<{
      id: number;
      property_id: string;
      booking_id: number | null;
      room_id: number;
      start_date: Date;
      end_date: Date;
      reason: string | null;
    }>;
    peak_season_rates: Array<{
      id: number;
      room_id: number | null;
      property_id: string;
      start_date: Date;
      end_date: Date;
      adjustment_type: "percentage" | "nominal";
      adjustment_value: number;
    }>;
    id: number;
  };
}
