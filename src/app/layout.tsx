import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.horusflow.xyz"),
  title: "HORUS — Live Order Flow Intelligence for Binance & TradingView",
  description:
    "Footprint-fused chart, CVD overlay, and a two-phase trap detector on Binance Futures and TradingView. Install once, trade smarter.",
  openGraph: {
    title: "HORUS",
    description: "Live order flow panel for Binance and TradingView traders",
    url: "https://www.horusflow.xyz",
    siteName: "HORUS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HORUS",
    description: "Order flow intelligence for Binance and TradingView",
    site: "@horusflow",
    creator: "@horusflow",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
