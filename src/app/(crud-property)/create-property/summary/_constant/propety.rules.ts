import {
  Ban,
  Cigarette,
  Baby,
  PawPrint,
  Users,
  Music,
  Clock,
  Wine,
  Camera,
  CreditCard,
  Key,
  Thermometer,
  WifiOff,
  Trash2,
} from "lucide-react";

export const propertyRules = [
  {
    category: "General Conduct",
    items: [
      {
        icon: Ban,
        label: "No Illegal Activities",
        value: "no_illegal_activities",
      },
      {
        icon: Music,
        label: "No Loud Noise After 10 PM",
        value: "no_loud_noise",
      },
      {
        icon: Users,
        label: "Visitors Must Register",
        value: "visitors_must_register",
      },
    ],
  },
  {
    category: "Smoking & Alcohol",
    items: [
      { icon: Cigarette, label: "No Smoking Indoors", value: "no_smoking" },
      {
        icon: Wine,
        label: "Alcohol Allowed in Designated Areas",
        value: "alcohol_restricted",
      },
    ],
  },
  {
    category: "Pets & Children",
    items: [
      {
        icon: PawPrint,
        label: "Pets Allowed Upon Request",
        value: "pets_allowed",
      },
      {
        icon: Baby,
        label: "Children Must Be Supervised",
        value: "children_supervised",
      },
    ],
  },
  {
    category: "Safety & Security",
    items: [
      { icon: Camera, label: "CCTV in Public Areas", value: "cctv_enabled" },
      { icon: Key, label: "Lock the Door When Leaving", value: "lock_door" },
      { icon: Thermometer, label: "No Open Flames", value: "no_open_flame" },
    ],
  },
  {
    category: "Facilities Usage",
    items: [
      {
        icon: WifiOff,
        label: "Do Not Share Wi-Fi Password",
        value: "wifi_restriction",
      },
      {
        icon: Trash2,
        label: "Dispose of Trash Properly",
        value: "proper_trash_disposal",
      },
      {
        icon: CreditCard,
        label: "Damages May Be Charged",
        value: "damage_policy",
      },
      {
        icon: Clock,
        label: "Check-in 14:00 / Check-out 12:00",
        value: "checkin_checkout_policy",
      },
    ],
  },
];
