import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoaderCircle } from "lucide-react";

interface ImageDeleteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  photoId?: string;
  tempGroupId?: string;
  isPending?: boolean;
}

export default function ImageDelete({
  open,
  onOpenChange,
  onConfirm,
  isPending,
}: ImageDeleteProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="font-semibold">
            This action cannot be undone. This will permanently delete the photo
            from your property listing.
          </DialogDescription>
        </DialogHeader>

        {/* Loading Alert */}
        {isPending && (
          <Alert
            variant="default"
            className="mt-4 border-amber-500 bg-amber-200"
          >
            <LoaderCircle className="h-4 w-4 animate-spin text-amber-500" />
            <AlertDescription>
              <p className="text-amber-600">
                Please wait while your image is being deleted.
              </p>
            </AlertDescription>
          </Alert>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleConfirm}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
