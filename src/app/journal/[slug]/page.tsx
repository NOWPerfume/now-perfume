"use client";

import { useState, useEffect, useRef } from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/Header";
import SiteFooter from "@/app/components/SiteFooter";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import { getArticleBySlug, getRelatedArticles } from "@/data/journal";

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

const UI = {
  en: {
    back: "← Back to Journal",
    minutesRead: "min read",
    related: "Continue reading",
    newsletterKicker: "Stay informed",
    newsletterTitle: "The Journal, in your inbox.",
    newsletterSub:
      "A curated selection of articles on fragrance, culture and experience.",
    emailPlaceholder: "Your email address",
    subscribe: "Subscribe",
    subscribing: "Subscribing…",
    successMsg: "Thank you. You are subscribed.",
    errorMsg: "Something went wrong. Please try again.",
    readArticle: "Read article",
  },
  fr: {
    back: "← Retour au Journal",
    minutesRead: "min de lecture",
    related: "Continuer la lecture",
    newsletterKicker: "Restez informé",
    newsletterTitle: "Le Journal, dans votre boîte mail.",
    newsletterSub:
      "Une sélection d'articles sur le parfum, la culture et l'expérience.",
    emailPlaceholder: "Votre adresse e-mail",
    subscribe: "S'abonner",
    subscribing: "Abonnement…",
    successMsg: "Merci. Vous êtes abonné·e.",
    errorMsg: "Une erreur est survenue. Merci de réessayer.",
    readArticle: "Lire l'article",
  },
} as const;

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;

  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug, 3);

  const [lang, setLang] = useState<Lang>("fr");
  const t = UI[lang];
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [readProgress, setReadProgress] = useState(0);

  const articleRef = useRef<HTMLElement | null>(null);
  const relatedRef = useRef<HTMLElement | null>(null);
  const nlRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("now-lang");
    if (saved === "fr" || saved === "en") setLang(saved as Lang);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("now-lang", lang);
  }, [lang]);

  useEffect(() => {
    function onScroll() {
      const el = articleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = Math.max(1, el.offsetHeight - window.innerHeight);
      setReadProgress(Math.max(0, Math.min(100, (-rect.top / total) * 100)));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = [relatedRef.current, nlRef.current].filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        }),
      { threshold: 0.06 }
    );
    targets.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
    <main className="relative bg-[#FAF7F2] text-black overflow-x-hidden">
      <Header lang={lang} solid={true} />
      <LanguageSwitcher lang={lang} setLang={setLang} />

      {/* ── Reading progress bar ── */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        aria-hidden="true"
        style={{ height: "2px", background: "rgba(0,0,0,0.06)" }}
      >
        <div
          className="h-full transition-[width] duration-75 ease-linear"
          style={{ width: `${readProgress}%`, background: "rgba(0,0,0,0.38)" }}
        />
      </div>

      {/* ── Ambient atmospheric layer — edge-anchored washes + animated orbs ── */}
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        aria-hidden="true"
        style={{ zIndex: 0 }}
      >
        {/* Wide ambient color washes — left/right edge anchored, bleed inward softly */}
        <div className="absolute" style={{ left: 0, top: "4%", width: "42vw", height: "70vh", background: "radial-gradient(ellipse at 0% 50%, rgba(233,75,138,0.06) 0%, transparent 62%)", filter: "blur(80px)" }} />
        <div className="absolute" style={{ right: 0, top: "18%", width: "44vw", height: "80vh", background: "radial-gradient(ellipse at 100% 45%, rgba(255,167,0,0.07) 0%, transparent 60%)", filter: "blur(80px)" }} />
        <div className="absolute" style={{ left: 0, top: "58%", width: "36vw", height: "60vh", background: "radial-gradient(ellipse at 0% 50%, rgba(122,154,58,0.05) 0%, transparent 60%)", filter: "blur(70px)" }} />
        <div className="absolute" style={{ right: 0, top: "70%", width: "38vw", height: "58vh", background: "radial-gradient(ellipse at 100% 50%, rgba(233,75,138,0.045) 0%, transparent 62%)", filter: "blur(70px)" }} />
        {/* Animated floating orbs — visibly at edges, half-cropped, full motion */}
        <div className="absolute rounded-full journal-bubble-b" style={{ width: "16rem", height: "16rem", left: "-4rem", top: "16%", background: "rgba(233,75,138,0.11)", border: "1px solid rgba(233,75,138,0.22)", filter: "blur(5px)", animationDelay: "-9s" }} />
        <div className="absolute rounded-full journal-bubble-a" style={{ width: "10rem", height: "10rem", left: "-1rem", top: "44%", background: "rgba(122,154,58,0.09)", border: "1px solid rgba(122,154,58,0.20)", filter: "blur(2px)", animationDelay: "-20s" }} />
        <div className="absolute rounded-full journal-bubble-c" style={{ width: "13rem", height: "13rem", left: "-3rem", top: "72%", background: "rgba(244,237,215,0.60)", border: "1px solid rgba(180,160,130,0.25)", filter: "blur(4px)", animationDelay: "-7s" }} />
        <div className="absolute rounded-full journal-bubble-a" style={{ width: "18rem", height: "18rem", right: "-5rem", top: "12%", background: "rgba(255,199,44,0.10)", border: "1px solid rgba(255,199,44,0.22)", filter: "blur(6px)", animationDelay: "-4s" }} />
        <div className="absolute rounded-full journal-bubble-c" style={{ width: "11rem", height: "11rem", right: "-1.5rem", top: "48%", background: "rgba(255,106,19,0.09)", border: "1px solid rgba(255,106,19,0.18)", filter: "blur(3px)", animationDelay: "-13s" }} />
        <div className="absolute rounded-full journal-bubble-b" style={{ width: "14rem", height: "14rem", right: "-3rem", top: "74%", background: "rgba(255,167,0,0.09)", border: "1px solid rgba(255,167,0,0.20)", filter: "blur(4px)", animationDelay: "-18s" }} />
      </div>

      {/* ── HERO: centered editorial ── */}
      <section
        className="relative pt-20 md:pt-24 pb-0"
        style={{ zIndex: 1 }}
      >
        {/* Centered text block */}
        <div className="mx-auto max-w-[640px] px-7 md:px-10 text-center">
          <Link
            href="/journal"
            className="inline-flex items-center justify-center gap-2 mb-7 text-[10px] uppercase tracking-[0.5em] text-black/28 hover:text-black/60 font-light transition-colors duration-300"
          >
            <span aria-hidden style={{ fontSize: "8px" }}>←</span>
            {lang === "fr" ? "Journal" : "Journal"}
          </Link>

          <p className="mb-3 text-[9px] uppercase tracking-[0.9em] text-black/28 font-light">
            {article.category}
          </p>

          <h1
            className="font-light leading-[1.10] tracking-[-0.024em] text-black mb-5"
            style={{
              fontSize: "clamp(22px, 3vw, 42px)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.title[lang]}
          </h1>

          <p className="text-[10px] uppercase tracking-[0.5em] text-black/28 font-light mb-5">
            {article.readingTime}&nbsp;{t.minutesRead}
          </p>

          {/* Hairline separator */}
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="flex-1 max-w-[60px]" style={{ height: "1px", background: "rgba(0,0,0,0.10)" }} />
            <div style={{ width: "3px", height: "3px", borderRadius: "9999px", background: "rgba(0,0,0,0.15)" }} />
            <div className="flex-1 max-w-[60px]" style={{ height: "1px", background: "rgba(0,0,0,0.10)" }} />
          </div>

          <p
            className="leading-[1.75] text-black/44 font-light"
            style={{ fontSize: "clamp(14px, 1.2vw, 16px)" }}
          >
            {article.excerpt[lang]}
          </p>
        </div>

        {/* Hero image — full width below text */}
        <div className="relative mt-10 mx-auto max-w-[1100px] px-5 sm:px-8 lg:px-12">
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "16/7", borderRadius: "2px" }}
          >
            <JournalImg
              src={article.heroImage}
              alt={article.title[lang]}
              className="journal-hero-pan"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(155deg, rgba(255,199,44,0.06) 0%, rgba(233,75,138,0.05) 55%, rgba(122,154,58,0.04) 100%)",
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0"
              style={{
                height: "30%",
                background: "linear-gradient(to top, rgba(250,247,242,0.60), transparent)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── Article body — luxury editorial frame ── */}
      <div
        className="relative px-5 sm:px-8 lg:px-14 pt-6 md:pt-8 pb-14 md:pb-20"
        style={{ zIndex: 1 }}
      >
        {/* Luxury editorial frame */}
        <div
          className="mx-auto max-w-[960px]"
          style={{
            border: "1px solid rgba(0,0,0,0.07)",
            background: "rgba(255,255,255,0.72)",
          }}
        >
          {/* Top rule inside frame */}
          <div
            className="mx-auto"
            style={{
              maxWidth: "700px",
              paddingTop: "clamp(1.5rem, 3vw, 2.5rem)",
              paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
              paddingRight: "clamp(1.5rem, 4vw, 4rem)",
            }}
          >
            <div
              style={{
                height: "1px",
                marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
                background:
                  "linear-gradient(to right, transparent, rgba(0,0,0,0.12) 20%, rgba(0,0,0,0.12) 80%, transparent)",
              }}
            />
          </div>
          <article
            ref={articleRef}
            className="journal-article-reveal"
            style={{
              paddingLeft: "clamp(1.5rem, 4vw, 4rem)",
              paddingRight: "clamp(1.5rem, 4vw, 4rem)",
              paddingBottom: "clamp(2rem, 4vw, 3.5rem)",
            }}
          >
            <div className="mx-auto max-w-[700px]">
              <div
                className="prose-journal"
                dangerouslySetInnerHTML={{ __html: article.content[lang] }}
              />
            </div>
          </article>
        </div>
      </div>

      {/* ── Related articles ── */}
      <section
        ref={relatedRef}
        className="reveal-item relative px-5 sm:px-8 lg:px-14 pb-14 md:pb-20 pt-10 md:pt-14"
        style={{ zIndex: 1, borderTop: "1px solid rgba(0,0,0,0.07)" }}
      >
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-8 text-[9px] uppercase tracking-[0.65em] text-black/30 font-light">
            {t.related}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-14">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/journal/${a.slug}`}
                className="group flex flex-col"
                aria-label={a.title[lang]}
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-stone-100 mb-6">
                  <JournalImg
                    src={a.heroImage}
                    alt={a.title[lang]}
                    className="transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <p className="text-[9px] uppercase tracking-[0.55em] text-black/30 font-light mb-3">
                  {a.category}&nbsp;·&nbsp;{a.readingTime}&nbsp;{t.minutesRead}
                </p>
                <h3 className="text-[16px] md:text-[18px] font-light leading-[1.26] tracking-[-0.012em] mb-3 group-hover:opacity-55 transition-opacity duration-300">
                  {a.title[lang]}
                </h3>
                <span className="mt-auto pt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.38em] font-light text-black/38 group-hover:text-black group-hover:gap-3 transition-all duration-300">
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
        ref={nlRef}
        className="reveal-item relative px-5 sm:px-8 lg:px-14 py-14 md:py-18"
        style={{
          zIndex: 1,
          borderTop: "1px solid rgba(0,0,0,0.07)",
          background: "rgba(0,0,0,0.014)",
        }}
      >
        <div className="text-center">
          <p className="text-[9px] uppercase tracking-[0.65em] text-black/30 font-light mb-5">
            {t.newsletterKicker}
          </p>
          <h2
            className="font-light leading-[1.1] tracking-[-0.024em] mb-3"
            style={{ fontSize: "clamp(22px, 2.4vw, 36px)" }}
          >
            {t.newsletterTitle}
          </h2>
          <p className="text-[14px] md:text-[15px] leading-[1.65] text-black/44 font-light mb-8">
            {t.newsletterSub}
          </p>
          {status === "success" ? (
            <p className="text-[14px] text-black/55 font-light">{t.successMsg}</p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 justify-center max-w-[480px] mx-auto" noValidate>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="flex-1 h-11 px-4 border border-black/[0.15] bg-white text-[14px] font-light placeholder:text-black/28 focus:outline-none focus:border-black/45 transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-11 px-8 bg-black text-white text-[10px] uppercase tracking-[0.3em] font-light hover:bg-black/80 disabled:opacity-40 transition-colors whitespace-nowrap"
              >
                {status === "loading" ? t.subscribing : t.subscribe}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="mt-3 text-[12px] text-red-600/70 font-light">{t.errorMsg}</p>
          )}
        </div>
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
