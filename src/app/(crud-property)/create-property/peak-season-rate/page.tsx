import { Button } from "@/components/ui/button";
import CreatePropertyHeader from "../_components/create.property.header";
import PropertyProgressBar from "../_components/property.progress.bar";
import { SetDialogPeakPrice } from "./_components/set.dialog.peak.price";
import ShowPeakRateData from "./_components/show.peak.rate.data";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function Page() {
  return (
    <main>
      <CreatePropertyHeader />

      <section className="mb-30 min-h-screen space-y-12 px-4 py-16">
        <div className="space-y-2">
          <h1 className="text-center text-3xl font-bold">
            Set special prices for high-demand periods
          </h1>
          <p className="text-center text-xl text-gray-600">
            Easily define and manage seasonal pricing to maximize your revenue
            during holidays, weekends, or peak travel seasons.
          </p>
        </div>

        <div className="mx-auto max-w-7xl space-y-8">
          <SetDialogPeakPrice />

          <ShowPeakRateData />
        </div>
      </section>

      <section>
        <div
          className={`fixed bottom-0 w-full space-y-2 border-t-2 bg-white/40 p-4 backdrop-blur-md lg:fixed lg:bottom-0`}
        >
          <PropertyProgressBar />

          <div className="flex justify-end px-6">
            <Link href="/create-property/manage-rooms">
              <Button className="p-6 hover:bg-blue-700 hover:shadow-xl">
                <LogIn className="mr-1 h-5 w-5 rotate-180 stroke-3" />
                Go to Manage Rooms
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
