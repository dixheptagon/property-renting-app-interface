import { Building2, Calendar, Home, Phone, UserCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/(auth)/_stores/auth.store";

const publicNavLinks = [
  { name: "Home", href: "/#home", icon: Home },
  { name: "Property List", href: "/#property-list", icon: Building2 },
  { name: "Contact Us", href: "/#home", icon: Phone },
];

const authenticatedNavLinks = [
  { name: "My Account", href: "/user", icon: UserCircle },
  { name: "My Bookings", href: "/user/my-booking", icon: Calendar },
];

const scrollToSection = (href: string) => {
  if (href.startsWith("/#")) {
    const elementId = href.split("#")[1];
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
};

export function NavigationLink({ scrolled }: { scrolled: boolean }) {
  const router = useRouter();
  const { access_token } = useAuthStore();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      scrollToSection(href);
    }
  };

  // Combine public and authenticated links based on auth status
  const allNavLinks = access_token
    ? [...publicNavLinks, ...authenticatedNavLinks]
    : publicNavLinks;

  return (
    <div className="hidden items-center gap-8 lg:flex">
      {allNavLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          onClick={(e) => handleClick(e, link.href)}
          className={`group relative flex items-center gap-2 font-semibold transition-colors hover:text-blue-600 ${
            scrolled ? "text-gray-700" : "text-white"
          }`}
        >
          <link.icon className="h-4 w-4" />
          {link.name}
          <span
            className={`absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 transition-all group-hover:w-full`}
          />
        </Link>
      ))}
    </div>
  );
}

export function MobileNavigationLink({
  setMobileMenuOpen,
}: {
  setMobileMenuOpen: (value: boolean) => void;
}) {
  const { access_token } = useAuthStore();

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      scrollToSection(href);
      setMobileMenuOpen(false);
    } else {
      setMobileMenuOpen(false);
    }
  };

  // Combine public and authenticated links based on auth status
  const allNavLinks = access_token
    ? [...publicNavLinks, ...authenticatedNavLinks]
    : publicNavLinks;

  return (
    <div className="px-4">
      <div className="space-y-1">
        {allNavLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className="flex items-center gap-3 rounded-lg px-4 py-3 font-semibold text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
          >
            <link.icon className="h-5 w-5" />
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
