import { Bed, Building, Building2, House, TentTree } from "lucide-react";

export const getCategoryIcon = (category: string) => {
  const iconClass = "h-4 w-4";
  switch (category.toLowerCase()) {
    case "house":
      return <House className={iconClass} />;
    case "apartment":
      return <Building className={iconClass} />;
    case "hotel":
      return <Building2 className={iconClass} />;
    case "room":
      return <Bed className={iconClass} />;
    case "villa":
      return <TentTree className={iconClass} />;
    default:
      return <House className={iconClass} />;
  }
};
