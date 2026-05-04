"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import EmailCapture from "@/app/components/fragrance/EmailCapture";
import EnergyCard from "@/app/components/fragrance/EnergyCard";
import ProgressDots from "@/app/components/fragrance/ProgressDots";
import ResultCard from "@/app/components/fragrance/ResultCard";
import {
  DEFAULT_FRAGRANCE_ID,
  ENERGY_OPTIONS,
  FRAGRANCES,
  MOMENT_OPTIONS,
  NOTE_OPTIONS,
  resolveFragranceRecommendations,
  type EnergyChoiceId,
  type FragranceId,
  type MomentChoiceId,
  type NoteChoiceId,
  type QuizLocale,
} from "../../lib/fragrance/data";

type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const TOTAL_STEPS = 6;

const COPY = {
  fr: {
    introTitle: "Prêt à révéler ton énergie ?",
    introBody: "Trouve le parfum qui s'accorde à ton instant.",
    introMachine: "Teste-le ensuite sur la machine.",
    start: "Commencer",
    stepEnergy: "Quelle énergie veux-tu porter ?",
    stepNotes: "Quelles notes t'attirent le plus ?",
    noteHint: "Choisis 1 ou 2 options maximum",
    stepMoment: "À quel moment veux-tu porter ce parfum ?",
    continue: "Continuer",
    back: "Retour",
    changeProfile: "Ajuster mes réponses",
    confirmTitle: "Tu es dans les premiers à y accéder.",
    confirmBody: "On t'alertera dès que ta fragrance sera disponible.",
    confirmWait: "En attendant, teste-la sur la machine.",
  },
  en: {
    introTitle: "Ready to reveal your energy?",
    introBody: "Find the fragrance that matches your moment.",
    introMachine: "Then try it on the machine.",
    start: "Start",
    stepEnergy: "Which energy do you want to wear?",
    stepNotes: "Which notes attract you most?",
    noteHint: "Pick 1 or 2 options max",
    stepMoment: "When do you want to wear this fragrance?",
    continue: "Continue",
    back: "Back",
    changeProfile: "Adjust my answers",
    confirmTitle: "You'll be among the first to access it.",
    confirmBody: "We'll notify you as soon as your fragrance becomes available.",
    confirmWait: "Meanwhile, try it on the machine.",
  },
} as const;

function getProgressStep(step: Step) {
  if (step <= 1) {
    return 0;
  }
  return Math.min(step - 1, TOTAL_STEPS - 1);
}

export default function FragranceExperience() {
  const [step, setStep] = useState<Step>(0);
  const [locale, setLocale] = useState<QuizLocale>("fr");
  const [selectedEnergyId, setSelectedEnergyId] = useState<EnergyChoiceId | null>(null);
  const [selectedNoteIds, setSelectedNoteIds] = useState<NoteChoiceId[]>([]);
  const [selectedMomentId, setSelectedMomentId] = useState<MomentChoiceId | null>(null);
  const [selectedFragranceId, setSelectedFragranceId] = useState<FragranceId>(DEFAULT_FRAGRANCE_ID);
  const [secondaryFragranceId, setSecondaryFragranceId] = useState<FragranceId>("maracuja-samba");
  const [capturedEmail, setCapturedEmail] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem("now-lang");
    if (saved === "fr" || saved === "en") {
      setLocale(saved);
    }
  }, []);

  const setLanguage = (nextLocale: QuizLocale) => {
    setLocale(nextLocale);
    window.localStorage.setItem("now-lang", nextLocale);
  };

  const text = COPY[locale];
  const selectedFragrance = FRAGRANCES[selectedFragranceId];
  const secondaryFragrance = FRAGRANCES[secondaryFragranceId];

  const energyPreviewId =
    ENERGY_OPTIONS.find((option) => option.id === selectedEnergyId)?.fragranceId ?? DEFAULT_FRAGRANCE_ID;

  const quizPreviewId =
    selectedEnergyId && selectedMomentId && selectedNoteIds.length > 0
      ? resolveFragranceRecommendations({
          energyId: selectedEnergyId,
          noteIds: selectedNoteIds,
          momentId: selectedMomentId,
        }).primaryId
      : energyPreviewId;

  const activeFragrance = FRAGRANCES[step >= 4 ? selectedFragranceId : quizPreviewId];

  const background = useMemo(() => {
    if (step === 0) {
      return {
        base: "#0A0806",
        halo: "rgba(255, 255, 255, 0.08)",
        text: "#F8F3EE",
      };
    }

    return {
      base: activeFragrance.colors.bg,
      halo: `${activeFragrance.colors.primary}26`,
      text: activeFragrance.colors.text,
    };
  }, [activeFragrance, step]);

  return (
    <div
      className="relative isolate min-h-[100dvh] overflow-x-hidden px-6 py-10 pt-16 text-white transition-colors duration-700"
      style={{ color: background.text }}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 transition-all duration-700"
        style={{ backgroundColor: background.base }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-80 transition-all duration-700"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 18%, var(--fragrance-halo) 0%, rgba(0,0,0,0) 70%), radial-gradient(45% 38% at 84% 82%, color-mix(in srgb, var(--fragrance-halo), #000 70%) 0%, rgba(0,0,0,0) 75%)",
          ["--fragrance-halo" as string]: background.halo,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          opacity: 0.03,
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px), repeating-linear-gradient(90deg, rgba(255,255,255,0.42) 0px, rgba(255,255,255,0.42) 1px, transparent 1px, transparent 4px)",
        }}
      />

      <div className="absolute right-6 top-5 z-20 rounded-full border border-white/15 bg-black/20 p-1 backdrop-blur-[2px]">
        <div className="flex items-center gap-1">
          {(["fr", "en"] as QuizLocale[]).map((optionLocale) => {
            const isActive = locale === optionLocale;
            return (
              <button
                key={optionLocale}
                type="button"
                onClick={() => setLanguage(optionLocale)}
                className="min-h-9 rounded-full px-3 text-xs font-medium uppercase tracking-[0.12em] transition-all duration-300"
                style={{
                  backgroundColor: isActive ? "rgba(255,255,255,0.14)" : "transparent",
                  color: isActive ? "#ffffff" : "rgba(255,255,255,0.72)",
                }}
                aria-pressed={isActive}
              >
                {optionLocale}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-md flex-col justify-between gap-8">
        <div className="pt-2">
          <ProgressDots
            step={getProgressStep(step)}
            total={TOTAL_STEPS}
            accentColor={activeFragrance.colors.primary}
          />
        </div>

        <div className="my-auto">
          {step === 0 ? (
            <section className="animate-[sectionFade_0.7s_ease] space-y-8 text-center">
              <div className="space-y-5">
                <div className="mx-auto mb-8 w-[164px] md:mb-10 md:w-[210px]">
                  <Image
                    src="/now-logo-white.jpg"
                    alt="NOW Perfume"
                    width={110}
                    height={42}
                    priority
                    className="h-auto w-full border-none bg-transparent object-contain invert brightness-125 contrast-110 mix-blend-screen"
                  />
                </div>
                <h1 className="font-[var(--font-fragrance-display)] text-[3rem] leading-[0.93] tracking-tight">
                  {text.introTitle}
                </h1>
                <p className="mx-auto max-w-sm text-sm text-white/78">{text.introBody}</p>
                <p className="mx-auto max-w-sm text-xs uppercase tracking-[0.12em] text-white/55">{text.introMachine}</p>
              </div>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="mx-auto block min-h-11 rounded-full border border-white/20 px-8 py-3 text-sm uppercase tracking-[0.12em] text-white transition-all duration-500 hover:border-white/40 hover:bg-white/10"
              >
                {text.start}
              </button>
            </section>
          ) : null}

          {step === 1 ? (
            <section className="animate-[sectionFade_0.7s_ease] space-y-6">
              <h2 className="text-center font-[var(--font-fragrance-display)] text-[2.3rem] leading-[1] tracking-tight">
                {text.stepEnergy}
              </h2>

              <div className="space-y-3">
                {ENERGY_OPTIONS.map((option) => {
                  const optionFragrance = FRAGRANCES[option.fragranceId];
                  return (
                    <EnergyCard
                      key={option.id}
                      label={option.label[locale]}
                      isSelected={selectedEnergyId === option.id}
                      accentColor={optionFragrance.colors.primary}
                      textColor={background.text}
                      onSelect={() => {
                        setSelectedEnergyId(option.id);
                        setStep(2);
                      }}
                    />
                  );
                })}
              </div>
            </section>
          ) : null}

          {step === 2 ? (
            <section className="animate-[sectionFade_0.7s_ease] space-y-6">
              <h2 className="text-center font-[var(--font-fragrance-display)] text-[2.3rem] leading-[1] tracking-tight">
                {text.stepNotes}
              </h2>
              <p className="text-center text-xs uppercase tracking-[0.16em] text-white/62">{text.noteHint}</p>

              <div className="space-y-3">
                {NOTE_OPTIONS.map((option) => {
                  const optionFragrance = FRAGRANCES[option.fragranceId];
                  const isSelected = selectedNoteIds.includes(option.id);
                  return (
                    <EnergyCard
                      key={option.id}
                      label={option.label[locale]}
                      isSelected={isSelected}
                      accentColor={optionFragrance.colors.primary}
                      textColor={background.text}
                      onSelect={() => {
                        setSelectedNoteIds((previous) => {
                          if (previous.includes(option.id)) {
                            return previous.filter((value) => value !== option.id);
                          }
                          if (previous.length >= 2) {
                            return previous;
                          }
                          return [...previous, option.id];
                        });
                      }}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full min-h-11 rounded-full px-5 py-3 text-sm font-medium uppercase tracking-[0.08em] transition-all duration-500 disabled:opacity-40"
                style={{
                  color: activeFragrance.colors.bg,
                  backgroundColor: activeFragrance.colors.primary,
                  boxShadow: `0 12px 32px -18px ${activeFragrance.colors.primary}`,
                }}
                disabled={selectedNoteIds.length === 0}
              >
                {text.continue}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="mx-auto block min-h-11 text-xs uppercase tracking-[0.12em] text-white/70 transition-colors duration-300 hover:text-white"
              >
                {text.back}
              </button>
            </section>
          ) : null}

          {step === 3 ? (
            <section className="animate-[sectionFade_0.7s_ease] space-y-6">
              <h2 className="text-center font-[var(--font-fragrance-display)] text-[2.3rem] leading-[1] tracking-tight">
                {text.stepMoment}
              </h2>

              <div className="space-y-3">
                {MOMENT_OPTIONS.map((option) => (
                  <EnergyCard
                    key={option.id}
                    label={option.label[locale]}
                    isSelected={selectedMomentId === option.id}
                    accentColor={activeFragrance.colors.primary}
                    textColor={background.text}
                    onSelect={() => {
                      if (!selectedEnergyId || selectedNoteIds.length === 0) {
                        return;
                      }
                      setSelectedMomentId(option.id);
                      const match = resolveFragranceRecommendations({
                        energyId: selectedEnergyId,
                        noteIds: selectedNoteIds,
                        momentId: option.id,
                      });
                      setSelectedFragranceId(match.primaryId);
                      setSecondaryFragranceId(match.secondaryId);
                      setStep(4);
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="mx-auto block min-h-11 text-xs uppercase tracking-[0.12em] text-white/70 transition-colors duration-300 hover:text-white"
              >
                {text.back}
              </button>
            </section>
          ) : null}

          {step === 4 ? (
            <div className="animate-[sectionFade_0.7s_ease] space-y-5">
              <ResultCard
                fragrance={selectedFragrance}
                alternativeFragrance={secondaryFragrance}
                locale={locale}
                onContinue={() => setStep(5)}
              />
              <button
                type="button"
                onClick={() => setStep(2)}
                className="mx-auto block min-h-11 text-xs uppercase tracking-[0.12em] text-white/70 transition-colors duration-300 hover:text-white"
              >
                {text.changeProfile}
              </button>
            </div>
          ) : null}

          {step === 5 ? (
            <div className="animate-[sectionFade_0.7s_ease]">
              <EmailCapture
                fragrance={selectedFragrance}
                locale={locale}
                onSuccess={(email) => {
                  setCapturedEmail(email);
                  setStep(6);
                }}
              />
            </div>
          ) : null}

          {step === 6 ? (
            <section className="animate-[sectionFade_0.7s_ease] rounded-3xl border border-white/10 bg-black/20 p-6 text-center backdrop-blur-[2px]">
              <h2 className="font-[var(--font-fragrance-display)] text-[2.2rem] leading-[1.02] tracking-tight">
                {text.confirmTitle}
              </h2>
              <p className="mt-4 text-sm text-white/78">{text.confirmBody}</p>
              <p className="mt-2 text-sm text-white/68">{text.confirmWait}</p>
              <p className="mt-5 text-xs uppercase tracking-[0.08em] text-white/55">{capturedEmail}</p>
            </section>
          ) : null}
        </div>

        <div className="h-6" />
      </div>
    </div>
  );
}
