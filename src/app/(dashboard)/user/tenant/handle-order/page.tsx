import HandleOrderForm from "./_components/handle.order.form";
import HandleOrderNavbar from "./_components/handle.order.navbar";
import OrderSummary from "./_components/order.summary";

export default function Page() {
  return (
    <div className="mt-20 mb-10 min-h-full">
      <HandleOrderNavbar />
      <div className="mx-auto min-h-full max-w-7xl space-y-3 md:max-w-7xl">
        <div className="mx-auto mt-6 max-w-7xl md:grid md:grid-cols-12 md:gap-6">
          <div className="col-span-8">
            <HandleOrderForm />
          </div>
          <div className="col-span-4">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
