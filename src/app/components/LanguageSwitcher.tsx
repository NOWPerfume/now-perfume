"use client";

import { useEffect, useRef, useState } from "react";

type Lang = "fr" | "en";

type LanguageSwitcherProps = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  mounted?: boolean;
};

export default function LanguageSwitcher({ lang, setLang }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  const pickLang = (nextLang: Lang) => {
    setLang(nextLang);
    setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className="fixed right-4 z-30 text-xs top-[max(5rem,env(safe-area-inset-top))] md:top-auto md:right-auto md:bottom-6 md:left-6"
    >
      {open ? (
        <div className="mb-2 min-w-[78px] overflow-hidden rounded-2xl border border-black/10 bg-white/95 p-1 shadow-lg backdrop-blur">
          <button
            onClick={() => pickLang("fr")}
            className={`block w-full rounded-xl px-3 py-1.5 text-left font-light uppercase tracking-[0.12em] transition-colors ${
              lang === "fr" ? "bg-black/6 text-black" : "text-black/55 hover:bg-black/5 hover:text-black/80"
            }`}
          >
            FR
          </button>
          <button
            onClick={() => pickLang("en")}
            className={`mt-1 block w-full rounded-xl px-3 py-1.5 text-left font-light uppercase tracking-[0.12em] transition-colors ${
              lang === "en" ? "bg-black/6 text-black" : "text-black/55 hover:bg-black/5 hover:text-black/80"
            }`}
          >
            EN
          </button>
        </div>
      ) : null}

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-4 py-2 font-light uppercase tracking-[0.14em] text-black shadow-lg backdrop-blur transition hover:bg-white"
        aria-expanded={open}
        aria-label="Language selector"
      >
        {lang === "fr" ? "FR" : "EN"}
        <span className={`text-[10px] text-black/55 transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
    </div>
  );
}