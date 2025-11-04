export interface Property {
  uid: string; // UUID string seperti "2ef56ac1-33e4-4f15-bbbd-3ddaaf59a1ff"
  category: string; // "apartment", "hotel", "villa", "house", "room", dll
  title: string;
  description: string;
  address: string;
  city: string;
  country: string;
  latitude: number | string | null; // null atau string numeric
  longitude: number | string | null;
  place_id: string | null;
  map_url: string;
  amenities: string[]; // array of string (contoh: ["wifi", "garden"])
  custom_amenities: string[] | null; // kadang array kosong, kadang null
  rules: string[]; // array of string (contoh: ["no_smoking"])
  custom_rules: string[] | null;
  rating_avg: number | null;
  rating_count: number | null;
  base_price: string; // di JSON dikirim sebagai string ("1000000")
  images: {
    url: string;
    is_main: boolean;
    order_index: number;
  }[];
  tenant: {
    first_name: string;
    last_name: string;
  };
  review_count: number;
  updated_at: string;
}
