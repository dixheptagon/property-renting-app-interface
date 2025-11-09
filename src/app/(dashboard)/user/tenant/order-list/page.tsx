import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  ArrowDownNarrowWide,
  CheckCheck,
  CheckCircle,
  Clock,
  ExternalLink,
  MapPin,
  Package,
  ShoppingCart,
  SlidersHorizontal,
  User,
  XCircle,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DateRangePicker } from "@/app/(dashboard)/user/_components/ui/date.range.picker";
import OrdersCard from "./_components/orders.card";
import { orderStats } from "./constant/order.stats";
import Link from "next/link";
import { AppSidebar } from "../../_components/app-sidebar";

export default function OrderList() {
  const orders = [
    {
      id: "#10001",
      propertyName: "Sunset Beach Villa",
      roomType: "Deluxe Ocean View",
      status: "Confirmed",
      customer: "John Doe",
      expiredAt: "2025-10-25 14:30",
      statusColor: "bg-green-500",
    },
    {
      id: "#10002",
      propertyName: "Mountain Paradise Resort",
      roomType: "Family Suite",
      status: "Pending",
      customer: "Jane Smith",
      expiredAt: "2025-10-20 10:00",
      statusColor: "bg-yellow-500",
    },
    {
      id: "#10003",
      propertyName: "Urban Loft Apartment",
      roomType: "Studio Premium",
      status: "Processing",
      customer: "Mike Johnson",
      expiredAt: "2025-10-22 16:45",
      statusColor: "bg-blue-500",
    },
  ];
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div className="flex w-full items-center justify-between">
              <span className="text-sm font-semibold sm:text-base">
                Order List
              </span>
              <DateRangePicker />
            </div>
          </div>
        </header>

        <div className="min-h-screen bg-white px-4 py-4">
          <section className="flex w-full justify-between gap-4">
            <div className="flex gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="group/btn w-full transition-all hover:bg-blue-700 hover:shadow-lg sm:w-auto">
                    <SlidersHorizontal />
                    Filters
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                      Anyone who has this link will be able to view this.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                      <Label htmlFor="link" className="sr-only">
                        Link
                      </Label>
                      <Input
                        id="link"
                        defaultValue="https://ui.shadcn.com/docs/installation"
                        readOnly
                      />
                    </div>
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button className="bg-white text-blue-600 hover:bg-gray-200 hover:text-blue-700">
                Clear All
              </Button>
            </div>
            <Button className="group/btn transition-all hover:bg-blue-700 hover:shadow-lg sm:w-auto">
              <ArrowDownNarrowWide />
              Sort By
            </Button>
          </section>

          <section className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {orderStats.map((stat, index) => (
              <OrdersCard
                key={index}
                label={stat.label}
                value={stat.value}
                className={stat.className}
                icon={stat.icon}
              />
            ))}
          </section>

          <section className="mt-6 space-y-4">
            {/* Table Header - Hidden on mobile, shown on tablet+ */}
            <div className="hidden items-center gap-4 rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-5 text-sm font-semibold text-gray-700 shadow-sm lg:grid lg:grid-cols-6">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                ORDER ID
              </span>
              <span>PROPERTY & ROOM</span>
              <span>STATUS</span>
              <span>CUSTOMER</span>
              <span>EXPIRES</span>
              <span className="text-center">ACTION</span>
            </div>

            {/* Table Body */}
            <div className="space-y-3">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-md"
                >
                  {/* Desktop Layout */}
                  <div className="relative hidden items-center gap-4 p-5 lg:grid lg:grid-cols-6">
                    {/* Order ID */}
                    <div className="text-sm font-bold text-blue-600">
                      {order.id}
                    </div>

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
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-blue-400 to-purple-500 text-xs font-semibold text-white shadow-md">
                        {order.customer.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {order.customer}
                      </span>
                    </div>

                    {/* Expired At */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span>{order.expiredAt}</span>
                    </div>

                    {/* Action */}
                    <div className="flex justify-center">
                      <Link href={`/user/tenant/handle-order`}>
                        {/* /tenant/handle-order/${order.id} */}
                        <Button className="group/btn relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg">
                          <ExternalLink className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-12" />
                          Handle Order
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="relative space-y-3 p-4 lg:hidden">
                    {/* Header with ID and Status */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-blue-600">
                        {order.id}
                      </span>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold text-white ${order.statusColor} shadow-sm`}
                      >
                        <span className="mr-2 h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                        {order.status}
                      </span>
                    </div>

                    {/* Property Info */}
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {order.propertyName}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin className="h-3 w-3" />
                        {order.roomType}
                      </p>
                    </div>

                    {/* Customer and Time */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{order.customer}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <Clock className="h-3 w-3 text-orange-500" />
                        <span>{order.expiredAt.split(" ")[0]}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link href={`/tenant/handle-order`}>
                      {/* /tenant/handle-order/${order.id} */}
                      <Button className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Handle Order
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
