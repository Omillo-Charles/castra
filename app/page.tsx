import { HeroBanner } from "@/components/ui/heroBanner";
import { ProductGrid } from "@/components/ui/ProductGrid";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <HeroBanner />

      {/* Products section — scroll target for category nav links */}
      <section id="products" className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <ProductGrid />
      </section>
    </div>
  );
}
