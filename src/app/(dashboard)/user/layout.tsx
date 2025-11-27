import ProtectedPageProvider from "@/components/providers/protected.page.provider";
import Image from "next/image";
import Link from "next/link";

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
