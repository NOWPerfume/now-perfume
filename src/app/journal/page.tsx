"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import SiteFooter from "@/app/components/SiteFooter";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import ImageSlot from "@/app/components/ImageSlot";
import { ARTICLES } from "@/data/journal";

// Direct img wrapper: bypasses Next/Image pipeline, shows red path if broken
function JournalImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [err, setErr] = useState(false);
  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover ${className ?? ""}`}
        onError={() => setErr(true)}
      />
      {err && (
        <div className="absolute bottom-0 inset-x-0 bg-red-600 text-white text-[9px] font-mono px-2 py-1 truncate z-10">
          ⚠ {src}
        </div>
      )}
    </>
  );
}

type Lang = "fr" | "en";

const CONTENT = {
  en: {
    kicker: "The NOW Journal",
    heroTitle: "Fragrance,\natmosphere\nand emotion.",
    heroSub:
      "Thoughts on scent, culture, and the design of feeling.",
    featuredLabel: "Featured",
    readArticle: "Read article",
    allArticles: "All articles",
    minutesRead: "min read",
    newsletterKicker: "Stay informed",
    newsletterTitle: "The Journal, in your inbox.",
    newsletterSub:
      "A curated selection of our latest articles on fragrance, culture and experience — no noise, just signal.",
    emailPlaceholder: "Your email address",
    subscribe: "Subscribe",
    subscribing: "Subscribing…",
    successMsg: "Thank you. You are subscribed.",
    errorMsg: "Something went wrong. Please try again.",
  },
  fr: {
    kicker: "Le Journal NOW",
    heroTitle: "Parfum,\natmosphère\net émotion.",
    heroSub:
      "Réflexions sur le parfum, la culture et la conception du ressentir.",
    featuredLabel: "À la une",
    readArticle: "Lire l'article",
    allArticles: "Tous les articles",
    minutesRead: "min de lecture",
    newsletterKicker: "Restez informé",
    newsletterTitle: "Le Journal, dans votre boîte mail.",
    newsletterSub:
      "Une sélection de nos derniers articles sur le parfum, la culture et l'expérience — sans bruit, juste l'essentiel.",
    emailPlaceholder: "Votre adresse e-mail",
    subscribe: "S'abonner",
    subscribing: "Abonnement…",
    successMsg: "Merci. Vous êtes abonné·e.",
    errorMsg: "Une erreur est survenue. Merci de réessayer.",
  },
} as const;

export default function JournalPage() {
  const [lang, setLang] = useState<Lang>("fr");
  const t = CONTENT[lang];

  const featured = ARTICLES.find((a) => a.featured) ?? ARTICLES[0];
  const grid = ARTICLES.filter((a) => a.slug !== featured.slug);

  // Newsletter state
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Scroll-reveal
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08 }
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function addRef(index: number) {
    return (el: HTMLElement | null) => {
      sectionRefs.current[index] = el;
    };
  }

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading" || status === "success") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Network response not ok");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="bg-white text-black">
      <Header lang={lang} solid={true} />
      <LanguageSwitcher lang={lang} setLang={setLang} />

      {/* ── Hero ── */}
      <section className="relative h-[70vh] min-h-[520px] md:h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <ImageSlot
            src="/images/brand-hero.jpg"
            alt="NOW Journal"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/30 to-white/10" />
        </div>

        <div className="relative z-10 w-full mx-auto max-w-[1400px] px-6 md:px-10 lg:px-12 pb-14 md:pb-20">
          <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-black/50 font-light md:text-xs md:tracking-[0.6em]">
            {t.kicker}
          </p>
          <h1 className="whitespace-pre-line text-[clamp(42px,5.5vw,72px)] font-light leading-[1.05] tracking-[-0.03em] text-black">
            {t.heroTitle}
          </h1>
          <p className="mt-5 text-[17px] md:text-[19px] font-light text-black/60 leading-[1.5] max-w-md">
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* ── Featured article ── */}
      <section
        ref={addRef(0)}
        className="reveal-item px-6 md:px-10 lg:px-12 py-16 md:py-24"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-8 text-[10px] uppercase tracking-[0.4em] text-black/40 font-light md:text-xs md:tracking-[0.6em]">
            {t.featuredLabel}
          </p>

          <Link
            href={`/journal/${featured.slug}`}
            className="group block"
            aria-label={featured.title[lang]}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-10 lg:gap-16 items-center">
              {/* Image */}
              <div className="relative aspect-[4/3] md:aspect-[3/2] overflow-hidden bg-stone-100">
                <JournalImg
                  src={featured.heroImage}
                  alt={featured.title[lang]}
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              {/* Text */}
              <div className="pt-8 md:pt-0">
                <p className="text-[10px] uppercase tracking-[0.35em] text-black/40 font-light mb-4 md:text-xs md:tracking-[0.5em]">
                  {featured.category} &nbsp;·&nbsp; {featured.readingTime} {t.minutesRead}
                </p>
                <h2 className="text-[clamp(26px,2.8vw,42px)] font-semibold leading-[1.12] tracking-[-0.02em] mb-5 group-hover:opacity-70 transition-opacity duration-300">
                  {featured.title[lang]}
                </h2>
                <p className="text-[17px] leading-[1.65] text-black/60 font-light mb-8 max-w-[480px]">
                  {featured.excerpt[lang]}
                </p>
                <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.3em] font-medium text-black group-hover:gap-4 transition-all duration-300">
                  {t.readArticle}
                  <span aria-hidden>→</span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── All articles ── */}
      <section
        ref={addRef(1)}
        className="reveal-item px-6 md:px-10 lg:px-12 pb-20 md:pb-32"
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-10 text-[10px] uppercase tracking-[0.4em] text-black/40 font-light md:text-xs md:tracking-[0.6em]">
            {t.allArticles}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {grid.map((article) => (
              <Link
                key={article.slug}
                href={`/journal/${article.slug}`}
                className="group flex flex-col"
                aria-label={article.title[lang]}
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-stone-100 mb-5">
                  <JournalImg
                    src={article.heroImage}
                    alt={article.title[lang]}
                    className="transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-black/40 font-light mb-3 md:tracking-[0.5em]">
                  {article.category} &nbsp;·&nbsp; {article.readingTime} {t.minutesRead}
                </p>
                <h3 className="text-[18px] md:text-[20px] font-semibold leading-[1.2] tracking-[-0.01em] mb-3 group-hover:opacity-60 transition-opacity duration-300">
                  {article.title[lang]}
                </h3>
                <p className="text-[14px] leading-[1.6] text-black/55 font-light line-clamp-3">
                  {article.excerpt[lang]}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-medium text-black/60 group-hover:text-black group-hover:gap-3 transition-all duration-300">
                  {t.readArticle}
                  <span aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section
        ref={addRef(2)}
        className="reveal-item px-6 md:px-10 lg:px-12 py-20 md:py-28 border-t border-black/8"
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="max-w-xl">
            <p className="text-[10px] uppercase tracking-[0.4em] text-black/40 font-light mb-5 md:text-xs md:tracking-[0.6em]">
              {t.newsletterKicker}
            </p>
            <h2 className="text-[clamp(28px,2.5vw,40px)] font-semibold leading-[1.15] tracking-[-0.02em] mb-4">
              {t.newsletterTitle}
            </h2>
            <p className="text-[16px] leading-[1.6] text-black/55 font-light mb-8">
              {t.newsletterSub}
            </p>

            {status === "success" ? (
              <p className="text-[14px] text-black/70 font-light">{t.successMsg}</p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
                noValidate
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className="flex-1 h-12 px-4 border border-black/20 bg-transparent text-[14px] font-light placeholder:text-black/35 focus:outline-none focus:border-black/60 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-12 px-8 bg-black text-white text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-black/80 disabled:opacity-50 transition-colors whitespace-nowrap"
                >
                  {status === "loading" ? t.subscribing : t.subscribe}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="mt-3 text-[13px] text-red-600/80 font-light">
                {t.errorMsg}
              </p>
            )}
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
