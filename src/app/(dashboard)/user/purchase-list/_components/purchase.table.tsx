import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExternalLink } from "lucide-react";
import { Purchase, PurchaseStatus } from "../_types/purchase.status";
import statusOptions from "../_const/status.option";

interface PurchaseTableProps {
  purchases: Purchase[];
}

export default function PurchaseTable({ purchases }: PurchaseTableProps) {
  const getStatusStyle = (status: PurchaseStatus): string => {
    const statusObj = statusOptions.find((s) => s.value === status);
    return statusObj ? statusObj.color : "bg-gray-100 text-gray-800";
  };

  const getStatusLabel = (status: PurchaseStatus): string => {
    const statusObj = statusOptions.find((s) => s.value === status);
    return statusObj ? statusObj.label : status;
  };

  return (
    <section className="hidden lg:block">
      <div className="mb-4 flex justify-between rounded-t-lg bg-linear-to-br from-blue-600 to-blue-800 p-4 font-semibold text-white shadow-md">
        <span className="w-24">ID</span>
        <span className="flex-1">Property Name - Room Type</span>
        <span className="w-52">Check In / Check Out</span>
        <span className="w-38">Price</span>
        <span className="w-32 text-center">Status</span>
        <span className="w-24 text-center">Action</span>
      </div>

      <div className="space-y-3">
        {purchases.map((purchase, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
          >
            <span className="w-24 font-semibold text-gray-700">
              {purchase.id}
            </span>
            <span className="flex-1 font-medium text-gray-800">
              {purchase.property}
            </span>
            <span className="w-52 text-sm text-gray-600">
              {purchase.checkIn} - {purchase.checkOut}
            </span>
            <span className="w-38 font-semibold text-gray-800">
              {purchase.price}
            </span>
            <div className="w-32 text-center">
              <span
                className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(purchase.status)}`}
              >
                {getStatusLabel(purchase.status)}
              </span>
            </div>
            <div className="w-24 text-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Go to Purchase Details</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
