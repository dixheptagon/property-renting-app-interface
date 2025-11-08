import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Purchase, PurchaseStatus } from "../_types/purchase.status";
import statusOptions from "../_const/status.option";

interface PurchaseCardProps {
  purchase: Purchase;
}

export default function PurchaseCard({ purchase }: PurchaseCardProps) {
  const getStatusStyle = (status: PurchaseStatus): string => {
    const statusObj = statusOptions.find((s) => s.value === status);
    return statusObj ? statusObj.color : "bg-gray-100 text-gray-800";
  };

  const getStatusLabel = (status: PurchaseStatus): string => {
    const statusObj = statusOptions.find((s) => s.value === status);
    return statusObj ? statusObj.label : status;
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">{purchase.id}</p>
          <h3 className="mt-1 font-bold text-gray-800">{purchase.property}</h3>
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(purchase.status)}`}
        >
          {getStatusLabel(purchase.status)}
        </span>
      </div>

      <div className="space-y-2 border-t pt-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Check In:</span>
          <span className="font-medium text-gray-800">{purchase.checkIn}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Check Out:</span>
          <span className="font-medium text-gray-800">{purchase.checkOut}</span>
        </div>
        <div className="flex justify-between border-t pt-2">
          <span className="font-semibold text-gray-700">Total Price:</span>
          <span className="font-bold text-blue-600">{purchase.price}</span>
        </div>
      </div>

      <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
        <ExternalLink className="mr-2 h-4 w-4" />
        View Details
      </Button>
    </div>
  );
}
