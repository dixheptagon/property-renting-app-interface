// 1. Definisikan Tipe Data
// Kita gunakan Record atau Type untuk merepresentasikan data Property, Room, dll.

interface BaseImage {
  id: number; // ID record PropertyImage / RoomImage dari database (setelah upload TEMP)
  url: string;
  is_main: boolean;
  order_index: number;
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
  highlight: any; // Sesuaikan dengan tipe JSON yang kamu harapkan

  // Relasi: Image
  images: BaseImage[];
}

interface PeakRateData {
  // Untuk menghubungkan ke Room di FE, sebelum ada room_id
  targetTempRoomId: string | "PROPERTY";

  // Model PeakSeasonRate fields
  start_date: string; // Gunakan string ISO Date (misal: '2025-12-25')
  end_date: string;

  adjustment_type: "percentage" | "nominal";
  adjustment_value: number | string;
}

interface UnavailabilityData {
  targetTempRoomId: string;

  start_date: string;
  end_date: string;

  reason: string;
}

// State Utama
interface PropertyState {
  // Status Wizard
  currentStep: number;
  // Submit handlers for each step
  submitHandlers: Record<number, () => Promise<void> | void>;

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
    rules: any;
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
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setSubmitHandler: (step: number, handler: () => Promise<void> | void) => void;

  setPropertyData: (data: Partial<PropertyState["property"]>) => void;

  addPropertyImage: (image: BaseImage) => void;
  removePropertyImage: (imageId: number) => void;

  addRoom: (room: RoomData) => void;
  updateRoom: (tempId: string, data: Partial<Omit<RoomData, "images">>) => void;
  removeRoom: (tempId: string) => void;
  addRoomImage: (tempId: string, image: BaseImage) => void;

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
