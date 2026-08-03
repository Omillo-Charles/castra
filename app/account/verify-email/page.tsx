"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle, ArrowRight, Mail } from "lucide-react";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const router       = useRouter();
    const token        = searchParams.get("token");

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error,   setError]   = useState("");

    useEffect(() => {
        if (!token) {
            setLoading(false);
            setError("No verification token provided.");
            return;
        }

        // Call backend verification endpoint directly
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5500/api/v1";
        fetch(`${API_URL}/auth/verify-email?token=${token}`, {
            method: "GET",
            credentials: "include",
        })
            .then((res) => {
                if (res.redirected) {
                    window.location.href = res.url;
                    return;
                }
                if (res.ok) {
                    setSuccess(true);
                } else {
                    setError("Invalid or expired verification link.");
                }
            })
            .catch(() => setError("Unable to connect to verification server."))
            .finally(() => setLoading(false));
    }, [token, router]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center text-center gap-4 py-12">
                <span className="w-8 h-8 border-2 border-zinc-700 border-t-[#C6A16A] rounded-full animate-spin" />
                <p className="text-sm font-semibold text-zinc-300">Verifying your email address…</p>
            </div>
        );
    }

    if (success) {
        return (
            <div className="flex flex-col items-center text-center gap-5 py-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <div className="space-y-1.5">
                    <h1 className="text-xl font-bold text-white font-glacial">Email verified!</h1>
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                        Your account is now fully active. You can manage your orders and profile on Castra.
                    </p>
                </div>
                <Link
                    href="/account/dashboard"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] active:scale-[0.98] text-zinc-950 font-bold text-sm transition-all shadow-md"
                >
                    Go to Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center text-center gap-5 py-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <div className="space-y-1.5">
                <h1 className="text-xl font-bold text-white font-glacial">Verification link invalid</h1>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                    {error || "This link may have expired or already been used."}
                </p>
            </div>
            <Link
                href="/account"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] active:scale-[0.98] text-zinc-950 font-bold text-sm transition-all shadow-md"
            >
                Back to Account Sign In <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10 bg-[#0A0A0A]">
            <div className="w-full max-w-md bg-[#111111] rounded-3xl p-8 border border-zinc-800 shadow-2xl">
                <div className="flex flex-col items-center mb-6">
                    <Link href="/" className="flex items-center gap-2.5 mb-2 group">
                        <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-[#C6A16A]/40 p-1 flex items-center justify-center">
                            <Image src="/branding/logo.png" alt="Castra" width={32} height={32} className="object-contain" />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="font-glacial font-bold text-xl text-white group-hover:text-[#C6A16A] transition-colors leading-tight">CASTRA</span>
                            <span className="text-[9px] tracking-widest uppercase text-[#C6A16A] font-semibold leading-none">Households</span>
                        </div>
                    </Link>
                </div>
                <Suspense fallback={
                    <div className="flex items-center justify-center py-10">
                        <span className="w-6 h-6 border-2 border-zinc-200 border-t-[#C6A16A] rounded-full animate-spin" />
                    </div>
                }>
                    <VerifyEmailContent />
                </Suspense>
            </div>
        </div>
    );
}
