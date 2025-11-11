import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCancelOrder } from "../../_hooks/use.cancel.order";
import { toast } from "sonner";
import { cancelReasonValidationSchema } from "../../_validations/reject.cancel.reason.validation";
import { AxiosError } from "axios";

interface CancelOrderButtonProps {
  orderId: string;
}

export default function CancelOrderButton({ orderId }: CancelOrderButtonProps) {
  const cancelOrderMutation = useCancelOrder();

  const handleCancelOrder = async (values: { reason: string }) => {
    try {
      // TODO: Implement cancel order API call
      await cancelOrderMutation.mutateAsync({
        orderId,
        cancellationReason: values.reason,
      });
      // Close dialog would be handled by DialogClose
    } catch (error) {
      toast.error(
        error instanceof AxiosError && error.response?.data?.error
          ? error.response?.data?.error
          : "An error occurred during cancellation"
      );
      console.error("Cancel order error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-red-600 p-6 transition-all hover:bg-red-700 hover:shadow-lg">
          <CircleX className="h-5 w-5" />
          Cancel Order
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Order</DialogTitle>
          <DialogDescription>
            If the order is canceled, it cannot be restored. Are you still want
            to cancel this order?
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{ reason: "" }}
          validationSchema={cancelReasonValidationSchema}
          onSubmit={handleCancelOrder}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div className="grid gap-3">
                <Label htmlFor="reason">Cancellation Reason</Label>
                <Field
                  as={Textarea}
                  id="reason"
                  name="reason"
                  placeholder="Enter cancellation reason "
                  className="p-4"
                />
                <ErrorMessage
                  name="reason"
                  component="div"
                  className="text-xs text-red-500"
                />
              </div>
              <div className="flex items-center justify-center gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-red-600 p-6 transition-all hover:bg-red-700 hover:shadow-lg disabled:opacity-50"
                >
                  <CircleX className="h-5 w-5" />
                  {isSubmitting ? "Cancelling..." : "Cancel Order"}
                </Button>
                <DialogClose asChild>
                  <Button variant="outline" className="p-6">
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
