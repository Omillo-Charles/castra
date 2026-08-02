"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Truck,
  CreditCard,
  ArrowRight,
  Headphones,
} from "lucide-react";
import { InstagramIcon, FacebookIcon, TikTokIcon } from "@/components/svgicons";
import { scrollToProducts } from "@/lib/scrollToProducts";
import { useToast } from "@/context/ToastContext";

const FOOTER_CATEGORIES = [
  { name: "Beddings", slug: "beddings" },
  { name: "Home Appliances", slug: "home-appliances" },
  { name: "Kitchenware", slug: "kitchenware" },
  { name: "Organizers", slug: "organizers" },
  { name: "Electronics", slug: "electronics" },
  { name: "Decor", slug: "decor" },
  { name: "Office Equipments", slug: "office-equipments" },
  { name: "Furniture", slug: "furniture" },
  { name: "Gifts", slug: "gifts" },
];

const CUSTOMER_CARE = [
  { name: "Track Your Order", href: "/track-order" },
  { name: "Shipping & Delivery Policy", href: "/shipping-policy" },
  { name: "Returns & Exchanges", href: "/returns" },
  { name: "FAQs & Help Center", href: "/faq" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Privacy Policy", href: "/privacy" },
];

export function Footer() {
  const { success } = useToast();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    success("Subscribed successfully!");
    setEmail("");
  };
  return (
    <footer className="w-full bg-black text-zinc-400 border-t border-zinc-800/80 transition-colors duration-200 mt-auto">

      {/* TRUST BADGES BANNER */}
      <div className="w-full border-b border-zinc-800/60 bg-zinc-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 hover:border-[#C6A16A]/40 transition-colors">
              <div className="p-3 rounded-xl bg-[#C6A16A]/10 text-[#C6A16A]">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Countrywide Delivery</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Fast & reliable delivery to your doorstep</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 hover:border-[#C6A16A]/40 transition-colors">
              <div className="p-3 rounded-xl bg-[#C6A16A]/10 text-[#C6A16A]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Quality Guarantee</h4>
                <p className="text-xs text-zinc-400 mt-0.5">100% authentic household essentials</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 hover:border-[#C6A16A]/40 transition-colors">
              <div className="p-3 rounded-xl bg-[#C6A16A]/10 text-[#C6A16A]">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Secure Payments</h4>
                <p className="text-xs text-zinc-400 mt-0.5">M-Pesa Express</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/60 hover:border-[#C6A16A]/40 transition-colors">
              <div className="p-3 rounded-xl bg-[#C6A16A]/10 text-[#C6A16A]">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Dedicated Support</h4>
                <p className="text-xs text-zinc-400 mt-0.5">Friendly customer help available 24/7</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* NEWSLETTER SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="relative rounded-3xl p-8 md:p-10 bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-[#C6A16A]/25 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-[#C6A16A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C6A16A]">
                Stay Connected
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-glacial mt-1">
                Subscribe to Exclusive Offers
              </h3>
              <p className="text-sm text-zinc-400 mt-2">
                Join our newsletter to receive secret deals, new category arrivals, and home styling inspiration straight to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-full bg-zinc-950/80 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#C6A16A] transition-colors"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-7 py-3.5 rounded-full bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg whitespace-nowrap"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand Info (2 Columns wide on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="relative w-12 h-12 rounded-xl bg-zinc-900 p-1 border border-[#C6A16A]/30 overflow-hidden flex items-center justify-center">
                <Image
                  src="/branding/logo.png"
                  alt="Castra Logo"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-white font-glacial group-hover:text-[#C6A16A] transition-colors">
                  CASTRA
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#C6A16A] font-semibold">
                  Households
                </span>
              </div>
            </Link>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Elevating everyday living with premium, curated household items, kitchenware, and luxury home essentials delivered countrywide across Kenya.
            </p>

            {/* Social Icons */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-zinc-400 block mb-3 uppercase tracking-wider">
                Follow Our Journey
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/_castrahouseholds?igsh=MWpsZHFrdzZjOGJvYw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#C6A16A] hover:border-[#C6A16A]/50 hover:bg-[#C6A16A]/10 transition-all duration-200"
                  title="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.tiktok.com/@castrahouseholds?_r=1&_t=ZS-98MRIOkLRlF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#C6A16A] hover:border-[#C6A16A]/50 hover:bg-[#C6A16A]/10 transition-all duration-200"
                  title="TikTok"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/share/1EX8Veqo2R/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#C6A16A] hover:border-[#C6A16A]/50 hover:bg-[#C6A16A]/10 transition-all duration-200"
                  title="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-zinc-800 pb-2 inline-block">
              Shop Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              {FOOTER_CATEGORIES.map((cat) => (
                <li key={cat.name}>
                  <button
                    type="button"
                    onClick={() => scrollToProducts(cat.slug)}
                    className="text-zinc-400 hover:text-[#C6A16A] transition-colors hover:underline cursor-pointer text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-zinc-800 pb-2 inline-block">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs">
              {CUSTOMER_CARE.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-zinc-400 hover:text-[#C6A16A] transition-colors hover:underline"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-zinc-800 pb-2 inline-block">
              Get In Touch
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-3 text-zinc-400">
                <MapPin className="w-4 h-4 text-[#C6A16A] flex-shrink-0 mt-0.5" />
                <span>Accra Towers B10, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <Phone className="w-4 h-4 text-[#C6A16A] flex-shrink-0" />
                <a href="tel:+254700000000" className="hover:text-[#C6A16A] transition-colors">
                  +254 704 147 774
                </a>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <Mail className="w-4 h-4 text-[#C6A16A] flex-shrink-0" />
                <a href="mailto:info@castrahouseholds.co.ke" className="hover:text-[#C6A16A] transition-colors">
                  info@castrahouseholds.co.ke
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-zinc-800/80">
              <span className="text-[11px] text-zinc-400 block mb-2 font-medium">Payment Methods Accepted:</span>
              <div className="flex items-center gap-2 flex-wrap text-[10px]">
                <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold">
                  M-PESA
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM SUB-FOOTER & CREDITS */}
      <div className="w-full bg-black border-t border-zinc-900 py-6 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">

          <p>© {new Date().getFullYear()} CASTRA Households. All rights reserved.</p>

          {/* Developer Attribution (Build & maintained by OMYT3CH) */}
          <p className="flex items-center gap-1">
            <span>Built & maintained by</span>
            <a
              href="https://omytech.co.ke"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#C6A16A] hover:underline hover:text-[#b59059] transition-colors"
            >
              OMYT3CH
            </a>
          </p>

        </div>
      </div>

    </footer>
  );
}
