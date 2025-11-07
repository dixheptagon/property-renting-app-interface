import BookingNavbar from "./_components/booking.navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-gray-100">
        <BookingNavbar />
        {children}
      </div>
    </>
  );
}
