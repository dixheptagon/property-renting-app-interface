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
  title: "Staysia",
  description: "Staysia - Property Renting App",
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
