import { Suspense } from "react";
import { AccountForm } from "@/components/ui/AccountForm";

export const metadata = {
    title: "Sign In or Register",
    description: "Sign in to your Castra Households account or create a new one to track orders, save your wishlist, and enjoy a faster checkout.",
    alternates: { canonical: "/account" },
    openGraph: {
        title: "Sign In or Register | Castra Households",
        description: "Manage your orders, wishlist, and account at Castra Households.",
        url: "https://castrahouseholds.co.ke/account",
    },
};

// Dynamic — page receives ?error= from OAuth redirects and ?verified= from
// email verification. Static rendering would ignore these params.
export const dynamic = "force-dynamic";

export default function AccountPage() {
    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10 bg-[#0A0A0A]">
            <Suspense fallback={null}>
                <AccountForm />
            </Suspense>
        </div>
    );
}
