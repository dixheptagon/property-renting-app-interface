import {
  Mail,
  Phone,
  User,
  CreditCard,
  ReceiptText,
  BookCheck,
  ScanBarcode,
  Clock,
  ClockAlert,
} from "lucide-react";
import Image from "next/image";
import StatusBanner from "./ui/status.banner";
import StatusLabel from "./ui/status.label";
import { ActionButtons } from "./ui/action.buttons";

export default function HandleOrderForm() {
  const booking = {
    status: "completed",
  };

  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Success Banner */}
      <StatusBanner status={booking.status} />

      {/* Main Card */}
      <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
        {/* Order ID */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <p className="text-sm text-gray-500">Booking ID</p>
            <h2 className="text-2xl font-bold text-gray-900">[ORDER-1XXXX]</h2>
          </div>
          <StatusLabel status={booking.status} />
        </div>

        {/* Guest Information */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <User className="h-5 w-5 text-blue-500" />
            Guest Information
          </h3>
          <div className="space-y-3 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm">
            <div className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="font-semibold text-gray-900">[GUEST NAME]</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <Mail className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email Address</p>
                <p className="font-semibold text-gray-900">[GUEST EMAIL]</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone Number</p>
                <p className="font-semibold text-gray-900">[GUEST PHONE]</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <ReceiptText className="text-blue-500" />
            Payment Information
          </h3>
          <div className="relative space-y-3 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6 shadow-sm">
            {/* Payment Method */}
            <div className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                <CreditCard className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Payment Method</p>
                <p className="font-semibold text-gray-900">[PAYMENT METHOD]</p>
              </div>
            </div>

            {/* Payment Proof */}
            <div className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <BookCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Payment Proof</p>
                <p className="font-semibold text-gray-900">[PAYMENT PROOF]</p>
              </div>
            </div>

            {/* Transaction ID */}
            <div className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <ScanBarcode className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Transaction ID</p>
                <p className="font-semibold text-gray-900">[TRANSACTION ID]</p>
              </div>
            </div>

            <div className="flex justify-between">
              {/* Paid At */}
              <div className="flex items-center gap-3 rounded-lg bg-white p-3 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-100">
                  <Clock className="h-5 w-5 text-lime-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Paid At</p>
                  <p className="font-semibold text-gray-900">[PAID AT]</p>
                </div>
              </div>

              {/* Expired At */}
              <div className="flex items-center gap-3 rounded-lg bg-red-200 p-2 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                  <ClockAlert className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-500">
                    Expired At
                  </p>
                  <p className="font-semibold text-red-900">
                    12 November 2025, 12.000 AM
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Proof */}
            <div className="absolute top-3 right-6">
              <Image
                src="https://res.cloudinary.com/dzpcr6tzh/image/upload/v1759570664/staysia_property_renting_app/payment_receipt/qdwi4rstjxrnc5rhcerj.jpg"
                alt="payment-proof"
                width={500}
                height={500}
                className="h-auto w-32 rounded-lg border-2 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Handle Orded Form Section */}

        <section className="rounded-xl bg-gradient-to-r p-6">
          <div className="text-center">
            <h3 className="mb-2 text-lg font-bold text-gray-900">
              Make sure to review everything carefully before proceeding order!
            </h3>
            <p className="mb-6 text-sm text-gray-600">
              Verify everything — changes may not be possible later.
            </p>

            {/* 💥 Cukup panggil 1 baris ini */}
            <ActionButtons status={booking.status} />
          </div>
        </section>

        {/* <section className="rounded-xl bg-gradient-to-r p-6">
          <div className="text-center">
            <h3 className="mb-2 text-lg font-bold text-gray-900">
              Make sure to review everything carefully before proceeding order!
            </h3>
            <p className="mb-6 text-sm text-gray-600">
              Verify everything — changes may not be possible later.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
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
            </div>
          </div>
        </section> */}
      </div>
    </div>
  );
}
