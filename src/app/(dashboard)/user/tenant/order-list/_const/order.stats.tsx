import {
  CheckCheck,
  CheckCircle,
  Clock,
  Package,
  ShoppingCart,
  XCircle,
} from "lucide-react";

interface OrderStatsProps {
  statistics?: {
    total_order?: number;
    total_completed?: number;
    total_cancelled?: number;
    total_pending?: number;
    total_processing?: number;
    total_confirmed?: number;
  };
}

export const getOrderStats = ({ statistics }: OrderStatsProps) => [
  {
    label: "Total Orders",
    value: statistics?.total_order ?? 0,
    className: "bg-linear-to-br from-gray-100 to-gray-200",
    icon: <ShoppingCart className="h-5 w-5 text-gray-700" />,
  },
  {
    label: "Confirmed Orders",
    value: statistics?.total_confirmed ?? 0,
    className: "bg-linear-to-br from-green-300 to-green-400",
    icon: <CheckCircle className="h-5 w-5 text-green-700" />,
  },
  {
    label: "Pending Orders",
    value: statistics?.total_pending ?? 0,
    className: "bg-linear-to-br from-yellow-300 to-yellow-400",
    icon: <Clock className="h-5 w-5 text-yellow-700" />,
  },
  {
    label: "Processing Orders",
    value: statistics?.total_processing ?? 0,
    className: "bg-linear-to-br from-amber-400 to-amber-500",
    icon: <Package className="h-5 w-5 text-amber-800" />,
  },
  {
    label: "Cancelled Orders",
    value: statistics?.total_cancelled ?? 0,
    className: "bg-linear-to-br from-red-300 to-red-400",
    icon: <XCircle className="h-5 w-5 text-red-700" />,
  },
  {
    label: "Completed Orders",
    value: statistics?.total_completed ?? 0,
    className: "bg-linear-to-br from-blue-300 to-blue-400",
    icon: <CheckCheck className="h-5 w-5 text-blue-700" />,
  },
];
