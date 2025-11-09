export const LoadingState: React.FC = () => (
  <div id="reviews-ratings">
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </div>
    </div>
  </div>
);

// Component for error state
export const ErrorState: React.FC = () => (
  <div id="reviews-ratings">
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <p className="text-red-600">Failed to load reviews</p>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    </div>
  </div>
);
