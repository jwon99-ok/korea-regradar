import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import { SiteNav } from "@/components/site-nav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Korea RegRadar — Regulatory intelligence for foreign founders",
  description:
    "Korea's industry regulations, foreign-ownership limits, and political landscape — decoded into English, in real time.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${plexMono.variable}`}>
      <body className="min-h-screen antialiased">
        <SiteNav />
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
      </body>
    </html>
  );
}
