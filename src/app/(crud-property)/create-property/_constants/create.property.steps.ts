interface Step {
  id: number;
  path: string;
  label: string;
}

export const PROPERTY_CREATION_STEPS: Step[] = [
  { id: 0, path: "", label: "Overview" },
  { id: 1, path: "guidelines", label: "Property Creation Guidelines" },
  { id: 2, path: "select-category", label: "Property Category" },
  { id: 3, path: "title-description", label: "Property Title & Description" },
  { id: 4, path: "location", label: "Property Location" },
  { id: 5, path: "map-spot", label: "Property Map Spot" },
  { id: 6, path: "amenities", label: "Property Amenities" },
  { id: 7, path: "rules", label: "Property Rules" },
  { id: 8, path: "images", label: "Property Images" },
  { id: 9, path: "manage-rooms", label: "Manage Rooms" },
  { id: 10, path: "peak-season-rate", label: "Manage Peak Season Rates" },
  {
    id: 11,
    path: "unavailabilities",
    label: "Manage Property Unavailabilities Dates",
  },
  { id: 12, path: "summary", label: "Property Summary" },
];
