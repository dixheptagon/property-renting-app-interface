import {
  BedDouble,
  Bath,
  DoorClosed,
  Tv,
  Wind,
  Snowflake,
  Wifi,
  Coffee,
  Utensils,
  Waves,
  Shield,
  Sparkles,
  Bell,
  DoorOpen,
  Plug,
  Droplets,
  Refrigerator,
  LampDesk,
  Sofa,
  Briefcase,
  CookingPot,
} from "lucide-react";

export const roomHighlights = [
  {
    category: "Room Comfort",
    items: [
      { icon: BedDouble, label: "Queen/King Bed", value: "large_bed" },
      { icon: Bath, label: "Private Bathroom", value: "private_bathroom" },
      { icon: Snowflake, label: "Room Heating", value: "room_heating" },
    ],
  },
  {
    category: "Entertainment & Connectivity",
    items: [
      { icon: Wifi, label: "Free Wi-Fi", value: "wifi" },
      { icon: Plug, label: "Power Outlets Near Bed", value: "power_outlets" },
    ],
  },
  {
    category: "Food & Refreshment",
    items: [
      { icon: Coffee, label: "Coffee / Tea Maker", value: "coffee_tea_maker" },
      { icon: Refrigerator, label: "Mini Refrigerator", value: "mini_fridge" },
      { icon: Utensils, label: "In-room Dining Area", value: "inroom_dining" },
      { icon: CookingPot, label: "Kitchen", value: "kitchen" },
    ],
  },
  {
    category: "View & Atmosphere",
    items: [
      { icon: Waves, label: "Balcony / Sea View", value: "balcony_or_view" },
      {
        icon: DoorOpen,
        label: "Window with Natural Light",
        value: "window_light",
      },
      { icon: Sparkles, label: "Soundproof Walls", value: "soundproof" },
    ],
  },
  {
    category: "Work & Productivity",
    items: [
      { icon: LampDesk, label: "Work Desk", value: "work_desk" },
      { icon: Briefcase, label: "Office Chair", value: "office_chair" },
    ],
  },
  {
    category: "Extras & Safety",
    items: [
      { icon: Sofa, label: "Sofa / Lounge Area", value: "sofa_area" },
      { icon: Droplets, label: "Water Heater", value: "water_heater" },
      { icon: Shield, label: "Safe Box", value: "safe_box" },
      { icon: Bell, label: "Room Service", value: "room_service" },
    ],
  },
];
