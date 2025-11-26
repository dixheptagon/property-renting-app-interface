import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryClientProviders } from "../components/providers/query.client.providers";
import RoleProvider from "../components/providers/role.provider";
import "../styles/globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Staysia - Find Your Perfect Stay",
    template: "%s | Staysia",
  },
  description:
    "Staysia is a modern property renting platform designed to help travelers find and book the perfect stay. From apartments and villas to hotels and homestays — everything you need in one place.",
  keywords: [
    "property renting",
    "hotel booking",
    "vacation rentals",
    "homestay",
    "apartment rental",
    "villa rental",
    "online booking platform",
    "Staysia",
    "travel accommodation",
    "short-term stays",
  ],
  authors: [{ name: "Staysia Team" }],
  creator: "Staysia",
  metadataBase: new URL("https://staysia.com"), // change if your domain is different
  openGraph: {
    type: "website",
    url: "https://staysia.com",
    title: "Staysia - Find Your Perfect Stay",
    description:
      "Discover comfortable stays at the best prices. Book hotels, villas, apartments, and homestays effortlessly with Staysia.",
    siteName: "Staysia",
    images: [
      {
        url: "https://res.cloudinary.com/dzpcr6tzh/image/upload/v1759043682/Staysia_Logo_-_Property_Renting_App_CROP_t8n2dj.png", // replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Staysia - Property Renting Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Staysia - Find Your Perfect Stay",
    description:
      "A modern and intuitive property renting platform designed for both travelers and property owners.",
    images: [
      "https://res.cloudinary.com/dzpcr6tzh/image/upload/v1759043326/Staysia_Logo_-_Property_Renting_App_1_px2ewk.png",
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster />
        <QueryClientProviders>
          <RoleProvider>{children}</RoleProvider>
        </QueryClientProviders>
      </body>
    </html>
  );
}
