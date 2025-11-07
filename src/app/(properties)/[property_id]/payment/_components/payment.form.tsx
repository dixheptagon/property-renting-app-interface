import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PaymentForm() {
  return (
    <div>
      <div className="flex items-center justify-center rounded-lg bg-blue-600 p-10">
        <span className="text-2xl font-bold">Snap Midtrans Place</span>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4 w-full bg-red-600 p-6 text-lg font-semibold hover:bg-red-500">
            Cancel Booking
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Order Cancellation
            </DialogTitle>
            <DialogDescription className="text-md flex justify-center font-semibold text-black">
              Are you sure want to Cancel this order?
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full items-center justify-center gap-4">
            <Button className="bg-green-600 p-6 hover:bg-green-500">
              Yes, Cancel
            </Button>
            <DialogClose asChild>
              <Button className="bg-red-600 p-6 hover:bg-red-500">
                No, Keep
              </Button>
            </DialogClose>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
