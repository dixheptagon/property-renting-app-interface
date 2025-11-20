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
import ButtonSetUnavailability from "./button.set.unavailabilty";
import ContentSetUnavailabilty from "./content.set.unavailabilty";

export function SetUnavailabilities() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonSetUnavailability />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Unavailable Dates</DialogTitle>
          <DialogDescription>
            Select the dates when your property won&apos;t be available for
            guests.
          </DialogDescription>
        </DialogHeader>
        <ContentSetUnavailabilty />
      </DialogContent>
    </Dialog>
  );
}
