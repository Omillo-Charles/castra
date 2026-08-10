import { CartView } from "@/components/ui/CartView";

export const metadata = {
    title: "Your Cart",
    description: "Review your items and proceed to checkout. Castra Households — countrywide delivery across Kenya.",
    alternates: { canonical: "/cart" },
    robots: { index: false, follow: false }, // cart is session-specific
};

export default function CartPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <CartView />
        </div>
    );
}
