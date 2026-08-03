"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { authApi } from "@/config/api";

/* ─── Inner component — reads searchParams ─── */
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
        if (password.length >= 8)           score++;
        if (/[A-Z]/.test(password))         score++;
        if (/[0-9]/.test(password))         score++;
        if (/[^A-Za-z0-9]/.test(password))  score++;
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
            await authApi.resetPassword({ token, password });
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

/* ─── Public export — wraps the inner component in Suspense ─── */
export function ResetPasswordForm() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center py-10">
                <span className="w-6 h-6 border-2 border-zinc-200 border-t-[#C6A16A] rounded-full animate-spin" />
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    );
}
