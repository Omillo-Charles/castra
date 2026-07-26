import { CartView } from "@/components/ui/CartView";

export const metadata = {
    title: "Cart – Castra Households",
    description: "Your shopping cart.",
};

export default function CartPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <CartView />
        </div>
    );
}
