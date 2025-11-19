import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ButtonPeakPrice from "./button.peak.price";
import PeakPriceDialogContent from "./peak.price.dialog.content";

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
          <PeakPriceDialogContent />
        </DialogContent>
      </form>
    </Dialog>
  );
}
