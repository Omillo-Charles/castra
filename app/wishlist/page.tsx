import { WishlistView } from "@/components/ui/WishlistView";

export const metadata = {
    title:       "My Wishlist",
    description: "Your saved products on Castra Households.",
    alternates:  { canonical: "/wishlist" },
    robots:      { index: false, follow: false }, // personal — not indexable
};

export default function WishlistPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <WishlistView />
        </div>
    );
}
