import { Button } from "@/components/ui/button";
import CreatePropertyHeader from "../_components/create.property.header";
import { CalendarPlus } from "lucide-react";
import { SetDialogPeakPrice } from "./_components/set.dialog.peak.price";

export default function Page() {
  return (
    <main>
      <CreatePropertyHeader />

      <section className="mb-20 min-h-screen space-y-12 px-4 py-16 md:mb-0">
        <div className="space-y-2">
          <h1 className="text-center text-3xl font-bold">
            Set special prices for high-demand periods
          </h1>
          <p className="text-center text-xl text-gray-600">
            Easily define and manage seasonal pricing to maximize your revenue
            during holidays, weekends, or peak travel seasons.
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            <SetDialogPeakPrice />
          </div>
        </div>
      </section>
    </main>
  );
}
