"use client";

import PropertySelect from "./property.select";
import RoomTypeSelect from "./room.type.select";

export function PropertyReportHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
          Property Report
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage your property bookings
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <PropertySelect />
        <RoomTypeSelect />
      </div>
    </div>
  );
}
