"use client";
import { Button } from "@/components/ui/button";
import CreatePropertyHeader from "../_components/create.property.header";
import { SetDialogPeakPrice } from "./_components/set.dialog.peak.price";
import ShowPeakRateData from "./_components/show.peak.rate.data";
import PropertyProgressBar from "../_components/property.progress.bar";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

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
          className={`fixed bottom-0 z-30 w-full space-y-2 border-t-2 bg-white/40 p-4 backdrop-blur-md lg:fixed lg:bottom-0`}
        >
          <PropertyProgressBar />

          <div className="flex justify-end px-6">
            <Button
              className="p-6 shadow-lg hover:bg-blue-700"
              type="submit"
              onClick={() => router.push("create-property/manage-rooms")}
            >
              Go to Manage Rooms
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
