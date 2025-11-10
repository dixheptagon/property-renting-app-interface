import { StatusOption } from "../_types/order.status";

const statusOptions: StatusOption[] = [
  {
    value: "pending_payment",
    label: "Pending",
    style: { badgeColor: "rgb(251, 191, 36)" }, // Amber-500
    bg: "bg-amber-300",
  },
  {
    value: "processing",
    label: "Processing",
    style: { badgeColor: "rgb(59, 130, 246)" }, // Blue-500
    bg: "bg-blue-300",
  },
  {
    value: "confirmed",
    label: "Confirmed",
    style: { badgeColor: "rgb(147, 51, 234)" }, // Purple-500
    bg: "bg-purple-300",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    style: { badgeColor: "rgb(239, 68, 68)" }, // Red-500
    bg: "bg-red-300",
  },
  {
    value: "completed",
    label: "Completed",
    style: { badgeColor: "rgb(34, 197, 94)" }, // Green-500
    bg: "bg-green-300",
  },
];

export default statusOptions;
