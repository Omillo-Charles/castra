"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, AlertCircle, ShieldCheck, Truck, Star } from "lucide-react";
import { GoogleIcon } from "@/components/svgicons";

type Tab = "login" | "signup";

/* ─────────────────────────────────────────────────────────────────────────
   Root shell — split screen
───────────────────────────────────────────────────────────────────────── */
export function AccountForm() {
    const [tab, setTab] = useState<Tab>("login");

    return (
        <div className="w-full max-w-5xl min-h-[600px] flex rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">

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
                        <h2 className="font-mulish italic font-black text-4xl text-white leading-tight mb-3">
                            {tab === "login" ? "Good to have\nyou back." : "Elevate your\nliving space."}
                        </h2>
                        <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                            {tab === "login"
                                ? "Sign in to track your orders, manage your wishlist, and enjoy a seamless shopping experience."
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
                    <p className="text-[10px] text-[#C6A16A] font-semibold mt-1 uppercase tracking-wider">— Castra Households</p>
                </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="flex-1 bg-white dark:bg-[#111111] flex flex-col justify-center px-8 sm:px-12 py-10">

                {/* Mobile logo */}
                <Link href="/" className="flex lg:hidden items-center gap-2.5 mb-8 group">
                    <div className="w-9 h-9 rounded-lg bg-zinc-950 border border-[#C6A16A]/40 p-1 flex items-center justify-center">
                        <Image src="/branding/logo.png" alt="Castra" width={28} height={28} className="object-contain" />
                    </div>
                    <div>
                        <span className="font-glacial font-bold text-lg text-zinc-900 dark:text-white group-hover:text-[#C6A16A] transition-colors">CASTRA</span>
                        <span className="block text-[9px] tracking-widest uppercase text-[#C6A16A] font-semibold leading-none">Households</span>
                    </div>
                </Link>

                {/* Heading */}
                <div className="mb-7">
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white font-glacial">
                        {tab === "login" ? "Sign in" : "Create account"}
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                        {tab === "login"
                            ? "Enter your credentials to continue."
                            : "Fill in the details below to get started."}
                    </p>
                </div>

                {/* Tab pills */}
                <div className="flex gap-2 mb-6 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl w-fit">
                    {(["login", "signup"] as Tab[]).map((t) => (
                        <button
                            key={t}
                            type="button"
                            onClick={() => setTab(t)}
                            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                                tab === t
                                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                            }`}
                        >
                            {t === "login" ? "Sign In" : "Sign Up"}
                        </button>
                    ))}
                </div>

                {/* Google */}
                <button
                    type="button"
                    onClick={() => alert("Google login coming soon")}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 mb-5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200 shadow-sm group"
                >
                    <GoogleIcon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                        Continue with Google
                    </span>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-5">
                    <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
                    <span className="text-[11px] text-zinc-400 font-semibold uppercase tracking-widest">or</span>
                    <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
                </div>

                {/* Forms */}
                {tab === "login"
                    ? <LoginForm />
                    : <SignupForm onSuccess={() => setTab("login")} />
                }

                {/* Bottom switch */}
                <p className="text-center text-xs text-zinc-400 mt-6">
                    {tab === "login" ? (
                        <>Don&apos;t have an account?{" "}
                            <button type="button" onClick={() => setTab("signup")} className="text-[#C6A16A] font-bold hover:underline">
                                Create one
                            </button>
                        </>
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

/* ─── Login Form ─────────────────────────────────────────────────────────── */
function LoginForm() {
    const [show, setShow]         = useState(false);
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]       = useState("");
    const [loading, setLoading]   = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!email || !password) { setError("Please fill in all fields."); return; }
        setLoading(true);
        setTimeout(() => { setLoading(false); setError("Backend not connected yet."); }, 800);
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
                        className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors p-0.5">
                        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                }
            />
            <div className="flex justify-end -mt-1">
                <button type="button" className="text-xs text-[#C6A16A] hover:underline font-semibold">
                    Forgot password?
                </button>
            </div>
            {error && <ErrorBanner message={error} />}
            <SubmitButton loading={loading} label="Sign In" />
        </form>
    );
}

/* ─── Sign Up Form ───────────────────────────────────────────────────────── */
function SignupForm({ onSuccess }: { onSuccess: () => void }) {
    const [show, setShow]         = useState(false);
    const [name, setName]         = useState("");
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const [error, setError]       = useState("");
    const [loading, setLoading]   = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!name || !email || !password) { setError("Please fill in all fields."); return; }
        if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
        setLoading(true);
        setTimeout(() => { setLoading(false); onSuccess(); }, 800);
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
                        className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors p-0.5">
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

/* ─── Shared primitives ──────────────────────────────────────────────────── */
function Field({ label, type, value, onChange, placeholder, icon, autoComplete, suffix }: {
    label: string; type: string; value: string; onChange: (v: string) => void;
    placeholder: string; icon: React.ReactNode; autoComplete?: string; suffix?: React.ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 block tracking-wide">
                {label}
            </label>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700/80 bg-zinc-50 dark:bg-zinc-900/60 focus-within:border-[#C6A16A] focus-within:bg-white dark:focus-within:bg-zinc-900 focus-within:ring-3 focus-within:ring-[#C6A16A]/10 transition-all duration-200">
                <span className="text-zinc-400 dark:text-zinc-500 flex-shrink-0">{icon}</span>
                <input
                    type={type} value={value} onChange={e => onChange(e.target.value)}
                    placeholder={placeholder} autoComplete={autoComplete}
                    className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none min-w-0"
                />
                {suffix}
            </div>
        </div>
    );
}

function ErrorBanner({ message }: { message: string }) {
    return (
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium">
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
