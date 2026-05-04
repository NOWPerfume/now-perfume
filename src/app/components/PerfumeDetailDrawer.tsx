"use client";

import { Perfume, COPY } from "@/data/perfumes";
import { X } from "lucide-react";
import ImageSlot from "./ImageSlot";
import { useState } from "react";

type PerfumeDetailDrawerProps = {
  perfume: Perfume | null;
  isOpen: boolean;
  onClose: () => void;
  lang: "fr" | "en";
};

export default function PerfumeDetailDrawer({
  perfume,
  isOpen,
  onClose,
  lang,
}: PerfumeDetailDrawerProps) {
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(
    null
  );
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [comingSoonEmail, setComingSoonEmail] = useState("");
  const txt = lang === "fr" ? COPY.fr : COPY.en;
  const handleComingSoonClick = () => {
    setComingSoonOpen(true);
  };

  if (!perfume || !isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-50 overflow-y-auto transition-all duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-end min-h-full justify-end">
          <div className="relative w-full max-w-md md:max-w-lg bg-white shadow-2xl rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none animate-in slide-in-from-right duration-300">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Bottle visual */}
              <div
                className={`relative h-48 w-32 mx-auto overflow-hidden rounded-lg bg-gradient-to-br ${perfume.colors.bg} shadow-lg flex items-center justify-center mb-8`}
              >
                <ImageSlot
                  src={perfume.bottleImage}
                  alt={`${perfume.name} bottle`}
                  fill
                  sizes="128px"
                  className="object-contain p-2"
                  placeholderLabel="Image a ajouter"
                />
              </div>

              {/* Perfume name and format */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  {perfume.name}
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  {perfume.format}
                </p>
              </div>

              {/* Spray Mood */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-xs uppercase tracking-widest text-slate-600 font-semibold">
                  Energy
                </p>
                <p className="mt-2 text-base font-medium text-slate-900">
                  {perfume.sprayMood}
                </p>
              </div>

              {/* Claim */}
              <div className="mt-6">
                <p className="text-lg font-bold text-slate-900">
                  {perfume.claim}
                </p>
              </div>

              {/* Description */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">
                  {perfume.description}
                </p>
              </div>

              {/* Inspiration */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-xs uppercase tracking-widest text-slate-600 font-semibold">
                  {txt.inspiration}
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  {perfume.inspiration}
                </p>
              </div>

              {/* Key Notes */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-xs uppercase tracking-widest text-slate-600 font-semibold">
                  {txt.notesLabel}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {perfume.keyNotes.map((note) => (
                    <article
                      key={note.label}
                      className="group rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="relative mx-auto h-14 w-14 overflow-hidden rounded-full border border-slate-100 shadow-[0_6px_14px_rgba(15,23,42,0.16)]">
                        <ImageSlot
                          src={note.image}
                          alt={note.label}
                          fill
                          sizes="56px"
                          className="object-cover transition duration-500 group-hover:scale-110"
                          placeholderLabel="Image a ajouter"
                        />
                      </div>
                      <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700">
                        {note.label}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              {/* Olfactive Pyramid */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="text-xs uppercase tracking-widest text-slate-600 font-semibold">
                  {txt.pyramidLabel}
                </p>
                <div className="mt-4 space-y-3">
                  {perfume.olfactivePyramid.map((level: { title: string; notes: string[] }) => (
                    <div key={level.title} className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                        {level.title}
                      </p>
                      <p className="mt-2 text-sm text-slate-700">
                        {level.notes.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legal Ingredients Accordion */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <button
                  onClick={() =>
                    setExpandedAccordion(
                      expandedAccordion === "ingredients"
                        ? null
                        : "ingredients"
                    )
                  }
                  className="w-full flex items-center justify-between text-left"
                >
                  <p className="text-xs uppercase tracking-widest text-slate-600 font-semibold">
                    {txt.ingredientsLabel}
                  </p>
                  <span className="text-slate-400">
                    {expandedAccordion === "ingredients" ? "−" : "+"}
                  </span>
                </button>
                {expandedAccordion === "ingredients" && (
                  <div className="mt-3 text-sm text-slate-600 max-h-40 overflow-y-auto">
                    {perfume.ingredients.join(", ")}
                  </div>
                )}
              </div>

              {/* Legal Info Accordion */}
              <div className="mt-4">
                <button
                  onClick={() =>
                    setExpandedAccordion(
                      expandedAccordion === "legal" ? null : "legal"
                    )
                  }
                  className="w-full flex items-center justify-between text-left"
                >
                  <p className="text-xs uppercase tracking-widest text-slate-600 font-semibold">
                    {txt.legalInfo}
                  </p>
                  <span className="text-slate-400">
                    {expandedAccordion === "legal" ? "−" : "+"}
                  </span>
                </button>
                {expandedAccordion === "legal" && (
                  <div className="mt-3 space-y-1 text-sm text-slate-600">
                    {perfume.legal.map((item: string) => (
                      <p key={item}>• {item}</p>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <button onClick={handleComingSoonClick} className="block w-full mt-8 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors text-center">
                {txt.addToCart}
              </button>

              {/* Close button bottom */}
              <button
                onClick={onClose}
                className="w-full mt-3 py-3 border border-slate-300 text-slate-900 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
              >
                {txt.close}
              </button>
            </div>
          </div>
        </div>
      </div>

      {comingSoonOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 p-4"
          onClick={() => setComingSoonOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-black/45">
              {lang === "fr" ? "Disponible prochainement" : "Coming soon"}
            </p>
            <h3 className="mt-2 text-xl font-light text-black">
              {lang === "fr" ? "Disponible prochainement" : "Coming soon"}
            </h3>
            <p className="mt-2 text-sm text-black/70">
              {lang === "fr"
                ? "Les parfums NOW Perfume arrivent bientôt. Inscris-toi pour être informé en avant-première."
                : "NOW Perfume fragrances are launching soon. Sign up to be notified first."}
            </p>
            <form
              className="mt-4"
              onSubmit={(event) => {
                event.preventDefault();
                setComingSoonOpen(false);
                setComingSoonEmail("");
              }}
            >
              <input
                type="email"
                value={comingSoonEmail}
                onChange={(event) => setComingSoonEmail(event.target.value)}
                required
                placeholder={lang === "fr" ? "Votre e-mail" : "Your email"}
                className="w-full rounded-full border border-black/15 px-4 py-3 text-sm text-black outline-none focus:border-black/35"
              />
              <button
                type="submit"
                className="mt-3 w-full rounded-full bg-black px-4 py-3 text-sm uppercase tracking-[0.14em] text-white transition hover:bg-black/85"
              >
                {lang === "fr" ? "Accéder en avant-première" : "Get early access"}
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
