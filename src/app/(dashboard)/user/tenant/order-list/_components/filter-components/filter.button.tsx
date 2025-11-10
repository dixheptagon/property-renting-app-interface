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
import { SlidersHorizontal } from "lucide-react";
import statusOptions from "../../_const/status.option";
import { Label } from "@/components/ui/label";
import { MultiSelect, MultiSelectRef } from "@/components/ui/multi-select";
import { useRef, useState } from "react";
import { IFilterButton } from "../../_types/filter.type";
import PropertyCategoryOptions from "../../_const/property.category.option.dummy";

export default function FilterButton({
  selectedStatus,
  setSelectedStatus,
}: IFilterButton) {
  const statusSelectRef = useRef<MultiSelectRef>(null);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Filter </DialogTitle>
          <DialogDescription>
            Select one or more status to filter your order list
          </DialogDescription>
        </DialogHeader>

        {/* Filters Content */}
        <div>
          {/* Payment Status */}
          <div>
            <Label className="text-md mb-2">Status</Label>
            <MultiSelect
              ref={statusSelectRef}
              options={statusOptions}
              value={selectedStatus}
              onValueChange={setSelectedStatus}
              defaultValue={[]} // atau bisa langsung ["pending_payment"] kalau mau default
              placeholder="Select payment status"
              className="w-full"
              variant={"secondary"}
              maxCount={5}
            />
          </div>

          {/* Property Category */}
          <div>
            <Label className="text-md mb-2">Property Category</Label>
            <MultiSelect
              options={PropertyCategoryOptions}
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              defaultValue={[]} // atau bisa langsung ["pending_payment"] kalau mau default
              placeholder="Select payment status"
              className="w-full"
              variant={"secondary"}
              maxCount={5}
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => setSelectedStatus([])}
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
