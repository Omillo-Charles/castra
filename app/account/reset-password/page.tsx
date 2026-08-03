"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = {
    title: "Reset Password – Castra Households",
    description: "Set a new password for your Castra account.",
};

/* ─── Inner page — needs searchParams (wrapped in Suspense below) ─── */
function ResetPasswordContent() {
    const searchParams  = useSearchParams();
    const token         = searchParams.get("token");

    const [password,    setPassword]    = useState("");
    const [confirm,     setConfirm]     = useState("");
    const [showPwd,     setShowPwd]     = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading,     setLoading]     = useState(false);
    const [done,        setDone]        = useState(false);
    const [error,       setError]       = useState("");

    // Strength helpers
    const strength = (() => {
        if (password.length === 0) return 0;
        let score = 0;
        if (password.length >= 8)                          score++;
        if (/[A-Z]/.test(password))                        score++;
        if (/[0-9]/.test(password))                        score++;
        if (/[^A-Za-z0-9]/.test(password))                 score++;
        return score;
    })();

    const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
    const strengthColor = ["", "bg-red-500", "bg-amber-500", "bg-yellow-400", "bg-emerald-500"][strength];
    const strengthText  = ["", "text-red-500", "text-amber-500", "text-yellow-400", "text-emerald-500"][strength];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!token) {
            setError("This reset link is invalid or has expired. Please request a new one.");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        if (password !== confirm) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            // TODO: wire to POST /api/v1/auth/reset-password once the backend is ready
            // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
            //     method:  "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body:    JSON.stringify({ token, password }),
            // });
            // if (!res.ok) {
            //     const data = await res.json();
            //     throw new Error(data.message || "Failed to reset password.");
            // }

            // Simulated delay while backend is not yet wired
            await new Promise(r => setTimeout(r, 1400));
            setDone(true);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    /* ── Invalid / missing token ── */
    if (!token) {
        return (
            <div className="flex flex-col items-center text-center gap-5 py-4">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-red-500" />
                </div>
                <div className="space-y-1.5">
                    <p className="text-base font-bold text-white">Invalid reset link</p>
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                        This link is missing a reset token. Please request a new one from the sign-in page.
                    </p>
                </div>
                <Link
                    href="/account"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-bold text-sm transition-all shadow-md"
                >
                    Go to Sign In <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        );
    }

    /* ── Success state ── */
    if (done) {
        return (
            <div className="flex flex-col items-center text-center gap-5 py-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <div className="space-y-1.5">
                    <p className="text-base font-bold text-white">Password updated!</p>
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                        Your password has been reset successfully. You can now sign in with your new password.
                    </p>
                </div>
                <Link
                    href="/account"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] active:scale-[0.98] text-zinc-950 font-bold text-sm transition-all shadow-md hover:shadow-lg"
                >
                    Sign In <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        );
    }

    /* ── Reset form ── */
    return (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>

            {/* New password */}
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 block tracking-wide">
                    New password
                </label>
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-zinc-700/80 bg-zinc-900/60 focus-within:border-[#C6A16A] focus-within:bg-zinc-900 focus-within:ring-2 focus-within:ring-[#C6A16A]/10 transition-all duration-200">
                    <span className="text-zinc-500 flex-shrink-0">
                        <Lock className="w-4 h-4" />
                    </span>
                    <input
                        type={showPwd ? "text" : "password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Min. 8 characters"
                        autoComplete="new-password"
                        className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none min-w-0"
                    />
                    <button type="button" onClick={() => setShowPwd(s => !s)}
                        className="text-zinc-400 hover:text-zinc-300 transition-colors p-0.5 flex-shrink-0">
                        {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>

                {/* Strength meter */}
                {password.length > 0 && (
                    <div className="space-y-1.5 pt-0.5">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4].map(i => (
                                <div
                                    key={i}
                                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                        i <= strength ? strengthColor : "bg-zinc-800"
                                    }`}
                                />
                            ))}
                        </div>
                        <p className={`text-[11px] font-semibold ${strengthText}`}>
                            {strengthLabel}
                            {strength < 4 && (
                                <span className="text-zinc-500 font-normal ml-1">
                                    — try adding {strength < 2 ? "uppercase & numbers" : strength < 3 ? "a special character" : "a symbol"}
                                </span>
                            )}
                        </p>
                    </div>
                )}
            </div>

            {/* Confirm password */}
            <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 block tracking-wide">
                    Confirm new password
                </label>
                <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border bg-zinc-900/60 focus-within:bg-zinc-900 focus-within:ring-2 focus-within:ring-[#C6A16A]/10 transition-all duration-200 ${
                    confirm && password !== confirm
                        ? "border-red-500/60 focus-within:border-red-500"
                        : confirm && password === confirm
                        ? "border-emerald-500/60 focus-within:border-emerald-500"
                        : "border-zinc-700/80 focus-within:border-[#C6A16A]"
                }`}>
                    <span className="text-zinc-500 flex-shrink-0">
                        <Lock className="w-4 h-4" />
                    </span>
                    <input
                        type={showConfirm ? "text" : "password"}
                        value={confirm}
                        onChange={e => setConfirm(e.target.value)}
                        placeholder="Re-enter your password"
                        autoComplete="new-password"
                        className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none min-w-0"
                    />
                    <button type="button" onClick={() => setShowConfirm(s => !s)}
                        className="text-zinc-400 hover:text-zinc-300 transition-colors p-0.5 flex-shrink-0">
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
                {confirm && password !== confirm && (
                    <p className="text-[11px] text-red-500 font-semibold">Passwords do not match.</p>
                )}
                {confirm && password === confirm && password.length >= 8 && (
                    <p className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Passwords match
                    </p>
                )}
            </div>

            {/* Error banner */}
            {error && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={loading || (!!confirm && password !== confirm)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg mt-1"
            >
                {loading
                    ? <span className="w-4 h-4 border-2 border-zinc-950/20 border-t-zinc-950 rounded-full animate-spin" />
                    : <> Set New Password <ArrowRight className="w-4 h-4" /> </>
                }
            </button>
        </form>
    );
}

/* ─── Shell / layout ─── */
export default function ResetPasswordPage() {
    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10 bg-[#0A0A0A]">
            <div className="w-full max-w-5xl min-h-[540px] flex rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">

                {/* ── LEFT PANEL ── */}
                <div className="hidden lg:flex lg:w-[45%] flex-col justify-between bg-zinc-950 p-10 relative overflow-hidden">

                    {/* Background glow */}
                    <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#C6A16A]/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -right-10 w-64 h-64 bg-[#C6A16A]/8 rounded-full blur-3xl pointer-events-none" />

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-[#C6A16A]/40 p-1.5 flex items-center justify-center shadow-lg">
                            <Image src="/branding/logo.png" alt="Castra" width={36} height={36} className="object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-glacial font-bold text-2xl text-white group-hover:text-[#C6A16A] transition-colors leading-tight tracking-tight">
                                CASTRA
                            </span>
                            <span className="text-[10px] tracking-widest uppercase text-[#C6A16A] font-semibold">
                                Households
                            </span>
                        </div>
                    </Link>

                    {/* Hero copy */}
                    <div className="relative z-10 space-y-6">
                        <div>
                            <h2 className="font-mulish font-black text-4xl text-white leading-tight mb-3">
                                Create a new password.
                            </h2>
                            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                                Choose a strong password to keep your Castra account safe. You&apos;ll use it the next time you sign in.
                            </p>
                        </div>

                        {/* Tips */}
                        <div className="space-y-3">
                            {[
                                { icon: <ShieldCheck className="w-4 h-4" />, text: "Use at least 8 characters" },
                                { icon: <ShieldCheck className="w-4 h-4" />, text: "Mix uppercase, numbers & symbols" },
                                { icon: <ShieldCheck className="w-4 h-4" />, text: "Avoid using personal information" },
                            ].map(({ icon, text }) => (
                                <div key={text} className="flex items-center gap-3 text-sm text-zinc-300">
                                    <div className="w-7 h-7 rounded-lg bg-[#C6A16A]/15 border border-[#C6A16A]/25 flex items-center justify-center text-[#C6A16A] flex-shrink-0">
                                        {icon}
                                    </div>
                                    <span>{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom quote */}
                    <div className="relative z-10 pt-6 border-t border-zinc-800">
                        <p className="text-xs text-zinc-500 italic leading-relaxed">
                            &ldquo;Premium living, made accessible for every Kenyan home.&rdquo;
                        </p>
                        <p className="text-[10px] text-[#C6A16A] font-semibold mt-1 uppercase tracking-wider">- Castra Households</p>
                    </div>
                </div>

                {/* ── RIGHT PANEL ── */}
                <div className="flex-1 bg-[#111111] flex flex-col justify-center px-8 sm:px-12 py-10">

                    {/* Mobile logo */}
                    <Link href="/" className="flex lg:hidden items-center gap-2.5 mb-8 group">
                        <div className="w-9 h-9 rounded-lg bg-zinc-950 border border-[#C6A16A]/40 p-1 flex items-center justify-center">
                            <Image src="/branding/logo.png" alt="Castra" width={28} height={28} className="object-contain" />
                        </div>
                        <div>
                            <span className="font-glacial font-bold text-lg text-white group-hover:text-[#C6A16A] transition-colors">CASTRA</span>
                            <span className="block text-[9px] tracking-widest uppercase text-[#C6A16A] font-semibold leading-none">Households</span>
                        </div>
                    </Link>

                    {/* Heading */}
                    <div className="mb-7">
                        <h1 className="text-2xl font-bold text-white font-glacial">
                            Set new password
                        </h1>
                        <p className="text-sm text-zinc-400 mt-1">
                            Enter and confirm your new password below.
                        </p>
                    </div>

                    {/* Content wrapped in Suspense for useSearchParams */}
                    <Suspense fallback={
                        <div className="flex items-center justify-center py-10">
                            <span className="w-6 h-6 border-2 border-zinc-200 border-t-[#C6A16A] rounded-full animate-spin" />
                        </div>
                    }>
                        <ResetPasswordContent />
                    </Suspense>

                    {/* Back link */}
                    <p className="text-center text-xs text-zinc-400 mt-6">
                        Remember your password?{" "}
                        <Link href="/account" className="text-[#C6A16A] font-bold hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}
