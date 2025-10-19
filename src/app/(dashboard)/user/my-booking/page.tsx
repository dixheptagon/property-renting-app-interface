import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  FileText,
  BedDouble,
  CreditCard,
} from "lucide-react";

export default function MyBooking() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <span className="text-sm font-semibold sm:text-base">
              My Booking
            </span>
          </div>
        </header>

        <div className="min-h-screen bg-white px-4 py-6">
          {/* Active E-tickets Section */}
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 sm:text-2xl">
                Active E-tickets
              </span>
            </div>

            {/* Enhanced Booking Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:border-blue-400 hover:shadow-xl">
              {/* Decorative gradient overlay */}
              <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-3xl"></div>

              <div className="relative flex flex-col gap-4 p-4 sm:flex-row sm:p-6">
                {/* Image Section */}
                <div className="relative sm:w-80">
                  <Image
                    src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=765"
                    alt="staysia-logo"
                    width={100}
                    height={100}
                    className="h-48 w-full rounded-xl object-cover transition-transform duration-300 sm:h-56"
                  />
                  {/* Overlay badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-blue-600 shadow-lg backdrop-blur-sm">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Confirmed
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-1 flex-col justify-between gap-4">
                  {/* Header */}
                  <div className="space-y-3">
                    {/* Booking ID & Status */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-500 sm:text-sm">
                          Booking ID
                        </p>
                        <p className="text-base font-bold text-gray-900 sm:text-lg">
                          [ORDER-1XXXX]
                        </p>
                      </div>
                      <div className="rounded-xl bg-green-500 px-4 py-2 shadow-md">
                        <span className="text-xs font-bold text-white sm:text-sm">
                          Active
                        </span>
                      </div>
                    </div>

                    {/* Property Details */}
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                            [Property_Name]
                          </h3>
                          <div className="flex items-center gap-2 text-gray-600">
                            <BedDouble className="h-4 w-4" />
                            <span className="text-sm font-medium sm:text-base">
                              [Room_Types]
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stay Duration */}
                    <div className="flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">
                        3 nights stay
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    {/* Price */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                        <span className="text-xs font-medium text-gray-500">
                          Total Payment
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        Rp1.500.000
                      </p>
                      <sub className="mt-2 text-gray-500 md:mt-0 md:self-end">
                        for 3 nights
                      </sub>
                    </div>

                    {/* Action Button */}
                    <Button className="group/btn w-full px-6 py-6 transition-all hover:bg-blue-700 hover:shadow-lg sm:w-auto">
                      <Link
                        href="/confirmed"
                        className="flex items-center gap-2"
                      >
                        See Details
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order List Section */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold text-gray-900 sm:text-2xl">
                Order History
              </span>
            </div>

            {/* Enhanced Order List Card */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:border-purple-400 hover:shadow-xl">
              <div className="absolute top-0 right-0 h-24 w-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-2xl"></div>

              <div className="relative flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 shadow-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-900 sm:text-lg">
                      View Complete History
                    </p>
                    <p className="text-sm text-gray-500">
                      Check all your past and upcoming bookings
                    </p>
                  </div>
                </div>
                <Link
                  href="/user/order-list"
                  className="group/link flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white shadow-md transition-all hover:bg-purple-700 hover:shadow-lg"
                >
                  View All
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-90">Active</p>
                  <p className="text-3xl font-bold">1</p>
                </div>
                <CheckCircle className="h-8 w-8 opacity-80" />
              </div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-90">Completed</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <Calendar className="h-8 w-8 opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
