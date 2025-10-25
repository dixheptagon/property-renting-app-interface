import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type {
  PropertyState,
  PropertyActions,
  BaseImage,
  RoomData,
  PeakRateData,
  UnavailabilityData,
} from "../_types/property.type";

const initialState: PropertyState = {
  currentStep: 0,

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
    rules: [],
  },
  propertyImages: [],
  rooms: [],
  peakSeasonRates: [],
  unavailabilities: [],
  submitHandlers: {},
};

export const usePropertyStore = create<PropertyState & PropertyActions>()(
  persist(
    (set, get) => ({
      ...initialState, // Default state
      submitHandlers: {},

      setSubmitHandler: (step, handler) =>
        set((state) => ({
          submitHandlers: { ...state.submitHandlers, [step]: handler },
        })),

      // --- ACTIONS ---

      goToStep: (step) => set({ currentStep: step }),
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),

      // 1. Set Property Data
      setPropertyData: (data) =>
        set((state) => ({
          property: { ...state.property, ...data },
          isDraft: true,
        })),

      // 2. Manage Images
      addPropertyImage: (image) =>
        set((state) => ({
          propertyImages: [...state.propertyImages, image],
          isDraft: true,
        })),
      removePropertyImage: (imageId) =>
        set((state) => ({
          propertyImages: state.propertyImages.filter(
            (img) => img.id !== imageId
          ),
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
      addRoomImage: (tempId, image) =>
        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.tempId === tempId
              ? { ...room, images: [...room.images, image] }
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
        currentStep: state.currentStep,
        property: state.property,
        propertyImages: state.propertyImages,
        rooms: state.rooms,
        peakSeasonRates: state.peakSeasonRates,
        unavailabilities: state.unavailabilities,
      }),
    }
  )
);
