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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCheck,
  CircleCheckBig,
  CircleX,
  TriangleAlert,
} from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  rejectReasonValidationSchema,
  cancelReasonValidationSchema,
} from "../../_validations/reject.cancel.reason.validation";
import { useRejectOrder } from "../../_hooks/use.reject.order";
import { toast } from "sonner";
import { useCancelOrder } from "../../_hooks/use.cancel.order";

interface ActionButtonsProps {
  status: string;
  orderId: string;
}

export function ActionButtons({ status, orderId }: ActionButtonsProps) {
  const rejectOrderMutation = useRejectOrder();
  const cancelOrderMutation = useCancelOrder();

  // Mapping status → buttons that should be visible
  const rules: Record<string, string[]> = {
    processing: ["confirm", "reject", "cancel"],
    pending_payment: ["cancel"],
    confirmed: ["complete", "cancel"],
  };

  const visibleButtons = rules[status] || [];

  const handleRejectOrder = async (values: { reason: string }) => {
    try {
      await rejectOrderMutation.mutateAsync({
        orderId,
        rejectionReason: values.reason,
      });
      toast.success("Order rejected successfully");
      window.location.reload();
      // Close dialog would be handled by DialogClose
    } catch (error) {
      toast.error("Failed to reject order");
      console.error("Reject order error:", error);
    }
  };

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
        error instanceof Error
          ? error.message
          : "An error occurred during cancellation"
      );
      console.error("Cancel order error:", error);
    }
  };

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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Order</DialogTitle>
              <DialogDescription>
                If the order is rejected, the payment status will be reverted to
                Pending Payment. Are you still sure?
              </DialogDescription>
            </DialogHeader>
            <Formik
              initialValues={{ reason: "" }}
              validationSchema={rejectReasonValidationSchema}
              onSubmit={handleRejectOrder}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div className="grid gap-3">
                    <Label htmlFor="reason">Enter Rejection Reason</Label>
                    <Field
                      as={Textarea}
                      id="reason"
                      name="reason"
                      placeholder="Enter rejection reason "
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
                      disabled={isSubmitting || rejectOrderMutation.isPending}
                      className="flex min-w-35 items-center gap-2 bg-yellow-600 p-6 transition-all hover:bg-yellow-700 hover:shadow-lg disabled:opacity-50"
                    >
                      <TriangleAlert className="h-5 w-5" />
                      {rejectOrderMutation.isPending
                        ? "Rejecting..."
                        : "Reject Order"}
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
                If the order is canceled, it cannot be restored. Are you still
                want to cancel this order?
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
      )}
    </div>
  );
}
