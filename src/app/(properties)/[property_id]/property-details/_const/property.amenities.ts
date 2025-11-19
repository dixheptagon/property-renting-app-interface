import {
  Car,
  Wifi,
  Waves,
  Dumbbell,
  Trees,
  Coffee,
  Utensils,
  Wind,
  Flame,
  Shield,
  Lock,
  Users,
  Briefcase,
  WashingMachine,
  PawPrint,
  DoorOpen,
  Tv,
  Snowflake,
  BedDouble,
  Accessibility,
} from "lucide-react";

export const propertyAmenities = [
  {
    category: "Connectivity",
    items: [{ icon: Wifi, label: "Free Wi-Fi", value: "wifi" }],
  },
  {
    category: "Parking & Transportation",
    items: [
      { icon: Car, label: "Free Parking Area", value: "free_parking" },
      {
        icon: Accessibility,
        label: "Wheelchair Accessible",
        value: "wheelchair_accessible",
      },
    ],
  },
  {
    category: "Leisure & Relaxation",
    items: [
      { icon: Waves, label: "Swimming Pool", value: "swimming_pool" },
      { icon: Dumbbell, label: "Fitness Center", value: "fitness_center" },
      { icon: Trees, label: "Garden or Outdoor Area", value: "garden" },
    ],
  },
  {
    category: "Food & Dining",
    items: [
      { icon: Coffee, label: "Café or Lounge", value: "cafe_or_lounge" },
      { icon: Utensils, label: "Restaurant", value: "restaurant" },
      { icon: BedDouble, label: "Shared Kitchen", value: "shared_kitchen" },
    ],
  },
  {
    category: "Services",
    items: [
      { icon: Users, label: "24-hour Reception", value: "reception_24h" },
      {
        icon: WashingMachine,
        label: "Laundry Service",
        value: "laundry_service",
      },
      {
        icon: Briefcase,
        label: "Meeting Room / Business Center",
        value: "business_center",
      },
    ],
  },
  {
    category: "Safety",
    items: [
      { icon: Shield, label: "Smoke Detector", value: "smoke_detector" },
      { icon: Flame, label: "Fire Extinguisher", value: "fire_extinguisher" },
      { icon: Lock, label: "Security System", value: "security_system" },
    ],
  },
  {
    category: "Pet & Family Friendly",
    items: [
      { icon: PawPrint, label: "Pet Friendly", value: "pet_friendly" },
      {
        icon: DoorOpen,
        label: "Family Room / Lounge Area",
        value: "family_room",
      },
    ],
  },
  {
    category: "Comfort",
    items: [
      {
        icon: Wind,
        label: "Air Conditioning (Common Areas)",
        value: "ac_common_area",
      },
      { icon: Snowflake, label: "Heating System", value: "heating_system" },
      { icon: Tv, label: "Shared Entertainment Area", value: "shared_tv_area" },
    ],
  },
];
