import ConfirmedForm from "./_components/confirmed.form";
import ConfirmedNavbar from "./_components/confirmed.navbar";
import ConfirmedSummary from "./_components/confirmed.summary";

export default function Page() {
  return (
    <div className="mt-20 mb-10 min-h-full">
      <ConfirmedNavbar />
      <div className="mx-auto min-h-full max-w-7xl space-y-3 md:max-w-7xl">
        <h1 className="px-2 text-2xl font-bold md:px-0">
          Your Accommodation Has Been Confirmed!
        </h1>
        <p className="px-2 font-semibold text-gray-500 md:px-0">
          Make sure to review your booking details carefully.
        </p>

        <div className="mx-auto mt-8 max-w-7xl md:grid md:grid-cols-12 md:gap-6">
          <div className="md:col-span-8">
            <ConfirmedForm />
          </div>
          <div className="mt-4 md:col-span-4 md:mt-0">
            <ConfirmedSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
