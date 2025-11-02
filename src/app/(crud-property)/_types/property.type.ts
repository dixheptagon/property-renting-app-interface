// 1. Definisikan Tipe Data
// Kita gunakan Record atau Type untuk merepresentasikan data Property, Room, dll.

interface BaseImage {
  id: number; // ID record PropertyImage / RoomImage dari database (setelah upload TEMP)
  publicId: string;
  secureUrl: string;
  isMain: boolean;
  orderIndex: number;
  status: string;
  tempGroupId: string;
}

interface RoomData {
  // Kita tambahkan ID sementara untuk front-end agar bisa di-track di state (misal: "temp-room-1")
  // Ini penting untuk menghubungkan PeakSeasonRates dan RoomUnavailabilities
  tempId: string;

  // Model Room fields
  name: string;
  description: string;

  base_price: number | string; // Biarkan string/number untuk fleksibilitas input

  max_guest: number;
  total_units: number;
  bedrooms: number;
  bathrooms: number;
  beds: number;

  highlight: string[]; // Sesuaikan dengan tipe JSON yang kamu harapkan
  custom_highlight: string[];

  // Relasi: Image
  images: BaseImage[];
}

interface PeakRateData {
  // Untuk menghubungkan ke Room di FE, sebelum ada room_id
  tempId: string;
  targetTempRoomId: string | "PROPERTY";

  // Model PeakSeasonRate fields
  start_date: string; // Gunakan string ISO Date (misal: '2025-12-25')
  end_date: string;

  adjustment_type: "percentage" | "nominal";
  adjustment_value: number | string;
}

interface UnavailabilityData {
  tempId: string;
  targetTempRoomId: string;

  start_date: string;
  end_date: string;

  reason: string;
}

// State Utama
interface PropertyState {
  // Status Wizard

  isDraft: boolean;

  // 1. Data Property (Langkah 1)
  property: {
    title: string;
    category: string | null;
    description: string;

    base_price: number | string;

    // Location
    address: string;
    city: string;
    country: string;
    postal_code: string;
    latitude: number | null;
    longitude: number | null;
    place_id: string | null;
    map_url: string | null;

    // Fitur Tambahan
    amenities: any;
    custom_amenities: string[];

    rules: any;
    custom_rules: string[];
  };

  // 1b. Property Images
  propertyImages: BaseImage[];

  // 2. Data Rooms (Langkah 2)
  rooms: RoomData[];

  // 3. Peak Season Rates (Langkah 3)
  peakSeasonRates: PeakRateData[];

  // 4. Room Unavailabilities (Langkah 4)
  unavailabilities: UnavailabilityData[];
}

interface PropertyActions {
  setPropertyData: (data: Partial<PropertyState["property"]>) => void;

  addPropertyImage: (image: BaseImage) => void;
  removePropertyImage: (imageId: number) => void;

  addRoom: (room: RoomData) => void;
  updateRoom: (tempId: string, data: Partial<Omit<RoomData, "images">>) => void;
  removeRoom: (tempId: string) => void;
  addRoomImage: (tempId: string, image: BaseImage) => void;
  removeRoomImage: (tempId: string, imageId: number) => void;

  addPeakRate: (rate: PeakRateData) => void;
  updatePeakRate: (tempId: string, data: Partial<PeakRateData>) => void;
  removePeakRate: (tempId: string) => void;

  addUnavailability: (unavailability: UnavailabilityData) => void;
  updateUnavailability: (
    tempId: string,
    data: Partial<UnavailabilityData>
  ) => void;
  removeUnavailability: (tempId: string) => void;

  resetStore: () => void;
}

export type {
  PropertyState,
  PropertyActions,
  BaseImage,
  RoomData,
  PeakRateData,
  UnavailabilityData,
};
