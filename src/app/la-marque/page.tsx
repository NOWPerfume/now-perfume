"use client";

import { useEffect, useRef, useState, startTransition } from "react";
import Header from "@/app/components/Header";
import ImageSlot from "@/app/components/ImageSlot";
import SiteFooter from "@/app/components/SiteFooter";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

type Lang = "fr" | "en";

const CONTENT = {
  fr: {
    heroTitle: "Notre vision",
    heroLead:
      "NOW Perfume réinvente la façon de vivre le parfum — unisexe, sensoriel, ancré dans l'instant.",
    manifestoTitle: "Manifeste",
    manifestoText:
      "NOW n'est pas qu'un nom. C'est une conviction : que le parfum peut réveiller une émotion, habiter un instant, accompagner une énergie.",
    stateTitle: "Un état d'esprit",
    stateText1: "Nous imaginons le parfum comme une expérience sensorielle vivante.",
    stateText2:
      "Une manière de se reconnecter à soi, d'amplifier une énergie, de prolonger un moment qui compte. Chaque fragrance est conçue pour être portée librement — dans l'instant, là où elle fait sens.",
    stateText3:
      "Des fragrances unisexes, vivantes, qui évoluent avec chaque humeur.",
    matterTitle: "La matière",
    matterText1:
      "Nos créations s'appuient sur des ingrédients d'origine naturelle, sélectionnés avec exigence.",
    matterText2:
      "Certaines matières premières sont issues de filières responsables ou biologiques. Chaque parfum est co-créé avec la maison Robertet autour d'une idée fondamentale : traduire une émotion en odeur, avec précision et sensibilité.",
    matterText3:
      "De l'intention au flacon — une exigence constante, au service d'une expérience olfactive qui se ressent autant qu'elle se porte.",
    experienceTitle: "L’instant et le lieu",
    experienceText1:
      "NOW Perfume prend place dans les lieux où l'énergie existe déjà — clubs, studios de sport, hôtels, lounges, spas.",
    experienceText2:
      "Nos dispositifs de diffusion permettent de découvrir une fragrance dans son contexte naturel — au moment exact où elle prend sens, dans le lieu exact où elle résonne.",
    experienceText3:
      "NOW réinvente la relation au parfum — en le faisant vivre là où l'émotion et l'atmosphère convergent.",
    experienceText4: "L’instant devient signature.",
  },
  en: {
    heroTitle: "Our Vision",
    heroLead:
      "NOW Perfume reimagines the way fragrance is experienced — unisex, sensory, rooted in the now.",
    manifestoTitle: "Manifesto",
    manifestoText:
      "NOW is more than a name. It is a conviction: that fragrance can awaken an emotion, inhabit a moment, accompany an energy.",
    stateTitle: "A State of Mind",
    stateText1: "We imagine fragrance as a living sensory experience.",
    stateText2:
      "A way to reconnect with yourself, amplify an energy, extend a moment that matters. Each fragrance is made to be worn freely — in the moment, wherever it resonates.",
    stateText3:
      "Unisex fragrances, alive, evolving with every mood.",
    matterTitle: "The Craft",
    matterText1:
      "Our creations are built around natural-origin ingredients, selected with rigorous standards.",
    matterText2:
      "Some raw materials come from responsible or organic sources. Each fragrance is co-created with Robertet around one fundamental idea: translating emotion into scent, with precision and sensitivity.",
    matterText3:
      "From intention to bottle — an unwavering commitment, in service of an olfactive experience as felt as it is worn.",
    experienceTitle: "Moment and Place",
    experienceText1:
      "NOW Perfume inhabits places where energy already exists — clubs, fitness studios, hotels, lounges, spas.",
    experienceText2:
      "Our diffusion devices allow a fragrance to be discovered in its natural context — at the exact moment it resonates, in the exact place it belongs.",
    experienceText3:
      "NOW reimagines the relationship to fragrance — bringing it alive where emotion and atmosphere already converge.",
    experienceText4: "The moment becomes a signature.",
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
      startTransition(() => setLang(saved as Lang));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("now-lang", lang);
  }, [lang]);

  return (
    <main ref={pageRef} className="bg-white text-black overflow-x-hidden">
      <Header lang={lang} solid={true} />
      <LanguageSwitcher lang={lang} setLang={setLang} />

      <section className="relative overflow-hidden px-8 pt-20 pb-14 md:px-12 md:pt-28 md:pb-18 lg:px-20 lg:pt-32 lg:pb-20">
        {/* Colored halos — NOW Perfume palette */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
          {/* Ginger yellow — top right */}
          <div className="absolute rounded-full" style={{ background: "#FFC72C", opacity: 0.28, width: "32rem", height: "32rem", top: "-4rem", right: "-5rem", filter: "blur(48px)" }} />
          {/* Maracuja orange — top left */}
          <div className="absolute rounded-full" style={{ background: "#FF6A13", opacity: 0.22, width: "26rem", height: "26rem", top: "-2rem", left: "-5rem", filter: "blur(44px)" }} />
          {/* Rosa pink — bottom right */}
          <div className="absolute rounded-full" style={{ background: "#E94B8A", opacity: 0.20, width: "24rem", height: "24rem", bottom: "-2rem", right: "-3rem", filter: "blur(42px)" }} />
          {/* Matcha green — mid left */}
          <div className="absolute rounded-full" style={{ background: "#7A9A3A", opacity: 0.20, width: "20rem", height: "20rem", top: "40%", left: "-3rem", filter: "blur(40px)" }} />
          {/* Vanilla cream — center wash */}
          <div className="absolute rounded-full" style={{ background: "#F4EDE4", opacity: 0.65, width: "38rem", height: "38rem", top: "5%", left: "18%", filter: "blur(64px)" }} />
        </div>

        <div className="relative z-10 max-w-2xl">
          <p data-reveal className="reveal-item mb-5 text-[10px] uppercase tracking-[0.55em] text-black/40 font-light">
            NOW PERFUME&nbsp;&nbsp;—&nbsp;&nbsp;New Optimistic World
          </p>
          <h1
            data-reveal
            className="reveal-item text-[clamp(42px,5.5vw,72px)] font-light leading-[1.05] tracking-[-0.03em] text-black"
            style={{ transitionDelay: "60ms" }}
          >
            {t.heroTitle}
          </h1>
          <p
            data-reveal
            className="reveal-item mt-8 max-w-lg text-lg leading-[1.7] text-black/58 font-light md:text-xl"
            style={{ transitionDelay: "120ms" }}
          >
            {t.heroLead}
          </p>
        </div>
      </section>

      <section className="px-10 py-14 md:px-12 md:py-16 lg:px-16 lg:py-20 bg-[radial-gradient(ellipse_at_top_right,rgba(249,200,74,0.07),transparent_55%),#fdfcf9]">
        <div className="mx-auto grid max-w-[1320px] items-center gap-6 lg:grid-cols-2 lg:gap-10">
          <div data-reveal className="reveal-item order-2 lg:order-1 max-w-[560px]">
            <h2 className="title-aura mb-5 text-[clamp(32px,3vw,48px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black">
              {t.stateTitle}
            </h2>
            <p className="text-[18px] leading-[1.6] text-black/62 font-light">{t.manifestoText}</p>
            <p className="mt-3 text-[18px] leading-[1.6] text-black/56 font-light">{t.stateText1}</p>
            <p className="mt-3 text-[18px] leading-[1.6] text-black/56 font-light">{t.stateText2}</p>
            <p className="mt-3 text-[18px] leading-[1.6] text-black/56 font-light">{t.stateText3}</p>
          </div>

          <div
            data-reveal
            className="reveal-item order-1 lg:order-2 relative"
            style={{ transitionDelay: "80ms" }}
          >
            <div className="mobile-full-bleed mx-auto w-full max-w-[620px]">
              <div className="relative aspect-[4/5] max-h-[600px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] md:rounded-[28px]">
              <ImageSlot
                src="/images/brand-philosophy.jpg"
                alt={lang === "fr" ? "Un état d'esprit" : "A state of mind"}
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
            <div className="mobile-full-bleed mx-auto w-full max-w-[620px]">
              <div className="relative aspect-[4/5] max-h-[600px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] md:rounded-[28px]">
                <ImageSlot
                  src="/images/brand-natural.jpg"
                  alt={lang === "fr" ? "La matière" : "The craft"}
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
            <div className="mobile-full-bleed mx-auto w-full max-w-[620px]">
              <div className="relative aspect-[4/5] max-h-[600px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] md:rounded-[28px]">
                <ImageSlot
                  src="/assets/images/brand/brand-machine-wall.jpg"
                  alt={lang === "fr" ? "L'instant et le lieu" : "Moment and place"}
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
