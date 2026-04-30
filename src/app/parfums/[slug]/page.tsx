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
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(
    null
  );
  const [activeSlide, setActiveSlide] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxZoom, setLightboxZoom] = useState(1);
  const [lightboxOffset, setLightboxOffset] = useState({ x: 0, y: 0 });
  const lightboxDragRef = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(null);
  const slideTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("now-lang");
    if (saved === "fr" || saved === "en") {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("now-lang", lang);
  }, [lang]);

  const perfumes = PERFUMES[lang];
  const perfume = perfumes.find((p) => p.id === slug);
  const txt = lang === "fr" ? COPY.fr : COPY.en;

  const handleComingSoonClick = () => {
    window.alert(lang === "fr" ? "Nos parfums arrivent bientot" : "Our perfumes are coming soon");
  };

  if (!perfume) {
    return <div>Perfume not found</div>;
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
      <Header lang={lang} solid={true} />
      <LanguageSwitcher lang={lang} setLang={setLang} />

      {/* HERO SECTION */}
      <section className={`relative min-h-[calc(100vh-88px)] px-6 md:px-8 py-10 md:py-12 bg-gradient-to-br ${perfume.colors.bg}`}>
        <div className="max-w-6xl mx-auto">
          <Link
            href="/parfums"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-6"
          >
            <ArrowLeft size={15} />
            {txt.backToCollection}
          </Link>

          <div className="grid md:grid-cols-[52%_48%] gap-8 md:gap-12 items-center">
            {/* LEFT COLUMN - Image Carousel 4:5 */}
            <div className="flex justify-center md:justify-end">
              <div className="w-full max-w-[380px] md:max-w-none md:w-full">
                {/* Slides */}
                <div className="relative aspect-[5/4] overflow-hidden rounded-[28px] shadow-2xl bg-white/60 cursor-zoom-in"
                     onClick={() => {
                       const slides = [
                         perfume.bottleImage,
                         perfume.boxImage,
                         perfume.drinkImage,
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
                    { src: perfume.boxImage, label: lang === "fr" ? "Coffret" : "Packaging" },
                    { src: perfume.drinkImage, label: lang === "fr" ? "Inspiration" : "Inspiration" },
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
                        className={i === 0 ? "object-contain p-6 md:p-8" : i === 2 ? "object-contain p-4 md:p-6" : "object-cover"}
                        placeholderLabel={slide.label}
                      />
                    </div>
                  ))}
                  {/* Prev / Next */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSlide((s) => (s + 2) % 3);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/75 backdrop-blur-sm border border-black/8 flex items-center justify-center shadow-sm hover:bg-white transition"
                    aria-label="Previous"
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M9 2L5 7l4 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveSlide((s) => (s + 1) % 3);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/75 backdrop-blur-sm border border-black/8 flex items-center justify-center shadow-sm hover:bg-white transition"
                    aria-label="Next"
                  >
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M5 2l4 5-4 5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
                {/* Dots */}
                <div className="flex justify-center gap-2 mt-3">
                  {[0, 1, 2].map((i) => (
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
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extralight leading-[1.1] tracking-tight mb-3">
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
                <div className="flex gap-5">
                  {perfume.keyNotes.map((note) => (
                    <div key={note.label} className="group flex flex-col items-center gap-2 flex-1">
                      <div className="relative h-16 w-16 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-full border border-black/10 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
                        <ImageSlot
                          src={note.image}
                          alt={note.label}
                          fill
                          sizes="(max-width: 640px) 64px, 80px"
                          className="object-cover scale-125"
                          placeholderLabel={note.label}
                        />
                      </div>
                      <p className="text-center text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-black/55 font-light leading-tight">
                        {note.label}
                      </p>
                    </div>
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
                  {lang === "fr" ? "Livraison gratuite dès 100€" : "Free shipping over 100€"}
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
                  {lang === "fr" ? "Description" : "Description"}
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
            {lang === "fr" ? "* Ingrédient d'origine naturelle" : "* Formulated with ingredients of natural origin"}
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
                <p className="text-black/70 leading-relaxed font-light">
                  {perfume.ingredients.join(", ")}
                </p>
                <p className="text-sm leading-7 text-black/50 font-light">
                  {lang === "fr"
                    ? "Les listes d'ingrédients sont régulièrement mises à jour. Avant d'utiliser un produit NOW Perfume, veuillez vous référer à la liste d'ingrédients sur son emballage."
                    : "Ingredient lists are regularly updated. Before using a NOW Perfume product, please refer to the ingredient list on its packaging."}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-6 md:px-8 py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light text-black mb-4 tracking-tight">
            {lang === "fr" ? "Prêt à vivre cette expérience ?" : "Ready for this experience?"}
          </h2>
          <p className="text-xl text-black/60 mb-8 font-light">
            {lang === "fr" ? "Rejoignez notre communauté de passionnés de parfums" : "Join our community of fragrance enthusiasts"}
          </p>

          <div className="mb-8">
            <button onClick={handleComingSoonClick} className={`${perfume.colors.accent} inline-block text-white px-10 py-4 rounded-full font-semibold text-sm uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-lg hover:shadow-xl mb-6`}>
              {txt.addToCart} — {perfume.price}€
            </button>
            <div className="text-sm text-black/50 space-y-1 font-light">
              <p>{lang === "fr" ? "• Livraison gratuite dès 100€" : "• Free shipping over 100€"}</p>
              <p>{lang === "fr" ? "• Retour sous 30 jours" : "• 30-day returns"}</p>
              <p>{lang === "fr" ? "• Fabrication française" : "• Made in France"}</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-black/10 flex items-center justify-between">
            <Link
              href={`/parfums/${prevPerfume.id}`}
              className="inline-flex items-center gap-2 text-black/70 hover:text-black transition-colors font-light"
            >
              ← {txt.prevPerfume}: {prevPerfume.name}
            </Link>
            <Link
              href={`/parfums/${nextPerfume.id}`}
              className="inline-flex items-center gap-2 text-black/70 hover:text-black transition-colors font-light"
            >
              {txt.nextPerfume}: {nextPerfume.name} →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-8 pb-8 md:pb-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <SiteFooter lang={lang} />
        </div>
      </section>
      {/* LIGHTBOX */}
      {lightboxSrc && (() => {
        const slides = [perfume.bottleImage, perfume.boxImage, perfume.drinkImage];
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
              aria-label="Fermer"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 2l14 14M16 2L2 16" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            {/* Prev */}
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
              onClick={e => { e.stopPropagation(); goTo(lightboxIndex - 1); }}
              aria-label="Précédent"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M9 2L5 7l4 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {/* Next */}
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
              onClick={e => { e.stopPropagation(); goTo(lightboxIndex + 1); }}
              aria-label="Suivant"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M5 2l4 5-4 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {/* Zoom reset button */}
            {lightboxZoom > 1 && (
              <button
                className="absolute bottom-6 right-6 z-10 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs transition"
                onClick={e => { e.stopPropagation(); setLightboxZoom(1); setLightboxOffset({ x: 0, y: 0 }); }}
              >
                Réinitialiser
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
                Scroll pour zoomer
              </p>
            )}
          </div>
        );
      })()}
    </main>
  );
}