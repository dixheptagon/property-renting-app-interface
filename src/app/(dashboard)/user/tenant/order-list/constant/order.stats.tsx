import {
  CheckCheck,
  CheckCircle,
  Clock,
  Package,
  ShoppingCart,
  XCircle,
} from "lucide-react";

export const orderStats = [
  {
    label: "Total Orders",
    value: 120,
    className: "bg-gradient-to-br from-gray-100 to-gray-200",
    icon: <ShoppingCart className="h-5 w-5 text-gray-700" />,
  },
  {
    label: "Confirmed Orders",
    value: 8,
    className: "bg-gradient-to-br from-green-300 to-green-400",
    icon: <CheckCircle className="h-5 w-5 text-green-700" />,
  },
  {
    label: "Pending Orders",
    value: 4,
    className: "bg-gradient-to-br from-yellow-300 to-yellow-400",
    icon: <Clock className="h-5 w-5 text-yellow-700" />,
  },
  {
    label: "Processing Orders",
    value: 4,
    className: "bg-gradient-to-br from-amber-400 to-amber-500",
    icon: <Package className="h-5 w-5 text-amber-800" />,
  },
  {
    label: "Cancelled Orders",
    value: 4,
    className: "bg-gradient-to-br from-red-300 to-red-400",
    icon: <XCircle className="h-5 w-5 text-red-700" />,
  },
  {
    label: "Completed Orders",
    value: 100,
    className: "bg-gradient-to-br from-blue-300 to-blue-400",
    icon: <CheckCheck className="h-5 w-5 text-blue-700" />,
  },
];
