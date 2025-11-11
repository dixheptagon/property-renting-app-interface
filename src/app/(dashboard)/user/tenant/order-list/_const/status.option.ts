import { CheckCheck, CheckCircle, Clock, Package, XCircle } from "lucide-react";
import { StatusOption } from "../_types/order.status";

const statusOptions: StatusOption[] = [
  {
    value: "pending_payment",
    label: "Pending",
    icon: Clock,
    style: { badgeColor: "oklch(79.5% 0.184 86.047)" }, // Yellow-500
    bg: "bg-yellow-500",
  },
  {
    value: "processing",
    label: "Processing",
    icon: Package,
    style: { badgeColor: "oklch(66.6% 0.179 58.318)" }, // Amber-500
    bg: "bg-amber-500",
  },
  {
    value: "confirmed",
    label: "Confirmed",
    icon: CheckCircle,
    style: { badgeColor: "oklch(87.1% 0.15 154.449)" }, // Green-500
    bg: "bg-green-500",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: XCircle,
    style: { badgeColor: "oklch(80.8% 0.114 19.571)" }, // Red-500
    bg: "bg-red-500",
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCheck,
    style: { badgeColor: "oklch(80.9% 0.105 251.813)" }, // Blue-500
    bg: "bg-blue-500",
  },
];

export default statusOptions;
