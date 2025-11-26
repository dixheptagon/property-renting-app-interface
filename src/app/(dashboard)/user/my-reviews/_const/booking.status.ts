import {
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  CheckSquare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface BookingStatusConfig {
  label: string;
  icon: LucideIcon;
  bgColor: string;
}

export const BOOKING_STATUS_CONFIG: Record<string, BookingStatusConfig> = {
  pending_payment: {
    label: "Pending Payment",
    icon: Clock,
    bgColor: "bg-yellow-500",
  },
  processing: {
    label: "Processing",
    icon: Clock,
    bgColor: "bg-blue-500",
  },
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle,
    bgColor: "bg-green-500",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    bgColor: "bg-red-500",
  },
  completed: {
    label: "Completed",
    icon: CheckSquare,
    bgColor: "bg-purple-500",
  },
};

export const getBookingStatusConfig = (status: string): BookingStatusConfig => {
  return BOOKING_STATUS_CONFIG[status] || BOOKING_STATUS_CONFIG.pending_payment;
};
