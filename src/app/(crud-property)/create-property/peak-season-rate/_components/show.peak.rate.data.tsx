"use client";

import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";
import { Calendar, TrendingUp, DollarSign, Percent, Flame } from "lucide-react";
import { formatPrice } from "../../_utils/format.price";
import { calculatePeakPrice } from "../../_utils/calculate.peak.price";
import RemovePeakPrice from "./remove.peak.price";
import getRoomName from "../_utils/get.room.name";
import getRoomBasePrice from "../_utils/get.room.base.price";
import formatDateRange from "../_utils/format.date.range";

export default function ShowPeakRateData() {
  const { peakSeasonRates, rooms } = usePropertyStore();

  const uniqueTargetIds = Array.from(
    new Set(peakSeasonRates.map((item) => item.targetTempRoomId))
  );

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-blue-100 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-600">
                Total Rooms with Special Rates
              </p>
              <p className="text-xl font-bold text-blue-800">
                {uniqueTargetIds.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-r from-purple-50 to-violet-50 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <Flame className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-purple-600">Total Special Rates</p>
              <p className="text-xl font-bold text-purple-800">
                {peakSeasonRates.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Peak Season Rates Data */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {peakSeasonRates.map((rate) => {
          const roomName = getRoomName(rate.targetTempRoomId, rooms);
          const basePrice = getRoomBasePrice(rate.targetTempRoomId, rooms);
          const peakPrice = calculatePeakPrice(
            Number(basePrice),
            Number(rate.adjustment_value)
          );

          return (
            <div
              key={rate.tempId}
              className="group relative overflow-hidden rounded-2xl bg-blue-100 p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-100">
                <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-blue-400"></div>
                <div className="absolute bottom-4 left-4 h-2 w-2 rounded-full bg-blue-400"></div>
              </div>

              <div className="relative">
                {/* Date Range Header */}
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-semibold text-blue-800">
                      Peak Period
                    </h3>
                    <p className="text-md font-bold text-blue-800">
                      {formatDateRange(rate.start_date, rate.end_date)}
                    </p>
                  </div>
                </div>

                {/* Room Details */}
                <div className="rounded-xl border border-white/50 bg-white/70 p-4 backdrop-blur-sm">
                  {/* Room Name */}
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-800">
                      {roomName}
                    </h4>
                    <div className="flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1">
                      <Percent className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-bold text-orange-700">
                        +{rate.adjustment_value}%
                      </span>
                    </div>
                  </div>

                  {/* Price Comparison */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Regular Price
                      </span>
                      <span className="font-medium text-gray-800">
                        {formatPrice(Number(basePrice))}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-orange-700">
                        Peak Price
                      </span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-lg font-bold text-green-700">
                          {formatPrice(peakPrice)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Price Increase Indicator */}
                  <div className="mt-3 flex items-center gap-1 rounded-lg bg-green-50 p-2 text-sm text-green-700">
                    <DollarSign className="h-4 w-4" />
                    <span className="font-medium">
                      +{formatPrice(peakPrice - Number(basePrice))} increase
                    </span>
                  </div>
                </div>
              </div>

              {/* Remove Button */}
              <div className="mt-4 flex justify-end">
                <RemovePeakPrice tempId={rate.tempId} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
