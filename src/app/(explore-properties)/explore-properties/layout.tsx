import Navbar from "./_components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative flex min-h-screen flex-col bg-gray-50">
        <Navbar />
        {children}
      </div>
    </>
  );
}
