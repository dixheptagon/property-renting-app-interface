import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, Check } from "lucide-react";
import { PurchaseStatus } from "../../_types/purchase.status";
import statusOptions from "../../_const/status.option";

interface PurchaseFiltersProps {
  selectedStatus: PurchaseStatus[];
  onToggleStatus: (status: PurchaseStatus) => void;
  onClearFilters: () => void;
}

export default function PurchaseFilters({
  selectedStatus,
  onToggleStatus,
  onClearFilters,
}: PurchaseFiltersProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
          {selectedStatus.length > 0 && (
            <span className="ml-2 rounded-full bg-white px-2 py-0.5 text-xs text-blue-600">
              {selectedStatus.length}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filter by Status</DialogTitle>
          <DialogDescription>
            Select one or more status to filter your purchase list
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-4">
          {statusOptions.map((status) => (
            <button
              key={status.value}
              onClick={() => onToggleStatus(status.value)}
              className={`flex w-full items-center justify-between rounded-lg border-2 p-3 transition-all hover:shadow-md ${
                selectedStatus.includes(status.value)
                  ? status.color + " shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="font-medium">{status.label}</span>
              <div
                className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
                  selectedStatus.includes(status.value)
                    ? "border-current bg-current"
                    : "border-gray-300"
                }`}
              >
                {selectedStatus.includes(status.value) && (
                  <Check className="h-5 w-5 stroke-2 text-white" />
                )}
              </div>
            </button>
          ))}
        </div>
        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onClearFilters}
            className="w-full sm:w-auto"
          >
            Clear All
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              className="w-full bg-blue-600 hover:bg-blue-700 sm:w-auto"
            >
              Apply Filters
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
