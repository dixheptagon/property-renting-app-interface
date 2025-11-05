"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { LandingPageDatePicker } from "./hero-component/date.picker";
import { SelectCategory } from "./hero-component/select.category";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Search, MapPin } from "lucide-react";

export default function Hero() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (location) params.set("location", location);
    if (category) params.set("category", category);
    if (dateRange?.from)
      params.set("checkin", dateRange.from.toISOString().split("T")[0]);
    if (dateRange?.to)
      params.set("checkout", dateRange.to.toISOString().split("T")[0]);
    router.push(`/explore-properties?${params.toString()}`);
    console.log(params.toString());
  };

  return (
    <section id="home" className="relative h-[90vh] w-full overflow-hidden">
      <Image
        src="/background/landing-page.jpg"
        alt="background"
        width={1080}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-white sm:px-6 lg:px-8">
        <div className="mb-8 text-center md:mb-12">
          <h1 className="text-2xl leading-tight font-bold sm:text-4xl md:flex md:gap-2 md:text-3xl lg:text-4xl">
            Discover the best places to stay <br className="hidden sm:block" />
            <span className="text-blue-500">around the world</span>
          </h1>
          <p className="mt-4 text-base text-gray-100 sm:text-lg md:text-xl">
            Find comfort, style, and great value — wherever you go.
          </p>
        </div>

        {/* Filter Card */}
        <div className="w-full max-w-5xl">
          <div className="rounded-2xl bg-white/25 p-4 shadow-2xl shadow-blue-700/80 backdrop-blur-md sm:p-6 md:p-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-12">
              {/* Location Input */}
              <div className="lg:col-span-5">
                <Label
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-white md:text-base"
                  htmlFor="location"
                >
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <div className="relative">
                  <Input
                    id="location"
                    className="h-12 border-gray-200 bg-gray-50 px-4 font-medium text-black transition-all focus:bg-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Where are you going?"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch();
                    }}
                  />
                </div>
              </div>

              {/* Date Picker */}
              <div className="lg:col-span-4">
                <LandingPageDatePicker onDateRangeChange={setDateRange} />
              </div>

              {/* Category Select */}
              <div className="lg:col-span-3">
                <Label
                  className="mb-2 block text-sm font-semibold text-white md:text-base"
                  htmlFor="category h-full"
                >
                  Category
                </Label>
                <SelectCategory value={category} onValueChange={setCategory} />
              </div>

              {/* Search Button */}
              <div className="md:self-end lg:col-span-12">
                <Button
                  className="hover:blue-700 h-12 w-full bg-blue-600 text-base font-semibold shadow-lg transition-all hover:shadow-xl md:text-lg"
                  onClick={handleSearch}
                >
                  <Search className="mr-2 h-5 w-5 stroke-3" />
                  Search Properties
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
