"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import ImageSlot from "@/app/components/ImageSlot";
import SiteFooter from "@/app/components/SiteFooter";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import dynamic from "next/dynamic";

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

type Lang = "fr" | "en";

const VENUE_IMAGES = [
  "/images/nous-trouver-clubs.jpg",
  "/images/nous-trouver-studios.jpg",
  "/images/nous-trouver-hotels.jpg",
  "/images/nous-trouver-lounges.jpg",
  "/images/nous-trouver-spas.jpg",
  "/images/nous-trouver-workspaces.jpg",
];

const ESTABLISHMENTS = [
  {
    id: "r2-training",
    name: "R2 Training Bastille CrossFit-Hyrox",
    address: "30-34 Rue du Chemin Vert, 75011 Paris",
    type: "salle de sport",
    typeEn: "fitness studio",
    lat: 48.8587,
    lng: 2.3718
  },
  {
    id: "lappart-fitness",
    name: "L'Appart Fitness",
    address: "13 Rue Daval, 75011 Paris",
    type: "salle de sport",
    typeEn: "fitness studio",
    lat: 48.8537,
    lng: 2.3708
  },
  {
    id: "bobo-paris",
    name: "Bobo Paris Bubble Tea",
    address: "11 Bd Montmartre, 75002 Paris",
    type: "bar",
    typeEn: "bar",
    lat: 48.8713,
    lng: 2.3412
  },
  {
    id: "charlotte-club",
    name: "Charlotte Club",
    address: "10 Rue de Lappe, 75011 Paris",
    type: "boîte de nuit",
    typeEn: "nightclub",
    lat: 48.8532,
    lng: 2.3713
  },
  {
    id: "mila-club",
    name: "Mila Club",
    address: "14 Rue de Lappe, 75011 Paris",
    type: "boîte de nuit",
    typeEn: "nightclub",
    lat: 48.8533,
    lng: 2.3717
  },
  {
    id: "vip-room",
    name: "VIP Room",
    address: "All. du Quai de l'Epi, 83990 Saint-Tropez",
    type: "boîte de nuit",
    typeEn: "nightclub",
    lat: 43.2695,
    lng: 6.6386
  },
  {
    id: "neptune-monaco",
    name: "Neptune Monaco Beach",
    address: "Plage du Larvotto, 98000 Monaco",
    type: "beach club",
    typeEn: "beach club",
    lat: 43.7444,
    lng: 7.4356
  }
];

const CONTENT = {
  fr: {
    title: "Nous trouver",
    subtitle: "Découvrez NOW Perfume dans des lieux sélectionnés — clubs, studios de sport, hôtels, lounges, spas, espaces de travail, etc.",
    supporting: "clubs, studios de sport, hôtels, lounges, spas, espaces de travail, etc.",
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
    title: "Find us",
    subtitle: "Discover NOW Perfume in selected locations — clubs, fitness studios, hotels, lounges, spas, workspaces, etc.",
    supporting: "clubs, fitness studios, hotels, lounges, spas, workspaces, etc.",
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
  const [lang, setLang] = useState<Lang>("fr");
  const [showMap, setShowMap] = useState(false);
  const [selectedEstablishment, setSelectedEstablishment] = useState<typeof ESTABLISHMENTS[0] | null>(null);
  const content = CONTENT[lang];

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
    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl:
          'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    });
  }, []);

  useEffect(() => {
    if (showMap && !selectedEstablishment) {
      setSelectedEstablishment(ESTABLISHMENTS[0]);
    }
  }, [showMap, selectedEstablishment]);

  const openWhatsApp = () => {
    // NOW Perfume professional WhatsApp number
    const phoneNumber = "33699335094";
    const message = lang === "fr" 
      ? "Bonjour, je suis intéressé par un partenariat avec NOW Perfume."
      : "Hello, I'm interested in a partnership with NOW Perfume.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const openInMaps = (establishment: typeof ESTABLISHMENTS[0]) => {
    const query = encodeURIComponent(`${establishment.name}, ${establishment.address}`);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <>
      <main className="min-h-screen bg-[#fdfbf8] text-black">
        {/* Header - Always visible */}
        <Header lang={lang} solid={true} />
        <LanguageSwitcher lang={lang} setLang={setLang} />

        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center justify-center px-6 md:px-8 py-20 md:py-32 bg-white overflow-hidden">
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
              Nous trouver
            </h1>
            <p className="mx-auto max-w-5xl text-[11px] md:text-xs uppercase tracking-[0.34em] text-black/62 font-light leading-relaxed">
              CLUBS, STUDIOS DE SPORT, HÔTELS, LOUNGES, SPAS, ESPACES DE TRAVAIL
            </p>
            <p className="mx-auto mt-3 max-w-[820px] text-lg md:text-2xl text-black/76 font-light leading-[1.55]">
              Découvrez NOW Perfume dans des lieux qui transforment l'instant.
            </p>
            <p className="mt-2.5 text-sm md:text-[15px] text-black/56 font-light tracking-[0.02em]">
              Une expérience olfactive à vivre sur place.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowMap(true)}
                className="bg-black text-white px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-[0.2em] hover:bg-black/90 transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Voir les lieux
              </button>
              <button 
                onClick={openWhatsApp}
                className="border border-black/20 text-black px-8 py-4 rounded-full font-semibold text-sm uppercase tracking-[0.2em] hover:bg-black/5 transition-all duration-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Devenir partenaire
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
        <div className="absolute -right-16 top-20 h-40 w-40 rounded-full border border-white/28 bg-white/16 shadow-[0_22px_50px_rgba(0,0,0,0.08)] backdrop-blur-[13px]" />
        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-[clamp(28px,3vw,40px)] font-semibold text-black mb-12 text-center tracking-[-0.02em] leading-[1.15]">
            {content.venues.title}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {content.venues.items.slice(0, 6).map((venue, index) => (
              <div key={index} className="overflow-hidden rounded-[28px] border border-white/50 bg-white/70 shadow-[0_16px_36px_rgba(0,0,0,0.09)] backdrop-blur-[10px] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_24px_44px_rgba(0,0,0,0.12)]">
                <div className="relative h-56 overflow-hidden">
                  <ImageSlot
                    src={VENUE_IMAGES[index]}
                    alt={venue.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    placeholderLabel="Image a ajouter"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-light text-black mb-3 tracking-tight">
                    {venue.name}
                  </h3>
                  <p className="text-black/70 font-light">
                    {venue.desc}
                  </p>
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

      {/* MAP MODAL */}
      {showMap && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-7xl h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex">
            {/* Modal Header */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-6 bg-white/95 backdrop-blur border-b border-black/10">
              <h3 className="text-2xl font-light text-black tracking-tight">
                {lang === "fr" ? "Nos établissements partenaires" : "Our partner establishments"}
              </h3>
              <button
                onClick={() => {
                  setShowMap(false);
                  setSelectedEstablishment(null);
                }}
                className="text-black/40 hover:text-black/60 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Map Container - Left Side */}
            <div className="flex-1 relative">
              <div className="h-full pt-20">
                <MapContainer
                  center={[46.603354, 1.888334]} // Center of France
                  zoom={6}
                  style={{ height: '100%', width: '100%' }}
                  className="rounded-l-2xl"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {ESTABLISHMENTS.map((establishment) => (
                    <Marker
                      key={establishment.id}
                      position={[establishment.lat, establishment.lng]}
                      eventHandlers={{
                        click: () => setSelectedEstablishment(establishment),
                      }}
                    >
                      <Popup>
                        <div className="text-center">
                          <h4 className="font-light text-black">{establishment.name}</h4>
                          <p className="text-sm text-black/70 mb-2 font-light">{establishment.address}</p>
                          <span className="inline-block px-2 py-1 bg-black/5 text-black/70 text-xs rounded-full font-light">
                            {lang === "fr" ? establishment.type : establishment.typeEn}
                          </span>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            {/* Sidebar - Right Side */}
            <div className="w-80 bg-white border-l border-black/10 flex flex-col">
              {/* Sidebar Header */}
              <div className="p-6 border-b border-black/10 bg-white">
                <h4 className="text-lg font-light text-black tracking-tight">
                  {lang === "fr" ? "Détails de l'établissement" : "Establishment details"}
                </h4>
              </div>

              {/* Establishment Details */}
              <div className="flex-1 p-6 overflow-y-auto">
                {selectedEstablishment ? (
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-xl font-light text-black mb-2 tracking-tight">
                        {selectedEstablishment.name}
                      </h5>
                      <p className="text-black/70 mb-3 font-light">
                        {selectedEstablishment.address}
                      </p>
                      <span className="inline-block px-3 py-1 bg-black text-white text-sm rounded-full font-semibold">
                        {lang === "fr" ? selectedEstablishment.type : selectedEstablishment.typeEn}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => openInMaps(selectedEstablishment)}
                        className="w-full bg-black text-white px-4 py-3 rounded-lg font-semibold text-sm hover:bg-black/90 transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {lang === "fr" ? "Voir sur Google Maps" : "View on Google Maps"}
                      </button>

                      <button
                        onClick={openWhatsApp}
                        className="w-full border border-black/20 text-black px-4 py-3 rounded-lg font-semibold text-sm hover:bg-black/5 transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                        {lang === "fr" ? "Contacter pour partenariat" : "Contact for partnership"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-black/50 py-12">
                    <svg className="w-12 h-12 mx-auto mb-4 text-black/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm font-light">
                      {lang === "fr" ? "Cliquez sur un marqueur pour voir les détails" : "Click on a marker to see details"}
                    </p>
                  </div>
                )}
              </div>

              {/* Establishment List */}
              <div className="border-t border-black/10 p-4 bg-white">
                <h5 className="text-sm font-light text-black mb-3 tracking-tight">
                  {lang === "fr" ? "Tous les établissements" : "All establishments"}
                </h5>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {ESTABLISHMENTS.map((establishment) => (
                    <button
                      key={establishment.id}
                      onClick={() => setSelectedEstablishment(establishment)}
                      className={`w-full text-left p-2 rounded-lg transition-colors ${
                        selectedEstablishment?.id === establishment.id
                          ? 'bg-black text-white'
                          : 'hover:bg-black/5 text-black/70'
                      }`}
                    >
                      <div className="text-sm font-light truncate">{establishment.name}</div>
                      <div className="text-xs opacity-75 truncate font-light">
                        {lang === "fr" ? establishment.type : establishment.typeEn}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="px-6 md:px-8 pb-8 md:pb-10 bg-[#fdfbf8]">
        <div className="max-w-6xl mx-auto">
          <SiteFooter lang={lang} />
        </div>
      </section>
      </main>
    </>
  );
}