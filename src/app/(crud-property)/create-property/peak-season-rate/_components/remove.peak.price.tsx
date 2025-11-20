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

export default function RemovePeakPrice({ tempId }: { tempId: string }) {
  const { removePeakRate } = usePropertyStore();

  const handleRemove = () => {
    removePeakRate(tempId);
  };

  return (
    <div className="absolute right-4 bottom-4">
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white transition-colors duration-200 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove room</span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Remove Room</DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to remove &quot;{"this room"}&quot;? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <DialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
            <Button variant="destructive" onClick={handleRemove}>
              Remove Room
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
