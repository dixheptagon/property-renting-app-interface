"use client";

import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";
import {
  Calendar,
  Wrench,
  DoorOpen,
  AlertCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { formatDate } from "../../_utils/format.date";
import RemoveUnavailability from "./remove.unavailabilty";

export default function UnavailabilitiesData() {
  const { unavailabilities, rooms } = usePropertyStore();

  const getReasonIcon = (reason: string) => {
    switch (reason.toLowerCase()) {
      case "renovation":
        return <Wrench className="h-5 w-5 text-orange-600" />;
      case "maintenance":
        return <AlertCircle className="h-5 w-5 text-blue-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getRoomName = (tempId: string) => {
    const room = rooms.find((r) => r.tempId === tempId);
    return room ? room.name : "Unknown Room";
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    return `${formatDate(new Date(startDate))} - ${formatDate(new Date(endDate))}`;
  };

  const calculateNights = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  if (unavailabilities.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4">
        <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            No Unavailabilities Set
          </h3>
          <p className="text-gray-600">
            All rooms are currently available. Set unavailability periods to
            block bookings for specific dates.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4">
      {/* Desktop Table View */}
      <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg md:block">
        <div className="grid grid-cols-4 gap-4 bg-gradient-to-r from-red-600 to-red-700 p-4 text-white">
          <div className="flex items-center justify-center gap-2 font-semibold">
            <DoorOpen className="h-5 w-5" />
            <span>Room</span>
          </div>
          <div className="flex items-center justify-center gap-2 font-semibold">
            <Calendar className="h-5 w-5" />
            <span>Date Range</span>
          </div>
          <div className="flex items-center justify-center gap-2 font-semibold">
            <Wrench className="h-5 w-5" />
            <span>Reason</span>
          </div>
          <div className="flex items-center justify-center gap-2 font-semibold">
            <span>Actions</span>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {unavailabilities.map((item) => (
            <div
              key={item.tempId}
              className="grid grid-cols-4 gap-4 p-4 transition-all duration-200 hover:bg-red-50 hover:shadow-sm"
            >
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                    <DoorOpen className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {getRoomName(item.targetTempRoomId)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {calculateNights(item.start_date, item.end_date)} nights
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center text-gray-700">
                <div className="text-center">
                  <p className="font-medium">
                    {formatDateRange(item.start_date, item.end_date)}
                  </p>
                  <p className="text-xs text-gray-500">
                    ({calculateNights(item.start_date, item.end_date)} nights)
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-700">
                {getReasonIcon(item.reason)}
                <span className="font-medium">{item.reason}</span>
              </div>
              <div className="flex items-center justify-center">
                <RemoveUnavailability tempId={item.tempId} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {unavailabilities.map((item) => (
          <div
            key={item.tempId}
            className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            {/* Status indicator */}
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-red-500 to-red-600"></div>

            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-100 p-2">
                  <DoorOpen className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    {getRoomName(item.targetTempRoomId)}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {calculateNights(item.start_date, item.end_date)} nights
                    unavailable
                  </p>
                </div>
              </div>
              <RemoveUnavailability tempId={item.tempId} />
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                <div>
                  <p className="mb-1 text-xs text-gray-500">
                    Unavailable Period
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatDateRange(item.start_date, item.end_date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {getReasonIcon(item.reason)}
                <div>
                  <p className="mb-1 text-xs text-gray-500">Reason</p>
                  <p className="text-sm font-medium text-gray-900">
                    {item.reason}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full bg-red-100 opacity-50"></div>
          </div>
        ))}
      </div>

      {/* Enhanced Summary Footer */}
      <div className="mt-8 rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-red-100 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-red-800">
              {unavailabilities.length} room
              {unavailabilities.length !== 1 ? "s" : ""} currently unavailable
            </p>
            <p className="text-xs text-red-600">
              These periods are blocked for bookings and will not be available
              for guests
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
