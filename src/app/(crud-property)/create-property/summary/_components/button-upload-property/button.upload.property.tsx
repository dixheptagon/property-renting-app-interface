"use client";

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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CircleAlert, CloudUpload, LoaderCircle } from "lucide-react";
import { useUploadPropertyForm } from "@/app/(crud-property)/_hooks/use.upload.property.form";
import { usePropertyStore } from "@/app/(crud-property)/_stores/property.store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDisabledUploadProperty } from "@/app/(crud-property)/_hooks/use.disabled.upload.property";

export default function UploadProperty() {
  const router = useRouter();

  // Get Property Data
  const {
    propertyImages,
    property,
    rooms,
    peakSeasonRates,
    unavailabilities,
    resetStore,
  } = usePropertyStore();

  // Upload Property
  const { mutate: uploadProperty, isPending } = useUploadPropertyForm({
    onSuccess: () => {
      toast.success(
        `Your property is being uploaded. You'll receive an email once the upload is complete`,
        { duration: 4000 }
      );

      resetStore();
      setTimeout(() => {
        router.push("/");
      }, 4000);
    },
    onError: (error) => {
      if (error?.response?.data?.error) {
        toast.error(error.response?.data.error);
      } else {
        toast.error("Something went wrong, please try again later.");
        // router.push("/");
      }
    },
  });

  const handleUploadProperty = () => {
    uploadProperty({
      propertyImages,
      property,
      rooms,
      peakSeasonRates,
      unavailabilities,
    });
  };

  const disabledUpload = useDisabledUploadProperty();

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="p-6 hover:bg-blue-700 hover:shadow-xl">
            Upload Property
            <CloudUpload className="mr-1 h-7 w-7 stroke-3" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Property Form</DialogTitle>
            <DialogDescription>
              Are you sure you want to upload this property?
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
                  Please wait while your image is being uploaded.
                </p>
              </AlertDescription>
            </Alert>
          )}

          {!disabledUpload && (
            <Alert
              variant="destructive"
              className="border border-red-400 bg-red-50"
            >
              <AlertTitle className="flex items-center gap-2">
                <CircleAlert className="h-4 w-4 stroke-3" />
                Incomplete Property Details
              </AlertTitle>

              <AlertDescription>
                Some property details are missing or incomplete. Please complete
                all required fields before uploading.
              </AlertDescription>
            </Alert>
          )}

          <p className="text-sm font-semibold text-gray-600">
            💡Note: Once the property has been uploaded, users will be notified
            via email.
          </p>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              className="hover:bg-blue-700 hover:shadow-xl"
              disabled={!disabledUpload || isPending}
              onClick={handleUploadProperty}
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <LoaderCircle className="h-4 w-4 animate-spin" /> Uploading
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Upload Property
                  <CloudUpload className="mr-1 h-4 w-4 stroke-3" />
                </div>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
