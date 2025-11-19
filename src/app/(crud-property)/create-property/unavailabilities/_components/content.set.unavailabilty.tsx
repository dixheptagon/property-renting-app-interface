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
import { CalendarIcon, CalendarX, Clock, Home, XCircle } from "lucide-react";
import { formatDate } from "../../_utils/format.date";
import { Calendar } from "@/components/ui/calendar";
import { useIsMobile } from "@/hooks/use-mobile";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { UnavailabilityValidationSchema } from "@/app/(crud-property)/_validations/unavailability.validation.schema";
import { Input } from "@/components/ui/input";

export default function ContentSetUnavailabilty() {
  const { rooms, unavailabilities, addUnavailability, updateUnavailability } =
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
    reason: string
  ) => {
    const startDate = dateRange.from!.toISOString().split("T")[0];
    const endDate = dateRange.to!.toISOString().split("T")[0];

    for (const roomTempId of selectedRooms) {
      const existingUnavailability = unavailabilities.find(
        (unavailability) =>
          unavailability.targetTempRoomId === roomTempId &&
          unavailability.start_date === startDate &&
          unavailability.end_date === endDate
      );

      if (existingUnavailability) {
        return `An unavailability already exists for this room and date range (${startDate} to ${endDate})`;
      }
    }

    return null;
  };

  //   3. Handle submit unavailability with Formik
  const handleSubmit = (
    values: any,
    { setSubmitting, resetForm, setErrors }: any
  ) => {
    try {
      // Check for duplicates
      const duplicateError = checkForDuplicates(
        values.selectedRoom,
        values.dateRange,
        values.reason
      );
      if (duplicateError) {
        setErrors({ submit: duplicateError });
        setSubmitting(false);
        return;
      }

      // Create unavailability data for each selected room
      values.selectedRoom.forEach((roomTempId: string) => {
        const unavailabilityData = {
          tempId: `unavailability-${Date.now()}-${roomTempId}`, // Generate unique tempId
          targetTempRoomId: roomTempId,
          start_date: values.dateRange.from!.toISOString().split("T")[0], // Format as YYYY-MM-DD
          end_date: values.dateRange.to!.toISOString().split("T")[0],
          reason: values.reason,
        };

        // Check if data exist update data else add new data
        if (
          unavailabilities.find(
            (unavailability) =>
              unavailability.targetTempRoomId === roomTempId &&
              unavailability.start_date === unavailabilityData.start_date &&
              unavailability.end_date === unavailabilityData.end_date
          )
        ) {
          updateUnavailability(roomTempId, unavailabilityData);
        } else {
          addUnavailability(unavailabilityData);
        }
      });

      // Reset form after successful submission
      resetForm();
      setSubmitting(false);

      // Close dialog (this will be handled by DialogClose in the UI)
    } catch (error) {
      setErrors({
        submit: "Failed to save unavailabilities. Please try again.",
      });
      setSubmitting(false);
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
        reason: "",
      }}
      validationSchema={UnavailabilityValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, errors, isSubmitting }) => (
        <Form className="w-full space-y-6">
          {/* Error Display */}
          {(errors as any).submit && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                {(errors as any).submit}
              </div>
            </div>
          )}

          {/* Pick Room */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-base font-semibold">
              <Home className="h-5 w-5 text-blue-600" />
              Select Rooms
            </Label>
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
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-base font-semibold">
              <CalendarIcon className="h-5 w-5 text-green-600" />
              Select Date Range
            </Label>
            <div className="mt-2 flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={
                      !values.dateRange?.from || !values.dateRange?.to
                    }
                    className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal transition-colors hover:bg-gray-50"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {values.dateRange ? (
                      <span className="flex flex-col">
                        <span className="font-medium">
                          {formatDate(values.dateRange.from)} -{" "}
                          {formatDate(values.dateRange.to)}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {Math.ceil(
                            (values.dateRange.to!.getTime() -
                              values.dateRange.from!.getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}{" "}
                          nights
                        </span>
                      </span>
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  align="start"
                  className="w-auto border-2 p-0 shadow-lg"
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
                    className="rounded-md"
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

          {/* Reason Input */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-base font-semibold">
              <Clock className="h-5 w-5 text-orange-600" />
              Reason for Unavailability
            </Label>
            <Field
              as={Input}
              name="reason"
              placeholder="e.g., Maintenance, Renovation, Personal reasons..."
              className="w-full"
            />
            <ErrorMessage
              name="reason"
              component="div"
              className="text-sm text-red-600"
            />
          </div>

          {/* Preview Selected Rooms */}
          {values.selectedRoom?.length > 0 && (
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-base font-semibold">
                <CalendarX className="h-5 w-5 text-red-600" />
                Rooms to Mark Unavailable
              </Label>
              <div className="grid grid-cols-1 gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
                {values.selectedRoom.map((roomId) => {
                  const matchedRoom = rooms.find((r) => r.tempId === roomId);
                  if (!matchedRoom) return null; // avoid render error

                  return (
                    <div
                      key={matchedRoom.tempId}
                      className="flex items-center gap-3 rounded-md border bg-white p-3 shadow-sm"
                    >
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {matchedRoom.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {values.dateRange
                            ? `${values.dateRange.from?.toLocaleDateString()} - ${values.dateRange.to?.toLocaleDateString()}`
                            : "Pick a date range"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <DialogFooter className="flex gap-3 pt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button" className="flex-1">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-red-600 text-white hover:bg-red-700"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Saving...
                </div>
              ) : (
                "Mark as Unavailable"
              )}
            </Button>
          </DialogFooter>
        </Form>
      )}
    </Formik>
  );
}
