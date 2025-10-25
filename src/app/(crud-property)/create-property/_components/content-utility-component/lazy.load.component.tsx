import dynamic from "next/dynamic";

// Loading component similar to property-details
const LoadingState = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center py-20">
    <div className="text-center">
      <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  </div>
);

// Lazy load each step component
const Overview = dynamic(() => import("../content-component/overview"), {
  loading: () => <LoadingState message="Loading Overview..." />,
  ssr: false,
});

const Guidelines = dynamic(() => import("../content-component/guidelines"), {
  loading: () => <LoadingState message="Loading Guidelines..." />,
  ssr: false,
});

const ChooseCategory = dynamic(
  () => import("../content-component/choose-category"),
  {
    loading: () => <LoadingState message="Loading Choose Category..." />,
    ssr: false,
  }
);

const InputTitleDescription = dynamic(
  () => import("../content-component/input.title.description"),
  {
    loading: () => <LoadingState message="Loading Title and Description..." />,
    ssr: false,
  }
);

export { Overview, Guidelines, ChooseCategory, InputTitleDescription };
