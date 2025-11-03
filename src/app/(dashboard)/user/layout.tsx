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

          <Link href="/">
            <Image
              src="/logo/staysia-logo.png"
              alt="Staysia Logo"
              width={100}
              height={100}
              className="absolute top-3 right-3 w-24 sm:w-28 md:w-30"
            />
          </Link>
        </div>
      </ProtectedPageProvider>
    </>
  );
}
