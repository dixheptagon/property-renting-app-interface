import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

// Photo Menu Component
export default function PhotoMenu({
  onSetCover,
  onDelete,
  isCover = false,
}: {
  onSetCover: () => void;
  onDelete: () => void;
  isCover?: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 shadow-md backdrop-blur-sm hover:bg-white"
        >
          <MoreHorizontal className="h-5 w-5 text-gray-700" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {/* {!isCover && (
          <DropdownMenuItem onClick={onSetCover}>
            Set as cover photo
          </DropdownMenuItem>
        )} */}
        <DropdownMenuItem onClick={onDelete} className="text-red-600">
          Delete photo
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
