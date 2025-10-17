import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/app-sidebar";
import { Separator } from "@/components/ui/separator";
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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowDownNarrowWide, SlidersHorizontal } from "lucide-react";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <span className="text-sm font-semibold sm:text-base">
              Order List
            </span>
          </div>
        </header>

        <div className="min-h-screen bg-white px-4 py-6">
          <section className="flex w-full justify-between gap-4">
            <div className="flex gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
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
            <Button>
              <ArrowDownNarrowWide />
              Sort By
            </Button>
          </section>

          <section className="my-4">
            <div className="mb-6 flex justify-between rounded-lg border-2 bg-white p-4 font-semibold text-gray-600 shadow-lg">
              <span>Id</span>
              <span>Property Name</span>
              <span>Check In/Check Out</span>
              <span>Price</span>
              <span>Status</span>
              <span>Action</span>
            </div>

            <div className="flex justify-between rounded-lg border-2 bg-white p-4 font-semibold text-gray-600 shadow-lg">
              <span>#XXXX</span>
              <span>[Property_Name]</span>
              <span>[Check_in_date - Check out date]</span>
              <span>RpXXX.XXX,XX</span>
              <span>pending</span>
              <span>Action</span>
            </div>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
