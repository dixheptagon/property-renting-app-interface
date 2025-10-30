import { formatDate } from "../../_utils/format.date";
import { parseISO } from "date-fns";
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

export default function RemovePeakPrice() {
  return (
    <div className="absolute right-4 bottom-4 z-20">
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
            <DialogDescription>
              Are you sure you want to remove "{"this room"}"? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <DialogTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogTrigger>
            <Button
            // variant="destructive"
            // onClick={() => onRemoveRoom(room.tempId)}
            >
              Remove Room
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
