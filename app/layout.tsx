import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
    "Shop premium beddings, kitchenware, electronics, furniture, décor and more. Countrywide delivery across Kenya. Castra Households;What i elevating Kenyan living.",
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
    "best household websites in Kenya",
    "Household sellers in Kenya",
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
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/branding/icon.png",
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  name: "Castra Households",
  alternateName: ["Castra", "Castra Kicks"],
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/branding/logo.png`,
    width: 200,
    height: 200,
  },
  image: `${BASE_URL}/branding/og-image.png`,
  description: "Kenya's premier online household store offering premium beddings, kitchenware, home appliances, electronics, furniture, home décor, organizers, and footwear (Castra Kicks) with countrywide delivery across all 47 counties of Kenya. Payments accepted via M-Pesa.",
  foundingDate: "2024",
  foundingLocation: {
    "@type": "Place",
    name: "Nairobi, Kenya",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+254704147774",
      contactType: "customer service",
      contactOption: "TollFree",
      areaServed: "KE",
      availableLanguage: ["English", "Swahili"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+254704147774",
      contactType: "sales",
      areaServed: "KE",
      availableLanguage: ["English", "Swahili"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Accra Towers B10",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    postalCode: "00100",
    addressCountry: "KE",
  },
  knowsAbout: [
    "Household essentials Kenya",
    "Online shopping Kenya",
    "M-Pesa payments",
    "Beddings and linens",
    "Kitchenware Kenya",
    "Home appliances Kenya",
    "Furniture Kenya",
    "Home décor Kenya",
    "Premium footwear Kenya",
    "Countrywide delivery Kenya",
    "E-commerce Kenya",
    "Ramtons appliances",
    "Bruhm appliances",
    "Nike shoes Kenya",
    "Adidas shoes Kenya",
  ],
  sameAs: [
    "https://www.instagram.com/_castrahouseholds",
    "https://www.facebook.com/castrahouseholds",
    "https://www.tiktok.com/@castrahouseholds",
    "https://www.instagram.com/castra_kicks",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Castra Households Product Catalogue",
    itemListElement: [
      { "@type": "OfferCatalog", name: "Beddings & Linens", url: `${BASE_URL}/?category=beddings` },
      { "@type": "OfferCatalog", name: "Kitchenware", url: `${BASE_URL}/?category=kitchenware` },
      { "@type": "OfferCatalog", name: "Home Appliances", url: `${BASE_URL}/?category=home-appliances` },
      { "@type": "OfferCatalog", name: "Electronics", url: `${BASE_URL}/?category=electronics` },
      { "@type": "OfferCatalog", name: "Furniture", url: `${BASE_URL}/?category=furniture` },
      { "@type": "OfferCatalog", name: "Home Décor", url: `${BASE_URL}/?category=decor` },
      { "@type": "OfferCatalog", name: "Organizers", url: `${BASE_URL}/?category=organizers` },
      { "@type": "OfferCatalog", name: "Office Equipment", url: `${BASE_URL}/?category=office-equipments` },
      { "@type": "OfferCatalog", name: "Clothing", url: `${BASE_URL}/?category=clothing` },
      { "@type": "OfferCatalog", name: "Gifts", url: `${BASE_URL}/?category=gifts` },
      { "@type": "OfferCatalog", name: "Premium Footwear (Castra Kicks)", url: `${BASE_URL}/kicks` },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Castra Households",
  alternateName: "castrahouseholds.co.ke",
  url: BASE_URL,
  description: "Kenya's leading online household store. Shop beddings, kitchenware, appliances, furniture, electronics, décor, organizers, and footwear. Countrywide delivery. Pay via M-Pesa.",
  inLanguage: "en-KE",
  publisher: { "@id": `${BASE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Store", "OnlineStore"],
  "@id": `${BASE_URL}/#localbusiness`,
  name: "Castra Households",
  alternateName: "Castra Households Kenya",
  description: "Kenya's premier online household store offering premium beddings, kitchenware, electronics, furniture, décor, organizers, and footwear with countrywide delivery. Pay via M-Pesa.",
  url: BASE_URL,
  logo: `${BASE_URL}/branding/logo.png`,
  image: `${BASE_URL}/branding/og-image.png`,
  telephone: "+254704147774",
  email: "info@castrahouseholds.co.ke",
  priceRange: "KES 500 - KES 150,000",
  currenciesAccepted: "KES",
  paymentAccepted: "M-Pesa, M-Pesa Paybill, M-Pesa STK Push",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Accra Towers B10",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    postalCode: "00100",
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
    { "@type": "City", name: "Nyeri" },
    { "@type": "City", name: "Meru" },
    { "@type": "City", name: "Kitale" },
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
  sameAs: [
    "https://www.instagram.com/_castrahouseholds",
    "https://www.facebook.com/castrahouseholds",
    "https://www.tiktok.com/@castrahouseholds",
  ],
};

const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE_URL}/#webpage`,
  url: BASE_URL,
  name: "Castra Households | Premium Household Essentials in Kenya",
  description: "Kenya's premier online household store. Shop beddings, kitchenware, appliances, furniture, electronics, décor, and footwear. Countrywide delivery. Pay via M-Pesa.",
  inLanguage: "en-KE",
  isPartOf: { "@id": `${BASE_URL}/#website` },
  about: { "@id": `${BASE_URL}/#organization` },
  speakable: {
    "@type": "SpeakableSpecification",
    xPath: [
      "/html/head/title",
      "/html/head/meta[@name='description']/@content",
    ],
    cssSelector: [
      "h1",
      "h2",
      ".speakable",
    ],
  },
};

const categoryItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${BASE_URL}/#categories`,
  name: "Castra Households Product Categories",
  description: "Browse all product categories available at Castra Households Kenya",
  url: BASE_URL,
  numberOfItems: 11,
  itemListElement: [
    { "@type": "ListItem", position: 1,  name: "Beddings & Linens",          url: `${BASE_URL}/?category=beddings` },
    { "@type": "ListItem", position: 2,  name: "Kitchenware",                url: `${BASE_URL}/?category=kitchenware` },
    { "@type": "ListItem", position: 3,  name: "Home Appliances",            url: `${BASE_URL}/?category=home-appliances` },
    { "@type": "ListItem", position: 4,  name: "Electronics",                url: `${BASE_URL}/?category=electronics` },
    { "@type": "ListItem", position: 5,  name: "Furniture",                  url: `${BASE_URL}/?category=furniture` },
    { "@type": "ListItem", position: 6,  name: "Home Décor",                 url: `${BASE_URL}/?category=decor` },
    { "@type": "ListItem", position: 7,  name: "Organizers",                 url: `${BASE_URL}/?category=organizers` },
    { "@type": "ListItem", position: 8,  name: "Office Equipment",           url: `${BASE_URL}/?category=office-equipments` },
    { "@type": "ListItem", position: 9,  name: "Clothing",                   url: `${BASE_URL}/?category=clothing` },
    { "@type": "ListItem", position: 10, name: "Gifts",                      url: `${BASE_URL}/?category=gifts` },
    { "@type": "ListItem", position: 11, name: "Castra Kicks — Footwear",    url: `${BASE_URL}/kicks` },
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
        <JsonLd schema={speakableSchema} />
        <JsonLd schema={categoryItemListSchema} />
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
        <Analytics />
      </body>
    </html>
  );
}
