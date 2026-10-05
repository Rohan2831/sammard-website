import { Inter, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";

import Navbars from "@/components/layout/navbar/navbar";
import { SmoothScrollProvider } from "@/components/common/SmoothScrollProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Team SAMMARD — Student Aerospace Engineering",
  description:
    "Team SAMMARD is a student-led aerospace team at VIT Vellore, designing high-power sounding rockets, advanced payloads, and canister satellites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <SmoothScrollProvider />
        <Navbars />
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}