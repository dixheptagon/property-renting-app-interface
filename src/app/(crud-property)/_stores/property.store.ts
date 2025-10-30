import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { PropertyState, PropertyActions } from "../_types/property.type";

const initialState: PropertyState = {
  isDraft: false,
  property: {
    title: "",
    category: null,
    description: "",

    base_price: 0,

    address: "",
    city: "",
    country: "",
    postal_code: "",
    latitude: null,
    longitude: null,
    place_id: null,
    map_url: null,

    amenities: [],
    custom_amenities: [],

    rules: [],
    custom_rules: [],
  },
  propertyImages: [],
  rooms: [],
  peakSeasonRates: [],
  unavailabilities: [],
};

export const usePropertyStore = create<PropertyState & PropertyActions>()(
  persist(
    (set, get) => ({
      ...initialState, // Default state

      // --- ACTIONS ---

      // 1. Set Property Data
      setPropertyData: (data) =>
        set((state) => ({
          property: { ...state.property, ...data },
          isDraft: true,
        })),

      // 2. Manage Images
      addPropertyImage: (image) =>
        set((state) => ({
          propertyImages: [...state.propertyImages, image].flat(),
          isDraft: true,
        })),
      removePropertyImage: (imageId) =>
        set((state) => ({
          propertyImages: state.propertyImages
            .flat() // <--- ini yang nge-flatten array dua dimensi
            .filter((img) => img.id !== imageId),
          isDraft: true,
        })),

      // 3. Manage Rooms
      addRoom: (room) =>
        set((state) => ({
          rooms: [...state.rooms, room],
          isDraft: true,
        })),
      updateRoom: (tempId, data) =>
        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.tempId === tempId ? { ...room, ...data } : room
          ),
          isDraft: true,
        })),
      removeRoom: (tempId) =>
        set((state) => ({
          rooms: state.rooms.filter((room) => room.tempId !== tempId),
          isDraft: true,
        })),

      // 3.1 Manage Room Images
      addRoomImage: (tempId, image) =>
        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.tempId === tempId
              ? { ...room, images: [...room.images, image].flat() }
              : room
          ),
          isDraft: true,
        })),

      removeRoomImage: (tempId, imageId) =>
        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.tempId === tempId
              ? {
                  ...room,
                  images: room.images.filter((img) => img.id !== imageId),
                }
              : room
          ),
          isDraft: true,
        })),

      // 4. Manage Peak Rates
      addPeakRate: (rate) =>
        set((state) => ({
          peakSeasonRates: [...state.peakSeasonRates, rate],
          isDraft: true,
        })),
      updatePeakRate: (tempId, data) =>
        set((state) => ({
          peakSeasonRates: state.peakSeasonRates.map((rate) =>
            rate.targetTempRoomId === tempId ? { ...rate, ...data } : rate
          ),
          isDraft: true,
        })),
      removePeakRate: (tempId) =>
        set((state) => ({
          peakSeasonRates: state.peakSeasonRates.filter(
            (rate) => rate.targetTempRoomId !== tempId
          ),
          isDraft: true,
        })),

      // 5. Manage Unavailabilities
      addUnavailability: (data) =>
        set((state) => ({
          unavailabilities: [...state.unavailabilities, data],
          isDraft: true,
        })),
      updateUnavailability: (tempId, data) =>
        set((state) => ({
          unavailabilities: state.unavailabilities.map((unavailability) =>
            unavailability.targetTempRoomId === tempId
              ? { ...unavailability, ...data }
              : unavailability
          ),
          isDraft: true,
        })),
      removeUnavailability: (tempId) =>
        set((state) => ({
          unavailabilities: state.unavailabilities.filter(
            (unavailability) => unavailability.targetTempRoomId !== tempId
          ),
          isDraft: true,
        })),

      resetStore: () => set(initialState),
    }),
    {
      name: "property-creation-draft",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        property: state.property,
        propertyImages: state.propertyImages,
        rooms: state.rooms,
        peakSeasonRates: state.peakSeasonRates,
        unavailabilities: state.unavailabilities,
      }),
    }
  )
);
