import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { ResetPasswordForm } from "./ResetPasswordForm";

export const metadata = {
    title: "Reset Password – Castra Households",
    description: "Set a new password for your Castra account.",
};

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
                                "Use at least 8 characters",
                                "Mix uppercase, numbers & symbols",
                                "Avoid using personal information",
                            ].map((text) => (
                                <div key={text} className="flex items-center gap-3 text-sm text-zinc-300">
                                    <div className="w-7 h-7 rounded-lg bg-[#C6A16A]/15 border border-[#C6A16A]/25 flex items-center justify-center text-[#C6A16A] flex-shrink-0">
                                        <ShieldCheck className="w-4 h-4" />
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

                    {/* Client component — handles searchParams + form state */}
                    <ResetPasswordForm />

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
