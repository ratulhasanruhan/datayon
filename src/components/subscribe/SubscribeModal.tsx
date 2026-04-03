"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SubscribeModal({ open, onClose }: Props) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [already, setAlready] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const resetForm = useCallback(() => {
    setName("");
    setEmail("");
    setStatus("idle");
    setErrorMsg(null);
    setAlready(false);
  }, []);

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open, resetForm]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);
    setAlready(false);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        already?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(
          data.error === "invalid_email"
            ? "সঠিক ইমেইল ঠিকানা দিন।"
            : data.error === "invalid_name"
              ? "নাম লিখুন।"
              : "কিছু একটা সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।"
        );
        return;
      }
      setStatus("success");
      setAlready(Boolean(data.already));
    } catch {
      setStatus("error");
      setErrorMsg("নেটওয়ার্ক সমস্যা। আবার চেষ্টা করুন।");
    }
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-navy-deep/60 backdrop-blur-sm dark:bg-black/50"
        aria-label="বন্ধ করুন"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "relative z-10 w-full max-w-md rounded-2xl border border-border/80 bg-paper p-6 shadow-2xl",
          "dark:border-navy2 dark:bg-navy-deep"
        )}
      >
        <button
          type="button"
          className="absolute right-3 top-3 rounded-full p-2 text-muted transition hover:bg-art/80 hover:text-ink dark:hover:bg-navy-mid"
          aria-label="বন্ধ করুন"
          onClick={onClose}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 id={titleId} className="font-brand text-xl font-bold text-ink dark:text-cream">
          মাসিক সাবস্ক্রাইব
        </h2>

        {status === "success" ? (
          <p className="mt-4 font-body text-sm leading-relaxed text-ink/90 dark:text-cream/90">
            {already
              ? "এই ইমেইল আগে থেকেই তালিকায় আছে। ধন্যবাদ!"
              : "সাবস্ক্রাইব হয়েছে। শীঘ্রই ম্যাগাজিন আপনার ইমেইলে পাঠানো হবে।"}
          </p>
        ) : (
          <>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted">
              শুরুতে আমাদের পরবর্তী <strong className="font-medium text-ink dark:text-cream">৩টি মাসিক</strong>{" "}
              সংখ্যা সবার জন্য বিনামূল্যে উপলব্ধ থাকবে। ম্যাসিক সরাসরি ইমেইলে পেতে নিচে নাম ও ইমেইল দিন।
            </p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="sub-name" className="block font-sans text-xs font-medium text-muted">
                  নাম
                </label>
                <input
                  id="sub-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={200}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border/80 bg-surface-elevated/80 px-3 py-2.5 font-sans text-sm text-ink outline-none ring-teal/50 placeholder:text-muted focus:border-teal focus:ring-2 dark:border-navy2 dark:bg-navy-mid/50 dark:text-cream"
                  placeholder="আপনার নাম"
                />
              </div>
              <div>
                <label htmlFor="sub-email" className="block font-sans text-xs font-medium text-muted">
                  ইমেইল
                </label>
                <input
                  id="sub-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={320}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-border/80 bg-surface-elevated/80 px-3 py-2.5 font-sans text-sm text-ink outline-none ring-teal/50 placeholder:text-muted focus:border-teal focus:ring-2 dark:border-navy2 dark:bg-navy-mid/50 dark:text-cream"
                  placeholder="you@example.com"
                />
              </div>

              {errorMsg ? (
                <p className="font-sans text-xs text-red-600 dark:text-red-400" role="alert">
                  {errorMsg}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full bg-navy py-3 font-sans text-sm font-semibold text-cream transition hover:bg-navy2 disabled:opacity-60 dark:bg-teal dark:text-navy dark:hover:bg-teal-dark"
              >
                {status === "loading" ? "পাঠানো হচ্ছে…" : "সাবস্ক্রাইব করুন"}
              </button>
            </form>
          </>
        )}

        {status === "success" ? (
          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-full border border-border/80 py-2.5 font-sans text-sm font-medium text-ink transition hover:bg-art/50 dark:border-navy2 dark:text-cream"
          >
            বন্ধ করুন
          </button>
        ) : null}
      </div>
    </div>,
    document.body
  );
}
