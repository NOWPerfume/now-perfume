"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import ImageSlot from "@/app/components/ImageSlot";
import SiteFooter from "@/app/components/SiteFooter";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

type Lang = "fr" | "en";

const CONTENT = {
  fr: {
    title: "Nous trouver",
    subtitle: "Découvrez NOW Perfume dans des lieux sélectionnés — clubs, studios de sport, hôtels, lounges, spas, espaces de travail, etc.",
    supporting: "clubs, studios de sport, hôtels, lounges, spas, espaces de travail, etc.",
    heroExperienceLine: "Une expérience olfactive à vivre sur place.",
    cta1: "Voir les lieux",
    cta2: "Devenir partenaire",
    intro: {
      title: "Le concept",
      text: "NOW Perfume s'installe dans des lieux où le parfum prolonge une ambiance, une émotion, un moment. Une présence pensée pour enrichir l'expérience client de manière sensorielle, contemporaine et mémorable."
    },
    venues: {
      title: "Lieux d'installation",
      items: [
        { name: "Clubs", desc: "prolonger l'intensité du moment" },
        { name: "Studios de sport", desc: "accompagner l'énergie et le dépassement" },
        { name: "Hôtels", desc: "enrichir l'expérience d'accueil" },
        { name: "Lounges", desc: "installer une signature sensorielle" },
        { name: "Spas", desc: "sublimer le bien-être" },
        { name: "Espaces de travail", desc: "installer une atmosphère inspirante" }
      ]
    },
    discovery: {
      title: "Découverte en situation",
      text: "NOW Perfume permet de découvrir une fragrance dans l'instant, au cœur d'un lieu, d'une ambiance et d'une émotion. Chaque installation est pensée comme une extension naturelle de l'expérience du lieu."
    },
    contact: {
      title: "Faire découvrir NOW Perfume dans votre lieu",
      text: "Vous souhaitez intégrer NOW Perfume dans votre établissement ? Contactez-nous pour imaginer une installation adaptée à votre univers.",
      cta: "Nous contacter",
      cta2: "Demander une présentation",
      email: "hello@nowperfume.fr"
    },
    partners: {
      title: "Sélection privée",
      text: "Les premiers lieux NOW Perfume seront révélés prochainement. Les adresses restent volontairement discrètes jusqu’à leur annonce officielle."
    },
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          q: "Dans quels types de lieux NOW Perfume peut-il être installé ?",
          a: "NOW Perfume est présent dans des lieux sélectionnés tels que clubs, studios de sport, hôtels, lounges, spas, espaces de travail et autres espaces premium où l'expérience sensorielle enrichit le moment."
        },
        {
          q: "Qu’est-ce que NOW Perfume apporte à mon établissement ?",
          a: "NOW Perfume enrichit l’expérience client en ajoutant une dimension sensorielle immédiate, au cœur du lieu. Chaque installation devient une extension naturelle de votre univers, renforçant l’image et la mémorisation de votre établissement. En complément, le dispositif génère un revenu additionnel automatique, sans contrainte opérationnelle."
        },
        {
          q: "Comment se passe l'installation ?",
          a: "Nos équipes prennent tout en charge : installation sur mesure et réapprovisionnement régulier. Une solution clé en main, pensée pour offrir zéro contrainte à vos équipes."
        },
        {
          q: "Peut-on découvrir plusieurs parfums ?",
          a: "Oui, chaque lieu propose une sélection de parfums NOW Perfume, chacun associé à une émotion et un moment spécifique."
        },
        {
          q: "Comment entrer en contact avec la marque ?",
          a: "Contactez-nous directement via hello@nowperfume.fr ou utilisez le formulaire de contact pour discuter d'une collaboration."
        }
      ]
    },
    final: {
      title: "Découvrir NOW Perfume dans l'instant",
      text: "Une nouvelle façon de faire vivre le parfum dans des lieux où l'émotion, l'énergie et l'expérience se rencontrent.",
      cta: "Nous contacter"
    }
  },
  en: {
    title: "Find Us",
    subtitle: "Discover NOW Perfume in selected locations — clubs, fitness studios, hotels, lounges, spas, workspaces, etc.",
    supporting: "clubs, fitness studios, hotels, lounges, spas, workspaces, etc.",
    heroExperienceLine: "A fragrance experience to live on-site.",
    cta1: "See locations",
    cta2: "Become a partner",
    intro: {
      title: "The concept",
      text: "NOW Perfume is installed in places where fragrance extends an atmosphere, an emotion, a moment. A presence designed to enrich the customer experience in a sensory, contemporary and memorable way."
    },
    venues: {
      title: "Installation locations",
      items: [
        { name: "Clubs", desc: "extend the intensity of the moment" },
        { name: "Fitness studios", desc: "accompany energy and surpassing limits" },
        { name: "Hotels", desc: "enrich the welcome experience" },
        { name: "Lounges", desc: "install a sensory signature" },
        { name: "Spas", desc: "sublimate well-being" },
        { name: "Workspaces", desc: "shape an inspiring atmosphere" }
      ]
    },
    discovery: {
      title: "Discovery in context",
      text: "NOW Perfume allows you to discover a fragrance in the moment, at the heart of a place, an atmosphere and an emotion. Each installation is designed as a natural extension of the place's experience."
    },
    contact: {
      title: "Introduce NOW Perfume in your venue",
      text: "Would you like to integrate NOW Perfume into your establishment? Contact us to imagine an installation adapted to your universe.",
      cta: "Contact us",
      cta2: "Request a presentation",
      email: "hello@nowperfume.fr"
    },
    partners: {
      title: "Private selection",
      text: "The first NOW Perfume locations will be revealed soon. Addresses remain intentionally private until the official announcement."
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "In what types of places can NOW Perfume be installed?",
          a: "NOW Perfume is present in selected places such as clubs, fitness studios, hotels, lounges, spas, workspaces and other premium spaces where sensory experience enriches the moment."
        },
        {
          q: "How does the installation work?",
          a: "Our teams handle everything: custom installation and regular restocking. A turnkey solution designed to create zero constraints for your staff."
        },
        {
          q: "Can you discover multiple perfumes?",
          a: "Yes, each venue offers a selection of NOW Perfume fragrances, each associated with a specific emotion and moment."
        },
        {
          q: "How to get in touch with the brand?",
          a: "Contact us directly via hello@nowperfume.fr or use the contact form to discuss a collaboration."
        }
      ]
    },
    final: {
      title: "Discover NOW Perfume in the moment",
      text: "A new way to bring fragrance to life in places where emotion, energy and experience meet.",
      cta: "Contact us"
    }
  }
};

export default function NousTrouverPage() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") {
      return "fr";
    }

    const saved = window.localStorage.getItem("now-lang");
    return saved === "fr" || saved === "en" ? saved : "fr";
  });
  const [showMap, setShowMap] = useState(false);
  const content = CONTENT[lang];

  useEffect(() => {
    window.localStorage.setItem("now-lang", lang);
  }, [lang]);

  const openWhatsApp = () => {
    // NOW Perfume professional WhatsApp number
    const phoneNumber = "33699335094";
    const message = lang === "fr" 
      ? "Bonjour, je suis intéressé par un partenariat avec NOW Perfume."
      : "Hello, I'm interested in a partnership with NOW Perfume.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <main className="min-h-screen bg-[#fdfbf8] text-black">
        {/* Header - Always visible */}
        <Header lang={lang} solid={true} />
        <LanguageSwitcher lang={lang} setLang={setLang} />

        {/* HERO SECTION */}
        <section className="relative flex min-h-[82vh] items-start justify-center overflow-hidden bg-white px-6 pt-24 pb-16 md:min-h-screen md:items-center md:px-8 md:py-32">
          {/* FIND US HERO IMAGE */}
          <ImageSlot
            src="/images/nous-trouver-hero.jpg"
            alt="NOW Perfume nous trouver"
            fill
            priority
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover"
            placeholderLabel="Image a ajouter"
          />
          <div className="absolute inset-0 bg-white/60" />

          <div className="relative z-10 max-w-5xl text-center">
            <h1 className="text-[clamp(38px,5vw,64px)] font-light text-black mb-4 tracking-[-0.025em] leading-[1.1]">
              {content.title}
            </h1>
            <p className="mx-auto max-w-5xl text-[11px] md:text-xs uppercase tracking-[0.34em] text-black/62 font-light leading-relaxed">
              {content.supporting.toUpperCase()}
            </p>
            <p className="mx-auto mt-3 max-w-[820px] text-lg md:text-2xl text-black/76 font-light leading-[1.55]">
              {content.subtitle}
            </p>
            <p className="mt-2.5 text-sm md:text-[15px] text-black/56 font-light tracking-[0.02em]">
              {content.heroExperienceLine}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowMap(true)}
                className="bg-black text-white px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-[0.2em] hover:bg-black/90 transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {content.cta1}
              </button>
              <button 
                onClick={openWhatsApp}
                className="border border-black/20 text-black px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-[0.2em] hover:bg-black/5 transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {content.cta2}
              </button>
            </div>
          </div>
        </section>

      {/* INTRO SECTION */}
      <section className="relative px-6 md:px-8 py-16 md:py-24 bg-[#fdfbf8] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(60rem_24rem_at_50%_0%,rgba(250,230,178,0.16),transparent_70%),radial-gradient(34rem_18rem_at_82%_78%,rgba(239,143,70,0.08),transparent_74%),radial-gradient(36rem_18rem_at_16%_84%,rgba(230,158,194,0.08),transparent_72%)]" />
        <div className="absolute -left-16 top-8 h-36 w-36 rounded-full border border-white/30 bg-white/18 shadow-[0_20px_44px_rgba(0,0,0,0.08)] backdrop-blur-[12px]" />
        <div className="max-w-4xl mx-auto text-center relative z-10 rounded-[26px] border border-white/40 bg-white/42 px-6 py-8 shadow-[0_20px_48px_rgba(0,0,0,0.07)] backdrop-blur-[12px] md:px-10 md:py-10">
          <h2 className="text-[clamp(28px,3vw,40px)] font-semibold text-black mb-6 tracking-[-0.02em] leading-[1.15]">
            {content.intro.title}
          </h2>
          <p className="text-lg leading-8 text-black/70 font-light">
            {content.intro.text}
          </p>
        </div>
      </section>

      {/* VENUES SECTION */}
      <section className="relative px-6 md:px-8 py-16 md:py-24 bg-[#fdfbf8] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(56rem_22rem_at_14%_18%,rgba(245,223,170,0.14),transparent_74%),radial-gradient(60rem_22rem_at_88%_80%,rgba(255,235,185,0.12),transparent_72%),radial-gradient(34rem_20rem_at_44%_12%,rgba(180,217,102,0.10),transparent_74%),radial-gradient(38rem_20rem_at_84%_24%,rgba(232,168,193,0.09),transparent_72%)]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-[clamp(28px,3vw,40px)] font-semibold text-black mb-12 text-center tracking-[-0.02em] leading-[1.15]">
            {content.venues.title}
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
            {[
              { item: content.venues.items[0], img: "/images/nous-trouver-clubs.jpg" },
              { item: content.venues.items[1], img: "/images/nous-trouver-studios.jpg" },
              { item: content.venues.items[2], img: "/images/nous-trouver-hotels.jpg" },
              { item: content.venues.items[3], img: "/images/nous-trouver-lounges.jpg" },
              { item: content.venues.items[4], img: "/images/nous-trouver-spas.jpg" },
              { item: content.venues.items[5], img: "/images/nous-trouver-workspaces.jpg" },
            ].map(({ item, img }, index) => (
              <div key={index} className="group relative overflow-hidden rounded-[20px] shadow-[0_10px_28px_rgba(0,0,0,0.09)]">
                <div className="relative aspect-[3/4]">
                  <ImageSlot
                    src={img}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    placeholderLabel={item.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/90 font-semibold">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-white/65 font-light hidden md:block">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DISCOVERY SECTION */}
      <section className="relative px-6 md:px-8 py-16 md:py-24 bg-[#fdfbf8] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(54rem_20rem_at_52%_100%,rgba(245,222,166,0.14),transparent_72%),radial-gradient(34rem_16rem_at_16%_18%,rgba(237,125,49,0.09),transparent_74%),radial-gradient(34rem_18rem_at_84%_22%,rgba(213,196,176,0.09),transparent_72%)]" />
        <div className="absolute -right-10 top-10 h-32 w-32 rounded-full border border-white/26 bg-white/16 shadow-[0_18px_36px_rgba(0,0,0,0.07)] backdrop-blur-[10px]" />
        <div className="max-w-4xl mx-auto text-center relative z-10 rounded-[26px] border border-white/40 bg-white/42 px-6 py-8 shadow-[0_20px_48px_rgba(0,0,0,0.07)] backdrop-blur-[12px] md:px-10 md:py-10">
          <h2 className="text-[clamp(28px,3vw,40px)] font-semibold text-black mb-6 tracking-[-0.02em] leading-[1.15]">
            {content.discovery.title}
          </h2>
          <p className="text-lg leading-8 text-black/70 font-light">
            {content.discovery.text}
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="relative px-6 md:px-8 py-16 md:py-24 bg-[#fdfbf8] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(58rem_26rem_at_12%_84%,rgba(250,230,182,0.16),transparent_75%),radial-gradient(40rem_20rem_at_82%_18%,rgba(181,217,102,0.10),transparent_74%),radial-gradient(30rem_16rem_at_52%_8%,rgba(232,168,193,0.09),transparent_70%)]" />
        <div className="absolute -left-12 top-14 h-36 w-36 rounded-full border border-white/30 bg-white/18 shadow-[0_20px_40px_rgba(0,0,0,0.08)] backdrop-blur-[12px]" />
        <div className="max-w-4xl mx-auto text-center relative z-10 rounded-[28px] border border-white/45 bg-white/44 px-6 py-9 shadow-[0_24px_56px_rgba(0,0,0,0.08)] backdrop-blur-[13px] md:px-10 md:py-11">
          <h2 className="text-[clamp(28px,3vw,40px)] font-semibold text-black mb-6 tracking-[-0.02em] leading-[1.15]">
            {content.contact.title}
          </h2>
          <p className="text-xl text-black/70 mb-8 font-light">
            {content.contact.text}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <button 
              onClick={openWhatsApp}
              className="bg-black text-white px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-[0.2em] hover:bg-black/90 transition-all duration-500 shadow-[0_16px_36px_rgba(0,0,0,0.26)] hover:shadow-[0_22px_44px_rgba(0,0,0,0.32)] hover:-translate-y-0.5"
            >
              {content.contact.cta}
            </button>
          </div>
          <p className="text-black/50 font-light">
            {content.contact.email}
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="relative px-6 md:px-8 py-16 md:py-24 bg-[#fdfbf8] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(60rem_24rem_at_84%_14%,rgba(251,233,190,0.12),transparent_74%),radial-gradient(34rem_16rem_at_22%_82%,rgba(237,125,49,0.08),transparent_72%),radial-gradient(32rem_14rem_at_54%_0%,rgba(213,196,176,0.09),transparent_70%)]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-[clamp(28px,3vw,40px)] font-semibold text-black mb-12 text-center tracking-[-0.02em] leading-[1.15]">
            {content.faq.title}
          </h2>
          <div className="space-y-6">
            {content.faq.items.map((item, index) => (
              <div key={index} className="rounded-2xl p-6 border border-white/45 bg-white/62 shadow-[0_14px_30px_rgba(0,0,0,0.08)] backdrop-blur-[10px]">
                <h3 className="text-lg font-light text-black mb-3 tracking-tight">
                  {item.q}
                </h3>
                <p className="text-black/70 leading-7 font-light">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative px-6 md:px-8 py-16 md:py-24 bg-[#fdfbf8] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(58rem_24rem_at_50%_10%,rgba(248,225,170,0.16),transparent_72%),radial-gradient(40rem_16rem_at_16%_88%,rgba(181,217,102,0.09),transparent_72%),radial-gradient(34rem_16rem_at_84%_84%,rgba(232,168,193,0.09),transparent_72%)]" />
        <div className="absolute right-[10%] bottom-8 h-36 w-36 rounded-full border border-white/32 bg-white/18 shadow-[0_20px_40px_rgba(0,0,0,0.08)] backdrop-blur-[12px]" />
        <div className="max-w-4xl mx-auto text-center relative z-10 rounded-[28px] border border-white/45 bg-white/44 px-6 py-9 shadow-[0_24px_56px_rgba(0,0,0,0.08)] backdrop-blur-[13px] md:px-10 md:py-11">
          <h2 className="text-[clamp(28px,3vw,40px)] font-semibold text-black mb-6 tracking-[-0.02em] leading-[1.15]">
            {content.final.title}
          </h2>
          <p className="text-xl text-black/70 mb-8 font-light">
            {content.final.text}
          </p>
          <button className="bg-black text-white px-10 py-4 rounded-full font-semibold text-sm uppercase tracking-[0.2em] hover:bg-black/90 transition-all duration-500 shadow-[0_16px_36px_rgba(0,0,0,0.26)] hover:shadow-[0_22px_44px_rgba(0,0,0,0.32)] hover:-translate-y-0.5">
            {content.final.cta}
          </button>
        </div>
      </section>

      <section className="px-6 md:px-8 pb-8 md:pb-10 bg-[#fdfbf8]">
        <div className="max-w-6xl mx-auto">
          <SiteFooter lang={lang} />
        </div>
      </section>

      {showMap && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/42 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg overflow-hidden rounded-[28px] border border-white/45 bg-white/92 px-6 py-7 text-center shadow-[0_28px_64px_rgba(0,0,0,0.22)] backdrop-blur-[14px] md:px-8 md:py-8">
            <button
              onClick={() => setShowMap(false)}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/80 text-black/48 transition-colors hover:text-black/70"
              aria-label={lang === "fr" ? "Fermer" : "Close"}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-black/5">
              <svg className="h-6 w-6 text-black/65" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>

            <h3 className="text-[clamp(26px,4vw,34px)] font-light tracking-[-0.02em] text-black">
              {content.partners.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-black/70 font-light md:text-base md:leading-8">
              {content.partners.text}
            </p>
          </div>
        </div>
      )}
      </main>
    </>
  );
}