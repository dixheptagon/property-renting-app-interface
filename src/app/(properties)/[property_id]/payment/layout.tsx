import { Metadata } from "next";
import PaymentNavbar from "./_components/payment.navbar";

export const metadata: Metadata = {
  title: "Midtrans Snap - Next.js",
  description: "Payment with Midtrans Snap Embed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Load Midtrans Snap.js (Sandbox) */}
      <script
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        async
      ></script>
      <div className="flex min-h-screen flex-col bg-gray-100">
        <PaymentNavbar />
        {children}
      </div>
    </>
  );
}
