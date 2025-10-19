import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  ArrowDownNarrowWide,
  Circle,
  Home,
  HousePlus,
  OctagonMinus,
  Pencil,
  SlidersHorizontal,
  Star,
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
import { ReviewDateRangePicker } from "./_components/ui/date.range.picker";
import { ReviewsChart } from "./_components/review.chart";
import ReviewStats from "./_components/review.stats";
import ReviewComments from "./_components/review.comment";

export default function Reviews() {
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
              <span className="text-sm font-semibold sm:text-base">Review</span>
              <Button className="group/btn transition-all hover:bg-blue-700 hover:shadow-lg sm:w-auto">
                <Home className="mr-2 h-4 w-4 transition-transform group-hover/btn:rotate-15" />
                Property Name
              </Button>
            </div>
          </div>
        </header>

        <div className="min-h-screen space-y-4 bg-white px-4 py-4">
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

            <div className="flex w-full items-center gap-2">
              <Input
                type="text"
                placeholder="Search"
                className="block w-full border-2 border-gray-200"
              />
            </div>

            <div className="flex gap-4">
              <ReviewDateRangePicker />
              <Button className="group/btn w-full transition-all hover:bg-blue-700 hover:shadow-lg sm:w-auto">
                <ArrowDownNarrowWide />
                Sort By
              </Button>
            </div>
          </section>

          <ReviewStats />

          <ReviewComments />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
