"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { PERFUMES, COPY } from "@/data/perfumes";
import Header from "@/app/components/Header";
import ImageSlot from "@/app/components/ImageSlot";
import SiteFooter from "@/app/components/SiteFooter";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

type Lang = "fr" | "en";

export default function PerfumePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [lang, setLang] = useState<Lang>("fr");
  const [mounted, setMounted] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(
    null
  );
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxZoom, setLightboxZoom] = useState(1);
  const [lightboxOffset, setLightboxOffset] = useState({ x: 0, y: 0 });
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [comingSoonEmail, setComingSoonEmail] = useState("");
  const [comingSoonSubmitting, setComingSoonSubmitting] = useState(false);
  const [comingSoonDone, setComingSoonDone] = useState(false);
  const [comingSoonError, setComingSoonError] = useState<string | null>(null);
  const lightboxDragRef = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(null);
  const slideTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const saved = window.localStorage.getItem("now-lang");
    if (saved === "fr" || saved === "en") {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    window.localStorage.setItem("now-lang", lang);
  }, [lang, mounted]);

  const displayLang: Lang = mounted ? lang : "fr";
  const perfumes = PERFUMES[displayLang];
  const perfume = perfumes.find((p) => p.id === slug);
  const txt = displayLang === "fr" ? COPY.fr : COPY.en;

  const handleComingSoonClick = () => {
    setComingSoonOpen(true);
  };

  useEffect(() => {
    if (!mounted) return;
    console.log("ACTIVE LANG:", lang);
  }, [lang, mounted]);

  if (!perfume) {
    return <div>{displayLang === "fr" ? "Parfum introuvable" : "Perfume not found"}</div>;
  }

  const toggleAccordion = (section: string) => {
    setExpandedAccordion(
      expandedAccordion === section ? null : section
    );
  };

  // Pantone-based dual color palette per perfume
  const PALETTE: Record<string, { c1: string; c2: string; aura1: string; aura2: string; sep: string; titleTint: string }> = {
    "ginger-aphrodisiac": {
      c1: "#F5E9A0", c2: "#F5C07A",
      aura1: "rgba(245,233,160,0.13)", aura2: "rgba(245,192,122,0.09)",
      sep: "#F0CC8A", titleTint: "#9A6B00",
    },
    "maracuja-samba": {
      c1: "#F5C07A", c2: "#F0C4D8",
      aura1: "rgba(245,192,122,0.12)", aura2: "rgba(240,196,216,0.10)",
      sep: "#F0B8A0", titleTint: "#9A4A00",
    },
    "matcha-star": {
      c1: "#BFDF8A", c2: "#F5E9A0",
      aura1: "rgba(191,223,138,0.13)", aura2: "rgba(245,233,160,0.09)",
      sep: "#AACE7A", titleTint: "#3A6000",
    },
    "vanilla-chill": {
      c1: "#E8D5B0", c2: "#F5C07A",
      aura1: "rgba(232,213,176,0.14)", aura2: "rgba(245,192,122,0.09)",
      sep: "#D9BF90", titleTint: "#6B4A00",
    },
    "rosa-boom": {
      c1: "#F0C4D8", c2: "#E8D5B0",
      aura1: "rgba(240,196,216,0.13)", aura2: "rgba(232,213,176,0.09)",
      sep: "#E0A8C0", titleTint: "#8A2850",
    },
  };
  const palette = PALETTE[perfume.id] ?? {
    c1: "#F5E9A0", c2: "#F5C07A",
    aura1: "rgba(245,233,160,0.10)", aura2: "rgba(245,192,122,0.07)",
    sep: "#F0CC8A", titleTint: "#6B5000",
  };

  // Get next perfume for navigation
  const currentIndex = perfumes.findIndex((p) => p.id === slug);
  const nextPerfume = perfumes[(currentIndex + 1) % perfumes.length];
  const prevPerfume = perfumes[(currentIndex - 1 + perfumes.length) % perfumes.length];

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Header - Always visible */}
      <Header lang={displayLang} solid={true} />
      <LanguageSwitcher lang={displayLang} setLang={setLang} mounted={mounted} />

      {/* HERO SECTION */}
      <section className={`relative min-h-[calc(100vh-88px)] bg-gradient-to-br px-6 py-10 md:px-8 md:py-12 ${perfume.colors.bg}`}>
        <div className="max-w-6xl mx-auto">
          <Link
            href="/parfums"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-6"
          >
            <ArrowLeft size={15} />
            {txt.backToCollection}
          </Link>

          <div className="grid items-center gap-8 md:grid-cols-[52%_48%] md:gap-12">
            {/* LEFT COLUMN - Image Carousel 4:5 */}
            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-[360px] md:max-w-none md:w-full">
                {/* Slides */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-white/70 shadow-[0_18px_40px_rgba(0,0,0,0.10)] cursor-zoom-in md:aspect-[5/4] md:rounded-[28px] md:shadow-2xl"
                     onClick={() => {
                       const slides = [
                         perfume.bottleImage,
                         perfume.moodImage,
                       ];
                       const idx = activeSlide;
                       setLightboxIndex(idx);
                       setLightboxZoom(1);
                       setLightboxOffset({ x: 0, y: 0 });
                       setLightboxSrc(slides[idx]);
                     }}
                >
                  {[
                    { src: perfume.bottleImage, label: lang === "fr" ? "Flacon" : "Bottle" },
                    { src: perfume.moodImage, label: lang === "fr" ? "Texture" : "Mood" },
                  ].map((slide, i) => (
                    <div
                      key={i}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        i === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                    >
                      <ImageSlot
                        src={slide.src}
                        alt={slide.label}
                        fill
                        priority={i === 0}
                        sizes="(max-width: 768px) 380px, 52vw"
                        className="object-contain object-center"
                        placeholderLabel={slide.label}
                      />
                    </div>
                  ))}
                  {/* Prev / Next */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSlide((s) => (s - 1 + 2) % 2);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/75 backdrop-blur-sm border border-black/8 flex items-center justify-center shadow-sm hover:bg-white transition"
                    aria-label="Previous"
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M9 2L5 7l4 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSlide((s) => (s + 1) % 2);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/75 backdrop-blur-sm border border-black/8 flex items-center justify-center shadow-sm hover:bg-white transition"
                    aria-label="Next"
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M5 2l4 5-4 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
                {/* Dots */}
                <div className="flex justify-center gap-2 mt-3">
                  {[0, 1].map((i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlide(i);
                      }}
                      className={`rounded-full transition-all duration-300 ${
                        i === activeSlide
                          ? "w-6 h-1 bg-black/60"
                          : "w-1 h-1 bg-black/20 hover:bg-black/40"
                      }`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Text and CTA */}
            <div className="space-y-6 md:pl-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-black/40 font-medium mb-3">
                  {perfume.sprayMood}
                </p>
                <h1 className="text-[clamp(2.25rem,9vw,3.5rem)] font-extralight leading-[1.08] tracking-tight mb-3 md:text-5xl lg:text-[3.5rem]">
                  {perfume.name}
                </h1>
                <p className="text-base md:text-lg leading-relaxed text-black/65 font-light italic">
                  {perfume.claim}
                </p>
              </div>

              <p className="text-base md:text-lg leading-relaxed text-black/75 font-light">
                {perfume.description.split('\n')[0]}
              </p>

              {/* Key Notes */}
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.4em] text-black/40 font-medium mb-4">
                  {txt.notesLabel}
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {perfume.keyNotes.map((note) => (
                    <article key={note.label} className="text-center">
                      <div className="relative mx-auto h-24 w-24 shrink-0 overflow-hidden rounded-full border-0 bg-transparent shadow-none">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={note.image}
                          alt={note.label}
                          className="absolute inset-0 h-full w-full object-cover object-center scale-[1.45]"
                        />
                      </div>
                      <p className="text-center text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-black/55 font-light leading-tight pt-2">
                        {note.label}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-black/10">
                <p className="text-xs text-black/50 mb-5 font-light tracking-wide">
                  {perfume.format}
                </p>
                <button onClick={handleComingSoonClick} className={`${perfume.colors.accent} inline-block text-white px-8 py-3.5 rounded-full text-sm font-medium uppercase tracking-[0.18em] hover:opacity-85 active:scale-[0.98] transition-all shadow-md hover:shadow-lg`}>
                  {(txt as any).addToCartButton} — {perfume.price}€
                </button>
                <p className="text-xs text-black/50 mt-4 font-light">
                  {displayLang === "fr" ? "Livraison gratuite dès 100€" : "Free shipping from €100"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESCRIPTION SECTION */}
      <section className="relative px-6 md:px-8 py-10 md:py-14 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${palette.c1}18 0%, #faf9f7 45%, ${palette.c2}10 100%)` }} />
        {/* Organic aura blobs */}
        <div className="absolute -left-32 top-10 w-96 h-80 rounded-full opacity-60" style={{ background: `radial-gradient(ellipse at center, ${palette.c1} 0%, transparent 70%)`, filter: 'blur(64px)' }} />
        <div className="absolute -right-24 bottom-0 w-80 h-72 rounded-full opacity-40" style={{ background: `radial-gradient(ellipse at center, ${palette.c2} 0%, transparent 70%)`, filter: 'blur(72px)' }} />
        <div className="relative max-w-4xl mx-auto">
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-6" style={{ background: palette.sep }} />
                <h2 className="text-sm uppercase tracking-[0.3em] font-semibold" style={{ color: palette.titleTint }}>
                  {displayLang === "fr" ? "Description" : "Description"}
                </h2>
              </div>
              <p className="text-base leading-7 text-black/70 whitespace-pre-line font-light">
                {perfume.description}
              </p>
            </div>
            <div className="pt-8" style={{ borderTop: `1px solid ${palette.sep}50` }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-6" style={{ background: palette.sep }} />
                <h3 className="text-sm uppercase tracking-[0.3em] font-semibold" style={{ color: palette.titleTint }}>
                  {txt.inspiration}
                </h3>
              </div>
              <p className="text-base leading-7 text-black/70 font-light">
                {perfume.inspiration}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PYRAMID SECTION */}
      <section className="relative px-6 md:px-8 pt-0 pb-10 md:pb-14 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(140deg, #faf9f7 0%, ${palette.c1}14 40%, ${palette.c2}0c 100%)` }} />
        {/* Scent aura diffusion */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none" style={{ background: `radial-gradient(ellipse at center, ${palette.c1}20 0%, ${palette.c2}10 50%, transparent 75%)`, filter: 'blur(48px)' }} />
        {/* Side organic shapes */}
        <div className="absolute left-0 top-0 w-64 h-full pointer-events-none" style={{ background: `linear-gradient(to right, ${palette.c1}12, transparent)`, filter: 'blur(32px)' }} />
        <div className="absolute right-0 top-0 w-48 h-full pointer-events-none" style={{ background: `linear-gradient(to left, ${palette.c2}0e, transparent)`, filter: 'blur(40px)' }} />

        <div className="relative max-w-4xl mx-auto">
          <div className="pt-8 mb-8" style={{ borderTop: `1px solid ${palette.sep}50` }}>
            <div className="flex items-center gap-3">
              <div className="h-px w-6" style={{ background: palette.sep }} />
              <h2 className="text-sm uppercase tracking-[0.3em] font-semibold" style={{ color: palette.titleTint }}>
                {txt.pyramidLabel}
              </h2>
            </div>
          </div>

          <div className="space-y-px">
            {perfume.olfactivePyramid.map((level, i) => (
              <div
                key={level.title}
                className="group relative flex gap-6 md:gap-10 items-start px-6 py-6 rounded-2xl transition-all duration-300 hover:shadow-sm"
                style={{ background: i % 2 === 0 ? `${palette.c1}0a` : `${palette.c2}07` }}
              >
                {/* Color accent bar */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-0.5 rounded-full opacity-60" style={{ background: i === 0 ? palette.sep : i === 1 ? palette.c2 : palette.c1 }} />
                {/* Level label */}
                <div className="w-16 shrink-0 pt-0.5">
                  <p className="text-sm uppercase tracking-[0.25em] font-semibold" style={{ color: palette.titleTint }}>
                    {level.title}
                  </p>
                </div>
                {/* Notes */}
                <div className="flex flex-wrap gap-2">
                  {level.notes.map((note) => (
                    <span
                      key={note}
                      className="inline-block text-base font-light text-black/75 leading-relaxed"
                    >
                      {note}{level.notes.indexOf(note) < level.notes.length - 1 ? <span className="mx-2 opacity-20">·</span> : null}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[11px] text-black/35 font-light tracking-wide" style={{ borderTop: `1px solid ${palette.sep}30`, paddingTop: '1rem' }}>
            {displayLang === "fr" ? "* Ingrédient d'origine naturelle" : "* Formulated with ingredients of natural origin"}
          </p>
        </div>
      </section>

      {/* INGREDIENTS SECTION */}
      <section className="px-6 md:px-8 py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-[32px] shadow-sm border border-black/5 overflow-hidden">
            <button
              onClick={() => toggleAccordion("ingredients")}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-black/[0.02] transition-colors"
            >
              <h2 className="text-xl font-light text-black">
                {txt.ingredientsLabel}
              </h2>
              {expandedAccordion === "ingredients" ? (
                <ChevronUp size={24} className="text-black/40" />
              ) : (
                <ChevronDown size={24} className="text-black/40" />
              )}
            </button>
            {expandedAccordion === "ingredients" && (
              <div className="px-6 pb-8 space-y-6 border-t border-black/5">
                <div className="overflow-x-auto whitespace-nowrap pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <p className="text-[11px] text-black/70 font-light md:text-sm">
                    {perfume.ingredients.join(", ")}
                  </p>
                </div>
                <p className="text-sm leading-7 text-black/50 font-light">
                  {displayLang === "fr"
                    ? "Les listes d'ingrédients sont régulièrement mises à jour. Avant d'utiliser un produit NOW Perfume, veuillez vous référer à la liste d'ingrédients sur son emballage."
                    : "Ingredient lists are regularly updated. Before using a NOW Perfume product, please refer to the ingredient list on its packaging."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-white px-6 py-12 pb-16 md:px-8 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-black mb-4 tracking-tight">
            {displayLang === "fr" ? "Prêt à vivre cette expérience ?" : "Ready for this experience?"}
          </h2>
          <p className="text-xl text-black/60 mb-8 font-light">
            {displayLang === "fr" ? "Rejoignez notre communauté de passionnés de parfums" : "Join our community of fragrance enthusiasts"}
          </p>

          <div className="mb-8">
            <button onClick={handleComingSoonClick} className={`${perfume.colors.accent} inline-block text-white px-10 py-4 rounded-full font-semibold text-sm uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-lg hover:shadow-xl mb-6`}>
              {txt.addToCart} — {perfume.price}€
            </button>
            <div className="text-sm text-black/50 space-y-1 font-light">
              <p>{displayLang === "fr" ? "• Livraison gratuite dès 100€" : "• Free shipping from €100"}</p>
              <p>{displayLang === "fr" ? "• Retour sous 30 jours" : "• 30-day returns"}</p>
              <p>{displayLang === "fr" ? "• Fabrication française" : "• Made in France"}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 border-t border-black/10 pt-6 md:grid-cols-2">
            <Link
              href={`/parfums/${prevPerfume.id}`}
              className="flex min-h-[88px] flex-col items-start justify-center rounded-[22px] border border-black/10 bg-[#faf8f4] px-5 py-4 text-left text-black/70 transition-colors hover:text-black"
            >
              <span className="text-[10px] uppercase tracking-[0.22em] text-black/40">{txt.prevPerfume}</span>
              <span className="mt-2 text-base font-light text-black">{prevPerfume.name}</span>
            </Link>
            <Link
              href={`/parfums/${nextPerfume.id}`}
              className="flex min-h-[88px] flex-col items-start justify-center rounded-[22px] border border-black/10 bg-[#faf8f4] px-5 py-4 text-left text-black/70 transition-colors hover:text-black md:items-end md:text-right"
            >
              <span className="text-[10px] uppercase tracking-[0.22em] text-black/40">{txt.nextPerfume}</span>
              <span className="mt-2 text-base font-light text-black">{nextPerfume.name}</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-8 pb-8 md:pb-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <SiteFooter lang={displayLang} />
        </div>
      </section>

      {comingSoonOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
          onClick={() => setComingSoonOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label={displayLang === "fr" ? "Fermer" : "Close"}
              onClick={() => setComingSoonOpen(false)}
              className="absolute right-4 top-4 text-xl leading-none text-black/50 transition hover:text-black"
            >
              ×
            </button>
            <p className="text-xs uppercase tracking-[0.2em] text-black/45">
              {displayLang === "fr" ? "Disponible prochainement" : "Coming soon"}
            </p>
            <p className="mt-2 text-sm text-black/70">
              {displayLang === "fr"
                ? "Les parfums NOW Perfume arrivent bientôt. Inscris-toi pour être informé en avant-première."
                : "NOW Perfume fragrances are launching soon. Sign up to be notified first."}
            </p>
            <form
              className="mt-4"
              onSubmit={async (event) => {
                event.preventDefault();
                setComingSoonError(null);
                setComingSoonSubmitting(true);
                try {
                  const res = await fetch("/api/subscribe", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      email: comingSoonEmail.trim().toLowerCase(),
                      source: "product",
                      lang: displayLang,
                      perfume: perfume?.name,
                    }),
                  });
                  const data = (await res.json()) as { success?: boolean; error?: string };
                  if (!res.ok || data.success !== true) throw new Error("Failed");
                  setComingSoonDone(true);
                  setComingSoonEmail("");
                } catch {
                  setComingSoonError(displayLang === "fr" ? "Une erreur est survenue. Réessayez." : "Something went wrong. Please try again.");
                } finally {
                  setComingSoonSubmitting(false);
                }
              }}
            >
              <input
                type="email"
                value={comingSoonEmail}
                onChange={(event) => setComingSoonEmail(event.target.value)}
                required
                disabled={comingSoonSubmitting || comingSoonDone}
                placeholder={displayLang === "fr" ? "Votre e-mail" : "Your email"}
                className="w-full rounded-full border border-black/15 px-4 py-3 text-sm text-black outline-none focus:border-black/35 disabled:opacity-50"
              />
              {comingSoonError && (
                <p className="mt-2 text-xs text-red-600">{comingSoonError}</p>
              )}
              {comingSoonDone ? (
                <div className="mt-3 space-y-1">
                  <p className="text-sm font-medium text-black">
                    {displayLang === "fr" ? "Merci, ton inscription est confirmée." : "Thank you, your subscription is confirmed."}
                  </p>
                  <p className="text-xs text-black/55">
                    {displayLang === "fr" ? "Tu recevras bientôt les nouvelles de NOW Perfume." : "You'll soon receive updates from NOW Perfume."}
                  </p>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={comingSoonSubmitting}
                  className="mt-3 w-full rounded-full bg-black px-4 py-3 text-sm uppercase tracking-[0.14em] text-white transition hover:bg-black/85 disabled:opacity-60"
                >
                  {comingSoonSubmitting
                    ? (displayLang === "fr" ? "Inscription..." : "Submitting...")
                    : (displayLang === "fr" ? "Accéder en avant-première" : "Get early access")}
                </button>
              )}
            </form>
          </div>
        </div>
      ) : null}

      {/* LIGHTBOX */}
      {lightboxSrc && (() => {
        const slides = [perfume.bottleImage, perfume.moodImage];
        const goTo = (i: number) => {
          const next = (i + slides.length) % slides.length;
          setLightboxIndex(next);
          setLightboxSrc(slides[next]);
          setLightboxZoom(1);
          setLightboxOffset({ x: 0, y: 0 });
        };
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92"
            onClick={() => { setLightboxSrc(null); setLightboxZoom(1); setLightboxOffset({ x: 0, y: 0 }); }}
            onKeyDown={e => {
              if (e.key === 'Escape') { setLightboxSrc(null); setLightboxZoom(1); setLightboxOffset({ x: 0, y: 0 }); }
              if (e.key === 'ArrowRight') goTo(lightboxIndex + 1);
              if (e.key === 'ArrowLeft') goTo(lightboxIndex - 1);
            }}
            tabIndex={0}
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
              onClick={e => { e.stopPropagation(); setLightboxSrc(null); setLightboxZoom(1); setLightboxOffset({ x: 0, y: 0 }); }}
              aria-label={displayLang === "fr" ? "Fermer" : "Close"}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 2l14 14M16 2L2 16" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
              onClick={e => { e.stopPropagation(); goTo(lightboxIndex - 1); }}
              aria-label={displayLang === "fr" ? "Précédent" : "Previous"}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M9 2L5 7l4 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
              onClick={e => { e.stopPropagation(); goTo(lightboxIndex + 1); }}
              aria-label={displayLang === "fr" ? "Suivant" : "Next"}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M5 2l4 5-4 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {/* Zoom reset button */}
            {lightboxZoom > 1 && (
              <button
                className="absolute bottom-6 right-6 z-10 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs transition"
                onClick={e => { e.stopPropagation(); setLightboxZoom(1); setLightboxOffset({ x: 0, y: 0 }); }}
              >
                {displayLang === "fr" ? "Réinitialiser" : "Reset"}
              </button>
            )}
            {/* Image */}
            <div
              className="relative overflow-hidden"
              style={{ width: 'min(90vw, 90vh)', height: 'min(90vw, 90vh)', cursor: lightboxZoom > 1 ? 'grab' : 'default' }}
              onClick={e => e.stopPropagation()}
              onWheel={e => {
                e.preventDefault();
                setLightboxZoom(z => Math.min(5, Math.max(1, z - e.deltaY * 0.005)));
              }}
              onMouseDown={e => {
                if (lightboxZoom > 1) lightboxDragRef.current = { startX: e.clientX, startY: e.clientY, ox: lightboxOffset.x, oy: lightboxOffset.y };
              }}
              onMouseMove={e => {
                if (lightboxDragRef.current) {
                  setLightboxOffset({
                    x: lightboxDragRef.current.ox + e.clientX - lightboxDragRef.current.startX,
                    y: lightboxDragRef.current.oy + e.clientY - lightboxDragRef.current.startY,
                  });
                }
              }}
              onMouseUp={() => { lightboxDragRef.current = null; }}
              onMouseLeave={() => { lightboxDragRef.current = null; }}
            >
              <div style={{ transform: `scale(${lightboxZoom}) translate(${lightboxOffset.x / lightboxZoom}px, ${lightboxOffset.y / lightboxZoom}px)`, transformOrigin: 'center', transition: lightboxDragRef.current ? 'none' : 'transform 0.2s', width: '100%', height: '100%', position: 'relative' }}>
                <ImageSlot
                  src={lightboxSrc}
                  alt="zoom"
                  fill
                  sizes="90vw"
                  className="object-contain"
                  placeholderLabel=""
                />
              </div>
            </div>
            {/* Dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); goTo(i); }}
                  className={`rounded-full transition-all duration-300 ${i === lightboxIndex ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'}`}
                />
              ))}
            </div>
            {/* Zoom hint */}
            {lightboxZoom === 1 && (
              <p className="absolute bottom-14 left-1/2 -translate-x-1/2 text-white/40 text-xs pointer-events-none">
                {lang === "fr" ? "Scroll pour zoomer" : "Scroll to zoom"}
              </p>
            )}
          </div>
        );
      })()}
    </main>
  );
}