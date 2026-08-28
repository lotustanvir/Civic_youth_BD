import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Civic Youth Bangladesh | Engage Today, Lead Tomorrow",
    template: "%s | Civic Youth Bangladesh",
  },
  description:
    "Civic Youth Bangladesh is a youth-led civic leadership platform promoting active citizenship, ethical leadership, community engagement, research and social innovation.",
  keywords: [
    "Civic Youth Bangladesh",
    "CYB",
    "youth leadership",
    "civic education",
    "Bangladesh",
    "community engagement",
    "volunteerism",
    "social innovation",
    "democratic participation",
  ],
  authors: [{ name: "Civic Youth Bangladesh" }],
  creator: "Civic Youth Bangladesh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://civicyouthbd.org",
    siteName: "Civic Youth Bangladesh",
    title: "Civic Youth Bangladesh | Engage Today, Lead Tomorrow",
    description:
      "Civic Youth Bangladesh is a youth-led civic leadership platform promoting active citizenship, ethical leadership, community engagement, research and social innovation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Civic Youth Bangladesh | Engage Today, Lead Tomorrow",
    description:
      "Civic Youth Bangladesh is a youth-led civic leadership platform promoting active citizenship, ethical leadership, community engagement, research and social innovation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}