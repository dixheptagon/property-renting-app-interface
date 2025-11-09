import { CheckCheck, CheckCircle, Clock, Package, XCircle } from "lucide-react";

const ProcessingBanner = () => (
  <div className="mb-6 hidden items-center gap-3 rounded-xl bg-amber-500 bg-linear-to-r p-4 text-white shadow-lg md:flex">
    <Package className="h-8 w-8 shrink-0" />
    <div>
      <h1 className="text-2xl font-bold">Reservation in Progress!</h1>
      <p className="text-sm text-white">
        Your booking is being processed. You&apos;ll receive a confirmation soon
        with all the details for your stay.
      </p>
    </div>
  </div>
);

const PendingBanner = () => (
  <div className="mb-6 hidden items-center gap-3 rounded-xl bg-yellow-500 bg-linear-to-r p-4 text-white shadow-lg md:flex">
    <Clock className="h-8 w-8 shrink-0" />
    <div>
      <h1 className="text-2xl font-bold">Awaiting Payment!</h1>
      <p className="text-sm text-white">
        Please complete your payment to confirm the booking. The reservation
        will be secured once payment is received.
      </p>
    </div>
  </div>
);

const ConfirmedBanner = () => (
  <div className="mb-6 hidden items-center gap-3 rounded-xl bg-green-500 bg-linear-to-r p-4 text-white shadow-lg md:flex">
    <CheckCircle className="h-8 w-8 shrink-0" />
    <div>
      <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
      <p className="text-sm text-white">
        Your reservation is confirmed! Get ready for your stay — we can&apos;t
        wait to welcome you.
      </p>
    </div>
  </div>
);

const CancelledBanner = () => (
  <div className="mb-6 hidden items-center gap-3 rounded-xl bg-red-500 bg-linear-to-r p-4 text-white shadow-lg md:flex">
    <XCircle className="h-8 w-8 shrink-0" />
    <div>
      <h1 className="text-2xl font-bold">Booking Cancelled!</h1>
      <p className="text-sm text-white">
        Your reservation has been cancelled. No further action is required. You
        can contact us if you have any questions.
      </p>
    </div>
  </div>
);

const CompletedBanner = () => (
  <div className="mb-6 hidden items-center gap-3 rounded-xl bg-blue-500 bg-linear-to-r p-4 text-white shadow-lg md:flex">
    <CheckCheck className="h-8 w-8 shrink-0" />
    <div>
      <h1 className="text-2xl font-bold">Stay Completed!</h1>
      <p className="text-sm text-white">
        You have completed your stay. Please leave a review.
      </p>
    </div>
  </div>
);

const components: Record<string, React.FC> = {
  confirmed: ConfirmedBanner,
  pending_payment: PendingBanner,
  processing: ProcessingBanner,
  cancelled: CancelledBanner,
  completed: CompletedBanner,
};

interface StatusBannerProps {
  status: string;
}

export default function StatusBanner({ status }: StatusBannerProps) {
  const StatusComponent = components[status.toLowerCase()];
  return <StatusComponent />;
}
