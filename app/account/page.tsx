import { AccountForm } from "@/components/ui/AccountForm";

export const metadata = {
    title: "Account – Castra Households",
    description: "Sign in or create a Castra account.",
};

export default function AccountPage() {
    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10 bg-[#0A0A0A]">
            <AccountForm />
        </div>
    );
}
