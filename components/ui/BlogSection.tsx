"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { BlogModal, type BlogPost } from "@/components/modals/blog";

const POSTS: BlogPost[] = [
  {
    id: "1",
    image: "/images/householdsbanner.jpg",
    date: "06 October 2026",
    category: "Home Living",
    readTime: "4 min read",
    title: "10 Ways to Elevate Your Living Room on a Budget",
    excerpt:
      "You don't need to spend a fortune to transform your living space. From statement cushions to smart storage organizers, Castra Households can help you refresh every corner of your home.",
    body: `A beautiful living room doesn't require a complete overhaul. With a few smart choices, you can completely transform how your space looks and feels without breaking the bank.

Start with your textiles. Swapping out old cushion covers and throws for fresh, coordinated pieces immediately lifts a room. At Castra Households, our beddings and linens range includes options that work just as well on sofas and accent chairs as they do in the bedroom.

Lighting makes a bigger difference than most people realise. A well-placed floor lamp or a set of warm-toned bulbs can shift the mood from flat and functional to cosy and inviting. Pair this with a few decorative pieces from our Home Décor collection and the transformation is complete.

Organisation is another underrated upgrade. Visible clutter is the enemy of a calm living space. Our range of storage organizers helps you tuck away everyday items while keeping surfaces clean and intentional.

Finally, don't underestimate the power of plants, mirrors, and artwork. These finishing touches add personality and depth to any room. Combine them with quality foundational pieces from Castra Households and you'll have a living room that looks like it cost far more than it did.`,
  },
  {
    id: "2",
    image: "/images/categories/kitchenware.png",
    date: "28 September 2026",
    category: "Kitchen Tips",
    readTime: "5 min read",
    title: "The Ultimate Guide to Outfitting Your Kitchen in Kenya",
    excerpt:
      "Whether you're setting up a new home or upgrading an existing kitchen, choosing the right cookware and accessories makes all the difference for every Kenyan household.",
    body: `Setting up a kitchen in Kenya involves a unique set of considerations — from cooking on gas to preparing meals for extended family. Getting your tools right from the start saves money and frustration in the long run.

Begin with your core cookware. A quality set of pots and pans that distributes heat evenly is the single most important investment. Look for heavy-bottomed stainless steel or hard-anodised options that work well on both gas and electric cookers. Castra Households stocks a curated range of cookware sets that strike the right balance between quality and value.

Next, think about your prep tools. A sharp knife set, a reliable cutting board, and a good set of mixing bowls will cover 90% of your daily cooking needs. These aren't glamorous purchases, but they make cooking faster and more enjoyable.

Don't overlook storage. Kenyan kitchens often have limited counter space, so wall-mounted racks, pot hangers, and drawer organisers go a long way. Our Organizers category has plenty of options specifically designed for compact kitchen layouts.

Finally, consider small appliances. A blender, electric kettle, and toaster are staples in most Kenyan homes. Browse our Electronics and Home Appliances categories for reliable, energy-efficient options at fair prices.`,
  },
  {
    id: "3",
    image: "/images/categories/furniture.png",
    date: "05 September 2026",
    category: "Furniture & Décor",
    readTime: "5 min read",
    title: "How to Choose Furniture That Lasts — A Buyer's Guide",
    excerpt:
      "Investing in quality furniture means thinking beyond aesthetics. Learn what materials and construction styles will keep your Castra pieces looking great for years to come.",
    body: `Furniture is one of the biggest investments you'll make in your home, so it pays to get it right the first time. The wrong choice doesn't just cost money — it costs space, time, and the frustration of replacing pieces that wear out too quickly.

The most important factor is the frame. Solid hardwood frames are the gold standard for longevity. They resist warping, handle weight well, and can be repaired if damaged. Avoid particleboard frames for anything load-bearing — they look fine at first but deteriorate quickly, especially in humid climates.

Joints matter just as much as materials. Dovetail and mortise-and-tenon joints are signs of quality construction. If a piece is assembled with staples or glue alone, it won't hold up to daily use.

For upholstered pieces, pay attention to the fill and fabric. High-density foam holds its shape far longer than low-density alternatives. For fabric, look for tightly woven options with a high rub count — anything above 15,000 is considered durable for home use.

Finally, think about scale. Furniture that's too large makes a room feel cramped; too small and it feels incomplete. Measure your space carefully before purchasing, and don't forget to account for walkways and door clearances. The pieces in the Castra Households Furniture collection are designed with Kenyan home proportions in mind.`,
  },
  {
    id: "4",
    image: "/images/categories/homeappliances.png",
    date: "18 August 2026",
    category: "Appliances",
    readTime: "4 min read",
    title: "Must-Have Home Appliances for Every Modern Kenyan Home",
    excerpt:
      "From energy-efficient cookers to smart blenders, we round up the essential home appliances changing how Kenyan families cook, clean, and live every day.",
    body: `The right home appliances don't just make life more convenient — they genuinely change how you live. Here are the essentials that every modern Kenyan home should consider.

A reliable cooker or oven is the foundation of any well-equipped kitchen. Whether you cook for two or for a large family, having consistent, controllable heat makes a real difference to the quality of your meals. Look for models with energy-saving features — with electricity costs in Kenya, efficiency matters.

A blender or food processor is another must-have. From smoothies to sauces to batters, a quality blender saves time every single day. The difference between a KSh 800 blender and a quality KSh 3,500 one is enormous in terms of motor life and blending power.

For laundry, a washing machine is increasingly accessible and practical, especially in urban apartments where hand-washing large items is impractical. Front-loaders use significantly less water than top-loaders — an important consideration in Nairobi.

Smaller appliances that punch above their weight include the electric kettle, the rice cooker, and the sandwich maker. Each one reduces cooking time and energy use compared to stovetop alternatives.

Browse the full range of home appliances at Castra Households, where we stock reliable brands including Ramtons, Bruhm, and Von at prices that make sense for Kenyan households.`,
  },
  {
    id: "5",
    image: "/images/footwearbanner.jpg",
    date: "02 August 2026",
    category: "Castra Kicks",
    readTime: "3 min read",
    title: "Style Meets Comfort: The Castra Kicks Story",
    excerpt:
      "Castra Kicks started with a simple idea — premium footwear shouldn't cost a premium. Discover how our curated collection is redefining everyday style for Kenyans.",
    body: `Castra Kicks was born from a simple observation: most Kenyans wanted access to premium, stylish footwear without paying the inflated prices that came with imported retail markup.

The collection started small — a handful of carefully selected sneaker styles and a few formal options for men and women. The response was immediate. Customers appreciated the curation, the quality, and the honest pricing. Word spread quickly.

Today, Castra Kicks stocks heels, sandals, flats, sneakers, boots, and formal options for both men and women — all sourced from quality suppliers and offered at prices that reflect the value, not the brand tax.

What sets Castra Kicks apart isn't just the price. It's the attention to comfort. Every style in the collection is assessed not just for how it looks, but for how it feels after eight hours. We believe you shouldn't have to choose between looking good and feeling good.

The Instagram page @castra_kicks has become a community of its own — regular style drops, customer features, and exclusive previews for followers. If you haven't followed yet, it's worth a visit.

Browse the full Castra Kicks collection on our dedicated footwear page and find your next favourite pair.`,
  },
  {
    id: "6",
    image: "/images/homebanner.jpeg",
    date: "15 July 2026",
    category: "Lifestyle",
    readTime: "3 min read",
    title: "Creating a Welcoming Home: Small Changes, Big Impact",
    excerpt:
      "The secret to a beautiful home isn't a full renovation — it's the thoughtful details. Beddings, décor accents, and smart organizers can completely change how a room feels.",
    body: `There's a version of home improvement that doesn't require a contractor, a large budget, or a weekend of hard labour. It starts with paying attention to the small things — the things you stop noticing because they've always been there.

Start with your bedding. The bedroom is the room you begin and end every day in, and the quality of your bedding has a direct effect on how well you rest. Fresh, soft bedsheets with a high thread count don't just feel better — they signal to your mind that this is a place of comfort and rest. Castra Households stocks premium beddings in a range of sizes, colours, and fabrics.

Move to your entryway. The first thing you and your guests see when entering your home sets the tone for everything else. A clean doormat, a small shelf or hook for keys, and a single decorative piece can transform an afterthought into a welcoming statement.

In the kitchen, small organisational upgrades go a long way. A tidy spice rack, coordinated storage containers, and clear drawer dividers make cooking more enjoyable and the kitchen more pleasant to be in even when you're not cooking.

Finally, fragrance is the most underrated element of a welcoming home. A subtle candle or reed diffuser creates an atmosphere that visitors remember long after they leave.

None of these changes are expensive. All of them are available at Castra Households. The impact, however, is anything but small.`,
  },
];

const VISIBLE = 3;

export function BlogGrid() {
  const [page, setPage] = useState(0);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const totalPages = Math.ceil(POSTS.length / VISIBLE);
  const visible = POSTS.slice(page * VISIBLE, page * VISIBLE + VISIBLE);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <span className="w-1 h-5 rounded-full bg-[#C6A16A]" />
          <h2 className="text-sm font-extrabold uppercase tracking-widest text-white">
            Our Blog
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="w-7 h-7 flex items-center justify-center rounded border border-zinc-700
                       text-zinc-400 hover:text-white hover:border-[#C6A16A] hover:bg-[#C6A16A]/10
                       disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="w-7 h-7 flex items-center justify-center rounded border border-zinc-700
                       text-zinc-400 hover:text-white hover:border-[#C6A16A] hover:bg-[#C6A16A]/10
                       disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {visible.map((post) => (
          <article
            key={post.id}
            className="group flex flex-col bg-zinc-900 rounded-xl border border-zinc-800
                       hover:border-[#C6A16A]/40 hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <div
              className="w-full aspect-[4/3] overflow-hidden bg-zinc-800 flex-shrink-0 cursor-pointer"
              onClick={() => setActivePost(post)}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex flex-col flex-1 p-4 gap-2.5">
              <p className="text-[10px] text-zinc-500 font-semibold">{post.date}</p>

              <h3
                className="text-sm font-bold text-white font-glacial leading-snug line-clamp-2
                           group-hover:text-[#C6A16A] transition-colors cursor-pointer"
                onClick={() => setActivePost(post)}
              >
                {post.title}
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 flex-1">
                {post.excerpt}
              </p>

              <button
                type="button"
                onClick={() => setActivePost(post)}
                className="mt-1 w-full flex items-center justify-center gap-2 py-2 rounded
                           border border-zinc-700 hover:border-[#C6A16A] hover:bg-[#C6A16A]/8
                           text-[10px] font-extrabold uppercase tracking-widest
                           text-zinc-300 hover:text-[#C6A16A] transition-all duration-200"
              >
                Read More
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </article>
        ))}
      </div>

      <BlogModal
        post={activePost}
        isOpen={!!activePost}
        onClose={() => setActivePost(null)}
      />
    </div>
  );
}
