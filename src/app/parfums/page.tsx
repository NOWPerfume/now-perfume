"use client";

import { useEffect, useState } from "react";
import { PERFUMES, COPY, Perfume } from "@/data/perfumes";
import PerfumeCard from "@/app/components/PerfumeCard";
import Header from "@/app/components/Header";
import SiteFooter from "@/app/components/SiteFooter";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import ImageSlot from "@/app/components/ImageSlot";

type Lang = "fr" | "en";

export default function ParfumsPage() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") {
      return "fr";
    }

    const saved = window.localStorage.getItem("now-lang");
    return saved === "fr" || saved === "en" ? saved : "fr";
  });

  useEffect(() => {
    window.localStorage.setItem("now-lang", lang);
  }, [lang]);

  const perfumes = PERFUMES[lang];
  const txt = lang === "fr" ? COPY.fr : COPY.en;

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Header - Always visible on perfumes page */}
      <Header lang={lang} solid={true} />
      <LanguageSwitcher lang={lang} setLang={setLang} />

      {/* HERO SECTION */}
      <section className="relative fade-in-section flex min-h-[64vh] items-center justify-center overflow-hidden px-6 py-20 md:px-16 md:py-28">
        <div
          className="absolute inset-0 hidden bg-cover bg-no-repeat bg-scroll bg-[position:39%_center] md:block md:bg-fixed"
          style={{
            backgroundImage: "url('/images/collection-hero-background.jpg')",
            filter: "saturate(1.08) contrast(1.06)",
          }}
        />
        <div className="absolute inset-0 bg-white/[0.05]" />

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <div className="relative mx-auto mb-8 h-[34vh] min-h-[240px] w-full max-w-xl md:hidden">
            <ImageSlot
              src="/images/collection-hero-background.jpg"
              alt="NOW Perfume collection"
              fill
              priority
              sizes="100vw"
              className="h-full w-full object-cover object-center scale-[1.08] transition-transform duration-700"
              placeholderLabel="Image a ajouter"
            />
          </div>
          <p className="text-xs uppercase tracking-[0.5em] text-black/80 font-light mb-6 [text-shadow:0_2px_10px_rgba(255,255,255,0.3)]">
            {lang === "fr" ? "Collection NOW" : "NOW Collection"}
          </p>

          <h1 className="title-aura text-3xl md:text-5xl lg:text-6xl font-light leading-tight tracking-[-0.02em] mb-6 text-black [text-shadow:0_2px_10px_rgba(255,255,255,0.3)]">
            {txt.pageTitle}
          </h1>

          <p className="text-base md:text-lg leading-relaxed text-black/80 font-light max-w-2xl mx-auto [text-shadow:0_2px_10px_rgba(255,255,255,0.3)]">
            {txt.intro}
          </p>
        </div>
      </section>

      {/* MAIN COLLECTION SECTION */}
      <section className="fade-in-section px-6 md:px-16 pb-16 md:pb-24 pt-4 md:pt-8 bg-white">
        <div className="mx-auto max-w-7xl">
          {/* Collection Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5 lg:gap-4 xl:gap-5">
            {perfumes.map((perfume: Perfume) => (
              <div
                key={perfume.id}
                className="flex justify-stretch"
                id={perfume.id}
              >
                <PerfumeCard
                  perfume={perfume}
                  lang={lang}
                />
              </div>
            ))}
          </div>

          {/* Descriptive text below grid */}
          <div className="mt-10 pt-8 border-t border-black/10 text-center">
            <p className="text-sm text-black/60 max-w-2xl mx-auto leading-relaxed font-light">
              {lang === "fr"
                ? "Cliquez sur l'une de nos cinq signatures pour en découvrir chaque détail : notes principales, pyramide olfactive, inspiration et ingrédients."
                : "Click on any of our five signatures to discover every detail: key notes, olfactive pyramid, inspiration and ingredients."}
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 pb-12 md:pb-10 bg-white">
        <div className="mx-auto max-w-7xl">
          <SiteFooter lang={lang} />
        </div>
      </section>
    </main>
  );
}

