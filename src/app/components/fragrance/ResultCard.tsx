import type { FragranceProfile, QuizLocale } from "../../../lib/fragrance/data";

type ResultCardProps = {
  fragrance: FragranceProfile;
  alternativeFragrance: FragranceProfile;
  locale: QuizLocale;
  onContinue: () => void;
};

export default function ResultCard({
  fragrance,
  alternativeFragrance,
  locale,
  onContinue,
}: ResultCardProps) {
  const families = fragrance.olfactiveFamily[locale].split("/").map((item: string) => item.trim());
  const copy =
    locale === "fr"
      ? {
          titleMain: "Ta signature",
        titleAlt: "Tu pourrais aussi aimer",
          claim: "Claim",
          energy: "Énergie",
          family: "Famille olfactive",
        ingredients: "Ingrédients clés",
          notes: "Notes principales",
        reason: "Ce choix correspond à ton énergie et aux notes que tu recherches.",
        machineCta: "Teste-le sur la machine",
        digitalCta: "Accéder à l'avant-première",
        }
      : {
        titleMain: "Your signature",
        titleAlt: "You may also like",
          claim: "Claim",
          energy: "Energy",
          family: "Olfactive family",
        ingredients: "Key ingredients",
          notes: "Key notes",
        reason: "This match reflects your energy and the notes you’re drawn to.",
          machineCta: "Try it now on the machine",
          digitalCta: "Get early access",
        };

  return (
    <section className="w-full space-y-6 rounded-3xl border border-white/10 bg-black/15 p-6 backdrop-blur-[2px]">
      <div className="space-y-3">
        <p className="font-sans text-xs uppercase tracking-[0.24em] text-white/65">{copy.titleMain}</p>
        <h2 className="font-[var(--font-fragrance-display)] text-5xl leading-[0.92] tracking-tight sm:text-6xl">
          {fragrance.name}
        </h2>
      </div>

      <div className="space-y-5 text-[0.95rem] text-white/85">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/55">{copy.claim}</p>
          <p className="font-[var(--font-fragrance-display)] text-[1.08rem] italic tracking-[0.02em] text-white/88">
            {fragrance.signature[locale]}
          </p>
        </div>

        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/55">{copy.energy}</p>
          <p>{fragrance.energyPillars[locale]}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="basis-full text-xs uppercase tracking-[0.2em] text-white/55">{copy.family}</span>
          {families.map((family: string) => (
            <span
              key={family}
              className="rounded-full border px-3 py-1 text-xs tracking-[0.1em]"
              style={{ borderColor: `${fragrance.colors.primary}66`, color: fragrance.colors.text }}
            >
              {family}
            </span>
          ))}
        </div>

        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/55">{copy.ingredients}</p>
          <p className="font-[var(--font-fragrance-display)] text-[1.04rem] tracking-[0.03em] text-white/90">
            {fragrance.keyIngredients[locale]}
          </p>
        </div>

        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.2em] text-white/55">{copy.notes}</p>
          <p className="font-[var(--font-fragrance-display)] text-[1.04rem] tracking-[0.04em] text-white/90">
            {fragrance.notes[locale]}
          </p>
        </div>

        <p className="font-[var(--font-fragrance-display)] text-xl text-white/95">{fragrance.phrase[locale]}</p>
        <p className="text-sm text-white/72">{copy.reason}</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
        <p className="text-xs uppercase tracking-[0.2em] text-white/55">{copy.titleAlt}</p>
        <p className="mt-2 font-[var(--font-fragrance-display)] text-2xl text-white/92">{alternativeFragrance.name}</p>
        <p className="mt-1 text-sm text-white/75">{alternativeFragrance.signature[locale]}</p>
      </div>

      <div className="space-y-3">
        <div className="w-full min-h-11 rounded-full border border-white/20 px-5 py-3 text-center text-sm font-medium uppercase tracking-[0.08em] text-white/88">
          {copy.machineCta}
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="w-full min-h-11 rounded-full px-5 py-3 text-sm font-medium uppercase tracking-[0.08em] transition-all duration-500"
          style={{
            color: fragrance.colors.bg,
            backgroundColor: fragrance.colors.primary,
            boxShadow: `0 12px 32px -18px ${fragrance.colors.primary}`,
          }}
        >
          {copy.digitalCta}
        </button>
      </div>
    </section>
  );
}
