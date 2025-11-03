import { CheckCheck, CheckCircle, Clock, Package, XCircle } from "lucide-react";

const ProcessingBanner = () => (
  <div className="mb-6 hidden items-center gap-3 rounded-xl bg-amber-500 bg-gradient-to-r p-4 text-white shadow-lg md:flex">
    <Package className="h-8 w-8 flex-shrink-0" />
    <div>
      <h1 className="text-2xl font-bold">Reservation in Progress!</h1>
      <p className="text-sm text-white">
        The booking is currently being handled. Ensure all details and check-in
        arrangements are ready once it&apos;t confirmed.
      </p>
    </div>
  </div>
);

const PendingBanner = () => (
  <div className="mb-6 hidden items-center gap-3 rounded-xl bg-yellow-500 bg-gradient-to-r p-4 text-white shadow-lg md:flex">
    <Clock className="h-8 w-8 flex-shrink-0" />
    <div>
      <h1 className="text-2xl font-bold">Awaiting Payment!</h1>
      <p className="text-sm text-white">
        A guest has made a booking but hasn&apos;t completed the payment yet.
        The reservation will be confirmed once payment is received.
      </p>
    </div>
  </div>
);

const ConfirmedBanner = () => (
  <div className="mb-6 hidden items-center gap-3 rounded-xl bg-green-500 bg-gradient-to-r p-4 text-white shadow-lg md:flex">
    <CheckCircle className="h-8 w-8 flex-shrink-0" />
    <div>
      <h1 className="text-2xl font-bold">Booking Confirmed!</h1>
      <p className="text-sm text-white">
        A guest&apos;s reservation has been successfully confirmed. Please
        prepare the property for their arrival.
      </p>
    </div>
  </div>
);

const CancelledBanner = () => (
  <div className="mb-6 hidden items-center gap-3 rounded-xl bg-red-500 bg-gradient-to-r p-4 text-white shadow-lg md:flex">
    <XCircle className="h-8 w-8 flex-shrink-0" />
    <div>
      <h1 className="text-2xl font-bold">Booking Cancelled!</h1>
      <p className="text-sm text-white">
        This reservation has been cancelled by the guest, tenant or system. No
        further action is required.
      </p>
    </div>
  </div>
);

const CompletedBanner = () => (
  <div className="mb-6 hidden items-center gap-3 rounded-xl bg-blue-500 bg-gradient-to-r p-4 text-white shadow-lg md:flex">
    <CheckCheck className="h-8 w-8 flex-shrink-0" />
    <div>
      <h1 className="text-2xl font-bold">Stay Completed!</h1>
      <p className="text-sm text-white">
        The guest has completed their stay. You can now leave a review or
        archive this booking record.
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
