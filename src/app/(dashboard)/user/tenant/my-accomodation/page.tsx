"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Home, HousePlus } from "lucide-react";

import AccomodationCard from "./_components/accomodation.card";
import IsDraftAccomodationCard from "./_components/is.draft.accomodation.card";
import { AppSidebar } from "../../_components/app-sidebar";
import Link from "next/link";
import { usePropertyList } from "./_hooks/use.property.list";
import LoadingData from "@/components/ui/loading.data";
import { useIsDraftProperty } from "./_hooks/use.is.draft.property";

export default function MyAccomodation() {
  const { data, isLoading, error, refetch } = usePropertyList();

  const isDraft = useIsDraftProperty();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div className="flex w-full items-center justify-between">
              <span className="text-sm font-semibold sm:text-base">
                My Accomodation
              </span>

              {/* Button Create New Accomodation */}
              <Link
                href={`${isDraft ? "/create-property/summary" : "/create-property"}`}
              >
                <Button className="group/btn transition-all hover:bg-blue-700 hover:shadow-lg sm:w-auto">
                  <HousePlus className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-15" />
                  Add New Accomodation
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <div className="min-h-screen bg-white px-4 py-4">
          {isLoading && (
            <div className="flex justify-center py-8">
              <LoadingData message="Loading your properties..." />
            </div>
          )}

          {error && (
            <div className="flex justify-center py-8">
              <div className="text-center">
                <p className="mb-2 text-red-600">Failed to load properties</p>
                <p className="text-sm text-gray-600">
                  {error.message || "Please try again later"}
                </p>

                {/* Button Refresh */}
                <Button
                  onClick={() => refetch()}
                  className="mt-4 flex w-full items-center gap-2 bg-blue-600 px-6 py-3 text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg"
                >
                  <HousePlus className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>
          )}

          {data && (
            <section className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-4">
              {isDraft && <IsDraftAccomodationCard />}

              {data.data.data.length === 0 && !isDraft ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12">
                  <Home className="mb-4 h-12 w-12 text-gray-400" />
                  <p className="text-center text-gray-600">
                    No properties found. Create your first accommodation!
                  </p>
                </div>
              ) : (
                data.data.data.map((property) => (
                  <AccomodationCard key={property.uid} property={property} />
                ))
              )}
            </section>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
