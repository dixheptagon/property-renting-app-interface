import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import { Order } from "../_types/order.status";
import statusOptions from "../_const/status.option";
import { parseOrderIdShort } from "../_utils/parse.order.id.short";
import { formatPrice } from "../_utils/format.price";
import { formatDate } from "../_utils/format.date";

interface OrderListTableBodyProps {
  orders: Order[];
}

export default function OrderListTableBody({
  orders,
}: OrderListTableBodyProps) {
  return (
    <div className="space-y-3">
      {orders.map((order, index) => (
        <div
          key={index}
          className={`group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-md`}
        >
          {/* Desktop Layout */}
          <div
            className={`relative items-center gap-4 p-5 lg:grid lg:grid-cols-7 ${order.status === "processing" ? "bg-amber-100" : "bg-white"}`}
          >
            {/* Order ID */}
            <div className="text-sm font-bold text-blue-600">
              {parseOrderIdShort(order.orderId)}
            </div>

            {/* Property & Room */}
            <div className="flex flex-col">
              <span className="truncate text-sm font-semibold text-gray-900">
                {order.property.name}
              </span>
              <span className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="h-3 w-3" />
                {order.room.name}
              </span>
            </div>

            {/* Status */}
            <div>
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

            {/* Customer */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-blue-800 text-xs font-semibold text-white shadow-md">
                {order.user.name.charAt(0)}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {order.user.name}
              </span>
            </div>

            {/* Total Price */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{formatPrice(order.total_price)}</span>
            </div>

            {/* Check In/Check Out */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>
                {formatDate(new Date(order.check_in_date))}/{" "}
                {formatDate(new Date(order.check_out_date))}
              </span>
            </div>

            {/* Action */}
            <div className="flex justify-center">
              <Link href={`/user/tenant/handle-order/${order.orderId}`}>
                <Button className="group/btn relative overflow-hidden rounded-lg bg-linear-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg">
                  <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-12" />
                  Handle Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
