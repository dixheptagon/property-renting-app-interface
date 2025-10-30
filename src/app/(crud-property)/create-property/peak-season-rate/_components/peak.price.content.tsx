"use client";

import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CalendarIcon,
  CircleDollarSign,
  DollarSign,
  House,
} from "lucide-react";
import { useState } from "react";
import { formatDate } from "../../_utils/format.date";
import { Calendar } from "@/components/ui/calendar";
import { useIsMobile } from "@/hooks/use-mobile";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { formatPrice } from "../../_utils/format.price";
import { Slider } from "@/components/ui/slider";
import { calculatePeakPrice } from "../../_utils/calculate.peak.price";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { PeakSeasonRateValidationSchema } from "@/app/(crud-property)/_validations/peak.season.rate.validation.schema";

export default function PeakPriceContent() {
  const { rooms, peakSeasonRates, addPeakRate, updatePeakRate } =
    usePropertyStore();
  const isMobile = useIsMobile();

  //   1. get rooms
  const options = rooms.map((room) => ({
    value: room.tempId,
    label: room.name,
  }));

  //   2. Check for duplicate entries
  const checkForDuplicates = (
    selectedRooms: string[],
    dateRange: DateRange,
    percentage: number
  ) => {
    const startDate = dateRange.from!.toISOString().split("T")[0];
    const endDate = dateRange.to!.toISOString().split("T")[0];

    for (const roomTempId of selectedRooms) {
      const existingRate = peakSeasonRates.find(
        (rate) =>
          rate.targetTempRoomId === roomTempId &&
          rate.start_date === startDate &&
          rate.end_date === endDate
      );

      if (existingRate) {
        return `A peak rate already exists for this room and date range (${startDate} to ${endDate})`;
      }
    }

    return null;
  };

  //   3. Handle submit peak season price with Formik
  const handleSubmit = (
    values: any,
    { setSubmitting, resetForm, setErrors }: any
  ) => {
    try {
      // Check for duplicates
      const duplicateError = checkForDuplicates(
        values.selectedRoom,
        values.dateRange,
        values.peakPricePercentage
      );
      if (duplicateError) {
        setErrors({ submit: duplicateError });
        setSubmitting(false);
        return;
      }

      // Create peak rate data for each selected room
      values.selectedRoom.forEach((roomTempId: string) => {
        const peakRateData = {
          tempId: `peak-rate-${Date.now()}-${roomTempId}`, // Generate unique tempId
          targetTempRoomId: roomTempId,
          start_date: values.dateRange.from!.toISOString().split("T")[0], // Format as YYYY-MM-DD
          end_date: values.dateRange.to!.toISOString().split("T")[0],
          adjustment_type: "percentage" as const,
          adjustment_value: values.peakPricePercentage,
        };

        // Check if data exist updatate data else add new data
        if (
          peakSeasonRates.find(
            (rate) =>
              rate.targetTempRoomId === roomTempId &&
              rate.start_date === peakRateData.start_date &&
              rate.end_date === peakRateData.end_date
          )
        ) {
          updatePeakRate(roomTempId, peakRateData);
        } else {
          addPeakRate(peakRateData);
        }
      });

      // Reset form after successful submission
      resetForm();
      setSubmitting(false);

      // Close dialog (this will be handled by DialogClose in the UI)
    } catch (error) {
      setErrors({
        submit: "Failed to save peak season rates. Please try again.",
      });
      setSubmitting(false);
      console.error("Error saving peak rates:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        selectedRoom: [],
        dateRange: {
          from: new Date(),
          to: addDays(new Date(), 3),
        },
        peakPricePercentage: 2,
      }}
      validationSchema={PeakSeasonRateValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors, touched, isSubmitting }) => (
        <Form className="w-full space-y-4">
          {/* Error Display */}
          {(errors as any).submit && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {(errors as any).submit}
            </div>
          )}

          {/* Pick Room */}
          <div className="space-y-2">
            <Label>Pick Room</Label>
            <MultiSelect
              options={options}
              onValueChange={(value) => setFieldValue("selectedRoom", value)}
              defaultValue={values.selectedRoom}
            />
            <ErrorMessage
              name="selectedRoom"
              component="div"
              className="text-sm text-red-600"
            />
          </div>

          {/* Pick Range Date */}
          <div className="space-y-2">
            <Label>Pick Range Date</Label>
            <div className="mt-2 flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={
                      !values.dateRange?.from || !values.dateRange?.to
                    }
                    className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon />
                    {values.dateRange ? (
                      formatDate(values.dateRange.from) +
                      " to " +
                      formatDate(values.dateRange.to)
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  align="start"
                  className="w-auto p-0"
                >
                  <Calendar
                    mode="range"
                    defaultMonth={values.dateRange?.from}
                    numberOfMonths={isMobile ? 1 : 2}
                    selected={values.dateRange}
                    onSelect={(dateRange) =>
                      setFieldValue("dateRange", dateRange)
                    }
                    disabled={{ before: new Date() }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <ErrorMessage
              name="dateRange"
              component="div"
              className="text-sm text-red-600"
            />
          </div>

          {/* Set Peak Price */}
          <div className="mx-auto">
            {/* Regular Base Price */}
            {values.selectedRoom?.length > 0 && (
              <div className="font-semibold">
                <h2>Regular Price</h2>
                <div className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2">
                  {values.selectedRoom.map((roomId) => {
                    const matchedRoom = rooms.find((r) => r.tempId === roomId);
                    if (!matchedRoom) return null; // hindari render error

                    return (
                      <div
                        key={matchedRoom.tempId}
                        className="flex flex-col rounded-lg bg-blue-50 p-2 text-blue-800 shadow-lg"
                      >
                        <h2 className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5" />
                          Room {matchedRoom.name}
                        </h2>
                        <h3 className="self-center text-2xl font-bold">
                          {formatPrice(Number(matchedRoom.base_price))}
                        </h3>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Peak Price */}
            {values.selectedRoom?.length > 0 && (
              <div className="font-semibold">
                <h2>Peak Season Price</h2>
                <div className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2">
                  {values.selectedRoom.map((roomId) => {
                    const matchedRoom = rooms.find((r) => r.tempId === roomId);
                    if (!matchedRoom) return null; // hindari render error

                    return (
                      <div
                        key={matchedRoom.tempId}
                        className="flex flex-col rounded-lg bg-amber-50 p-2 text-amber-600 shadow-lg"
                      >
                        <h2 className="flex items-center gap-2">
                          <CircleDollarSign className="h-5 w-5" />
                          Room {matchedRoom.name}
                        </h2>
                        <h3 className="self-center text-2xl font-bold">
                          {formatPrice(
                            calculatePeakPrice(
                              Number(matchedRoom.base_price),
                              values.peakPricePercentage
                            )
                          )}
                        </h3>
                      </div>
                    );
                  })}
                </div>

                {/* Slider Peak Price Percentage */}
                <div className="mt-4 flex flex-col gap-2">
                  <Slider
                    value={[values.peakPricePercentage]}
                    onValueChange={(val) =>
                      setFieldValue("peakPricePercentage", val[0])
                    }
                    defaultValue={[2]}
                    max={100}
                    step={1}
                    className="text-xl"
                  />
                  <h3 className="text-md self-end font-semibold">
                    On Percent{" "}
                    <span className="rounded-md bg-amber-100 px-2 py-1 text-lg font-bold text-amber-600">
                      + {values.peakPricePercentage}%
                    </span>
                  </h3>
                  <ErrorMessage
                    name="peakPricePercentage"
                    component="div"
                    className="text-sm text-red-600"
                  />
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </Form>
      )}
    </Formik>
  );
}
