import { PropertyNavbar } from "./_components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <PropertyNavbar />
        {children}
      </div>
    </>
  );
}
