"use client";

import Link from "next/link";
import { Logo } from "./navbar-component/logo";

const scrollToSection = (href: string) => {
  if (href.startsWith("/#")) {
    const elementId = href.split("#")[1];
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
};

export default function Footer() {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      scrollToSection(href);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top section: Logo and description */}
        <div className="mb-8 flex flex-col items-center text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="mb-4 md:mb-0">
            <Logo />
            <p className="mt-2 text-gray-400">
              Discover the best places to stay around the world.
            </p>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Quick Navigation */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#home"
                  onClick={(e) => handleClick(e, "/#home")}
                  className="text-gray-400 transition-colors hover:text-white hover:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#property-list"
                  onClick={(e) => handleClick(e, "/#property-list")}
                  className="text-gray-400 transition-colors hover:text-white hover:underline"
                >
                  Property List
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-gray-400 transition-colors hover:text-white hover:underline"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 transition-colors hover:text-white hover:underline"
                >
                  Terms & Services
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 transition-colors hover:text-white hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>
            <p className="text-gray-400">Email: support@staysia.com</p>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2024 Staysia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
