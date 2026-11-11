import { Suspense } from "react";
import { HeroBanner } from "@/components/ui/heroBanner";
import { FeaturedSection } from "@/components/ui/FeaturedSection";
import { ProductGrid } from "@/components/ui/ProductGrid";
import { CategoriesGrid } from "@/components/ui/CategoriesGrid";
import { HomeSchema } from "@/components/seo/HomeSchema";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ search?: string; category?: string; page?: string; sort?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const isFiltering = !!(params.search?.trim() || params.category?.trim());

  return (
    <div className="flex flex-col flex-1">
      <HomeSchema />
      {!isFiltering && <HeroBanner />}
      {!isFiltering && <FeaturedSection />}

      <section id="products" className="w-full bg-[#0A0A0A] border-b border-zinc-800 py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <Suspense fallback={null}>
            <ProductGrid />
          </Suspense>
        </div>
      </section>

      {!isFiltering && <CategoriesGrid />}
    </div>
  );
}
