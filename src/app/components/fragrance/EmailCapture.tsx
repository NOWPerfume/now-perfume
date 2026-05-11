"use client";

import { FormEvent, useMemo, useState } from "react";
import type { FragranceProfile, QuizLocale } from "../../../lib/fragrance/data";

type EmailCaptureProps = {
  fragrance: FragranceProfile;
  locale: QuizLocale;
  onSuccess: (email: string) => void;
};

async function submitEmailLead(payload: { email: string; fragrance: string; locale: string }) {
  const response = await fetch("/api/subscribe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: payload.email, source: "fragrance", lang: payload.locale, perfume: payload.fragrance }),
  });
  if (!response.ok) {
    throw new Error("Subscribe failed");
  }
  return response.json();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function EmailCapture({ fragrance, locale, onSuccess }: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const copy =
    locale === "fr"
      ? {
          title: "Accède en avant-première",
          leadLine1: "Sois parmi les premiers à découvrir ta fragrance.",
          leadLine2: "",
          error: "Merci d'entrer une adresse email valide.",
          submitError: "Une erreur est survenue. Réessayez dans un instant.",
          button: "Recevoir en avant-première",
          sending: "Envoi...",
          discount: "-10% sur ta première commande",
        }
      : {
          title: "Get early access",
          leadLine1: "Be among the first to discover your fragrance.",
          leadLine2: "",
          error: "Please enter a valid email address.",
          submitError: "Something went wrong. Please try again.",
          button: "Notify me first",
          sending: "Sending...",
          discount: "10% off your first order",
        };

  const buttonLabel = useMemo(
    () => (isSubmitting ? copy.sending : copy.button),
    [copy.button, copy.sending, isSubmitting],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const normalizedEmail = email.trim().toLowerCase();
    if (!isValidEmail(normalizedEmail)) {
      setError(copy.error);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitEmailLead({ email: normalizedEmail, fragrance: fragrance.name, locale });
      onSuccess(normalizedEmail);
    } catch {
      setError(copy.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur-[2px]">
      <div className="space-y-2">
        <h2 className="font-[var(--font-fragrance-display)] text-[2.1rem] leading-[1.04] tracking-tight">
          {copy.title}
        </h2>
        <p className="text-sm text-white/72">{copy.leadLine1}</p>
        {copy.leadLine2 ? <p className="text-sm text-white/72">{copy.leadLine2}</p> : null}
      </div>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
        <label className="block">
          <span className="sr-only">Adresse email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="ton@email.com"
            className="min-h-11 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-[0.95rem] text-white placeholder:text-white/40 focus-visible:outline-none focus-visible:ring-2"
            style={{
              caretColor: fragrance.colors.primary,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
            required
            autoComplete="email"
            inputMode="email"
          />
        </label>

        {error ? <p className="text-sm text-[#ffc4c4]">{error}</p> : null}

        <button
          type="submit"
          className="w-full min-h-11 rounded-full px-5 py-3 text-sm uppercase tracking-[0.08em] transition-all duration-500 disabled:opacity-70"
          style={{
            color: fragrance.colors.bg,
            backgroundColor: fragrance.colors.primary,
            boxShadow: `0 12px 32px -18px ${fragrance.colors.primary}`,
          }}
          disabled={isSubmitting}
        >
          {buttonLabel}
        </button>
      </form>

      <p className="mt-4 text-center text-xs tracking-[0.08em] text-white/65">{copy.discount}</p>
    </section>
  );
}
