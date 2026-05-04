"use client";

import Link from "next/link";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { PERFUMES } from "@/data/perfumes";
import PerfumeMegaMenu from "./PerfumeMegaMenu";
import ImageSlot from "./ImageSlot";
import { useEffect, useMemo, useRef, useState } from "react";

type HeaderProps = {
  lang: "fr" | "en";
  solid: boolean;
};

export default function Header({ lang, solid }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const perfumes = PERFUMES[lang];

  const ui =
    lang === "fr"
      ? {
          searchTitle: "Rechercher",
          searchPlaceholder: "Rechercher un parfum, une énergie...",
          noResults: "Aucun résultat",
          suggestions: "Suggestions",
          quickLinks: "Accès rapides",
          close: "Fermer",
          perfumes: "Parfums",
        }
      : {
          searchTitle: "Search",
          searchPlaceholder: "Search perfume, mood...",
          noResults: "No results",
          suggestions: "Suggestions",
          quickLinks: "Quick links",
          close: "Close",
          perfumes: "Perfumes",
        };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredPerfumes = useMemo(() => {
    if (!normalizedQuery) return perfumes;

    return perfumes.filter((perfume) => {
      const haystack = [perfume.name, perfume.sprayMood, perfume.claim].join(" ").toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery, perfumes]);

  useEffect(() => {
    if (!searchOpen) return;
    searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [searchOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-50 w-full relative transition-all duration-700 ${
          solid
            ? "bg-white text-black shadow-sm opacity-100 pointer-events-auto"
            : "bg-transparent text-black opacity-100 pointer-events-auto"
        }`}
      >
        <div className="relative flex w-full items-center justify-between px-5 py-4 md:px-16 md:py-5">
          {/* LOGO GAUCHE */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-transparent border-none">
              <ImageSlot
                src="/images/logo-now.png"
                alt="NOW Perfume"
                width={120}
                height={60}
                priority
                className="h-auto w-[104px] md:w-[130px] object-contain bg-transparent border-none"
                placeholderLabel="Logo a ajouter"
              />
            </div>
          </Link>

          {/* LIENS PRINCIPAUX */}
          <nav className="hidden items-center gap-8 uppercase tracking-[0.18em] text-[11px] md:flex md:text-sm font-medium">
            {/* Perfumes with Mega Menu */}
            <div className="group">
              <Link href="/parfums" className="transition hover:opacity-60 py-2">
                {lang === "fr" ? "Parfums" : "Perfumes"}
              </Link>
              <PerfumeMegaMenu perfumes={perfumes} lang={lang} />
            </div>

            <Link href="/nous-trouver" className="transition hover:opacity-60">
              {lang === "fr" ? "Nous trouver" : "Find us"}
            </Link>

            <Link href="/la-marque" className="transition hover:opacity-60">
              {lang === "fr" ? "La marque" : "The Brand"}
            </Link>
          </nav>

          {/* ICONES DROITE */}
          <div className="flex items-center gap-4 md:gap-8">
            <button
              aria-label={lang === "fr" ? "Recherche" : "Search"}
              onClick={() => {
                setSearchOpen(true);
                setMobileMenuOpen(false);
              }}
              className="hidden transition hover:opacity-60 md:block"
            >
              <Search size={20} strokeWidth={1.8} />
            </button>

            <button
              aria-label={lang === "fr" ? "Panier" : "Cart"}
              className="transition hover:opacity-60"
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden transition hover:opacity-60"
              aria-label={lang === "fr" ? "Menu" : "Menu"}
            >
              <Menu size={20} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="fixed inset-0 z-[70] bg-black/35 backdrop-blur-[2px]" onClick={() => setSearchOpen(false)}>
          <div
            className="mx-auto mt-20 w-[min(92vw,820px)] rounded-[24px] border border-black/10 bg-[#fcfbf8] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.18)] md:mt-24 md:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-[0.2em] text-black/55">{ui.searchTitle}</h2>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-xs uppercase tracking-[0.16em] text-black/55 transition hover:text-black"
              >
                {ui.close}
              </button>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-black/12 bg-white/80 px-4 py-3">
              <Search size={18} strokeWidth={1.8} className="text-black/45" />
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={ui.searchPlaceholder}
                className="w-full bg-transparent text-[15px] text-black outline-none placeholder:text-black/35"
              />
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
              <div>
                <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-black/45">{ui.perfumes}</p>
                <div className="max-h-[46vh] space-y-2 overflow-y-auto pr-1">
                  {filteredPerfumes.length > 0 ? (
                    filteredPerfumes.map((perfume) => (
                      <Link
                        key={perfume.id}
                        href={`/parfums/${perfume.id}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="block rounded-xl border border-transparent px-3 py-3 transition hover:border-black/10 hover:bg-white"
                      >
                        <p className="text-sm font-medium text-black">{perfume.name}</p>
                        <p className="mt-1 text-xs text-black/55">{perfume.sprayMood}</p>
                      </Link>
                    ))
                  ) : (
                    <p className="rounded-xl border border-black/8 bg-white/70 px-3 py-3 text-sm text-black/50">
                      {ui.noResults}
                    </p>
                  )}
                </div>
              </div>

              <div className="min-w-[190px]">
                <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-black/45">{ui.quickLinks}</p>
                <div className="space-y-2">
                  <Link
                    href="/parfums"
                    onClick={() => setSearchOpen(false)}
                    className="block rounded-xl bg-white/75 px-3 py-2 text-sm text-black transition hover:bg-white"
                  >
                    {lang === "fr" ? "Tous les parfums" : "All perfumes"}
                  </Link>
                  <Link
                    href="/la-marque"
                    onClick={() => setSearchOpen(false)}
                    className="block rounded-xl bg-white/75 px-3 py-2 text-sm text-black transition hover:bg-white"
                  >
                    {lang === "fr" ? "La marque" : "The Brand"}
                  </Link>
                  <Link
                    href="/nous-trouver"
                    onClick={() => setSearchOpen(false)}
                    className="block rounded-xl bg-white/75 px-3 py-2 text-sm text-black transition hover:bg-white"
                  >
                    {lang === "fr" ? "Nous trouver" : "Find us"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Mega Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-0 left-0 z-40 h-screen w-full overflow-y-auto bg-[#f7f5f2]/95 backdrop-blur-md shadow-xl md:hidden">
          <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
            <span className="text-sm font-semibold uppercase tracking-[0.24em] text-black">
              {lang === "fr" ? "Menu" : "Menu"}
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold uppercase tracking-[0.24em] text-black/65 transition hover:text-black"
            >
              {lang === "fr" ? "Fermer" : "Close"}
            </button>
          </div>
          <div className="px-6 py-10">
            <div className="flex flex-col gap-5 text-base font-medium uppercase tracking-[0.16em] text-black">
              <Link href="/parfums" onClick={() => setMobileMenuOpen(false)} className="transition hover:opacity-60">
                {lang === "fr" ? "Parfums" : "Perfumes"}
              </Link>
              <Link href="/nous-trouver" onClick={() => setMobileMenuOpen(false)} className="transition hover:opacity-60">
                {lang === "fr" ? "Nous trouver" : "Find us"}
              </Link>
              <Link href="/la-marque" onClick={() => setMobileMenuOpen(false)} className="transition hover:opacity-60">
                {lang === "fr" ? "La marque" : "The Brand"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}