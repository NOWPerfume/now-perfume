"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import SiteFooter from "@/app/components/SiteFooter";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

type Lang = "fr" | "en";

const CONTENT = {
  fr: {
    pageTitle: "Mentions légales",
    sections: {
      editor: "Éditeur du site",
      hosting: "Hébergement",
      ip: "Propriété intellectuelle",
      liability: "Responsabilité",
      privacy: "Données personnelles",
    },
    editorLines: [
      "Le présent site est édité par la société NOW Perfume,",
      "SAS au capital de 10 000 €",
      "Immatriculée au Registre National des Entreprises sous le numéro 987 952 363",
      "Siège social : 6 rue de Jarente, 75004 Paris, France",
      "Directeur de la publication : Shoham Doriel, en qualité de Président.",
    ],
    hostingIntro: "Le site est hébergé par :",
    hostingProvider: "OVH",
    hostingBody:
      "OVH SAS est une filiale de la société OVH Groupe SA, société immatriculée au RCS de Lille sous le numéro 537 407 926, situé au 2, rue Kellermann, 59100 Roubaix",
    ipBody1:
      "L’ensemble des contenus présents sur ce site (textes, images, graphismes, logos, vidéos, etc.) est la propriété exclusive de NOW Perfume ou de ses partenaires, et est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.",
    ipBody2:
      "Toute reproduction, représentation, modification ou exploitation totale ou partielle de ces contenus, sans autorisation écrite préalable, est strictement interdite.",
    liabilityBody:
      "NOW Perfume s’efforce d’assurer au mieux l’exactitude et la mise à jour des informations diffusées sur son site. Toutefois, l’entreprise ne saurait être tenue pour responsable d’éventuelles erreurs, omissions ou de l’indisponibilité des informations ou services.",
    privacyBody:
      "Les données collectées via le site (formulaires, cookies, etc.) sont traitées dans le respect de la réglementation en vigueur.",
  },
  en: {
    pageTitle: "Legal Notice",
    sections: {
      editor: "Website Publisher",
      hosting: "Hosting",
      ip: "Intellectual Property",
      liability: "Liability",
      privacy: "Personal Data",
    },
    editorLines: [
      "This website is published by NOW Perfume,",
      "SAS with share capital of €10,000",
      "Registered in the French National Business Register under number 987 952 363",
      "Registered office: 6 rue de Jarente, 75004 Paris, France",
      "Publication director: Shoham Doriel, acting as President.",
    ],
    hostingIntro: "This website is hosted by:",
    hostingProvider: "OVH",
    hostingBody:
      "OVH SAS is a subsidiary of OVH Groupe SA, registered with the Lille Trade and Companies Register under number 537 407 926, located at 2, rue Kellermann, 59100 Roubaix, France.",
    ipBody1:
      "All content on this website (texts, images, graphics, logos, videos, etc.) is the exclusive property of NOW Perfume or its partners and is protected by French and international intellectual property laws.",
    ipBody2:
      "Any reproduction, representation, modification, or total/partial use of this content without prior written authorization is strictly prohibited.",
    liabilityBody:
      "NOW Perfume makes every effort to ensure the accuracy and updating of the information published on this website. However, the company cannot be held liable for any errors, omissions, or unavailability of information or services.",
    privacyBody:
      "Data collected through this website (forms, cookies, etc.) is processed in compliance with applicable regulations.",
  },
} as const;

export default function MentionsLegalesPage() {
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
    <main className="min-h-screen bg-white text-black">
      <Header lang={lang} solid={true} />
      <LanguageSwitcher lang={lang} setLang={setLang} />

      <section className="px-6 md:px-8 pt-32 md:pt-36 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-light tracking-tight mb-10">
            {t.pageTitle}
          </h1>

          <div className="space-y-10 text-black/80 font-light leading-8">
            <div>
              <h2 className="text-xl md:text-2xl text-black mb-4 tracking-tight">{t.sections.editor}</h2>
              {t.editorLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>

            <div>
              <h2 className="text-xl md:text-2xl text-black mb-4 tracking-tight">{t.sections.hosting}</h2>
              <p>{t.hostingIntro}</p>
              <p>{t.hostingProvider}</p>
              <p>{t.hostingBody}</p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl text-black mb-4 tracking-tight">{t.sections.ip}</h2>
              <p>{t.ipBody1}</p>
              <p>{t.ipBody2}</p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl text-black mb-4 tracking-tight">{t.sections.liability}</h2>
              <p>{t.liabilityBody}</p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl text-black mb-4 tracking-tight">{t.sections.privacy}</h2>
              <p>{t.privacyBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-8 pb-8 md:pb-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <SiteFooter lang={lang} />
        </div>
      </section>
    </main>
  );
}
