"use client";

import { TrendingUp, Flame, Sparkles, Target } from "lucide-react";

import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";
import ButtonEditSection from "./button.edit.section";
import { CREATE_PROPERTY_STEPS } from "../_constant/create.property.path";

export default function PropertyPeakRate() {
  const { peakSeasonRates, rooms } = usePropertyStore();

  const uniqueTargetIds = Array.from(
    new Set(peakSeasonRates.map((item) => item.targetTempRoomId))
  );

  // Get path for editing
  const peakRatePath =
    CREATE_PROPERTY_STEPS.find((step) => step.label === "Create Peak Rate")
      ?.value || "/create-property/create-peak-rate";

  return (
    <div id="peak-rates">
      <div className="relative rounded-xl border-2 bg-white p-6 shadow-md">
        {/* Button Edit Section */}
        <div className="absolute -top-3 -right-3">
          <ButtonEditSection path={peakRatePath} label="Peak Season Rates" />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-orange-600">
              <Flame className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Peak Season Rates
              </h2>
              <p className="text-sm text-gray-600">
                Special pricing for high-demand periods
              </p>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4">
          <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600">
                  Rooms with Special Rates
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
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-purple-600">Total Special Rates</p>
                <p className="text-xl font-bold text-purple-800">
                  {peakSeasonRates.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-600">Average Increase</p>
                <p className="text-xl font-bold text-green-800">
                  {Math.round(
                    peakSeasonRates.reduce(
                      (acc, rate) => acc + Number(rate.adjustment_value),
                      0
                    ) / peakSeasonRates.length
                  )}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
