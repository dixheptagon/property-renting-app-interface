import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export default function renderHighlights({
  visibleHighlights,
  otherHighlights,
}: {
  visibleHighlights: Array<{
    label: string;
    icon: React.ElementType;
    isCustom: boolean;
  }>;
  otherHighlights: Array<{
    label: string;
    icon: React.ElementType;
    isCustom: boolean;
  }>;
}) {
  return (
    <div className="">
      <div className="flex flex-wrap gap-2">
        {visibleHighlights.map((highlight, index) => {
          const IconComponent = highlight.icon;
          return (
            <div
              key={index}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                highlight.isCustom
                  ? "bg-purple-100 text-purple-800"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              {IconComponent && <IconComponent className="h-4 w-4" />}
              <span className="font-medium">{highlight.label}</span>
            </div>
          );
        })}
        {otherHighlights.length > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1 rounded-lg bg-gray-100 px-3 py-2 text-sm transition-colors hover:bg-gray-200">
                <span>+{otherHighlights.length} more</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="text-md font-semibold">Other Highlights</h4>
                <div className="flex flex-wrap gap-2">
                  {otherHighlights.map((highlight, index) => {
                    const IconComponent = highlight.icon;
                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                          highlight.isCustom
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {IconComponent && <IconComponent className="h-4 w-4" />}
                        <span className="font-medium">{highlight.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
