import type { Metadata } from "next";
import { headers } from "next/headers";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-dharohar-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-dharohar-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
      default: "Dharohar — Crafted by Tradition. Carried by You.",
      template: "%s · Dharohar",
    },
    description: "Enter Dharohar’s world of handcrafted copper, brass and kansa cookware, personalisation, provenance and lifetime care—then continue to the store.",
    keywords: ["Indian heritage cookware", "copper cookware India", "brass cookware", "bronze cookware", "luxury wedding gifts India", "cookware restoration"],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: "Dharohar",
      title: "Crafted by tradition. Carried by you.",
      description: "A premium gateway to handcrafted heritage cookware, personal provenance and lifetime care.",
      url: origin,
      images: [{ url: `${origin}/og.png`, width: 1659, height: 948, alt: "Dharohar heritage cookware" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Dharohar — Crafted by Tradition. Carried by You.",
      description: "A premium gateway to handcrafted heritage cookware, personalisation and lifetime care.",
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
      <body className={`${manrope.variable} ${playfair.variable} antialiased`}>{children}</body>
    </html>
  );
}
