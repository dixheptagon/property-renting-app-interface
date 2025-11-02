"use client";

import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

export default function RemoveUnavailability({ tempId }: { tempId: string }) {
  const { removeUnavailability } = usePropertyStore();

  const handleRemove = () => {
    removeUnavailability(tempId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-red-600" />
            Remove Unavailability
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this unavailability period? This
            action cannot be undone. The room will become available for bookings
            during this date range.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button
            onClick={handleRemove}
            className="bg-red-600 hover:bg-red-700"
          >
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
