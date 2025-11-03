import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckCheck,
  CircleCheckBig,
  CircleX,
  TriangleAlert,
} from "lucide-react";

interface ActionButtonsProps {
  status: string;
}

export function ActionButtons({ status }: ActionButtonsProps) {
  // Mapping status → tombol yang harus muncul
  const rules: Record<string, string[]> = {
    processing: ["confirm", "reject", "cancel"],
    pending_payment: ["cancel"],
    confirmed: ["complete", "cancel"],
  };

  const visibleButtons = rules[status] || [];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {/* ✅ Confirm Button */}
      {visibleButtons.includes("confirm") && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex min-w-35 items-center gap-2 bg-green-600 p-6 transition-all hover:bg-green-700 hover:shadow-lg">
              <CircleCheckBig className="h-5 w-5" />
              Confirmed Order
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Order</DialogTitle>
              <DialogDescription>
                Are you sure you want to confirm this order?
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center gap-3">
              <Button className="flex min-w-35 items-center gap-2 bg-green-600 p-6 transition-all hover:bg-green-700 hover:shadow-lg">
                <CircleCheckBig className="h-5 w-5" />
                Confirmed Order
              </Button>
              <DialogClose asChild>
                <Button variant="outline" className="p-6">
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* ⚠️ Reject Button */}
      {visibleButtons.includes("reject") && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex min-w-35 items-center gap-2 bg-yellow-600 p-6 transition-all hover:bg-yellow-700 hover:shadow-lg">
              <TriangleAlert className="h-5 w-5" />
              Reject Order
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Reject Order</DialogTitle>
              <DialogDescription>
                Are you sure you want to reject this order?
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center gap-3">
              <Button className="flex min-w-35 items-center gap-2 bg-yellow-600 p-6 transition-all hover:bg-yellow-700 hover:shadow-lg">
                <TriangleAlert className="h-5 w-5" />
                Reject Order
              </Button>
              <DialogClose asChild>
                <Button variant="outline" className="p-6">
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* ✅ Completed Button */}
      {visibleButtons.includes("complete") && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-blue-600 p-6 transition-all hover:bg-blue-700 hover:shadow-lg">
              <CheckCheck className="h-5 w-5" />
              Completed Order
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Completed Order</DialogTitle>
              <DialogDescription>
                Are you sure you want to complete this order?
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center justify-center gap-3">
              <Button className="flex items-center gap-2 bg-blue-600 p-6 transition-all hover:bg-blue-700 hover:shadow-lg">
                <CheckCheck className="h-5 w-5" />
                Completed Order
              </Button>
              <DialogClose asChild>
                <Button variant="outline" className="p-6">
                  Cancel
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* ❌ Cancel Button */}
      {visibleButtons.includes("cancel") && (
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-red-600 p-6 transition-all hover:bg-red-700 hover:shadow-lg">
                <CircleX className="h-5 w-5" />
                Cancel Order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Cancel Order</DialogTitle>
                <DialogDescription>
                  Are you sure you want to cancel this order?
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-3">
                <Label htmlFor="name-1">Cancellation Reason</Label>
                <Input
                  id="cancellation-reason"
                  name="cancellation-reason"
                  type="text"
                  placeholder="Enter cancellation reason"
                  className="py-6"
                />
              </div>
              <div className="flex items-center justify-center gap-3">
                <Button className="flex items-center gap-2 bg-red-600 p-6 transition-all hover:bg-red-700 hover:shadow-lg">
                  <CircleX className="h-5 w-5" />
                  Cancel Order
                </Button>
                <DialogClose asChild>
                  <Button variant="outline" className="p-6">
                    No
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </form>
        </Dialog>
      )}
    </div>
  );
}
