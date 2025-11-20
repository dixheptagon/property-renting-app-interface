"use client";

import React from "react";
import { Calendar, Ban, Users, DoorOpen } from "lucide-react";

import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";
import ButtonEditSection from "./button.edit.section";
import { CREATE_PROPERTY_STEPS } from "../_constant/create.property.path";

export default function PropertyUnavailabilities() {
  const { unavailabilities, rooms } = usePropertyStore();

  const calculateNights = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  // Get path for editing
  const unavailabilitiesPath =
    CREATE_PROPERTY_STEPS.find((step) => step.label === "Unavailabilities")
      ?.value || "/create-property/unavailabilities";

  return (
    <div id="unavailabilities">
      <div className="relative rounded-xl border-2 bg-white p-6 shadow-md">
        {/* Button Edit Section */}
        <div className="absolute -top-3 -right-3">
          <ButtonEditSection
            path={unavailabilitiesPath}
            label="Property Unavailabilities"
          />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-red-400 to-red-600">
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
