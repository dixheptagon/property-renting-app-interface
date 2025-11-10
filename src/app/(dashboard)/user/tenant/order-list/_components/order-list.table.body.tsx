import { Button } from "@/components/ui/button";
import { Clock, ExternalLink, MapPin, User } from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  propertyName: string;
  roomType: string;
  status: string;
  customer: string;
  expiredAt: string;
  statusColor: string;
}

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
          className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-md"
        >
          {/* Desktop Layout */}
          <div className="relative items-center gap-4 p-5 lg:grid lg:grid-cols-6">
            {/* Order ID */}
            <div className="text-sm font-bold text-blue-600">{order.id}</div>

            {/* Property & Room */}
            <div className="flex flex-col">
              <span className="truncate text-sm font-semibold text-gray-900">
                {order.propertyName}
              </span>
              <span className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                <MapPin className="h-3 w-3" />
                {order.roomType}
              </span>
            </div>

            {/* Status */}
            <div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-white ${order.statusColor} shadow-sm`}
              >
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-white" />
                {order.status}
              </span>
            </div>

            {/* Customer */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-blue-800 text-xs font-semibold text-white shadow-md">
                {order.customer.charAt(0)}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {order.customer}
              </span>
            </div>

            {/* Expired At */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{order.expiredAt}</span>
            </div>

            {/* Action */}
            <div className="flex justify-center">
              <Link href={`/user/tenant/handle-order`}>
                {/* /tenant/handle-order/${order.id} */}
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
