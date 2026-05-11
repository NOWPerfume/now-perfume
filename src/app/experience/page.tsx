"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */

type Energy = "intense" | "calme" | "energique" | "cocooning" | "sensuel";

const ENERGIES: { key: Energy; emoji: string; label: string }[] = [
  { key: "intense",    emoji: "🔥", label: "Intense"    },
  { key: "calme",      emoji: "🌿", label: "Calme"      },
  { key: "energique",  emoji: "☀️", label: "Énergique"  },
  { key: "cocooning",  emoji: "🤍", label: "Cocooning"  },
  { key: "sensuel",    emoji: "🌹", label: "Sensuel"    },
];

type PerfumeData = {
  id: string;
  name: string;
  signature: string;
  energyLine: string;
  family: string;
  notes: string;
  bottleImage: string;
  bg: string;          // CSS linear-gradient string
  textColor: string;   // hex
  accentColor: string; // hex
};

const PERFUME_MAP: Record<Energy, PerfumeData> = {
  intense: {
    id: "ginger-aphrodisiac",
    name: "GINGER APHRODISIAC",
    signature: "Release your spicy self",
    energyLine: "Chaleur · Attraction · Confiance",
    family: "Épicée / Hespéridée",
    notes: "Gingembre · Citron vert · Vétiver",
    bottleImage: "/images/flacon-ginger.jpg",
    bg: "linear-gradient(160deg, #f7fee7 0%, #fef9c3 55%, #fffbeb 100%)",
    textColor: "#78350f",
    accentColor: "#b91c1c",
  },
  calme: {
    id: "matcha-star",
    name: "MATCHA STAR",
    signature: "Find your inner power",
    energyLine: "Équilibre · Clarté · Puissance",
    family: "Verte / Boisée",
    notes: "Matcha · Figue · Cèdre",
    bottleImage: "/images/flacon-matcha.jpg",
    bg: "linear-gradient(160deg, #f7fee7 0%, #d1fae5 55%, #a7f3d0 100%)",
    textColor: "#064e3b",
    accentColor: "#064e3b",
  },
  energique: {
    id: "maracuja-samba",
    name: "MARACUJA SAMBA",
    signature: "Burst into the light",
    energyLine: "Joie · Énergie · Liberté",
    family: "Fruitée / Florale",
    notes: "Fruit de la passion · Mangue · Basilic",
    bottleImage: "/images/flacon-maracuja.jpg",
    bg: "linear-gradient(160deg, #fffbeb 0%, #fed7aa 55%, #fdba74 100%)",
    textColor: "#7c2d12",
    accentColor: "#ea580c",
  },
  cocooning: {
    id: "vanilla-chill",
    name: "VANILLA CHILL",
    signature: "Wrap yourself in warmth",
    energyLine: "Bien-être · Douceur · Sérénité",
    family: "Gourmande / Boisée",
    notes: "Vanille · Sésame · Lavande",
    bottleImage: "/images/flacon-vanilla.jpg",
    bg: "linear-gradient(160deg, #fefce8 0%, #fde68a 45%, #fcd34d 100%)",
    textColor: "#1c1917",
    accentColor: "#292524",
  },
  sensuel: {
    id: "rosa-boom",
    name: "ROSA BOOM",
    signature: "Love in full bloom",
    energyLine: "Séduction · Émotions · Sensualité",
    family: "Florale / Orientale",
    notes: "Rose · Litchi · Patchouli",
    bottleImage: "/images/flacon-rosa.jpg",
    bg: "linear-gradient(160deg, #fff1f2 0%, #fce7f3 50%, #f5d0fe 100%)",
    textColor: "#881337",
    accentColor: "#c026d3",
  },
};

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */

type Screen = "intro" | "selection" | "result" | "cta" | "thanks";

/* ─────────────────────────────────────────────────────────────
   FADE WRAPPER
───────────────────────────────────────────────────────────── */

function FadeScreen({
  visible,
  children,
  bg = "#f9f6f1",
  style,
}: {
  visible: boolean;
  children: React.ReactNode;
  bg?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2.5rem 1.5rem",
        background: bg,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.7s cubic-bezier(0.4,0,0.2,1)",
        overflowY: "auto",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────── */

export default function ExperiencePage() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [selectedEnergy, setSelectedEnergy] = useState<Energy | null>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const perfume = selectedEnergy ? PERFUME_MAP[selectedEnergy] : null;

  // Prevent body scroll on mobile
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function goTo(next: Screen) {
    setScreen(next);
  }

  function handleEnergySelect(key: Energy) {
    setSelectedEnergy(key);
    goTo("result");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "qr-experience" }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || data.success !== true) throw new Error();
      goTo("thanks");
    } catch {
      setSubmitError("Une erreur est survenue. Réessaie.");
    } finally {
      setSubmitting(false);
    }
  }

  /* ── SCREEN 1: INTRO ── */
  const introVisible = screen === "intro";
  /* ── SCREEN 2: SELECTION ── */
  const selectionVisible = screen === "selection";
  /* ── SCREEN 3: RESULT ── */
  const resultVisible = screen === "result";
  /* ── SCREEN 4: CTA ── */
  const ctaVisible = screen === "cta";
  /* ── SCREEN 5: THANKS ── */
  const thanksVisible = screen === "thanks";

  return (
    <div style={{ position: "fixed", inset: 0, fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>

      {/* ── 1. INTRO ── */}
      <FadeScreen visible={introVisible} bg="#f5f2ed">
        {/* Subtle top wordmark */}
        <p style={{ position: "absolute", top: "2rem", left: 0, right: 0, textAlign: "center", letterSpacing: "0.35em", fontSize: "0.65rem", color: "#00000055", textTransform: "uppercase" }}>
          NOW PERFUME
        </p>

        {/* Decorative hairline */}
        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, #00000020)", marginBottom: "3rem" }} />

        <h1 style={{ fontSize: "clamp(2rem, 8vw, 3.25rem)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1a1614", textAlign: "center", lineHeight: 1.15, margin: 0, maxWidth: 340 }}>
          L&apos;instant devient<br />
          <span style={{ fontWeight: 600, fontStyle: "italic" }}>signature.</span>
        </h1>

        <p style={{ marginTop: "1.5rem", fontSize: "0.95rem", fontWeight: 300, color: "#1a161499", textAlign: "center", letterSpacing: "0.02em", lineHeight: 1.6 }}>
          Tu viens de vivre une sensation.
        </p>

        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, #00000020, transparent)", marginTop: "3rem" }} />

        <button
          onClick={() => goTo("selection")}
          style={{
            marginTop: "2.5rem",
            padding: "1rem 2.75rem",
            background: "#1a1614",
            color: "#f5f2ed",
            border: "none",
            borderRadius: "100px",
            fontSize: "0.8rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: "pointer",
            fontWeight: 500,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          Continuer
        </button>
      </FadeScreen>

      {/* ── 2. ENERGY SELECTION ── */}
      <FadeScreen visible={selectionVisible} bg="#f5f2ed">
        <p style={{ position: "absolute", top: "2rem", left: 0, right: 0, textAlign: "center", letterSpacing: "0.35em", fontSize: "0.65rem", color: "#00000055", textTransform: "uppercase" }}>
          NOW PERFUME
        </p>

        <p style={{ fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#00000060", marginBottom: "1.75rem" }}>
          Ton énergie
        </p>

        <h2 style={{ fontSize: "clamp(1.35rem, 6vw, 1.9rem)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1a1614", textAlign: "center", margin: "0 0 2.5rem", lineHeight: 1.25 }}>
          Quelle énergie<br />veux-tu porter ?
        </h2>

        <div style={{ width: "100%", maxWidth: 360, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {ENERGIES.map(({ key, emoji, label }) => (
            <button
              key={key}
              onClick={() => handleEnergySelect(key)}
              style={{
                width: "100%",
                padding: "1.1rem 1.75rem",
                background: "transparent",
                border: "1px solid #1a161422",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                cursor: "pointer",
                transition: "background 0.2s, border-color 0.2s",
                textAlign: "left",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#1a161408"; e.currentTarget.style.borderColor = "#1a161455"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#1a161422"; }}
            >
              <span style={{ fontSize: "1.3rem", lineHeight: 1 }}>{emoji}</span>
              <span style={{ fontSize: "0.95rem", fontWeight: 400, letterSpacing: "0.04em", color: "#1a1614" }}>{label}</span>
            </button>
          ))}
        </div>
      </FadeScreen>

      {/* ── 3. PERFUME RESULT ── */}
      {perfume && (
        <FadeScreen
          visible={resultVisible}
          bg={perfume.bg}
          style={{ justifyContent: "flex-start", paddingTop: "4rem" }}
        >
          <p style={{ position: "absolute", top: "2rem", left: 0, right: 0, textAlign: "center", letterSpacing: "0.35em", fontSize: "0.65rem", color: `${perfume.textColor}66`, textTransform: "uppercase" }}>
            NOW PERFUME
          </p>

          {/* Bottle image */}
          <div style={{ width: "100%", maxWidth: 260, aspectRatio: "3/4", position: "relative", marginBottom: "2.5rem", flexShrink: 0 }}>
            <Image
              src={perfume.bottleImage}
              alt={perfume.name}
              fill
              sizes="100vw"
              style={{ objectFit: "contain", objectPosition: "center" }}
              priority
            />
          </div>

          {/* Text content */}
          <div style={{ width: "100%", maxWidth: 360, textAlign: "center" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: `${perfume.textColor}88`, margin: "0 0 0.5rem" }}>
              Eau de Parfum
            </p>
            <h2 style={{ fontSize: "clamp(1.3rem, 5.5vw, 1.75rem)", fontWeight: 600, letterSpacing: "0.08em", color: perfume.textColor, margin: "0 0 0.6rem", textTransform: "uppercase" }}>
              {perfume.name}
            </h2>
            <p style={{ fontSize: "1rem", fontWeight: 300, fontStyle: "italic", color: perfume.textColor, opacity: 0.75, margin: "0 0 2rem", letterSpacing: "0.02em" }}>
              &ldquo;{perfume.signature}&rdquo;
            </p>

            {/* Detail rows */}
            <div style={{ borderTop: `1px solid ${perfume.textColor}18`, paddingTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: `${perfume.textColor}66`, marginBottom: "0.25rem" }}>Énergie</p>
                <p style={{ fontSize: "0.88rem", color: perfume.textColor, fontWeight: 400, letterSpacing: "0.03em" }}>{perfume.energyLine}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: `${perfume.textColor}66`, marginBottom: "0.25rem" }}>Famille olfactive</p>
                <p style={{ fontSize: "0.88rem", color: perfume.textColor, fontWeight: 400, letterSpacing: "0.03em" }}>{perfume.family}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", color: `${perfume.textColor}66`, marginBottom: "0.25rem" }}>Notes</p>
                <p style={{ fontSize: "0.88rem", color: perfume.textColor, fontWeight: 400, letterSpacing: "0.03em" }}>{perfume.notes}</p>
              </div>
            </div>

            <button
              onClick={() => goTo("cta")}
              style={{
                marginTop: "2.5rem",
                marginBottom: "2rem",
                width: "100%",
                padding: "1.1rem 1.75rem",
                background: perfume.accentColor,
                color: "#fff",
                border: "none",
                borderRadius: "100px",
                fontSize: "0.78rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontWeight: 500,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Porter cette énergie →
            </button>
          </div>
        </FadeScreen>
      )}

      {/* ── 4. EMAIL CTA ── */}
      <FadeScreen visible={ctaVisible} bg={perfume ? perfume.bg : "#f5f2ed"}>
        <p style={{ position: "absolute", top: "2rem", left: 0, right: 0, textAlign: "center", letterSpacing: "0.35em", fontSize: "0.65rem", color: "#00000055", textTransform: "uppercase" }}>
          NOW PERFUME
        </p>

        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, transparent, #00000018)", marginBottom: "2.5rem" }} />

        <div style={{ width: "100%", maxWidth: 360, textAlign: "center" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#00000060", margin: "0 0 1.25rem" }}>
            Avant-première
          </p>

          <h2 style={{ fontSize: "clamp(1.6rem, 7vw, 2.5rem)", fontWeight: 300, letterSpacing: "-0.02em", color: "#1a1614", margin: "0 0 1rem", lineHeight: 1.2 }}>
            Accède en<br /><span style={{ fontWeight: 600, fontStyle: "italic" }}>avant-première</span>
          </h2>

          <p style={{ fontSize: "0.9rem", fontWeight: 300, color: "#1a161488", lineHeight: 1.65, margin: "0 0 2.5rem" }}>
            Les parfums NOW Perfume arrivent bientôt.<br />
            Inscris-toi pour être parmi les premiers.
          </p>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="ton@email.com"
              style={{
                width: "100%",
                padding: "1rem 1.25rem",
                border: "1px solid #1a161428",
                borderRadius: "12px",
                fontSize: "0.95rem",
                background: "#ffffff88",
                color: "#1a1614",
                outline: "none",
                backdropFilter: "blur(8px)",
                boxSizing: "border-box",
                letterSpacing: "0.01em",
              }}
            />
            {submitError && (
              <p style={{ fontSize: "0.8rem", color: "#b91c1c", textAlign: "center" }}>{submitError}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              style={{
                width: "100%",
                padding: "1.1rem",
                background: "#1a1614",
                color: "#f5f2ed",
                border: "none",
                borderRadius: "100px",
                fontSize: "0.78rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: submitting ? "not-allowed" : "pointer",
                fontWeight: 500,
                opacity: submitting ? 0.6 : 1,
                transition: "opacity 0.2s",
              }}
            >
              {submitting ? "Inscription..." : "Recevoir en avant-première"}
            </button>
          </form>

          <p style={{ marginTop: "1.25rem", fontSize: "0.75rem", color: "#1a161455", letterSpacing: "0.06em" }}>
            −10% sur ta première commande
          </p>
        </div>

        <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #00000018, transparent)", marginTop: "2.5rem" }} />
      </FadeScreen>

      {/* ── 5. THANKS ── */}
      <FadeScreen visible={thanksVisible} bg="#1a1614">
        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, #ffffff15)", marginBottom: "3rem" }} />

        <p style={{ fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#ffffff55", marginBottom: "2rem" }}>
          NOW PERFUME
        </p>

        <h2 style={{ fontSize: "clamp(1.75rem, 7.5vw, 2.75rem)", fontWeight: 300, color: "#f5f2ed", textAlign: "center", margin: 0, lineHeight: 1.2, letterSpacing: "-0.01em" }}>
          Bienvenue dans<br /><span style={{ fontWeight: 600, fontStyle: "italic" }}>l&apos;avant-première.</span>
        </h2>

        <p style={{ marginTop: "1.5rem", fontSize: "0.9rem", fontWeight: 300, color: "#ffffff77", textAlign: "center", lineHeight: 1.65, maxWidth: 300 }}>
          Tu seras parmi les premiers à découvrir NOW Perfume.
        </p>

        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, #ffffff15, transparent)", marginTop: "3rem" }} />
      </FadeScreen>

    </div>
  );
}
