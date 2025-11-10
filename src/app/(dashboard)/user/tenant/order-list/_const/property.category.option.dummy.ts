import { Bed, Building, Building2, House, TentTree } from "lucide-react";

export interface PropertyCategoryOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const PropertyCategoryOptions: PropertyCategoryOption[] = [
  {
    value: "apartment",
    label: "Apartment",
    icon: Building,
  },
  {
    value: "house",
    label: "House",
    icon: House,
  },
  {
    value: "hotel",
    label: "Hotel",
    icon: Building2,
  },
  {
    value: "room",
    label: "Private Room",
    icon: Bed,
  },
  {
    value: "villa",
    label: "Villa",
    icon: TentTree,
  },
];

export default PropertyCategoryOptions;
