export interface Property {
  id: number;
  uid: string;
  user_id: number;
  category: string;
  title: string;
  description: string;
  address: string;
  city: string;
  country: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  place_id: string;
  map_url: string;
  amenities: Record<string, boolean>;
  rules: Record<string, boolean>;
  rating_avg: number;
  rating_count: number;
  base_price: number;
  status: string;
  created_at: string;
  updated_at: string;
  tenant: {
    id: number;
    display_name: string;
    image: string;
  };
  images: Array<{
    id: number;
    url: string;
    is_main: boolean;
    order_index: number;
    created_at: string;
  }>;
  rooms: Array<{
    id: number;
    uid: string;
    property_id: number;
    name: string;
    description: string;
    base_price: number;
    max_guest: number;
    bedrooms: number;
    bathrooms: number;
    beds: number;
    highlight: Record<string, any>;
    total_units: number;
    created_at: string;
    images: Array<{
      id: number;
      url: string;
      is_main: boolean;
      order_index: number;
      created_at: string;
    }>;
  }>;
  peak_season_rates: Array<{
    id: number;
    property_id: number;
    room_id: number | null;
    start_date: string;
    end_date: string;
    adjustment_type: "percentage" | "nominal";
    adjustment_value: number;
    created_at: string;
  }>;
  room_unavailabilities: Array<{
    id: number;
    property_id: number;
    room_id: number;
    booking_id: number | null;
    start_date: string;
    end_date: string;
    reason: string;
    created_at: string;
  }>;
}
