import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { chirp, glacial, mulish } from "@/config/fonts";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/context/ToastContext";
import { JsonLd } from "@/components/seo/JsonLd";
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
  // Core
  title: {
    default: "Castra Households | Premium Household Essentials in Kenya",
    template: "%s | Castra Households",
  },
  description:
    "Shop premium beddings, kitchenware, electronics, furniture, décor and more. Countrywide delivery across Kenya. Castra Households — elevating Kenyan living.",
  keywords: [
    // Brand
    "Castra Households",
    "Castra Kicks",
    "castrahouseholds.co.ke",
    // High-intent discovery queries
    "best household website Kenya",
    "best online household store Kenya",
    "household shopping online Kenya",
    "buy home essentials Kenya",
    "household items online Kenya",
    "home goods delivery Kenya",
    "household items Nairobi delivery",
    // Product categories
    "household essentials Kenya",
    "beddings Kenya",
    "premium bedding Kenya",
    "kitchenware Nairobi",
    "kitchen accessories Kenya",
    "kitchenware online Kenya",
    "home appliances Kenya",
    "home appliances online Kenya",
    "electronics Kenya",
    "furniture Kenya",
    "online furniture store Kenya",
    "home decor Kenya",
    "affordable home decor Nairobi",
    "organizers Kenya",
    "premium footwear Kenya",
    // Broader shopping
    "online shopping Kenya",
    "best online shop Kenya",
    "e-commerce Kenya household",
    "countrywide delivery Kenya",
    "M-Pesa online shopping Kenya",
  ],
  authors: [{ name: "Castra Households", url: "https://castrahouseholds.co.ke" }],
  creator: "Castra Households",
  publisher: "Castra Households",

  // Canonical & alternates
  metadataBase: new URL("https://castrahouseholds.co.ke"),
  alternates: {
    canonical: "/",
  },

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://castrahouseholds.co.ke",
    siteName: "Castra Households",
    title: "Castra Households | Premium Household Essentials in Kenya",
    description:
      "Shop premium beddings, kitchenware, electronics, furniture and more. Countrywide delivery across Kenya.",
    images: [
      {
        url: "/branding/og-image.png",
        width: 1200,
        height: 630,
        alt: "Castra Households — Premium Living, Made Accessible",
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card: "summary_large_image",
    title: "Castra Households | Premium Household Essentials in Kenya",
    description:
      "Shop premium beddings, kitchenware, electronics, furniture and more. Countrywide delivery across Kenya.",
    images: ["/branding/og-image.png"],
    creator: "@castrahouseholds",
  },

  // Icons
  icons: {
    icon: "/branding/icon.png",
    apple: "/branding/icon.png",
    shortcut: "/branding/icon.png",
  },

  // Crawler directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Google site verification
  verification: {
    google: "FnVBU6mLz3yXajnqyzCdWHCxqxmtt7efkmoP18Z9xdc",
  },

  // App / manifest
  applicationName: "Castra Households",
  category: "shopping",
};

const BASE_URL = "https://castrahouseholds.co.ke";

// JSON-LD: Organization
// Establishes the brand entity in Google's Knowledge Graph.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Castra Households",
  url: BASE_URL,
  logo: `${BASE_URL}/branding/logo.png`,
  description: "Premium household essentials, footwear, and décor with countrywide delivery across Kenya.",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+254704147774",
    contactType: "customer service",
    areaServed: "KE",
    availableLanguage: "English",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Accra Towers B10",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  sameAs: [
    "https://www.instagram.com/_castrahouseholds",
    "https://www.facebook.com/castrahouseholds",
    "https://www.tiktok.com/@castrahouseholds",
  ],
};

// JSON-LD: WebSite
// Enables Google's Sitelinks Searchbox in search results.
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Castra Households",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

// JSON-LD: LocalBusiness + Store
// Critical for local Kenyan search rankings. Tells Google this is a
// physical/local business serving Kenya, which surfaces it in
// "best household stores in Kenya" and map-adjacent queries.
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Store"],
  "@id": `${BASE_URL}/#localbusiness`,
  name: "Castra Households",
  description: "Kenya's premier online household store offering premium beddings, kitchenware, electronics, furniture, décor, organizers, and footwear with countrywide delivery.",
  url: BASE_URL,
  logo: `${BASE_URL}/branding/logo.png`,
  image: `${BASE_URL}/branding/og-image.png`,
  telephone: "+254704147774",
  email: "info@castrahouseholds.co.ke",
  priceRange: "KES",
  currenciesAccepted: "KES",
  paymentAccepted: "Cash, M-Pesa",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Accra Towers B10",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    addressCountry: "KE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -1.2921,
    longitude: 36.8219,
  },
  areaServed: [
    { "@type": "Country", name: "Kenya" },
    { "@type": "City", name: "Nairobi" },
    { "@type": "City", name: "Mombasa" },
    { "@type": "City", name: "Kisumu" },
    { "@type": "City", name: "Nakuru" },
    { "@type": "City", name: "Eldoret" },
    { "@type": "City", name: "Thika" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "10:00",
      closes: "18:00",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Castra Households Product Catalogue",
    itemListElement: [
      { "@type": "OfferCatalog", name: "Beddings & Linens" },
      { "@type": "OfferCatalog", name: "Kitchenware" },
      { "@type": "OfferCatalog", name: "Electronics" },
      { "@type": "OfferCatalog", name: "Furniture" },
      { "@type": "OfferCatalog", name: "Home Décor" },
      { "@type": "OfferCatalog", name: "Organizers" },
      { "@type": "OfferCatalog", name: "Footwear" },
    ],
  },
  sameAs: [
    "https://www.instagram.com/_castrahouseholds",
    "https://www.facebook.com/castrahouseholds",
    "https://www.tiktok.com/@castrahouseholds",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${chirp.variable} ${glacial.variable} ${mulish.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-mulish bg-[#0A0A0A] text-zinc-100">
        <JsonLd schema={organizationSchema} />
        <JsonLd schema={websiteSchema} />
        <JsonLd schema={localBusinessSchema} />
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
