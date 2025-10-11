import { PropertyNavbar } from "@/components/features/property-details";
import { QueryClientProviders } from "@/components/providers/query.client.providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <QueryClientProviders>
          <PropertyNavbar />
          {children}
        </QueryClientProviders>
      </div>
    </>
  );
}
