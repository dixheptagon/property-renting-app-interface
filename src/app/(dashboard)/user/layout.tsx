import ProtectedPageProvider from "@/components/providers/protected.page.provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProtectedPageProvider>
        <div className="relative flex min-h-screen flex-col bg-gray-100">
          {children}
        </div>
      </ProtectedPageProvider>
    </>
  );
}
