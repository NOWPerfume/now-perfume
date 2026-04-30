"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/app/components/Header";
import ImageSlot from "@/app/components/ImageSlot";
import SiteFooter from "@/app/components/SiteFooter";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

type Lang = "fr" | "en";

const CONTENT = {
  fr: {
    heroTitle: "La marque",
    heroLead:
      "NOW Perfume crée une nouvelle génération de parfums unisexes, pensés pour s'accorder à chaque énergie et à chaque moment.",
    manifestoTitle: "Manifeste",
    manifestoText:
      "NOW n’est pas qu’un nom. C’est une posture : celle de vivre le parfum dans le présent, avec légèreté, avec intention, avec optimisme.",
    stateTitle: "Un État D’Esprit",
    stateText1: "Nous imaginons le parfum comme un état d’esprit.",
    stateText2:
      "Une manière de se reconnecter à soi, d’accompagner une énergie, de prolonger un moment. Chaque fragrance est pensée pour être portée librement, dans l’instant, au bon endroit, au bon moment.",
    stateText3:
      "NOW développe des parfums unisexes, conçus pour s’adapter à chacun et évoluer avec les émotions.",
    matterTitle: "La Matière",
    matterText1:
      "Nos créations s’appuient sur des ingrédients d’origine naturelle, sélectionnés avec exigence.",
    matterText2:
      "Certaines matières premières sont issues de filières responsables, biologiques ou upcyclées. Chaque parfum est développé avec la maison de parfumerie Robertet, autour d’une idée essentielle : traduire une émotion en odeur, avec précision et sensibilité.",
    matterText3:
      "De l’intention au flacon, une approche exigeante au service d’une expérience sensorielle totale.",
    experienceTitle: "L’instant et le lieu",
    experienceText1:
      "NOW Perfume s’intègre dans les lieux où l’énergie existe déjà — clubs, studios de sport, hôtels, lounges, spas, etc.",
    experienceText2:
      "Notre technologie de diffusion permet de découvrir une fragrance dans son contexte réel, au moment juste.",
    experienceText3:
      "Plus qu’une marque, NOW propose une nouvelle manière de vivre le parfum.",
    experienceText4: "L’instant devient signature.",
  },
  en: {
    heroTitle: "The Brand",
    heroLead:
      "NOW Perfume creates a new generation of unisex fragrances, designed to match every energy and every moment.",
    manifestoTitle: "Manifeste",
    manifestoText:
      "NOW n’est pas qu’un nom. C’est une posture : celle de vivre le parfum dans le présent, avec légèreté, avec intention, avec optimisme.",
    stateTitle: "Un État D’Esprit",
    stateText1: "Nous imaginons le parfum comme un état d’esprit.",
    stateText2:
      "Une manière de se reconnecter à soi, d’accompagner une énergie, de prolonger un moment. Chaque fragrance est pensée pour être portée librement, dans l’instant, au bon endroit, au bon moment.",
    stateText3:
      "NOW développe des parfums unisexes, conçus pour s’adapter à chacun et évoluer avec les émotions.",
    matterTitle: "La Matière",
    matterText1:
      "Nos créations s’appuient sur des ingrédients d’origine naturelle, sélectionnés avec exigence.",
    matterText2:
      "Certaines matières premières sont issues de filières responsables, biologiques ou upcyclées. Chaque parfum est développé avec la maison de parfumerie Robertet, autour d’une idée essentielle : traduire une émotion en odeur, avec précision et sensibilité.",
    matterText3:
      "De l’intention au flacon, une approche exigeante au service d’une expérience sensorielle totale.",
    experienceTitle: "Moment and Place",
    experienceText1:
      "NOW Perfume s’intègre dans les lieux où l’énergie existe déjà — clubs, studios de sport, hôtels, lounges, spas.",
    experienceText2:
      "Notre technologie de diffusion permet de découvrir une fragrance dans son contexte réel, au moment juste.",
    experienceText3:
      "Plus qu’une marque, NOW propose une nouvelle manière de vivre le parfum.",
    experienceText4: "L’instant devient signature.",
  },
} as const;

function useRevealObserver() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const items = el.querySelectorAll<HTMLElement>("[data-reveal]");
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function LaMarquePage() {
  const pageRef = useRevealObserver();
  const [lang, setLang] = useState<Lang>("fr");
  const t = CONTENT[lang];

  useEffect(() => {
    const saved = window.localStorage.getItem("now-lang");
    if (saved === "fr" || saved === "en") {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("now-lang", lang);
  }, [lang]);

  return (
    <main ref={pageRef} className="bg-white text-black overflow-x-hidden">
      <Header lang={lang} solid={true} />
      <LanguageSwitcher lang={lang} setLang={setLang} />

      <section className="relative min-h-screen overflow-hidden">
        <ImageSlot
          src="/images/brand-hero.jpg"
          alt="NOW Perfume — La marque"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-white/90" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />

        <div className="relative z-10 flex min-h-screen flex-col justify-end px-10 pb-24 md:px-12 md:pb-28 lg:px-16 lg:pb-32">
          <div data-reveal className="reveal-item">
            <p className="mb-4 text-[10px] uppercase tracking-[0.6em] text-black/50 font-light">
              NOW&nbsp;&nbsp;-&nbsp;&nbsp;New Optimistic World
            </p>
            <h1 className="text-[clamp(40px,5vw,64px)] font-light leading-[1.1] tracking-[-0.025em] text-black">
              {t.heroTitle}
            </h1>
          </div>
          <p
            data-reveal
            className="reveal-item mt-6 max-w-xl text-lg leading-[1.6] text-black/65 font-light md:text-xl"
            style={{ transitionDelay: "100ms" }}
          >
            {t.heroLead}
          </p>
        </div>
      </section>

      <section className="px-10 py-14 md:px-12 md:py-16 lg:px-16 lg:py-20 bg-[radial-gradient(ellipse_at_top_right,rgba(249,200,74,0.07),transparent_55%),#fdfcf9]">
        <div className="mx-auto grid max-w-[1320px] items-center gap-6 lg:grid-cols-2 lg:gap-10">
          <div data-reveal className="reveal-item order-2 lg:order-1 max-w-[560px]">
            <h2 className="title-aura mb-5 text-[clamp(32px,3vw,48px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black">
              Un état d'esprit
            </h2>
            <p className="text-[18px] leading-[1.6] text-black/62 font-light">NOW n’est pas qu’un nom. C’est une manière d’être.</p>
            <p className="mt-3 text-[18px] leading-[1.6] text-black/56 font-light">Nous imaginons le parfum comme un état d’esprit — une façon de se reconnecter à soi, d’accompagner une énergie, de prolonger un moment.</p>
            <p className="mt-3 text-[18px] leading-[1.6] text-black/56 font-light">Chaque fragrance est pensée pour être portée librement, dans l’instant, au bon endroit, au bon moment.</p>
            <p className="mt-3 text-[18px] leading-[1.6] text-black/56 font-light">NOW développe des parfums unisexes, conçus pour s’adapter à chacun et évoluer avec les émotions.</p>
          </div>

          <div
            data-reveal
            className="reveal-item order-1 lg:order-2 relative"
            style={{ transitionDelay: "80ms" }}
          >
            <div className="mx-auto w-full max-w-[620px]">
              <div className="overflow-hidden rounded-[28px] relative aspect-[4/5] max-h-[600px] shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
              <ImageSlot
                src="/images/brand-philosophy.jpg"
                alt="UN ÉTAT D’ESPRIT"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-10 py-14 md:px-12 md:py-16 lg:px-16 lg:py-20 bg-white">
        <div className="mx-auto grid max-w-[1320px] items-center gap-6 lg:grid-cols-2 lg:gap-10">
          <div
            data-reveal
            className="reveal-item order-1 relative"
          >
            <div className="mx-auto w-full max-w-[620px]">
              <div className="overflow-hidden rounded-[28px] relative aspect-[4/5] max-h-[600px] shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
                <ImageSlot
                  src="/images/brand-natural.jpg"
                  alt="LA MATIÈRE"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          <div data-reveal className="reveal-item order-2 max-w-[560px]" style={{ transitionDelay: "80ms" }}>
            <h2 className="title-aura mb-5 text-[clamp(32px,3vw,48px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black">
              {t.matterTitle}
            </h2>
            <p className="text-[18px] leading-[1.6] text-black/62 font-light">{t.matterText1}</p>
            <p className="mt-3 text-[18px] leading-[1.6] text-black/56 font-light">{t.matterText2}</p>
            <p className="mt-3 text-[18px] leading-[1.6] text-black/56 font-light">{t.matterText3}</p>
          </div>
        </div>
      </section>

      <section className="px-10 py-14 md:px-12 md:py-16 lg:px-16 lg:py-20 bg-[radial-gradient(ellipse_at_top_left,rgba(249,200,74,0.06),transparent_55%),#fdfcf9]">
        <div className="mx-auto grid max-w-[1320px] items-center gap-6 lg:grid-cols-2 lg:gap-10">
          <div data-reveal className="reveal-item order-2 lg:order-1 max-w-[560px]" style={{ transitionDelay: "80ms" }}>
            <h2 className="title-aura mb-5 text-[clamp(32px,3vw,48px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black">
              {t.experienceTitle}
            </h2>
            <p className="text-[18px] leading-[1.6] text-black/62 font-light">{t.experienceText1}</p>
            <p className="mt-3 text-[18px] leading-[1.6] text-black/56 font-light">{t.experienceText2}</p>
            <p className="mt-3 text-[18px] leading-[1.6] text-black/56 font-light">{t.experienceText3}</p>
            <p className="mt-3 text-[18px] leading-[1.6] text-black/56 font-light">{t.experienceText4}</p>
          </div>

          <div
            data-reveal
            className="reveal-item order-1 lg:order-2 relative"
          >
            <div className="mx-auto w-full max-w-[620px]">
              <div className="overflow-hidden rounded-[28px] relative aspect-[4/5] max-h-[600px] shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
                <ImageSlot
                  src="/assets/images/brand/brand-machine-wall.jpg"
                  alt="L’instant et le lieu"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="px-10 md:px-12 lg:px-16 pb-8 md:pb-10 bg-white">
        <div className="mx-auto max-w-[1320px]">
          <SiteFooter lang={lang} />
        </div>
      </div>
    </main>
  );
}
