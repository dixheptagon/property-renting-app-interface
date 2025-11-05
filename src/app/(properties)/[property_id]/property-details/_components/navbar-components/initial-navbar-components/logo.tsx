import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="hidden flex-shrink-0 lg:block">
      <Image
        src="/logo/staysia-logo.png"
        alt="Staysia Logo"
        width={140}
        height={40}
        className="h-10 w-auto transition-transform hover:scale-105"
        priority
      />
    </Link>
  );
}

export function MobileLogo() {
  return (
    <Link href="/" className="flex items-center justify-between border-b p-4">
      <Image
        src="/logo/staysia-logo.png"
        alt="Staysia Logo"
        width={120}
        height={35}
        className="h-8 w-auto"
      />
    </Link>
  );
}
