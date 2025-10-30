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
import ButtonPeakPrice from "./button.peak.price";
import PeakPriceContent from "./peak.price.content";

export function SetDialogPeakPrice() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <ButtonPeakPrice />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Peak Season Price</DialogTitle>
            <DialogDescription>
              Adjust your room rates for busy seasons to maximize your earnings.
            </DialogDescription>
          </DialogHeader>
          <PeakPriceContent />
        </DialogContent>
      </form>
    </Dialog>
  );
}
