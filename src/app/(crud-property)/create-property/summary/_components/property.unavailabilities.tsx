"use client";

import React from "react";
import {
  Calendar,
  Wrench,
  DoorOpen,
  AlertCircle,
  Clock,
  XCircle,
  Ban,
  Users,
  Zap,
} from "lucide-react";
import { formatDate } from "../../_utils/format.date";
import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";

export default function PropertyUnavailabilities() {
  const { unavailabilities, rooms } = usePropertyStore();

  const getReasonIcon = (reason: string) => {
    switch (reason.toLowerCase()) {
      case "renovation":
        return <Wrench className="h-5 w-5 text-orange-600" />;
      case "maintenance":
        return <AlertCircle className="h-5 w-5 text-blue-600" />;
      case "booking":
        return <Users className="h-5 w-5 text-green-600" />;
      case "emergency":
        return <Zap className="h-5 w-5 text-red-600" />;
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

  return (
    <div id="unavailabilities">
      <div className="rounded-xl border-2 bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-red-400 to-red-600">
            <Ban className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Room Unavailabilities
            </h2>
            <p className="text-sm text-gray-600">
              Periods when rooms are not available for booking
            </p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mb-8 grid gap-4">
          <div className="rounded-xl bg-gradient-to-r from-red-50 to-pink-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                <DoorOpen className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-red-600">Unavailable Periods</p>
                <p className="text-xl font-bold text-red-800">
                  {unavailabilities.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-r from-gray-50 to-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                <Calendar className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Nights Blocked</p>
                <p className="text-xl font-bold text-gray-800">
                  {unavailabilities.reduce(
                    (acc, item) =>
                      acc + calculateNights(item.start_date, item.end_date),
                    0
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600">Affected Rooms</p>
                <p className="text-xl font-bold text-blue-800">
                  {
                    Array.from(
                      new Set(
                        unavailabilities.map((item) => item.targetTempRoomId)
                      )
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
