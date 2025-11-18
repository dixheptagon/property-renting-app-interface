import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FilterSection from "./review-list-components/filter.section";
import ReviewStats from "./review-list-components/review.stats";
import ReviewsData from "@/app/(dashboard)/user/tenant/reviews-ratings/_components/reviews.data";
import { PaginationSection } from "./review-list-components/pagination.section";

export function ReviewList() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="px-6 py-2">
            View More Reviews
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-screen w-full">
          <DialogHeader>
            <DialogTitle>Reviews & Ratings</DialogTitle>
          </DialogHeader>

          {/* Reviews & Ratings Section */}
          <div className="space-y-4 bg-white px-4 py-4">
            <FilterSection />

            <ReviewStats />

            <ReviewsData />

            <PaginationSection />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
