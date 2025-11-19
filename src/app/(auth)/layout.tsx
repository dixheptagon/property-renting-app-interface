import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-gray-100">
        {children}
        <Link href="/">
          <Image
            src="/logo/staysia-logo.png"
            alt="logo"
            width={400}
            height={400}
            className="absolute bottom-4 left-1/2 w-36 -translate-x-1/2 transition-all duration-300 hover:scale-110"
          />
        </Link>
      </div>
    </>
  );
}
