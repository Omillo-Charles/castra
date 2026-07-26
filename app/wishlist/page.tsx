import { WishlistView } from "@/components/ui/WishlistView";

export const metadata = {
    title: "Wishlist – Castra Households",
    description: "Your saved items.",
};

export default function WishlistPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <WishlistView />
        </div>
    );
}
