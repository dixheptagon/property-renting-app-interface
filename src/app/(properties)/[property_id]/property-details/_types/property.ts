export interface PropertyImage {
  id: number;
  url: string;
  is_main: boolean;
  order_index: number;
}

export interface RoomImage {
  id: number;
  url: string;
  is_main: boolean;
  order_index: number;
}

export interface RoomHighlight {
  city_view?: boolean;
  en_suite?: boolean;
  king_bed?: boolean;
  garden_view?: boolean;
  queen_bed?: boolean;
  others?: [string];
}

export interface RoomData {
  // Kita tambahkan ID sementara untuk front-end agar bisa di-track di state (misal: "temp-room-1")
  // Ini penting untuk menghubungkan PeakSeasonRates dan RoomUnavailabilities
  id: number;
  uid: string;
  property_id: string;

  // Model Room fields
  name: string;
  description: string;

  base_price: number; // Biarkan string/number untuk fleksibilitas input

  max_guest: number;
  total_units: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;

  highlight: string[]; // Sesuaikan dengan tipe JSON yang kamu harapkan
  custom_highlight: string[];

  // Relasi: Image
  images: RoomImage[];
}

export interface Tenant {
  id: number;
  name: string;
  display_name?: string | null;
  image?: string | null;
}

export interface Amenities {
  wifi: boolean;
  parking: boolean;
  pool: boolean;
  gym: boolean;
  air_conditioning: boolean;
  kitchen: boolean;
  laundry: boolean;
  pet_friendly: boolean;
  others: [string];
}

export interface Rules {
  no_smoking: boolean;
  no_pets: boolean;
  check_in_after: string;
  check_out_before: string;
  others: [string];
}

export interface PeakSeasonRate {
  id: number;
  property_id: string;
  room_id: number | null;
  start_date: Date;
  end_date: Date;
  adjustment_type: "percentage" | "nominal";
  adjustment_value: number;
}

export interface RoomUnavailability {
  id: number;
  property_id: string;
  room_id: number;
  booking_id: number | null;
  start_date: Date;
  end_date: Date;
  reason: string | null;
}

export interface Property {
  id?: number;
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
  amenities: Amenities;
  rules: Rules;
  rating_avg: number | null;
  rating_count: number | null;
  base_price: number;
  status: string;

  tenant: Tenant;

  images: PropertyImage[];
  rooms: RoomData[];
  peak_season_rates: PeakSeasonRate[];
  room_unavailabilities: RoomUnavailability[];
}
