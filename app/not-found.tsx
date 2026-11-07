import Link from "next/link";
import Image from "next/image";
import { Home, Search, ShoppingBag, ArrowRight } from "lucide-react";

const QUICK_LINKS = [
  { label: "Beddings", slug: "beddings" },
  { label: "Kitchenware", slug: "kitchenware" },
  { label: "Home Appliances", slug: "home-appliances" },
  { label: "Furniture", slug: "furniture" },
  { label: "Electronics", slug: "electronics" },
  { label: "Organizers", slug: "organizers" },
] as const;

export default function NotFound() {
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-20 bg-[#0A0A0A] relative overflow-hidden">

      {/* Background glow blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C6A16A]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[300px] bg-[#C6A16A]/4 rounded-full blur-3xl pointer-events-none" />

      {/* Main card */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center gap-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-[#C6A16A]/30 p-1.5 flex items-center justify-center shadow-lg">
            <Image
              src="/branding/logo.png"
              alt="Castra Households"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-glacial font-bold text-xl text-white group-hover:text-[#C6A16A] transition-colors leading-tight tracking-tight">
              CASTRA
            </span>
            <span className="text-[9px] tracking-widest uppercase text-[#C6A16A] font-semibold leading-tight">
              Households
            </span>
          </div>
        </Link>

        {/* 404 number */}
        <div className="relative select-none">
          <p
            className="font-glacial font-bold text-white/[0.04] leading-none tracking-tight pointer-events-none"
            style={{ fontSize: "clamp(7rem, 22vw, 14rem)" }}
          >
            404
          </p>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#C6A16A]">
              Page Not Found
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold font-glacial text-white leading-snug">
              Looks like this page moved.
            </h1>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-400 leading-relaxed max-w-md -mt-2">
          The page you are looking for does not exist or has been moved. Head back home and continue browsing our collection of premium household essentials.
        </p>

        {/* Primary CTAs */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#C6A16A] hover:bg-[#b59059]
                       text-zinc-950 font-extrabold text-xs uppercase tracking-wide
                       transition-all hover:scale-[1.03] shadow-md"
          >
            <Home className="w-3.5 h-3.5" />
            Back to Home
          </Link>

          <Link
            href="/?search="
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700
                       hover:border-[#C6A16A]/50 text-zinc-300 hover:text-[#C6A16A]
                       font-bold text-xs uppercase tracking-wide transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            Search Products
          </Link>
        </div>

        {/* Divider */}
        <div className="w-full flex items-center gap-4">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
            Or explore a category
          </span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* Quick category links */}
        <div className="flex flex-wrap gap-2 justify-center">
          {QUICK_LINKS.map((cat) => (
            <Link
              key={cat.slug}
              href={`/?category=${cat.slug}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-900
                         border border-zinc-800 hover:border-[#C6A16A]/50 hover:bg-[#C6A16A]/5
                         text-xs font-semibold text-zinc-400 hover:text-[#C6A16A]
                         transition-all duration-200"
            >
              {cat.label}
              <ArrowRight className="w-3 h-3" />
            </Link>
          ))}
        </div>

        {/* Kicks shortcut */}
        <Link
          href="/kicks"
          className="flex items-center gap-2 text-xs font-semibold text-zinc-500
                     hover:text-[#C6A16A] transition-colors"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Looking for footwear? Visit Castra Kicks
        </Link>

      </div>
    </div>
  );
}
