interface Step {
  id: number;
  path: string;
  label: string;
}

export const MANAGE_ROOM_STEPS: Step[] = [
  { id: 0, path: "", label: "Manage Rooms" },
  {
    id: 1,
    path: "title-description",
    label: "Manage Rooms - Room Title & Description",
  },
  { id: 2, path: "total-units", label: "Manage Rooms - Room Total Units" },
  { id: 3, path: "capacity", label: "Manage Rooms - Room Capacity" },
  { id: 4, path: "highlight", label: "Manage Rooms - Room Highlights" },
  { id: 5, path: "images", label: "Manage Rooms - Room Images" },
  { id: 6, path: "set-price", label: "Manage Rooms - Set Room Price" },
];
