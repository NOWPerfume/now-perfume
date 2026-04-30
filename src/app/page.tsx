"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Header from "./components/Header";
import ImageSlot from "./components/ImageSlot";
import SiteFooter from "./components/SiteFooter";
import LanguageSwitcher from "./components/LanguageSwitcher";

type Lang = "fr" | "en";
type SectionId = "hero" | "universe" | "collection" | "spray";

export default function Home() {
  const [lang, setLang] = useState<Lang>("fr");
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const heroRef = useRef<HTMLElement | null>(null);
  const universeRef = useRef<HTMLElement | null>(null);
  const collectionRef = useRef<HTMLElement | null>(null);
  const sprayRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("now-lang");
    if (saved === "fr" || saved === "en") {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("now-lang", lang);
  }, [lang]);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const observed = [
      heroRef.current,
      universeRef.current,
      collectionRef.current,
      sprayRef.current,
    ].filter(Boolean) as HTMLElement[];

    const ratios: Record<SectionId, number> = {
      hero: 0,
      universe: 0,
      collection: 0,
      spray: 0,
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-section") as SectionId | null;
          if (!id) return;
          ratios[id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });

        const ranked = (Object.keys(ratios) as SectionId[]).sort(
          (a, b) => ratios[b] - ratios[a]
        );

        if (ranked[0] && ratios[ranked[0]] > 0) {
          setActiveSection(ranked[0]);
        }
      },
      {
        root,
        rootMargin: "-8% 0px -8% 0px",
        threshold: [0.2, 0.35, 0.5, 0.65, 0.8],
      }
    );

    observed.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const revealItems = root.querySelectorAll<HTMLElement>("[data-reveal]");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      {
        root,
        threshold: 0.2,
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const parallaxItems = root.querySelectorAll<HTMLElement>("[data-parallax]");
    let raf = 0;

    const updateParallax = () => {
      const rootRect = root.getBoundingClientRect();
      const rootCenter = rootRect.top + rootRect.height / 2;

      parallaxItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const ratio = Math.max(-1, Math.min(1, (itemCenter - rootCenter) / rootRect.height));
        const y = ratio * -18;
        item.style.setProperty("--parallax-y", `${y}px`);
      });

      raf = 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    root.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      root.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const copy = useMemo(
    () => ({
      fr: {
        heroKicker: "Clubs, studios de sport, hôtels, lounges, spas, etc.",
        heroTitle: "NOW Perfume",
        heroText1: "Découvrez les parfums au cœur du moment.",
        heroText2:
          "Une expérience parfum pensée pour accompagner l’émotion, l’énergie et l’instant.",
        heroButton: "Découvrir la collection",

        universeKicker: "Feel-good universe",
        universeTitle: "Des parfums naturels pour chaque énergie",
        universeText:
          "Un univers playful, coloré et premium, inspiré par des boissons feel-good, des ingrédients naturels et l’énergie du moment.",

        collectionKicker: "LA COLLECTION",
        collectionTitle: "Cinq parfums inspirés de boissons iconiques :",
        collectionText:
          "un ginger shot vibrant, un smoothie tropical solaire, un thé matcha intense, un latte réconfortant et une infusion florale délicate.",
        collectionClosing:
          "Une collection fraîche, playful et contemporaine, pensée autour d’ingrédients d’origine naturelle, de sensations et de l’énergie du moment.",

        sprayKicker: "5 parfums 5 énergies",
        sprayTitle: "Spray Your Energy.",
        sprayText:
          "Desire, Happiness, Power, Cocooning et Love. Cinq parfums, cinq énergies, une nouvelle manière de vivre le parfum dans l’instant.",
        cta: "Découvrir nos parfums",

        footerAbout: "À propos",
        footerContact: "Contact",
        footerLegal: "Mentions légales",
        footerEmail: "hello@nowperfume.fr",
        footerInstagram: "@now.perfume",

        french: "Français",
        english: "English",
        languageLabel: "Langue",
      },
      en: {
        heroKicker: "Clubs, fitness studios, hotels, lounges, spas, etc.",
        heroTitle: "NOW Perfume",
        heroText1: "Discover fragrance in the heart of the moment.",
        heroText2:
          "A fragrance experience designed to accompany emotion, energy and the moment.",
        heroButton: "Discover the collection",

        universeKicker: "Feel-good universe",
        universeTitle: "Healthy-inspired fragrances for every mood",
        universeText:
          "A playful, colorful and premium universe inspired by feel-good drinks, natural ingredients and the energy of the moment.",

        collectionKicker: "THE COLLECTION",
        collectionTitle: "Five fragrances inspired by iconic drinks:",
        collectionText:
          "a vibrant ginger shot, a radiant tropical smoothie, an intense matcha tea, a comforting latte, and a delicate floral infusion.",
        collectionClosing:
          "A fresh, playful and contemporary collection built around natural-origin ingredients, sensations, and the energy of the moment.",

        sprayKicker: "5 perfumes 5 energies",
        sprayTitle: "Spray Your Energy.",
        sprayText:
          "Desire, Happiness, Power, Cocooning and Love. Five perfumes, five energies, a new way to experience fragrance in the moment.",
        cta: "Discover our perfumes",

        footerAbout: "About",
        footerContact: "Contact",
        footerLegal: "Legal notice",
        footerEmail: "hello@nowperfume.fr",
        footerInstagram: "@now.perfume",

        french: "French",
        english: "English",
        languageLabel: "Language",
      },
    }),
    []
  );

  const t = copy[lang];
  const collectionTitleNoBreakColon = t.collectionTitle.replace(" :", "\u00A0:");

  const sections = [
    { id: "hero" as SectionId, ref: heroRef },
    { id: "universe" as SectionId, ref: universeRef },
    { id: "collection" as SectionId, ref: collectionRef },
    { id: "spray" as SectionId, ref: sprayRef },
  ];

  const scrollToSection = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Header transparent et caché sur la première section, visible après scroll
  const solidHeader = activeSection !== "hero";

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8f7f4] text-black">
      {activeSection !== "hero" ? <Header lang={lang} solid={solidHeader} /> : null}

      {/* RIGHT PAGE INDICATOR */}
      <div className="fixed right-6 top-1/2 z-[60] hidden -translate-y-1/2 md:flex">
        <div className="flex flex-col gap-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.ref)}
              aria-label={section.id}
              className={`h-10 w-[2px] transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-black"
                  : "bg-black/20 hover:bg-black/45"
              }`}
            />
          ))}
        </div>
      </div>

      <LanguageSwitcher lang={lang} setLang={setLang} />

      {/* SNAP SCROLLER */}
      <div
        ref={scrollRef}
        className="h-[100dvh] snap-y snap-mandatory overflow-y-auto overscroll-y-none scroll-smooth [scrollbar-gutter:stable]"
      >
        {/* HERO IMAGE */}
        <section
          ref={heroRef}
          data-section="hero"
          className="relative fade-in-section flex h-[100dvh] min-h-[100dvh] snap-start snap-always items-center justify-center overflow-hidden px-4 py-20 md:py-24"
        >
          <ImageSlot
            src="/assets/images/accueil-hero.jpg"
            alt="NOW Perfume accueil hero"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover object-center"
            placeholderLabel="Image a ajouter"
          />
          <div className="absolute inset-0 bg-white/8" />

          <div className="relative z-10 flex w-full max-w-5xl translate-y-10 flex-col items-center justify-center px-6 text-center text-black md:translate-y-14">
            {/* Very subtle text background */}
            <div className="absolute left-1/2 top-1/2 -z-10 h-80 w-[min(90vw,52rem)] -translate-x-1/2 -translate-y-1/2 rounded-3xl backdrop-blur-sm" style={{
              background: "radial-gradient(ellipse at center, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }} />
            <h1 className="sr-only">{t.heroTitle}</h1>

            <p className="mb-8 text-xs uppercase tracking-[0.5em] text-black/70 font-light">
              {t.heroKicker}
            </p>

            <p className="mx-auto max-w-4xl text-3xl md:text-5xl lg:text-6xl leading-tight tracking-[-0.02em] font-light text-black drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]">
              {t.heroText1}
            </p>

            <p className="mx-auto mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-black/75 font-light drop-shadow-[0_1px_1px_rgba(255,255,255,0.2)]">
              {t.heroText2}
            </p>

            <Link
              href="/parfums"
              className="mt-10 rounded-full bg-black text-white px-8 py-3 text-sm uppercase tracking-[0.16em] font-medium transition hover:bg-black/85 shadow-lg active:scale-[0.98] inline-block"
            >
              {t.heroButton}
            </Link>
          </div>
        </section>

        {/* UNIVERSE */}
        <section
          ref={universeRef}
          data-section="universe"
          className="relative fade-in-section flex h-[100dvh] min-h-[100dvh] snap-start snap-always items-center overflow-hidden"
        >
          {/* HOME SECTION IMAGE */}
          <ImageSlot
            src="/images/home-universe-v2.jpg"
            alt="NOW Perfume universe"
            fill
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover object-center"
            placeholderLabel="Image a ajouter"
          />

          <div className="absolute inset-0 bg-white/8" />

          <div className="relative z-10 flex h-full w-full items-start justify-center px-8 pt-16 pb-24 md:px-16 md:pt-20 md:pb-28">
            <div className="max-w-3xl rounded-[24px] border border-white/35 bg-white/28 p-6 text-center text-black shadow-[0_18px_42px_rgba(0,0,0,0.10)] backdrop-blur-[14px] md:p-8">
            <p className="mb-4 text-xs uppercase tracking-[0.5em] text-black/50 font-light">
              {t.universeKicker}
            </p>

              <h2 className="title-aura text-[clamp(32px,3vw,48px)] font-semibold leading-[1.15] tracking-[-0.02em]">
                {t.universeTitle}
              </h2>

              <p className="mt-8 text-[18px] leading-[1.6] text-black/72 font-light">
                {t.universeText}
              </p>
            </div>
          </div>
        </section>

        {/* COLLECTION */}
        <section
          ref={collectionRef}
          data-section="collection"
          className="relative fade-in-section flex h-[calc(100dvh-88px)] min-h-[calc(100dvh-88px)] snap-start snap-always items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_12%_18%,rgba(255,220,120,0.14),transparent_42%),radial-gradient(circle_at_88%_74%,rgba(191,223,138,0.11),transparent_48%),linear-gradient(180deg,#fdfbf7_0%,#fbfaf5_100%)]"
        >
          <div className="absolute -right-16 top-14 h-64 w-64 rounded-full bg-[#f2ce86]/18 blur-3xl" />

          <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-12 md:gap-16 md:px-12 md:py-12 lg:gap-20">
            <div className="order-2 md:order-1 md:col-span-4 flex flex-col justify-center">
              <div className="w-full max-w-[560px] text-black">
                <p className="mb-3 text-xs uppercase tracking-[0.5em] text-black/50 font-light">
                  {t.collectionKicker}
                </p>

                <h2 className="title-aura text-[clamp(32px,3vw,48px)] font-semibold leading-[1.15] tracking-[-0.02em]">
                  {collectionTitleNoBreakColon}
                </h2>

                <p className="mt-6 max-w-[520px] text-[18px] leading-[1.6] text-black/72 font-light">
                  {t.collectionText}
                </p>

                <p className="mt-5 max-w-[520px] text-[18px] leading-[1.6] text-black/72 font-light">
                  {t.collectionClosing}
                </p>
              </div>
            </div>

            <div className="order-1 md:order-2 md:col-span-8">
              <div className="parallax-shell relative h-[56dvh] w-full overflow-hidden rounded-[28px] [clip-path:inset(0_round_28px)] md:h-[78vh]" data-parallax>
                <div className="float-shell h-full w-full overflow-hidden rounded-[28px] [clip-path:inset(0_round_28px)]">
                  <ImageSlot
                    src="/images/home-collection-background.jpg"
                    alt="NOW Perfume collection"
                    fill
                    sizes="(max-width: 768px) 100vw, 68vw"
                    className="media-hover absolute inset-0 h-full w-full rounded-[28px] object-contain object-center shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                    placeholderLabel="Image a ajouter"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SPRAY */}
        <section
          ref={sprayRef}
          data-section="spray"
          className="relative fade-in-section flex h-[calc(100dvh-88px)] min-h-[calc(100dvh-88px)] snap-start snap-always items-center justify-center bg-[radial-gradient(circle_at_10%_18%,rgba(191,223,138,0.14),transparent_44%),radial-gradient(circle_at_90%_76%,rgba(255,220,120,0.13),transparent_50%),linear-gradient(180deg,#fcfaf6_0%,#f9f7f2_100%)]"
        >
          <div className="absolute -left-16 bottom-10 h-64 w-64 rounded-full bg-[#d7e8b3]/18 blur-3xl" />

          <div className="relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-6 py-10 md:grid-cols-12 md:gap-16 md:px-12 md:py-12 lg:gap-20">
            <div className="order-1 md:col-span-8">
              <div className="parallax-shell relative h-[56dvh] w-full overflow-hidden rounded-[28px] [clip-path:inset(0_round_28px)] md:h-[78vh]" data-parallax>
                <div className="float-shell h-full w-full overflow-hidden rounded-[28px] [clip-path:inset(0_round_28px)]">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 scale-105 blur-xl"
                    style={{
                      backgroundImage: "url('/images/home-moods-background.jpg')",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                    }}
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-white/18" />
                  <ImageSlot
                    src="/images/home-moods-background.jpg"
                    alt="Spray Your Energy"
                    fill
                    sizes="(max-width: 768px) 100vw, 68vw"
                    className="media-hover absolute inset-0 h-full w-full rounded-[28px] object-contain object-center shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                    placeholderLabel="Image a ajouter"
                  />
                </div>
              </div>
            </div>

            <div className="order-2 flex min-h-[56dvh] flex-col justify-center md:col-span-4 md:min-h-[100%]">
              <div className="my-auto w-full max-w-[520px] text-black">
                <p className="mb-4 text-xs uppercase tracking-[0.5em] text-black/50 font-light">
                  {t.sprayKicker}
                </p>

                <h2 className="title-aura text-[clamp(32px,3vw,48px)] font-semibold leading-[1.15] tracking-[-0.02em]">
                  {t.sprayTitle}
                </h2>

                <p className="mt-8 max-w-[520px] text-[18px] leading-[1.6] text-black/72 font-light">
                  {t.sprayText}
                </p>

                <div className="mt-10">
                  <Link
                    href="/parfums"
                    className="rounded-full border border-black px-10 py-4 text-sm uppercase tracking-[0.16em] text-black transition hover:bg-black hover:text-white inline-block"
                  >
                    {t.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-16 pb-8 md:pb-10 pt-6 md:pt-8 bg-[#f9f7f2]">
          <div className="mx-auto max-w-7xl">
            <SiteFooter lang={lang} />
          </div>
        </section>

      </div>
    </main>
  );
}