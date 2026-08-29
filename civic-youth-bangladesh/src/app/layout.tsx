import type { Metadata } from "next";
import { Poppins, Inter, Noto_Sans_Bengali } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const siteUrl = "https://civicyouthbd.org";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Civic Youth Bangladesh",
  alternateName: "CYB",
  url: siteUrl,
  logo: `${siteUrl}/images/cyb-logo.png`,
  description:
    "Civic Youth Bangladesh is a youth-led civic leadership platform promoting active citizenship, ethical leadership, community engagement, research and social innovation.",
  sameAs: [],
};

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

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-bangla",
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    url: siteUrl,
    siteName: "Civic Youth Bangladesh",
    title: "Civic Youth Bangladesh | Engage Today, Lead Tomorrow",
    description:
      "Civic Youth Bangladesh is a youth-led civic leadership platform promoting active citizenship, ethical leadership, community engagement, research and social innovation.",
    images: [
      {
        url: `${siteUrl}/images/cyb-logo.png`,
        width: 1200,
        height: 630,
        alt: "Civic Youth Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Civic Youth Bangladesh | Engage Today, Lead Tomorrow",
    description:
      "Civic Youth Bangladesh is a youth-led civic leadership platform promoting active citizenship, ethical leadership, community engagement, research and social innovation.",
    images: [`${siteUrl}/images/cyb-logo.png`],
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${inter.variable} ${notoSansBengali.variable}`}
    >
      <body className="min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <LanguageProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}