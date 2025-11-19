"use client";

import { Newspaper } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ButtonSummaryNavigation() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="fixed right-8 bottom-35 z-50">
          <Link
            href="/create-property/summary"
            className="group relative block rounded-full bg-linear-to-br from-blue-400 to-blue-800 p-3 shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-blue-500/25"
          >
            {/* Ping animation background */}
            <div className="absolute inset-0 animate-ping rounded-full bg-linear-to-br from-blue-400 to-blue-800 opacity-25"></div>

            {/* Main button */}
            <div className="relative flex items-center justify-center">
              <Newspaper className="h-6 w-6 text-white transition-transform duration-300 group-hover:rotate-12" />
            </div>
          </Link>
        </div>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>Go to Summary</p>
      </TooltipContent>
    </Tooltip>
  );
}
