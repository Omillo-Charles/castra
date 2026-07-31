"use client";

import {
    createContext, useContext, useState, useCallback,
    useEffect, useRef, ReactNode,
} from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";

// Types

type ToastVariant = "success" | "error" | "warning" | "info";

interface Toast {
    id:      string;
    message: string;
    variant: ToastVariant;
}

interface ToastContextType {
    toast: (message: string, variant?: ToastVariant) => void;
    success: (message: string) => void;
    error:   (message: string) => void;
    warning: (message: string) => void;
    info:    (message: string) => void;
}

// Context

const ToastContext = createContext<ToastContextType | null>(null);

// Provider

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const dismiss = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const toast = useCallback((message: string, variant: ToastVariant = "info") => {
        const id = `${Date.now()}-${Math.random()}`;
        setToasts(prev => [...prev, { id, message, variant }]);
    }, []);

    const success = useCallback((msg: string) => toast(msg, "success"), [toast]);
    const error   = useCallback((msg: string) => toast(msg, "error"),   [toast]);
    const warning = useCallback((msg: string) => toast(msg, "warning"), [toast]);
    const info    = useCallback((msg: string) => toast(msg, "info"),    [toast]);

    return (
        <ToastContext.Provider value={{ toast, success, error, warning, info }}>
            {children}
            <ToastStack toasts={toasts} dismiss={dismiss} />
        </ToastContext.Provider>
    );
}

// Hook

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
    return ctx;
}

// UI

const VARIANTS: Record<ToastVariant, {
    icon:      React.ReactNode;
    bar:       string;
    container: string;
    text:      string;
}> = {
    success: {
        icon:      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />,
        bar:       "bg-emerald-500",
        container: "border-emerald-500/25 bg-zinc-950",
        text:      "text-emerald-400",
    },
    error: {
        icon:      <XCircle className="w-4 h-4 flex-shrink-0" />,
        bar:       "bg-red-500",
        container: "border-red-500/25 bg-zinc-950",
        text:      "text-red-400",
    },
    warning: {
        icon:      <AlertTriangle className="w-4 h-4 flex-shrink-0" />,
        bar:       "bg-amber-500",
        container: "border-amber-500/25 bg-zinc-950",
        text:      "text-amber-400",
    },
    info: {
        icon:      <Info className="w-4 h-4 flex-shrink-0" />,
        bar:       "bg-[#c6a16a]",
        container: "border-[#c6a16a]/25 bg-zinc-950",
        text:      "text-[#c6a16a]",
    },
};

const DURATION = 4000; // ms before auto-dismiss

function ToastItem({ toast, dismiss }: { toast: Toast; dismiss: (id: string) => void }) {
    const v         = VARIANTS[toast.variant];
    const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [visible, setVisible] = useState(false);

    // Animate in
    useEffect(() => {
        const frame = requestAnimationFrame(() => setVisible(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    // Auto-dismiss
    useEffect(() => {
        timerRef.current = setTimeout(() => {
            setVisible(false);
            setTimeout(() => dismiss(toast.id), 300);
        }, DURATION);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [toast.id, dismiss]);

    const handleDismiss = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setVisible(false);
        setTimeout(() => dismiss(toast.id), 300);
    };

    return (
        <div
            role="alert"
            aria-live="assertive"
            className={`
                relative flex items-start gap-3 w-full max-w-sm px-4 py-3.5
                rounded-xl border shadow-2xl overflow-hidden
                transition-all duration-300 ease-out
                ${v.container}
                ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}
            `}
        >
            {/* Coloured left bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${v.bar}`} />

            {/* Icon */}
            <span className={`mt-0.5 ${v.text}`}>{v.icon}</span>

            {/* Message */}
            <p className="flex-1 text-sm font-medium text-zinc-100 leading-snug pr-1">
                {toast.message}
            </p>

            {/* Dismiss */}
            <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss notification"
                className="flex-shrink-0 mt-0.5 text-zinc-500 hover:text-zinc-200 transition-colors"
            >
                <X className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}

function ToastStack({ toasts, dismiss }: { toasts: Toast[]; dismiss: (id: string) => void }) {
    if (toasts.length === 0) return null;

    return (
        <div
            aria-label="Notifications"
            className="fixed top-4 right-4 z-[9999] flex flex-col gap-2.5 items-end pointer-events-none"
        >
            {toasts.map(t => (
                <div key={t.id} className="pointer-events-auto w-full">
                    <ToastItem toast={t} dismiss={dismiss} />
                </div>
            ))}
        </div>
    );
}
