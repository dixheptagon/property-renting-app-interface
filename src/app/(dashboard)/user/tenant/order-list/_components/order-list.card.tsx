import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, MapPin, User } from "lucide-react";
import Link from "next/link";
import { Order } from "../_types/order.status";
import statusOptions from "../_const/status.option";

interface OrderListCardProps {
  order: Order;
}

export default function OrderListCard({ order }: OrderListCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-md">
      {/* Mobile Layout */}
      <div className="relative space-y-3 p-4">
        {/* Header with ID and Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-blue-600">
            {order.orderId}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-sm ${
              statusOptions.find((s) => s.value === order.status)?.bg ||
              "bg-gray-500"
            }`}
          >
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-white" />
            {statusOptions.find((s) => s.value === order.status)?.label ||
              order.status}
          </span>
        </div>

        {/* Property Info */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-900">
            {order.property.name}
          </p>
          <p className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="h-3 w-3" />
            {order.room.name}
          </p>
        </div>

        {/* Customer and Time */}
        <div className="space-y-2 border-t pt-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Check In:</span>
            <span className="font-medium text-gray-800">
              {new Date(order.check_in_date).toLocaleDateString("id-ID")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Check Out:</span>
            <span className="font-medium text-gray-800">
              {new Date(order.check_out_date).toLocaleDateString("id-ID")}
            </span>
          </div>
          <div className="flex items-center justify-between border-t pt-2">
            <span className="text-gray-600">Total:</span>
            <span className="font-bold text-blue-600">
              Rp {order.total_price.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="flex items-center justify-end gap-2">
            {/* Customer  Avatar */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-blue-800 text-xs font-semibold text-white shadow-md">
              {order.user.name.charAt(0)}
            </div>
            <span className="font-bold text-blue-600">{order.user.name}</span>
          </div>
        </div>

        {/* Action Button */}
        <Link href={`/tenant/handle-order`}>
          {/* /tenant/handle-order/${order.id} */}
          <Button className="w-full rounded-lg bg-linear-to-r from-blue-600 to-blue-700 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg">
            <ExternalLink className="mr-2 h-4 w-4" />
            Handle Order
          </Button>
        </Link>
      </div>
    </div>
  );
}
