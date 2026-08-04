import { Suspense } from "react";
import { HeroBanner } from "@/components/ui/heroBanner";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { Loader2 } from "lucide-react";

// Force dynamic rendering — this page depends on URL search params
// (?search=, ?category=, ?page=, ?sort=). Without this Next.js may attempt
// to statically render the page and fail to complete React hydration when
// those params are present, breaking all interactivity after a hard refresh.
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <HeroBanner />

      {/* Products section — scroll target for category nav links */}
      <section id="products" className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        {/*
          Suspense is required here because ProductGrid uses useSearchParams()
          internally. Without this boundary, any URL with query params causes
          React to suspend during hydration, leaving the page non-interactive.
        */}
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-24 text-zinc-400 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#C6A16A]" />
            <p className="text-sm font-semibold">Fetching collection...</p>
          </div>
        }>
          <ProductGrid />
        </Suspense>
      </section>
    </div>
  );
}
