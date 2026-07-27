import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { chirp, glacial, mulish } from "@/config/fonts";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { AuthProvider } from "@/context/AuthContext";
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
  title: "Castra Household ",
  description: "Premium household essentials delivered to your doorstep.",
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
      <body className="min-h-full flex flex-col font-mulish bg-white dark:bg-[#0A0A0A] text-zinc-900 dark:text-zinc-100">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
