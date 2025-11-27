export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="border-primary/30 border-t-primary h-12 w-12 animate-spin rounded-full border-4"></div>

        {/* Loading text */}
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    </div>
  );
}
