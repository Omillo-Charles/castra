"use client";

import { useRouter } from "next/navigation";
import { scrollToProducts } from "@/lib/scrollToProducts";

const CATEGORIES = [
  { label: "Beddings", slug: "beddings", image: "/images/allcategories/beddings.png" },
  { label: "Home Appliances", slug: "home-appliances", image: "/images/allcategories/homeappliances.png" },
  { label: "Kitchenware", slug: "kitchenware", image: "/images/allcategories/kitchenware.png" },
  { label: "Organizers", slug: "organizers", image: "/images/allcategories/organizers.png" },
  { label: "Electronics", slug: "electronics", image: "/images/allcategories/electronics.png" },
  { label: "Decor", slug: "decor", image: "/images/allcategories/decor.png" },
  { label: "Office Equipment", slug: "office-equipments", image: "/images/allcategories/officeequipment.png" },
  { label: "Furniture", slug: "furniture", image: "/images/allcategories/furniture.png" },
  { label: "Gifts", slug: "gifts", image: "/images/allcategories/gifts.png" },
  { label: "Clothing", slug: "clothing", image: "/images/allcategories/clothing.png" },
] as const;

export function CategoriesGrid() {
  const router = useRouter();

  const handleClick = (slug: string) => {
    router.push(`/?category=${slug}`, { scroll: false });
    setTimeout(() => scrollToProducts(slug), 100);
  };

  return (
    <section className="w-full bg-[#0A0A0A] border-b border-zinc-800 py-10">
      <div className="w-full px-4 sm:px-6 lg:px-8">

        <div className="flex items-center gap-3 mb-6 pb-3 border-b border-zinc-800">
          <span className="w-1 h-5 rounded-full bg-[#C6A16A]" />
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-white">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => handleClick(cat.slug)}
              className="group relative rounded-xl overflow-hidden border border-zinc-800
                         hover:border-[#C6A16A]/50 transition-all duration-300 cursor-pointer
                         aspect-square bg-zinc-900"
            >
              {/* Category image */}
              <img
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover object-center
                           group-hover:scale-105 transition-transform duration-500"
              />

              {/* Radial gradient — starts at center bottom, spreads outward */}
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse 160% 120% at 50% 100%, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.88) 30%, rgba(198,161,106,0.18) 55%, transparent 80%)",
                }}
              />

              {/* Label */}
              <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col gap-1">
                <p className="text-xs sm:text-sm font-bold text-white font-glacial leading-tight
                               group-hover:text-[#C6A16A] transition-colors duration-200">
                  {cat.label}
                </p>
                <span className="text-[9px] font-extrabold uppercase tracking-widest
                                 text-[#C6A16A] opacity-0 group-hover:opacity-100
                                 transition-opacity duration-200">
                  Shop Now
                </span>
              </div>

              {/* Top-left gold accent dot */}
              <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-[#C6A16A]
                              opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
