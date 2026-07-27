"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ChevronRight, Package, MapPin, CreditCard,
    CheckCircle2, ArrowRight, ChevronDown, Truck,
    Phone, Mail, User, Building2, Lock,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/svgicons";

const WHATSAPP_NUMBER = "254704147774";

/* ── Dummy cart (mirrors CartView) ── */
const CART_ITEMS = [
    { id: "c1", name: "Non-Stick Cookware Set 8pc", category: "Kitchenware", price: 6400, qty: 1 },
];

const DELIVERY_FEE = 350;

type Step = "details" | "delivery" | "payment" | "review";

const STEPS: { key: Step; label: string; icon: React.ReactNode }[] = [
    { key: "details",  label: "Your Details", icon: <User className="w-4 h-4" /> },
    { key: "delivery", label: "Delivery",      icon: <Truck className="w-4 h-4" /> },
    { key: "payment",  label: "Payment",       icon: <CreditCard className="w-4 h-4" /> },
    { key: "review",   label: "Review",        icon: <CheckCircle2 className="w-4 h-4" /> },
];

const STEP_KEYS = STEPS.map((s) => s.key);

function formatKES(n: number) {
    return `KSh ${n.toLocaleString("en-KE")}`;
}

/* ── Field primitive ── */
function Field({
    label, type = "text", value, onChange, placeholder, icon, required = true, autoComplete,
}: {
    label: string; type?: string; value: string; onChange: (v: string) => void;
    placeholder: string; icon?: React.ReactNode; required?: boolean; autoComplete?: string;
}) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wide block">
                {label}{required && <span className="text-[#C6A16A] ml-0.5">*</span>}
            </label>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 focus-within:border-[#C6A16A] focus-within:bg-white dark:focus-within:bg-zinc-900 focus-within:ring-2 focus-within:ring-[#C6A16A]/10 transition-all duration-200">
                {icon && <span className="text-zinc-400 dark:text-zinc-500 flex-shrink-0">{icon}</span>}
                <input
                    type={type} value={value} onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder} autoComplete={autoComplete} required={required}
                    className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none min-w-0"
                />
            </div>
        </div>
    );
}

/* ── Order summary sidebar ── */
function OrderSummary({ compact = false }: { compact?: boolean }) {
    const [open, setOpen] = useState(!compact);
    const subtotal = CART_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
    const total    = subtotal + DELIVERY_FEE;

    return (
        <div className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            {/* Toggle on mobile */}
            {compact && (
                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    className="w-full flex items-center justify-between px-5 py-4 text-sm font-bold text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800"
                >
                    <span className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#C6A16A]" /> Order Summary
                    </span>
                    <div className="flex items-center gap-3">
                        <span className="text-[#C6A16A]">{formatKES(total)}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
                    </div>
                </button>
            )}
            {!compact && (
                <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                    <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                        <Package className="w-3.5 h-3.5 text-[#C6A16A]" /> Order Summary
                    </h2>
                </div>
            )}

            {open && (
                <div className="px-5 py-4 space-y-4">
                    {/* Items */}
                    <div className="space-y-3">
                        {CART_ITEMS.map((item) => (
                            <div key={item.id} className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center flex-shrink-0">
                                    <Package className="w-4 h-4 text-zinc-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">{item.name}</p>
                                    <p className="text-[10px] text-zinc-400">Qty: {item.qty}</p>
                                </div>
                                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex-shrink-0">
                                    {formatKES(item.price * item.qty)}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

                    {/* Totals */}
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400">
                            <span>Subtotal</span><span>{formatKES(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400">
                            <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Delivery</span>
                            <span>{formatKES(DELIVERY_FEE)}</span>
                        </div>
                        <div className="flex justify-between text-base font-bold text-zinc-900 dark:text-white pt-2 border-t border-zinc-100 dark:border-zinc-800">
                            <span>Total</span>
                            <span className="text-[#C6A16A]">{formatKES(total)}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

/*   Main checkout page */
export default function CheckoutPage() {
    const [step, setStep] = useState<Step>("details");
    const [placed, setPlaced] = useState(false);

    /* Form state */
    const [firstName, setFirstName] = useState("");
    const [lastName,  setLastName]  = useState("");
    const [email,     setEmail]     = useState("");
    const [phone,     setPhone]     = useState("");

    const [address,   setAddress]   = useState("");
    const [city,      setCity]      = useState("");
    const [county,    setCounty]    = useState("");
    const [notes,     setNotes]     = useState("");

    const [payMethod, setPayMethod] = useState<"mpesa-paybill" | "mpesa-stk" | "cod">("mpesa-paybill");
    const [mpesaRef,  setMpesaRef]  = useState("");
    const [stkPhone,  setStkPhone]  = useState("");

    const subtotal = CART_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
    const total    = subtotal + DELIVERY_FEE;

    const currentIndex = STEP_KEYS.indexOf(step);

    const goNext = () => {
        const next = STEP_KEYS[currentIndex + 1];
        if (next) setStep(next as Step);
    };
    const goBack = () => {
        const prev = STEP_KEYS[currentIndex - 1];
        if (prev) setStep(prev as Step);
    };

    const placeOrder = () => setPlaced(true);

    const waMsg = encodeURIComponent(
        `Hi, I'd like to confirm my order:\n\n` +
        CART_ITEMS.map((i) => `• ${i.name} x${i.qty} — ${formatKES(i.price * i.qty)}`).join("\n") +
        `\n\nTotal: ${formatKES(total)}\nDelivery to: ${address}, ${city}, ${county}\nPayment: ${payMethod === "mpesa-paybill" ? "M-Pesa Paybill" : payMethod === "mpesa-stk" ? "M-Pesa STK Push" : "Cash on Delivery"}`
    );

    /* ── Order placed confirmation ── */
    if (placed) {
        return (
            <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#C6A16A] mb-2">Order Placed</p>
                    <h1 className="text-3xl font-bold font-glacial text-zinc-900 dark:text-white mb-2">Thank you!</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm mx-auto">
                        Your order has been received. We will confirm availability and reach out via WhatsApp or phone shortly.
                    </p>
                </div>
                <div className="flex items-center justify-center gap-3 flex-wrap">
                    <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-bold text-xs transition-all shadow-md"
                    >
                        <WhatsAppIcon className="w-4 h-4" /> Confirm on WhatsApp
                    </a>
                    <Link
                        href="/track-order"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 font-bold text-xs hover:border-[#C6A16A]/50 hover:text-[#C6A16A] transition-all"
                    >
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
                <span className="text-zinc-600 dark:text-zinc-300 font-semibold">Checkout</span>
            </nav>

            {/* Page heading */}
            <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-[#C6A16A] mb-1">Secure Checkout</p>
                <h1 className="text-3xl font-bold font-glacial text-zinc-900 dark:text-white flex items-center gap-3">
                    <Lock className="w-6 h-6 text-[#C6A16A]" /> Complete Your Order
                </h1>
            </div>

            {/* Step indicator */}
            <div className="flex items-center mb-10 overflow-x-auto scrollbar-none">
                {STEPS.map((s, i) => {
                    const done    = i < currentIndex;
                    const active  = s.key === step;
                    return (
                        <div key={s.key} className="flex items-center flex-shrink-0">
                            <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold transition-all ${
                                active  ? "bg-[#C6A16A] text-zinc-950 shadow-md" :
                                done    ? "bg-[#C6A16A]/15 text-[#C6A16A]" :
                                          "bg-zinc-100 dark:bg-zinc-900 text-zinc-400"
                            }`}>
                                <span>{s.icon}</span>
                                <span className="hidden sm:inline">{s.label}</span>
                            </div>
                            {i < STEPS.length - 1 && (
                                <div className={`w-8 h-0.5 mx-1 rounded-full transition-colors ${done ? "bg-[#C6A16A]" : "bg-zinc-200 dark:bg-zinc-800"}`} />
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* ── Left: Form panels ── */}
                <div className="flex-1 w-full space-y-6">

                    {/* STEP 1: Details */}
                    {step === "details" && (
                        <div className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-5">
                            <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2 font-glacial">
                                <User className="w-4 h-4 text-[#C6A16A]" /> Contact Information
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <Field label="First name" value={firstName} onChange={setFirstName} placeholder="Jane" icon={<User className="w-4 h-4" />} autoComplete="given-name" />
                                <Field label="Last name"  value={lastName}  onChange={setLastName}  placeholder="Wanjiku" autoComplete="family-name" />
                            </div>
                            <Field label="Email address" type="email" value={email} onChange={setEmail} placeholder="jane@example.com" icon={<Mail className="w-4 h-4" />} autoComplete="email" required={false} />
                            <Field label="Phone number" type="tel" value={phone} onChange={setPhone} placeholder="+254 7XX XXX XXX" icon={<Phone className="w-4 h-4" />} autoComplete="tel" />
                        </div>
                    )}

                    {/* STEP 2: Delivery */}
                    {step === "delivery" && (
                        <div className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-5">
                            <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2 font-glacial">
                                <MapPin className="w-4 h-4 text-[#C6A16A]" /> Delivery Address
                            </h2>
                            <Field label="Street / Estate / Building" value={address} onChange={setAddress} placeholder="e.g. Westlands, Mpaka Road, Apt 4B" icon={<Building2 className="w-4 h-4" />} autoComplete="address-line1" />
                            <div className="grid sm:grid-cols-2 gap-4">
                                <Field label="Town / City" value={city} onChange={setCity} placeholder="Nairobi" icon={<MapPin className="w-4 h-4" />} autoComplete="address-level2" />
                                <Field label="County" value={county} onChange={setCounty} placeholder="Nairobi County" autoComplete="address-level1" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 tracking-wide block">
                                    Delivery notes <span className="text-zinc-400 font-normal">(optional)</span>
                                </label>
                                <textarea
                                    value={notes} onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Any landmarks, gate codes, or special instructions..."
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:border-[#C6A16A] focus:ring-2 focus:ring-[#C6A16A]/10 transition-all resize-none"
                                />
                            </div>
                        </div>
                    )}

                    {/* STEP 3: Payment */}
                    {step === "payment" && (
                        <div className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-5">
                            <h2 className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2 font-glacial">
                                <CreditCard className="w-4 h-4 text-[#C6A16A]" /> Payment Method
                            </h2>

                            <div className="space-y-3">

                                {/* ── Option 1: M-Pesa Paybill ── */}
                                <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                    payMethod === "mpesa-paybill"
                                        ? "border-[#C6A16A] bg-[#C6A16A]/5"
                                        : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
                                }`}>
                                    <input type="radio" name="payment" value="mpesa-paybill" checked={payMethod === "mpesa-paybill"} onChange={() => setPayMethod("mpesa-paybill")} className="mt-1 accent-[#C6A16A]" />
                                    <div className="flex-1 space-y-3">
                                        <div>
                                            <p className="text-sm font-bold text-zinc-900 dark:text-white">M-Pesa Paybill</p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Pay manually via M-Pesa, then enter your transaction reference below.</p>
                                        </div>

                                        {payMethod === "mpesa-paybill" && (
                                            <div className="space-y-4">
                                                {/* Payment instructions */}
                                                <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-4 space-y-3">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#C6A16A]">Payment Instructions</p>
                                                    <ol className="space-y-2 text-xs text-zinc-300 leading-relaxed list-none">
                                                        <li className="flex items-start gap-2.5">
                                                            <span className="w-5 h-5 rounded-full bg-[#C6A16A]/20 text-[#C6A16A] font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                                                            Go to <span className="text-white font-semibold">M-Pesa</span> on your phone
                                                        </li>
                                                        <li className="flex items-start gap-2.5">
                                                            <span className="w-5 h-5 rounded-full bg-[#C6A16A]/20 text-[#C6A16A] font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                                                            Select <span className="text-white font-semibold">Lipa na M-Pesa → Paybill</span>
                                                        </li>
                                                        <li className="flex items-start gap-2.5">
                                                            <span className="w-5 h-5 rounded-full bg-[#C6A16A]/20 text-[#C6A16A] font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                                                            Enter Business No: <span className="text-[#C6A16A] font-bold font-mono">400200</span>
                                                        </li>
                                                        <li className="flex items-start gap-2.5">
                                                            <span className="w-5 h-5 rounded-full bg-[#C6A16A]/20 text-[#C6A16A] font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                                                            Account No: <span className="text-[#C6A16A] font-bold font-mono">CASTRA</span>
                                                        </li>
                                                        <li className="flex items-start gap-2.5">
                                                            <span className="w-5 h-5 rounded-full bg-[#C6A16A]/20 text-[#C6A16A] font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
                                                            Amount: <span className="text-white font-bold">{formatKES(total)}</span>
                                                        </li>
                                                        <li className="flex items-start gap-2.5">
                                                            <span className="w-5 h-5 rounded-full bg-[#C6A16A]/20 text-[#C6A16A] font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">6</span>
                                                            Enter your M-Pesa PIN and confirm
                                                        </li>
                                                    </ol>
                                                    <div className="flex items-center gap-3 pt-1 border-t border-zinc-800">
                                                        <div className="flex-1">
                                                            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Business No</p>
                                                            <p className="text-base font-bold font-mono text-[#C6A16A]">400200</p>
                                                        </div>
                                                        <div className="w-px h-8 bg-zinc-800" />
                                                        <div className="flex-1">
                                                            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Account No</p>
                                                            <p className="text-base font-bold font-mono text-[#C6A16A]">CASTRA</p>
                                                        </div>
                                                        <div className="w-px h-8 bg-zinc-800" />
                                                        <div className="flex-1">
                                                            <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-0.5">Amount</p>
                                                            <p className="text-base font-bold text-white">{formatKES(total)}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Ref input */}
                                                <Field
                                                    label="M-Pesa transaction reference"
                                                    value={mpesaRef}
                                                    onChange={setMpesaRef}
                                                    placeholder="e.g. QGH3X7YZ89"
                                                    icon={<Phone className="w-4 h-4" />}
                                                    required={false}
                                                />
                                                <p className="text-[11px] text-zinc-400 leading-relaxed">
                                                    Enter the reference from your M-Pesa confirmation SMS. You can also provide it later via WhatsApp.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </label>

                                {/* ── Option 2: STK Push ── */}
                                <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                    payMethod === "mpesa-stk"
                                        ? "border-[#C6A16A] bg-[#C6A16A]/5"
                                        : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
                                }`}>
                                    <input type="radio" name="payment" value="mpesa-stk" checked={payMethod === "mpesa-stk"} onChange={() => setPayMethod("mpesa-stk")} className="mt-1 accent-[#C6A16A]" />
                                    <div className="flex-1 space-y-3">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-bold text-zinc-900 dark:text-white">M-Pesa STK Push</p>
                                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/25">Recommended</span>
                                            </div>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                                                Enter your M-Pesa number below. You will receive a payment prompt on your phone — just enter your PIN to complete.
                                            </p>
                                        </div>

                                        {payMethod === "mpesa-stk" && (
                                            <div className="space-y-3">
                                                <Field
                                                    label="M-Pesa phone number"
                                                    type="tel"
                                                    value={stkPhone}
                                                    onChange={setStkPhone}
                                                    placeholder="e.g. 0712 345 678"
                                                    icon={<Phone className="w-4 h-4" />}
                                                    autoComplete="tel"
                                                />
                                                <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-xl bg-emerald-500/8 border border-emerald-500/20 text-xs text-zinc-600 dark:text-zinc-400">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                    <span>After placing your order, an M-Pesa prompt for <span className="font-bold text-zinc-800 dark:text-zinc-200">{formatKES(total)}</span> will be sent to your phone. Simply enter your PIN to pay.</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </label>

                                {/* ── Option 3: Cash on Delivery ── */}
                                <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                    payMethod === "cod"
                                        ? "border-[#C6A16A] bg-[#C6A16A]/5"
                                        : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600"
                                }`}>
                                    <input type="radio" name="payment" value="cod" checked={payMethod === "cod"} onChange={() => setPayMethod("cod")} className="mt-1 accent-[#C6A16A]" />
                                    <div>
                                        <p className="text-sm font-bold text-zinc-900 dark:text-white">Cash on Delivery</p>
                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Pay in cash when your order arrives. Available for select areas — our team will confirm eligibility.</p>
                                    </div>
                                </label>
                            </div>

                            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
                                <Lock className="w-3.5 h-3.5 text-[#C6A16A] flex-shrink-0" />
                                Your payment details are safe. We do not store your M-Pesa PIN or personal credentials.
                            </div>
                        </div>
                    )}

                    {/* STEP 4: Review */}
                    {step === "review" && (
                        <div className="space-y-4">
                            {/* Contact */}
                            <div className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Contact</h3>
                                    <button type="button" onClick={() => setStep("details")} className="text-xs text-[#C6A16A] font-semibold hover:underline">Edit</button>
                                </div>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300">{firstName} {lastName}</p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">{phone}</p>
                                {email && <p className="text-sm text-zinc-500 dark:text-zinc-400">{email}</p>}
                            </div>
                            {/* Delivery */}
                            <div className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Delivery</h3>
                                    <button type="button" onClick={() => setStep("delivery")} className="text-xs text-[#C6A16A] font-semibold hover:underline">Edit</button>
                                </div>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300">{address}</p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">{city}{county ? `, ${county}` : ""}</p>
                                {notes && <p className="text-xs text-zinc-400 mt-1 italic">{notes}</p>}
                            </div>
                            {/* Payment */}
                            <div className="bg-white dark:bg-[#171717] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Payment</h3>
                                    <button type="button" onClick={() => setStep("payment")} className="text-xs text-[#C6A16A] font-semibold hover:underline">Edit</button>
                                </div>
                                <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                    {payMethod === "mpesa-paybill" ? "M-Pesa Paybill" : payMethod === "mpesa-stk" ? "M-Pesa STK Push" : "Cash on Delivery"}
                                </p>
                                {payMethod === "mpesa-paybill" && mpesaRef && (
                                    <p className="text-xs text-zinc-400 mt-1">Ref: <span className="font-mono font-semibold">{mpesaRef}</span></p>
                                )}
                                {payMethod === "mpesa-stk" && stkPhone && (
                                    <p className="text-xs text-zinc-400 mt-1">Prompt to: <span className="font-semibold">{stkPhone}</span></p>
                                )}
                                {payMethod === "mpesa-paybill" && !mpesaRef && (
                                    <p className="text-xs text-zinc-400 mt-1">Paybill: 400200 · Account: CASTRA</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Nav buttons */}
                    <div className="flex items-center justify-between gap-3 pt-2">
                        {currentIndex > 0 ? (
                            <button type="button" onClick={goBack}
                                className="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all">
                                ← Back
                            </button>
                        ) : (
                            <Link href="/cart" className="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-sm font-semibold text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all">
                                ← Back to Cart
                            </Link>
                        )}

                        {step !== "review" ? (
                            <button type="button" onClick={goNext}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-bold text-sm transition-all shadow-md">
                                Continue <ArrowRight className="w-4 h-4" />
                            </button>
                        ) : (
                            <button type="button" onClick={placeOrder}
                                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#C6A16A] hover:bg-[#b59059] text-zinc-950 font-bold text-sm transition-all shadow-md">
                                <CheckCircle2 className="w-4 h-4" /> Place Order
                            </button>
                        )}
                    </div>
                </div>

                {/* ── Right: Order summary ── */}
                <div className="w-full lg:w-80 flex-shrink-0 space-y-4 sticky top-24">
                    <OrderSummary />
                    <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-[#C6A16A]/8 border border-[#C6A16A]/20 text-xs text-zinc-600 dark:text-zinc-400">
                        <Truck className="w-4 h-4 text-[#C6A16A] flex-shrink-0 mt-0.5" />
                        <span>Countrywide delivery. Estimated 2–5 business days after order confirmation.</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
