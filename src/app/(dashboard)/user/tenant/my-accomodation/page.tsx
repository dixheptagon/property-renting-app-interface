import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  ArrowDownNarrowWide,
  Home,
  HousePlus,
  SlidersHorizontal,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AccomodationCard from "./_components/accomodation.card";
import { AppSidebar } from "../../_components/app-sidebar";

export default function MyAccomodation() {
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
              <Button className="group/btn transition-all hover:bg-blue-700 hover:shadow-lg sm:w-auto">
                <HousePlus className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-15" />
                Add New Accomodation
              </Button>
            </div>
          </div>
        </header>

        <div className="min-h-screen bg-white px-4 py-4">
          <section className="flex w-full justify-between gap-4">
            <div className="flex gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="group/btn w-full transition-all hover:bg-blue-700 hover:shadow-lg sm:w-auto">
                    <SlidersHorizontal />
                    Filters
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share link</DialogTitle>
                    <DialogDescription>
                      Anyone who has this link will be able to view this.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                      <Label htmlFor="link" className="sr-only">
                        Link
                      </Label>
                      <Input
                        id="link"
                        defaultValue="https://ui.shadcn.com/docs/installation"
                        readOnly
                      />
                    </div>
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button className="bg-white text-blue-600 hover:bg-gray-200 hover:text-blue-700">
                Clear All
              </Button>
            </div>
            <Button className="group/btn w-full transition-all hover:bg-blue-700 hover:shadow-lg sm:w-auto">
              <ArrowDownNarrowWide />
              Sort By
            </Button>
          </section>

          <section className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-4">
            <AccomodationCard />
            <AccomodationCard />
            <AccomodationCard />
            <AccomodationCard />
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
