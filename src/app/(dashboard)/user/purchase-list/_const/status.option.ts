import { StatusOption } from "../_types/purchase.status";

const statusOptions: StatusOption[] = [
  {
    value: "pending_payment",
    label: "Pending Payment",
    color: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
  {
    value: "processing",
    label: "Processing",
    color: "bg-blue-100 text-blue-800 border-blue-300",
  },
  {
    value: "confirmed",
    label: "Confirmed",
    color: "bg-green-100 text-green-800 border-green-300",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    color: "bg-red-100 text-red-800 border-red-300",
  },
  {
    value: "completed",
    label: "Completed",
    color: "bg-purple-100 text-purple-800 border-purple-300",
  },
];

export default statusOptions;
