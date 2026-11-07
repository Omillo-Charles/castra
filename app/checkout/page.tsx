"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
    ChevronRight, Package, MapPin, CreditCard,
    CheckCircle2, ArrowRight, ChevronDown, Truck,
    Phone, Mail, User, Building2, Lock, Copy, Check, Info,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/svgicons";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { addressApi, orderApi, paymentApi } from "@/config/api";
import { useToast } from "@/context/ToastContext";

const WHATSAPP_NUMBER = "254704147774";

type Step = "details" | "delivery" | "payment" | "review";

const STEPS: { key: Step; label: string; icon: React.ReactNode }[] = [
    { key: "details", label: "Your Details", icon: <User className="w-4 h-4" /> },
    { key: "delivery", label: "Delivery", icon: <Truck className="w-4 h-4" /> },
    { key: "payment", label: "Payment", icon: <CreditCard className="w-4 h-4" /> },
    { key: "review", label: "Review", icon: <CheckCircle2 className="w-4 h-4" /> },
];
const STEP_KEYS = STEPS.map((s) => s.key);

function formatKES(n: number) { return `KSh ${n.toLocaleString("en-KE")}`; }

/* ── Field primitive ── */
function Field({ label, type = "text", value, onChange, placeholder, icon, required = true, autoComplete, disabled = false, error }: {
    label: string; type?: string; value: string; onChange: (v: string) => void;
    placeholder: string; icon?: React.ReactNode; required?: boolean; autoComplete?: string; disabled?: boolean; error?: string;
}) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-400 tracking-wide block">
                {label}{required && <span className="text-[#C6A16A] ml-0.5">*</span>}
            </label>
            <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border transition-all duration-200 ${
                disabled
                    ? "border-zinc-800 bg-zinc-900/40 cursor-not-allowed opacity-50"
                    : error
                    ? "border-red-500/60 bg-zinc-900 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/10"
                    : "border-zinc-700 bg-zinc-900 focus-within:border-[#C6A16A] focus-within:bg-zinc-900 focus-within:ring-2 focus-within:ring-[#C6A16A]/10"
            }`}>
                {icon && <span className={`flex-shrink-0 ${error ? "text-red-500" : "text-zinc-500"}`}>{icon}</span>}
                <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder} autoComplete={autoComplete} required={required}
                    disabled={disabled}
                    className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none min-w-0 disabled:cursor-not-allowed" />
            </div>
            {error && <p className="text-xs text-red-400 font-medium">{error}</p>}
        </div>
    );
}

/* ── Order summary sidebar using real cart ── */
function OrderSummary({ compact = false }: { compact?: boolean }) {
    const [open, setOpen] = useState(!compact);
    const { cart } = useCart();
    const items = cart?.items ?? [];
    const subtotal = cart?.subtotal ?? 0;
    const deliveryFee = cart?.deliveryFee ?? 0;
    const discount = cart?.discount ?? 0;
    const total = cart?.total ?? 0;

    return (
        <div className="bg-[#171717] rounded-2xl border border-zinc-800 overflow-hidden">
            {compact && (
                <button type="button" onClick={() => setOpen((o) => !o)}
                    className="w-full flex items-center justify-between px-5 py-4 text-sm font-bold text-zinc-200 border-b border-zinc-800">
                    <span className="flex items-center gap-2"><Package className="w-4 h-4 text-[#C6A16A]" /> Order Summary</span>
                    <div className="flex items-center gap-3">
                        <span className="text-[#C6A16A]">{formatKES(total)}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
                    </div>
                </button>
            )}
            {!compact && (
                <div className="px-5 py-4 border-b border-zinc-800 bg-zinc-900/50">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                        <Package className="w-3.5 h-3.5 text-[#C6A16A]" /> Order Summary
                    </h2>
                </div>
            )}
            {open && (
                <div className="px-5 py-4 space-y-4">
                    <div className="space-y-3">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 overflow-hidden flex items-center justify-center flex-shrink-0">
                                    {item.product.images[0]
                                        ? <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                                        : <Package className="w-4 h-4 text-zinc-400" />
                                    }
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-zinc-200 truncate">{item.product.name}</p>
                                    <p className="text-[10px] text-zinc-400">Qty: {item.qty}</p>
                                </div>
                                <span className="text-xs font-bold text-zinc-200 flex-shrink-0">
                                    {formatKES(item.product.price * item.qty)}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="h-px bg-zinc-800" />
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-zinc-400">
                            <span>Subtotal</span><span>{formatKES(subtotal)}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between text-sm text-emerald-500">
                                <span>Discount</span><span>−{formatKES(discount)}</span>
                            </div>
                        )}
                        <div className="pt-2 border-t border-zinc-800 space-y-1">
                            <div className="flex justify-between text-xs text-zinc-400">
                                <span className="flex items-center gap-1.5 font-medium"><Truck className="w-3.5 h-3.5 text-[#C6A16A]" /> Delivery Fee:</span>
                                <span className="font-semibold text-amber-400">Excluded</span>
                            </div>
                            <p className="text-[11px] leading-snug text-zinc-500 italic">
                                Delivery charges are excluded and will be communicated directly via email or WhatsApp.
                            </p>
                        </div>
                        <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
                            <span>Total</span>
                            <span className="text-[#C6A16A]">{formatKES(total)}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/*Main checkout page*/
function CheckoutPageContent() {
    const { user } = useAuth();
    const { cart, loading, refresh: refreshCart } = useCart();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { error: toastError } = useToast();

    const [step, setStep] = useState<Step>("details");
    const [placed, setPlaced] = useState(false);
    const [placing, setPlacing] = useState(false);
    const [placeErr, setPlaceErr] = useState("");
    const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

    // Stored after a successful placeOrder call
    const [placedOrderRef, setPlacedOrderRef] = useState("");

    // ── Contact — pre-fill from logged-in user ──
    const [firstName, setFirstName] = useState(user?.firstName ?? "");
    const [lastName, setLastName] = useState(user?.lastName ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [phone, setPhone] = useState(user?.phone ?? "");

    // ── Delivery — pre-fill from default saved address ──
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [county, setCounty] = useState("");
    const [notes, setNotes] = useState("");
    const [addressLoading, setAddressLoading] = useState(false);
    const [savedAddresses, setSavedAddresses] = useState<import("@/config/api").Address[]>([]);

    // Payment
    const [payMethod, setPayMethod] = useState<"paystack-mpesa" | "manual">("paystack-mpesa");
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [paystackCallbackPending, setPaystackCallbackPending] = useState(false);
    const paystackCallbackHandled = useRef(false);

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopiedField(label);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const items = cart?.items ?? [];
    const subtotal = cart?.subtotal ?? 0;
    const deliveryFee = cart?.deliveryFee ?? 0;
    const discount = cart?.discount ?? 0;
    const total = cart?.total ?? 0;

    const currentIndex = STEP_KEYS.indexOf(step);
    const paystackReference = searchParams.get("reference");
    const isPaystackCallback = searchParams.get("payment") === "paystack" && !!paystackReference;

    // Pre-fill contact from auth user
    useEffect(() => {
        if (user) {
            if (!firstName) setFirstName(user.firstName);
            if (!lastName) setLastName(user.lastName);
            if (!email) setEmail(user.email);
            if (user.phone && !phone) setPhone(user.phone);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    // Load saved addresses and pre-fill default when landing on delivery step.
    // Only runs when the user is logged in — guests enter the address manually.
    useEffect(() => {
        if (step !== "delivery" || !user) return;
        if (address) return; // already filled
        setAddressLoading(true);
        addressApi.list().then((res) => {
            setSavedAddresses(res.addresses);
            const def = res.addresses.find((a) => a.isDefault) ?? res.addresses[0];
            if (def) {
                setAddress(def.street);
                setCity(def.city);
                setCounty(def.county);
            }
        }).catch(() => toastError("Could not load your saved addresses.")).finally(() => setAddressLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step, user]);

    // Redirect to cart if cart is empty and not yet placed.
    // Works for both guests and authenticated users.
    useEffect(() => {
        if (!loading && !placed && !isPaystackCallback && items.length === 0) {
            router.replace("/cart");
        }
    }, [loading, placed, isPaystackCallback, items.length, router]);

    useEffect(() => {
        if (!isPaystackCallback || !paystackReference || paystackCallbackHandled.current) return;

        paystackCallbackHandled.current = true;
        setPaystackCallbackPending(true);
        paymentApi.verifyPaystack(paystackReference)
            .then((result) => {
                if (result.paid) {
                    router.replace("/");
                    return;
                }
                setPlaceErr("Paystack payment was not confirmed. Please contact us if your account was debited.");
            })
            .catch((error: unknown) => {
                setPlaceErr(error instanceof Error ? error.message : "Could not verify the Paystack payment.");
            })
            .finally(() => setPaystackCallbackPending(false));
    }, [isPaystackCallback, paystackReference, router]);

    const goNext = () => {
        const errors: Record<string, string> = {};

        if (step === "details") {
            if (!firstName.trim()) errors.firstName = "First name is required.";
            if (!lastName.trim())  errors.lastName  = "Last name is required.";
            if (!email.trim())     errors.email     = "Email is required for payment and order updates.";
            if (!phone.trim())     errors.phone     = "Phone number is required for delivery coordination.";
        }

        if (step === "delivery") {
            if (!address.trim()) errors.address = "Street / estate address is required.";
            if (!city.trim())    errors.city    = "Town or city is required.";
            if (!county.trim())  errors.county  = "County is required.";
        }

        if (Object.keys(errors).length > 0) {
            setStepErrors(errors);
            return;
        }

        setStepErrors({});
        const n = STEP_KEYS[currentIndex + 1];
        if (n) setStep(n as Step);
    };

    const goBack = () => {
        setStepErrors({});
        const p = STEP_KEYS[currentIndex - 1];
        if (p) setStep(p as Step);
    };

    const placeOrder = async () => {
        setPlaceErr("");

        if (payMethod === "paystack-mpesa" && !email.trim()) {
            setPlaceErr("Please enter your email address to continue with the payment prompt.");
            return;
        }

        setPlacing(true);
        try {
            const res = await orderApi.place({
                contact:  { firstName, lastName, email: email || undefined, phone },
                delivery: { street: address, city, county, notes: notes || undefined },
                payment: { method: payMethod },
            });

            if (payMethod === "paystack-mpesa") {
                if (!res.paystack?.authorizationUrl) {
                    throw new Error("Paystack checkout was not initialized. Please try again.");
                }
                window.location.assign(res.paystack.authorizationUrl);
                return;
            }

            setPlacedOrderRef(res.order.ref);
            setPlaced(true);
            refreshCart();
        } catch (err: unknown) {
            setPlaceErr(err instanceof Error ? err.message : "Failed to place order. Please try again.");
        } finally {
            setPlacing(false);
        }
    };

    const waMsg = encodeURIComponent(
        `Hi, I'd like to confirm my order:\n\nRef: ${placedOrderRef}\n` +
        items.map((i) => `• ${i.product.name} x${i.qty} - ${formatKES(i.product.price * i.qty)}`).join("\n") +
        `\n\nTotal: ${formatKES(total)} (Delivery fee excluded)\nDelivery to: ${address}, ${city}, ${county}` +
        (payMethod === "paystack-mpesa"
            ? "\nPayment: Paystack M-Pesa Prompt"
            : `\nPayment: M-Pesa Manual - Paybill 542542 / Send Money 0704147774`)
    );

    // Loading spinner while cart loads
    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <span className="w-7 h-7 border-2 border-zinc-200 border-t-[#C6A16A] rounded-full animate-spin" />
        </div>
    );

    if (isPaystackCallback && paystackCallbackPending) return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
            <span className="w-8 h-8 border-2 border-zinc-200 border-t-[#C6A16A] rounded-full animate-spin" />
            <p className="text-sm font-semibold text-zinc-300">Confirming your Paystack payment…</p>
        </div>
    );

    /* Order placed confirmation */
    if (placed) {
        return (
            <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#C6A16A] mb-2">Order Placed</p>
                    <h1 className="text-3xl font-bold font-glacial text-white mb-2">Thank you!</h1>
                    {placedOrderRef && (
                        <p className="text-xs font-mono font-semibold text-zinc-400 mb-3 tracking-wider">
                            Reference: <span className="text-zinc-200">{placedOrderRef}</span>
                        </p>
                    )}
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto">
                        Your order has been received. We will confirm availability and reach out via WhatsApp or phone shortly.
                    </p>
                </div>

                {/* Manual payment instructions */}
                {payMethod === "manual" && (
                <div className="bg-[#171717] rounded-2xl border border-[#C6A16A]/30 p-5 space-y-3 text-left max-w-md mx-auto">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#C6A16A] flex items-center gap-1.5">
                        <Info className="w-4 h-4" /> M-Pesa Payment Details
                    </p>
                    <div className="space-y-2 text-xs text-zinc-300">
                        <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 space-y-1">
                            <p className="font-bold text-white text-sm">Option 1: M-Pesa Paybill</p>
                            <p className="flex justify-between items-center">
                                <span className="text-zinc-400">Business No: <strong className="text-white font-mono text-xs">542542</strong></span>
                                <button type="button" onClick={() => handleCopy("542542", "paybill")} className="text-[10px] text-[#C6A16A] hover:underline flex items-center gap-1 font-semibold">
                                    {copiedField === "paybill" ? <><Check className="w-3 h-3 text-emerald-400" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
                                </button>
                            </p>
                            <p className="flex justify-between items-center">
                                <span className="text-zinc-400">Account No: <strong className="text-white font-mono text-xs">03703439943450</strong></span>
                                <button type="button" onClick={() => handleCopy("03703439943450", "acc")} className="text-[10px] text-[#C6A16A] hover:underline flex items-center gap-1 font-semibold">
                                    {copiedField === "acc" ? <><Check className="w-3 h-3 text-emerald-400" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
                                </button>
                            </p>
                            <p className="text-zinc-400 text-[11px]">Account Name: <strong className="text-zinc-200">Laureen Nyaboke Maina</strong></p>
                        </div>
                        <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 space-y-1">
                            <p className="font-bold text-white text-sm">Option 2: Send Money</p>
                            <p className="flex justify-between items-center">
                                <span className="text-zinc-400">Phone No: <strong className="text-white font-mono text-xs">0704147774</strong></span>
                                <button type="button" onClick={() => handleCopy("0704147774", "phone")} className="text-[10px] text-[#C6A16A] hover:underline flex items-center gap-1 font-semibold">
                                    {copiedField === "phone" ? <><Check className="w-3 h-3 text-emerald-400" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
                                </button>
                            </p>
                            <p className="text-zinc-400 text-[11px]">Recipient: <strong className="text-zinc-200">Laureen Nyaboke Maina</strong></p>
                        </div>
                    </div>
                </div>
                )}

                <div className="flex items-center justify-center gap-3 flex-wrap">
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-bold text-xs transition-all shadow-md">
                        <WhatsAppIcon className="w-4 h-4" /> Confirm on WhatsApp
                    </a>
                    <Link href="/track-order"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-700 text-zinc-300 font-bold text-xs hover:border-[#C6A16A]/50 hover:text-[#C6A16A] transition-all">
                        Track Order <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-zinc-400 mb-8">
                <Link href="/" className="hover:text-[#C6A16A] transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/cart" className="hover:text-[#C6A16A] transition-colors">Cart</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-zinc-300 font-semibold">Checkout</span>
            </nav>

            <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#C6A16A] mb-1">Secure Checkout</p>
                <h1 className="text-3xl font-bold font-glacial text-white flex items-center gap-3">
                    <Lock className="w-6 h-6 text-[#C6A16A]" /> Complete Your Order
                </h1>
            </div>

            {/* Step indicator */}
            <div className="flex items-center mb-10 overflow-x-auto scrollbar-none">
                {STEPS.map((s, i) => {
                    const done = i < currentIndex;
                    const active = s.key === step;
                    return (
                        <div key={s.key} className="flex items-center flex-shrink-0">
                            <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold transition-all ${active ? "bg-[#C6A16A] text-zinc-950 shadow-md"
                                : done ? "bg-[#C6A16A]/15 text-[#C6A16A]"
                                    : "bg-zinc-900 text-zinc-400"
                                }`}>
                                <span>{s.icon}</span>
                                <span className="hidden sm:inline">{s.label}</span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className={`w-8 h-0.5 mx-1 rounded-full transition-colors ${done ? "bg-[#C6A16A]" : "bg-zinc-200 bg-zinc-800"}`} />
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1 w-full space-y-6">

                    {/* STEP 1: Contact details */}
                    {step === "details" && (
                        <div className="bg-[#171717] rounded-2xl border border-zinc-800 p-6 space-y-5">
                            <h2 className="text-sm font-bold text-white flex items-center gap-2 font-glacial">
                                <User className="w-4 h-4 text-[#C6A16A]" /> Contact Information
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <Field label="First name" value={firstName} onChange={(v) => { setFirstName(v); setStepErrors(e => ({ ...e, firstName: "" })); }} placeholder="Jane" icon={<User className="w-4 h-4" />} autoComplete="given-name" error={stepErrors.firstName} />
                                <Field label="Last name" value={lastName} onChange={(v) => { setLastName(v); setStepErrors(e => ({ ...e, lastName: "" })); }} placeholder="Wanjiku" autoComplete="family-name" error={stepErrors.lastName} />
                            </div>
                            <Field label="Email address" type="email" value={email} onChange={(v) => { setEmail(v); setStepErrors(e => ({ ...e, email: "" })); }} placeholder="jane@example.com" icon={<Mail className="w-4 h-4" />} autoComplete="email" error={stepErrors.email} />
                            <Field label="Phone number" type="tel" value={phone} onChange={(v) => { setPhone(v); setStepErrors(e => ({ ...e, phone: "" })); }} placeholder="+254 7XX XXX XXX" icon={<Phone className="w-4 h-4" />} autoComplete="tel" error={stepErrors.phone} />
                        </div>
                    )}

                    {/* STEP 2: Delivery */}
                    {step === "delivery" && (
                        <div className="bg-[#171717] rounded-2xl border border-zinc-800 p-6 space-y-5">
                            <h2 className="text-sm font-bold text-white flex items-center gap-2 font-glacial">
                                <MapPin className="w-4 h-4 text-[#C6A16A]" /> Delivery Address
                            </h2>

                            {/* Saved address picker */}
                            {savedAddresses.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-zinc-400 tracking-wide">Use a saved address</p>
                                    <div className="flex flex-wrap gap-2">
                                        {savedAddresses.map((a) => (
                                            <button key={a.id} type="button"
                                                onClick={() => { setAddress(a.street); setCity(a.city); setCounty(a.county); }}
                                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${address === a.street && city === a.city
                                                    ? "border-[#C6A16A] bg-[#C6A16A]/10 text-[#C6A16A]"
                                                    : "border-zinc-700 text-zinc-400 hover:border-[#C6A16A]/50"
                                                    }`}>
                                                {a.label}{a.isDefault ? " (Default)" : ""}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="h-px bg-zinc-800" />
                                </div>
                            )}

                            {addressLoading && (
                                <div className="flex items-center gap-2 text-xs text-zinc-400">
                                    <span className="w-4 h-4 border-2 border-zinc-200 border-t-[#C6A16A] rounded-full animate-spin flex-shrink-0" />
                                    Loading your saved addresses…
                                </div>
                            )}

                            <Field label="Street / Estate / Building" value={address} onChange={(v) => { setAddress(v); setStepErrors(e => ({ ...e, address: "" })); }}
                                placeholder="e.g. Westlands, Mpaka Road, Apt 4B" icon={<Building2 className="w-4 h-4" />} autoComplete="address-line1" error={stepErrors.address} />
                            <div className="grid sm:grid-cols-2 gap-4">
                                <Field label="Town / City" value={city} onChange={(v) => { setCity(v); setStepErrors(e => ({ ...e, city: "" })); }} placeholder="Nairobi" icon={<MapPin className="w-4 h-4" />} autoComplete="address-level2" error={stepErrors.city} />
                                <Field label="County" value={county} onChange={(v) => { setCounty(v); setStepErrors(e => ({ ...e, county: "" })); }} placeholder="Nairobi County" autoComplete="address-level1" error={stepErrors.county} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-zinc-400 tracking-wide block">
                                    Delivery notes <span className="text-zinc-400 font-normal">(optional)</span>
                                </label>
                                <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Any landmarks, gate codes, or special instructions..."
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-700 bg-zinc-900 text-sm text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#C6A16A] focus:ring-2 focus:ring-[#C6A16A]/10 transition-all resize-none" />
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Payment */}
                    {step === "payment" && (
                        <div className="bg-[#171717] rounded-2xl border border-zinc-800 p-6 space-y-5">
                            <h2 className="text-sm font-bold text-white flex items-center gap-2 font-glacial">
                                <CreditCard className="w-4 h-4 text-[#C6A16A]" /> Payment Method
                            </h2>

                            {/* Payment mode selector tabs */}
                            <div className="grid grid-cols-2 gap-1 p-1 bg-zinc-900 rounded-xl w-full max-w-md">
                                <button
                                    type="button"
                                    onClick={() => setPayMethod("paystack-mpesa")}
                                    className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                                        payMethod === "paystack-mpesa" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-zinc-200"
                                    }`}
                                >
                                    PROMPT
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPayMethod("manual")}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                        payMethod === "manual" ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-zinc-200"
                                    }`}
                                >
                                    PAYBILL
                                </button>
                            </div>

                            {payMethod === "paystack-mpesa" ? (
                                <div className="p-4 rounded-xl border-2 border-[#C6A16A] bg-[#C6A16A]/5 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#C6A16A]" />
                                        <p className="text-sm font-bold text-white">M-Pesa Prompt</p>
                                    </div>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        Continue to Paystack&apos;s secure checkout to receive an M-Pesa prompt on your phone. You will not be asked for your M-Pesa PIN here.
                                    </p>
                                    <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl bg-emerald-500/8 border border-emerald-500/20 text-xs text-zinc-400">
                                        <Lock className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                        <span>Your email and phone number are required so Paystack can initialize and identify the payment.</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl border-2 border-[#C6A16A] bg-[#C6A16A]/5 space-y-4">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-[#C6A16A]" />
                                            <p className="text-sm font-bold text-white">Manual M-Pesa Payment</p>
                                        </div>
                                        <p className="text-xs text-zinc-400 leading-relaxed">
                                            Please use either of the options below on your phone&apos;s M-Pesa menu to pay <strong className="text-white">{formatKES(total)}</strong>.
                                        </p>

                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {/* Paybill Card */}
                                            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold text-[#C6A16A] uppercase tracking-wider">Option A: Paybill</span>
                                                    <button type="button" onClick={() => handleCopy("542542", "paybill")} className="text-[11px] text-[#C6A16A] font-semibold hover:underline flex items-center gap-1">
                                                        {copiedField === "paybill" ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                                                    </button>
                                                </div>
                                                <div className="text-xs space-y-1">
                                                    <p className="text-zinc-400">Business No: <span className="font-mono font-bold text-white text-sm ml-1">542542</span></p>
                                                    <p className="text-zinc-400 flex items-center justify-between">
                                                        <span>Account No: <span className="font-mono font-bold text-white text-xs ml-1">03703439943450</span></span>
                                                        <button type="button" onClick={() => handleCopy("03703439943450", "acc")} className="text-[10px] text-[#C6A16A] hover:underline flex items-center gap-1">
                                                            {copiedField === "acc" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                                        </button>
                                                    </p>
                                                    <p className="text-zinc-400 text-[11px] pt-1 border-t border-zinc-800/80">Account Name: <span className="text-zinc-200 font-medium">Laureen Nyaboke Maina</span></p>
                                                </div>
                                            </div>

                                            {/* Send Money Card */}
                                            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-bold text-[#C6A16A] uppercase tracking-wider">Option B: Send Money</span>
                                                    <button type="button" onClick={() => handleCopy("0704147774", "phone")} className="text-[11px] text-[#C6A16A] font-semibold hover:underline flex items-center gap-1">
                                                        {copiedField === "phone" ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                                                    </button>
                                                </div>
                                                <div className="text-xs space-y-1">
                                                    <p className="text-zinc-400">Phone No: <span className="font-mono font-bold text-white text-sm ml-1">0704147774</span></p>
                                                    <p className="text-zinc-400 text-[11px] pt-1 border-t border-zinc-800/80">Recipient Name: <span className="text-zinc-200 font-medium">Laureen Nyaboke Maina</span></p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl bg-emerald-500/8 border border-emerald-500/20 text-xs text-zinc-400">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                            <span>After completing payment, click <strong>Continue</strong> below to place your order. You will also get a direct WhatsApp confirmation link.</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-400">
                                <Lock className="w-3.5 h-3.5 text-[#C6A16A] flex-shrink-0" />
                                Your payment details are safe. We do not store your M-Pesa PIN or personal credentials.
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Review */}
                    {step === "review" && (
                        <div className="space-y-4">
                            <div className="bg-[#171717] rounded-2xl border border-zinc-800 p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Contact</h3>
                                    <button type="button" onClick={() => setStep("details")} className="text-xs text-[#C6A16A] font-semibold hover:underline">Edit</button>
                                </div>
                                <p className="text-sm text-zinc-300">{firstName} {lastName}</p>
                                <p className="text-sm text-zinc-400">{phone}</p>
                                {email && <p className="text-sm text-zinc-400">{email}</p>}
                            </div>
                            <div className="bg-[#171717] rounded-2xl border border-zinc-800 p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Delivery</h3>
                                    <button type="button" onClick={() => setStep("delivery")} className="text-xs text-[#C6A16A] font-semibold hover:underline">Edit</button>
                                </div>
                                <p className="text-sm text-zinc-300">{address}</p>
                                <p className="text-sm text-zinc-400">{city}{county ? `, ${county}` : ""}</p>
                                {notes && <p className="text-xs text-zinc-400 mt-1 italic">{notes}</p>}
                            </div>
                            <div className="bg-[#171717] rounded-2xl border border-zinc-800 p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Payment</h3>
                                    <button type="button" onClick={() => setStep("payment")} className="text-xs text-[#C6A16A] font-semibold hover:underline">Edit</button>
                                </div>
                                <p className="text-sm font-semibold text-zinc-300">
                                    {payMethod === "paystack-mpesa"
                                        ? "M-Pesa Prompt (Paystack)"
                                        : "M-Pesa Paybill"}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between gap-3 pt-2">
                        {currentIndex > 0 ? (
                            <button type="button" onClick={goBack}
                                className="px-5 py-2.5 rounded-xl border border-zinc-700 text-sm font-semibold text-zinc-400 hover:border-zinc-400 hover:text-white transition-all">
                                ← Back
                            </button>
                        ) : (
                            <Link href="/cart"
                                className="px-5 py-2.5 rounded-xl border border-zinc-700 text-sm font-semibold text-zinc-400 hover:border-zinc-400 hover:text-white transition-all">
                                ← Back to Cart
                            </Link>
                        )}
                        {step !== "review" ? (
                            <button type="button" onClick={goNext}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-bold text-sm transition-all shadow-md">
                                Continue <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <div className="flex flex-col items-end gap-2">
                                {placeErr && (
                                    <p className="text-xs text-red-500 font-semibold text-right max-w-xs">{placeErr}</p>
                                )}
                                <button
                                    type="button"
                                    onClick={placeOrder}
                                    disabled={placing}
                                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] disabled:opacity-60 text-zinc-950 font-bold text-sm transition-all shadow-md"
                                >
                                    {placing
                                        ? <><span className="w-4 h-4 border-2 border-zinc-950/20 border-t-zinc-950 rounded-full animate-spin" /> Placing…</>
                                        : <><CheckCircle2 className="w-4 h-4" /> Place Order</>}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Order summary sidebar */}
                <div className="w-full lg:w-80 flex-shrink-0 space-y-4 sticky top-24">
                    <OrderSummary />
                    <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-[#C6A16A]/8 border border-[#C6A16A]/20 text-xs text-zinc-400">
                        <Truck className="w-4 h-4 text-[#C6A16A] flex-shrink-0 mt-0.5" />
                        <span>Countrywide delivery. Estimated 2–5 business days after order confirmation.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
                <span className="w-7 h-7 border-2 border-zinc-200 border-t-[#C6A16A] rounded-full animate-spin" />
            </div>
        }>
            <CheckoutPageContent />
        </Suspense>
    );
}
