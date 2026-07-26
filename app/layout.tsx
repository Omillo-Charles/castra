import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { chirp, glacial, mulish } from "@/config/fonts";
import { Navbar } from "@/components/ui/Navbar";
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
  title: "Castra | E-Commerce Platform",
  description: "Modern E-Commerce platform built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${chirp.variable} ${glacial.variable} ${mulish.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-mulish">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
