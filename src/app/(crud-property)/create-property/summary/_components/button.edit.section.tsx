"use client";

import React from "react";
import { Edit, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ButtonEditSectionProps {
  path: string;
  label: string;
  className?: string;
}

export default function ButtonEditSection({
  path,
  label,
  className = "",
}: ButtonEditSectionProps) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(path);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={handleEdit}
          className={`group relative flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-all duration-200 hover:border-blue-300 hover:bg-blue-100 hover:shadow-md ${className}`}
        >
          <Edit className="h-4 w-4" />
          {/* <span>Edit</span> */}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Edit {label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
