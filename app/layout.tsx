import type { Metadata } from "next";
import { headers } from "next/headers";
import { Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: {
      default: "Dharohar — India’s Heritage Kitchen, Reimagined",
      template: "%s · Dharohar",
    },
    description: "Discover handcrafted copper, brass and bronze cookware with artisan provenance, personalisation, a digital heritage passport and lifetime restoration.",
    keywords: ["Indian heritage cookware", "copper cookware India", "brass cookware", "bronze cookware", "luxury wedding gifts India", "cookware restoration"],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: "Dharohar",
      title: "India’s heritage kitchen, reimagined for modern homes.",
      description: "Handcrafted heritage cookware. Personal provenance. Lifetime restoration.",
      url: origin,
      images: [{ url: `${origin}/og.png`, width: 1536, height: 1024, alt: "Dharohar heritage cookware" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Dharohar — India’s Heritage Kitchen, Reimagined",
      description: "Handcrafted heritage cookware with personalisation and lifetime restoration.",
      images: [`${origin}/og.png`],
    },
    robots: { index: true, follow: true },
    icons: {
      icon: [{ url: "/favicon.png", type: "image/png", sizes: "64x64" }],
      shortcut: "/favicon.png",
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body className={`${geistSans.variable} ${cormorant.variable} antialiased`}>{children}</body>
    </html>
  );
}
