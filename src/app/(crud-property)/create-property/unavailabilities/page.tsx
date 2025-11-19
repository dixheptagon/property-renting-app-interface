import Link from "next/link";
import CreatePropertyHeader from "../_components/create.property.header";
import PropertyProgressBar from "../_components/property.progress.bar";
import { SetUnavailabilities } from "./_components/set.unavalability";
import UnavailabilitiesData from "./_components/unavailabilties.data";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export default function Page() {
  return (
    <main>
      <CreatePropertyHeader />

      <section className="mb-30 min-h-screen space-y-12 px-4 py-16">
        <div className="mx-auto max-w-5xl space-y-2">
          <h1 className="text-center text-3xl font-bold">
            Set unavailable dates for your property
          </h1>
          <p className="text-center text-xl text-gray-600">
            Easily mark dates when your property is closed or unavailable for
            booking — to prevent unwanted reservations and keep your calendar
            accurate.
          </p>
        </div>

        <div className="space-y-6">
          <UnavailabilitiesData />
          <SetUnavailabilities />
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
