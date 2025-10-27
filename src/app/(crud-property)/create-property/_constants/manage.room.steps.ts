interface Step {
  id: number;
  path: string;
  label: string;
}

export const MANAGE_ROOM_STEPS: Step[] = [
  { id: 0, path: "", label: "Manage Rooms" },
  { id: 1, path: "title-description", label: "Room Title & Description" },
  { id: 2, path: "total-units", label: "Room Total Units" },
  { id: 3, path: "highlight", label: "Room Highlights" },
  { id: 4, path: "images", label: "Room Images" },
  { id: 5, path: "set-price", label: "Set Room Price" },
];
