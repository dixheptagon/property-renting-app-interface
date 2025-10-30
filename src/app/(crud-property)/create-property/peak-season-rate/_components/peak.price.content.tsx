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

export default function PeakPriceContent() {
  const { rooms } = usePropertyStore();
  const isMobile = useIsMobile();
  const [error, setError] = useState<string | null>(null);

  //   1. get rooms
  const options = rooms.map((room) => ({
    value: room.tempId,
    label: room.name,
  }));

  //   2. make state to get peak season price data
  const [selectedRoom, setSelectedRoom] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [peakPricePercentage, setPeakPricePercentage] = useState(2);

  //   3. Handle submit peak season price
  const { addPeakRate } = usePropertyStore();

  const handleSubmit = () => {
    if (selectedRoom.length === 0) {
      setError("Please select a room");
      return;
    }

    if (peakPricePercentage === 0) {
      setError("Please select a peak price percentage");
      return;
    }
  };

  return (
    <section className="w-full space-y-4">
      {/* Pick Room */}
      <div className="space-y-2">
        <Label>Pick Room</Label>
        <MultiSelect
          options={options}
          onValueChange={setSelectedRoom}
          defaultValue={selectedRoom}
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
                data-empty={!dateRange?.from || !dateRange?.to}
                className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
              >
                <CalendarIcon />
                {dateRange ? (
                  formatDate(dateRange.from) + " to " + formatDate(dateRange.to)
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom" align="start" className="w-auto p-0">
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                numberOfMonths={isMobile ? 1 : 2}
                selected={dateRange}
                onSelect={setDateRange}
                disabled={{ before: new Date() }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Set Peak Price */}
      <div className="mx-auto">
        {/* Regular Base Price */}
        {selectedRoom?.length > 0 && (
          <div className="font-semibold">
            <h2>Regular Price</h2>
            <div className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2">
              {selectedRoom.map((roomId) => {
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
        {selectedRoom?.length > 0 && (
          <div className="font-semibold">
            <h2>Peak Season Price</h2>
            <div className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2">
              {selectedRoom.map((roomId) => {
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
                          peakPricePercentage
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
                value={[peakPricePercentage]}
                onValueChange={(val) => setPeakPricePercentage(val[0])}
                defaultValue={[2]}
                max={100}
                step={1}
                className="text-xl"
              />
              <h3 className="text-md self-end font-semibold">
                On Percent{" "}
                <span className="rounded-md bg-amber-100 px-2 py-1 text-lg font-bold text-amber-600">
                  + {peakPricePercentage}%
                </span>
              </h3>
            </div>
          </div>
        )}
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </section>
  );
}
