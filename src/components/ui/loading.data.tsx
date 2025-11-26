export default function LoadingData({ message }: { message?: string }) {
  return (
    <div className="">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="border-primary/30 border-t-primary h-12 w-12 animate-spin rounded-full border-4"></div>

        {/* Loading text */}
        <p className="text-muted-foreground text-sm">
          {message || "Loading..."}{" "}
        </p>
      </div>
    </div>
  );
}
