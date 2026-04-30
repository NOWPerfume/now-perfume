"use client";

import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import SiteFooter from "@/app/components/SiteFooter";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

type Lang = "fr" | "en";

export default function MentionsLegalesPage() {
  const [lang, setLang] = useState<Lang>("fr");

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
            Mentions légales
          </h1>

          <div className="space-y-10 text-black/80 font-light leading-8">
            <div>
              <h2 className="text-xl md:text-2xl text-black mb-4 tracking-tight">Éditeur du site</h2>
              <p>Le présent site est édité par la société NOW Perfume,</p>
              <p>SAS au capital de 10 000 €</p>
              <p>Immatriculée au Registre National des Entreprises sous le numéro 987 952 363</p>
              <p>Siège social : 6 rue de Jarente, 75004 Paris, France</p>
              <p>Directeur de la publication : Shoham Doriel, en qualité de Président.</p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl text-black mb-4 tracking-tight">Hébergement</h2>
              <p>Le site est hébergé par :</p>
              <p>OVH</p>
              <p>
                OVH SAS est une filiale de la société OVH Groupe SA, société immatriculée au RCS de Lille sous le numéro
                537 407 926, situé au 2, rue Kellermann, 59100 Roubaix
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl text-black mb-4 tracking-tight">Propriété intellectuelle</h2>
              <p>
                L’ensemble des contenus présents sur ce site (textes, images, graphismes, logos, vidéos, etc.) est la
                propriété exclusive de NOW Perfume ou de ses partenaires, et est protégé par les lois françaises et
                internationales relatives à la propriété intellectuelle.
              </p>
              <p>
                Toute reproduction, représentation, modification ou exploitation totale ou partielle de ces contenus,
                sans autorisation écrite préalable, est strictement interdite.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl text-black mb-4 tracking-tight">Responsabilité</h2>
              <p>
                NOW Perfume s’efforce d’assurer au mieux l’exactitude et la mise à jour des informations diffusées sur
                son site. Toutefois, l’entreprise ne saurait être tenue pour responsable d’éventuelles erreurs,
                omissions ou de l’indisponibilité des informations ou services.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl text-black mb-4 tracking-tight">Données personnelles</h2>
              <p>
                Les données collectées via le site (formulaires, cookies, etc.) sont traitées dans le respect de la
                réglementation en vigueur.
              </p>
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
