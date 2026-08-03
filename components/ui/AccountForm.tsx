"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, AlertCircle, ShieldCheck, Truck, Star } from "lucide-react";
import { GoogleIcon } from "@/components/svgicons";
import { useAuth } from "@/context/AuthContext";
import { authApi } from "@/config/api";

type Tab = "login" | "signup" | "forgot" | "verify";

/* Root shell — split screen */
export function AccountForm() {
    const [tab, setTab]               = useState<Tab>("login");
    const [prefillEmail, setPrefillEmail]         = useState("");
    const [registeredEmail, setRegisteredEmail]   = useState("");

    // Show error if redirected back from a failed Google OAuth attempt
    const googleError =
        typeof window !== "undefined"
            ? new URLSearchParams(window.location.search).get("error")
            : null;

    return (
        <div className="w-full max-w-5xl min-h-[600px] flex rounded-3xl overflow-hidden shadow-2xl border border-zinc-800">

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
                            {tab === "login"  ? "Welcome back."
                           : tab === "forgot" ? "Reset your\npassword."
                           : tab === "verify" ? "Almost there."
                           : "Elevate your\nliving."}
                        </h2>
                        <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                            {tab === "login"
                                ? "Sign in to track your orders, manage your wishlist, and enjoy a seamless shopping experience."
                                : tab === "forgot"
                                ? "Enter the email address linked to your account and we\u2019ll send you a reset link."
                                : tab === "verify"
                                ? "One quick step left — confirm your email address and your Castra account will be fully active."
                                : "Join thousands of Kenyans who trust Castra for premium household essentials delivered countrywide."}
                        </p>
                    </div>

                    {/* Trust points */}
                    <div className="space-y-3">
                        {[
                            { icon: <Truck className="w-4 h-4" />, text: "Countrywide delivery across Kenya" },
                            { icon: <ShieldCheck className="w-4 h-4" />, text: "100% authentic, quality-guaranteed products" },
                            { icon: <Star className="w-4 h-4" />, text: "Exclusive deals for members only" },
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
                        {tab === "login"  ? "Sign in"
                       : tab === "forgot" ? "Forgot password?"
                       : tab === "verify" ? "Verify your email"
                       : "Create account"}
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1">
                        {tab === "login"
                            ? "Enter your credentials to continue."
                            : tab === "forgot"
                            ? "We\u2019ll email you a secure link to reset it."
                            : tab === "verify"
                            ? "Check your inbox and click the link we sent you."
                            : "Fill in the details below to get started."}
                    </p>
                </div>

                {/* Tab pills — hidden on forgot / verify panels */}
                {tab !== "forgot" && tab !== "verify" && (
                    <div className="flex gap-2 mb-6 p-1 bg-zinc-900 rounded-xl w-fit">
                        {(["login", "signup"] as Tab[]).map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setTab(t as Tab)}
                                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                                    tab === t
                                        ? "bg-zinc-800 text-white shadow-sm"
                                        : "text-zinc-400 hover:text-zinc-700 hover:text-zinc-300"
                                }`}
                            >
                                {t === "login" ? "Sign In" : "Sign Up"}
                            </button>
                        ))}
                    </div>
                )}

                {/* Google — hidden on forgot / verify panels */}
                {tab !== "forgot" && tab !== "verify" && (
                    <>
                        <button
                            type="button"
                            onClick={() => {
                                const base = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5500/api/v1").replace("/api/v1", "");
                                window.location.href = `${base}/auth/google`;
                            }}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 mb-5 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-50 hover:bg-zinc-800 hover:border-zinc-300 hover:border-zinc-600 transition-all duration-200 shadow-sm group"
                        >
                            <GoogleIcon className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm font-semibold text-zinc-300 group-hover:text-white group-hover:text-white transition-colors">
                                Continue with Google
                            </span>
                        </button>

                        {/* Google OAuth error */}
                        {googleError && (
                            <div className="flex items-center gap-2.5 px-4 py-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                                Google sign-in failed. Please try again or use email and password.
                            </div>
                        )}

                        {/* Divider */}
                        <div className="flex items-center gap-3 mb-5">
                            <div className="flex-1 h-px bg-zinc-200 bg-zinc-800" />
                            <span className="text-[11px] text-zinc-400 font-semibold uppercase tracking-widest">or</span>
                            <div className="flex-1 h-px bg-zinc-200 bg-zinc-800" />
                        </div>
                    </>
                )}

                {/* Forms */}
                {tab === "login" && (
                    <LoginForm
                        onForgotPassword={(email) => {
                            setPrefillEmail(email);
                            setTab("forgot");
                        }}
                    />
                )}
                {tab === "signup" && (
                    <SignupForm
                        onSuccess={(email) => {
                            setRegisteredEmail(email);
                            setTab("verify");
                        }}
                    />
                )}
                {tab === "forgot" && (
                    <ForgotPasswordForm
                        prefillEmail={prefillEmail}
                        onBack={() => setTab("login")}
                    />
                )}
                {tab === "verify" && (
                    <VerifyEmailPanel
                        email={registeredEmail}
                        onSkip={() => setTab("login")}
                    />
                )}

                {/* Bottom switch */}
                <p className="text-center text-xs text-zinc-400 mt-6">
                    {tab === "login" ? (
                        <>Don&apos;t have an account?{" "}
                            <button type="button" onClick={() => setTab("signup")} className="text-[#C6A16A] font-bold hover:underline">
                                Create one
                            </button>
                        </>
                    ) : tab === "forgot" ? (
                        <>
                            <button type="button" onClick={() => setTab("login")} className="text-[#C6A16A] font-bold hover:underline">
                                ← Back to sign in
                            </button>
                        </>
                    ) : tab === "verify" ? (
                        // Verify panel has its own CTAs — show nothing here
                        null
                    ) : (
                        <>Already have an account?{" "}
                            <button type="button" onClick={() => setTab("login")} className="text-[#C6A16A] font-bold hover:underline">
                                Sign in
                            </button>
                        </>
                    )}
                </p>
            </div>

        </div>
    );
}

/* Login Form */
function LoginForm({ onForgotPassword }: { onForgotPassword: (email: string) => void }) {
    const { login } = useAuth();
    const router = useRouter();
    const [show, setShow]         = useState(false);
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]       = useState("");
    const [loading, setLoading]   = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!email || !password) { setError("Please fill in all fields."); return; }
        setLoading(true);
        try {
            await login(email, password);
            // Read role from a fresh /me call — user state is set by login()
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, { credentials: "include" });
            const data = await res.json();
            if (data?.user?.role === "ADMIN") {
                router.push("/account/dashboard/admin");
            } else {
                router.push("/account/dashboard");
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Field label="Email address" type="email" value={email} onChange={setEmail}
                placeholder="you@example.com" icon={<Mail className="w-4 h-4" />} autoComplete="email" />
            <Field label="Password" type={show ? "text" : "password"} value={password}
                onChange={setPassword} placeholder="••••••••" icon={<Lock className="w-4 h-4" />}
                autoComplete="current-password"
                suffix={
                    <button type="button" onClick={() => setShow(s => !s)}
                        className="text-zinc-400 hover:text-zinc-600 hover:text-zinc-300 transition-colors p-0.5">
                        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                }
            />
            <div className="flex justify-end -mt-1">
                <button
                    type="button"
                    onClick={() => onForgotPassword(email)}
                    className="text-xs text-[#C6A16A] hover:underline font-semibold"
                >
                    Forgot password?
                </button>
            </div>
            {error && <ErrorBanner message={error} />}
            <SubmitButton loading={loading} label="Sign In" />
        </form>
    );
}

/* Forgot Password Form */
function ForgotPasswordForm({ prefillEmail, onBack }: { prefillEmail: string; onBack: () => void }) {
    const [email,   setEmail]   = useState(prefillEmail);
    const [loading, setLoading] = useState(false);
    const [sent,    setSent]    = useState(false);
    const [error,   setError]   = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!email) { setError("Please enter your email address."); return; }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) { setError("Please enter a valid email address."); return; }

        setLoading(true);
        try {
            await authApi.forgotPassword({ email });
            setSent(true);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        return (
            <div className="flex flex-col items-center text-center gap-5 py-4 animate-in fade-in duration-300">
                {/* Animated envelope icon */}
                <div className="w-16 h-16 rounded-2xl bg-[#C6A16A]/15 border border-[#C6A16A]/30 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-[#C6A16A]" />
                </div>
                <div className="space-y-1.5">
                    <p className="text-base font-bold text-white">Check your inbox</p>
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                        If <span className="text-white font-semibold">{email}</span> is linked to a Castra account, you&apos;ll receive a password reset link shortly.
                    </p>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-[260px]">
                    Didn&apos;t get it? Check your spam folder or{" "}
                    <button
                        type="button"
                        onClick={() => { setSent(false); setEmail(""); }}
                        className="text-[#C6A16A] font-semibold hover:underline"
                    >
                        try a different email
                    </button>.
                </p>
                <button
                    type="button"
                    onClick={onBack}
                    className="mt-1 flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-700 text-sm font-semibold text-zinc-400 hover:text-white hover:border-zinc-500 transition-all"
                >
                    Back to sign in
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Field
                label="Email address"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="you@example.com"
                icon={<Mail className="w-4 h-4" />}
                autoComplete="email"
            />
            {error && <ErrorBanner message={error} />}
            <SubmitButton loading={loading} label="Send Reset Link" />
        </form>
    );
}

/* Sign Up Form */
function SignupForm({ onSuccess }: { onSuccess: (email: string) => void }) {
    const { register } = useAuth();
    const [show, setShow]         = useState(false);
    const [name, setName]         = useState("");
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]       = useState("");
    const [loading, setLoading]   = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!name || !email || !password) { setError("Please fill in all fields."); return; }
        if (password.length < 8) { setError("Password must be at least 8 characters."); return; }

        const parts     = name.trim().split(" ");
        const firstName = parts[0] || "";
        const lastName  = parts.slice(1).join(" ") || firstName;

        setLoading(true);
        try {
            await register({ firstName, lastName, email, password });
            // Switch to verification panel — the backend will have sent a verification email
            onSuccess(email);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Field label="Full name" type="text" value={name} onChange={setName}
                placeholder="Jane Doe" icon={<User className="w-4 h-4" />} autoComplete="name" />
            <Field label="Email address" type="email" value={email} onChange={setEmail}
                placeholder="you@example.com" icon={<Mail className="w-4 h-4" />} autoComplete="email" />
            <Field label="Password" type={show ? "text" : "password"} value={password}
                onChange={setPassword} placeholder="Min. 8 characters" icon={<Lock className="w-4 h-4" />}
                autoComplete="new-password"
                suffix={
                    <button type="button" onClick={() => setShow(s => !s)}
                        className="text-zinc-400 hover:text-zinc-600 hover:text-zinc-300 transition-colors p-0.5">
                        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                }
            />
            {error && <ErrorBanner message={error} />}
            <SubmitButton loading={loading} label="Create Account" />
            <p className="text-[11px] text-zinc-400 text-center leading-relaxed pt-1">
                By signing up you agree to our{" "}
                <Link href="/terms" className="text-[#C6A16A] hover:underline">Terms</Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-[#C6A16A] hover:underline">Privacy Policy</Link>.
            </p>
        </form>
    );
}

/* Verify Email Panel */
function VerifyEmailPanel({ email, onSkip }: { email: string; onSkip: () => void }) {
    const router = useRouter();
    const [resending,  setResending]  = useState(false);
    const [resentMsg,  setResentMsg]  = useState("");
    const [resentErr,  setResentErr]  = useState("");

    const handleResend = async () => {
        setResentMsg("");
        setResentErr("");
        setResending(true);
        try {
            await authApi.resendVerification({ email });
            setResentMsg("Email resent! Check your inbox (and spam folder).");
        } catch (err: unknown) {
            setResentErr(err instanceof Error ? err.message : "Failed to resend. Please try again.");
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="flex flex-col items-center text-center gap-5 py-2 animate-in fade-in duration-300">

            {/* Icon */}
            <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-[#C6A16A]/15 border border-[#C6A16A]/30 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-[#C6A16A]" />
                </div>
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-2xl border border-[#C6A16A]/40 animate-ping" style={{ animationDuration: "2s" }} />
            </div>

            {/* Copy */}
            <div className="space-y-2">
                <p className="text-base font-bold text-white">Check your inbox</p>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                    We sent a verification link to{" "}
                    <span className="text-white font-semibold break-all">{email || "your email"}</span>.
                    Click it to activate your account.
                </p>
            </div>

            {/* Resend */}
            <div className="flex flex-col items-center gap-1.5">
                {resentMsg && (
                    <p className="text-xs text-emerald-500 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> {resentMsg}
                    </p>
                )}
                {resentErr && (
                    <p className="text-xs text-red-500 font-semibold">{resentErr}</p>
                )}
                <button
                    type="button"
                    onClick={handleResend}
                    disabled={resending}
                    className="text-xs font-semibold text-zinc-400 hover:text-[#C6A16A] disabled:opacity-50 transition-colors"
                >
                    {resending
                        ? <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 border border-zinc-400 border-t-[#C6A16A] rounded-full animate-spin" /> Resending…</span>
                        : "Didn\u2019t get it? Resend email"}
                </button>
                <p className="text-[10px] text-zinc-600">Also check your spam or junk folder.</p>
            </div>

            {/* Primary CTA */}
            <button
                type="button"
                onClick={() => router.push("/account/dashboard")}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] active:scale-[0.98] text-zinc-950 font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
            >
                Continue to dashboard <ArrowRight className="w-4 h-4" />
            </button>

            {/* Skip */}
            <button
                type="button"
                onClick={onSkip}
                className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors"
            >
                I&apos;ll verify later — back to sign in
            </button>
        </div>
    );
}

/* Shared primitives */
function Field({ label, type, value, onChange, placeholder, icon, autoComplete, suffix }: {
    label: string; type: string; value: string; onChange: (v: string) => void;
    placeholder: string; icon: React.ReactNode; autoComplete?: string; suffix?: React.ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-400 block tracking-wide">
                {label}
            </label>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-zinc-700/80 bg-zinc-900/60 focus-within:border-[#C6A16A] focus-within:bg-zinc-900 focus-within:ring-3 focus-within:ring-[#C6A16A]/10 transition-all duration-200">
                <span className="text-zinc-500 flex-shrink-0">{icon}</span>
                <input
                    type={type} value={value} onChange={e => onChange(e.target.value)}
                    placeholder={placeholder} autoComplete={autoComplete}
                    className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-400 placeholder-zinc-600 focus:outline-none min-w-0"
                />
                {suffix}
            </div>
        </div>
    );
}

function ErrorBanner({ message }: { message: string }) {
    return (
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {message}
        </div>
    );
}

function SubmitButton({ loading, label }: { loading: boolean; label: string }) {
    return (
        <button
            type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg mt-1"
        >
            {loading
                ? <span className="w-4 h-4 border-2 border-zinc-950/20 border-t-zinc-950 rounded-full animate-spin" />
                : <>{label} <ArrowRight className="w-4 h-4" /></>
            }
        </button>
    );
}
