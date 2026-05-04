export type FragranceId =
  | "ginger-aphrodisiac"
  | "maracuja-samba"
  | "matcha-star"
  | "vanilla-chill"
  | "rosa-boom";

export type QuizLocale = "fr" | "en";

export type EnergyChoiceId =
  | "intense-vibrant"
  | "solar-luminous"
  | "calm-balanced"
  | "soft-enveloping"
  | "sensual-elegant";

export type NoteChoiceId = "spicy" | "fruity" | "green-woody" | "gourmand" | "floral";

export type MomentChoiceId = "soiree" | "sport" | "quotidien" | "detente";

type LocalizedCopy = Record<QuizLocale, string>;

export type FragranceProfile = {
  id: FragranceId;
  name: string;
  signature: LocalizedCopy;
  energyPillars: LocalizedCopy;
  olfactiveFamily: LocalizedCopy;
  keyIngredients: LocalizedCopy;
  notes: LocalizedCopy;
  phrase: LocalizedCopy;
  colors: {
    primary: string;
    soft?: string;
    deep: string;
    bg: string;
    text: string;
    accent: string;
  };
};

export type EnergyOption = {
  id: EnergyChoiceId;
  fragranceId: FragranceId;
  label: LocalizedCopy;
};

export type NoteOption = {
  id: NoteChoiceId;
  fragranceId: FragranceId;
  label: LocalizedCopy;
};

export type MomentOption = {
  id: MomentChoiceId;
  boostFragrances: FragranceId[];
  label: LocalizedCopy;
};

export const FRAGRANCES: Record<FragranceId, FragranceProfile> = {
  "ginger-aphrodisiac": {
    id: "ginger-aphrodisiac",
    name: "Ginger Aphrodisiac",
    signature: {
      fr: "Release your spicy self",
      en: "Release your spicy self",
    },
    energyPillars: {
      fr: "Séduction / Confiance / Vitalité",
      en: "Seduction / Confidence / Vitality",
    },
    olfactiveFamily: {
      fr: "Hespéridé épicé",
      en: "Spicy citrus",
    },
    keyIngredients: {
      fr: "Gingembre / Citron vert / Racine de vétiver",
      en: "Ginger / Lime / Vetiver root",
    },
    notes: {
      fr: "Gingembre frais BIO / Zeste de citron vert / Poivre noir / Néroli / Baies roses / Vétiver / Fève tonka",
      en: "Fresh organic ginger / Lime zest / Black pepper / Neroli / Pink berries / Vetiver / Tonka bean",
    },
    phrase: {
      fr: "Fresh. Sparkling. Spicy.",
      en: "Fresh. Sparkling. Spicy.",
    },
    colors: {
      primary: "#FFC72C",
      deep: "#C69214",
      accent: "#C8102E",
      bg: "#1A1200",
      text: "#FFF8E7",
    },
  },
  "maracuja-samba": {
    id: "maracuja-samba",
    name: "Maracuja Samba",
    signature: {
      fr: "Feel the solar rush",
      en: "Feel the solar rush",
    },
    energyPillars: {
      fr: "Smile / Fun / Joie",
      en: "Smile / Fun / Joy",
    },
    olfactiveFamily: {
      fr: "Fruité",
      en: "Fruity",
    },
    keyIngredients: {
      fr: "Fruit de la passion / Mangue / Basilic",
      en: "Passion fruit / Mango / Basil",
    },
    notes: {
      fr: "Basilic / Fruit de la passion / Orange sanguine upcyclée / Mangue / Fleur d’oranger / Cèdre / Osmanthus / Bois ambrés / Muscs",
      en: "Basil / Passion fruit / Upcycled blood orange / Mango / Orange blossom / Cedarwood / Osmanthus / Amber woods / Musks",
    },
    phrase: {
      fr: "Fruity. Juicy. Colorful.",
      en: "Fruity. Juicy. Colorful.",
    },
    colors: {
      primary: "#FF6A13",
      soft: "#FFA38B",
      deep: "#E35205",
      accent: "#FF6A13",
      bg: "#1A0800",
      text: "#FFF3ED",
    },
  },
  "matcha-star": {
    id: "matcha-star",
    name: "Matcha Star",
    signature: {
      fr: "Find your inner balance",
      en: "Find your inner balance",
    },
    energyPillars: {
      fr: "Power / Balance / Ancrage",
      en: "Power / Balance / Grounding",
    },
    olfactiveFamily: {
      fr: "Aromatique boisé",
      en: "Woody aromatic",
    },
    keyIngredients: {
      fr: "Thé matcha / Figue / Écorce de cèdre",
      en: "Matcha tea / Fig / Cedar bark",
    },
    notes: {
      fr: "Accord thé matcha / Bergamote / Thé noir fumé / Figue / Maté / Vétiver / Cèdre upcyclé / Labdanum",
      en: "Matcha tea accord / Bergamot / Smoked black tea / Fig / Maté / Vetiver / Upcycled cedarwood / Labdanum",
    },
    phrase: {
      fr: "Vert. Boisé. Puissant. Fumé.",
      en: "Green. Woody. Powerful. Smoky.",
    },
    colors: {
      primary: "#7A9A3A",
      soft: "#B7C9A8",
      deep: "#3A4D2F",
      accent: "#7A9A3A",
      bg: "#0A1005",
      text: "#F0F5E8",
    },
  },
  "vanilla-chill": {
    id: "vanilla-chill",
    name: "Vanilla Chill",
    signature: {
      fr: "Wrap yourself in softness",
      en: "Wrap yourself in softness",
    },
    energyPillars: {
      fr: "Cocooning / Bien-être / Réconfort",
      en: "Cocooning / Well-being / Comfort",
    },
    olfactiveFamily: {
      fr: "Gourmand frais",
      en: "Fresh gourmand",
    },
    keyIngredients: {
      fr: "Vanille / Lait de coco / Sésame",
      en: "Vanilla / Coconut milk / Sesame",
    },
    notes: {
      fr: "Lavande / Sésame / Amande / Fleur d’oranger / Vanille bourbon BIO / Son de riz upcyclé / Lait de coco / Fève tonka",
      en: "Lavender / Sesame / Almond / Orange blossom / Organic bourbon vanilla / Upcycled rice bran / Coconut milk / Tonka bean",
    },
    phrase: {
      fr: "Lacté. Réconfortant. Frais. Addictif.",
      en: "Milky. Comforting. Fresh. Addictive.",
    },
    colors: {
      primary: "#F4EDE4",
      soft: "#E0C7A8",
      deep: "#8B5E3C",
      accent: "#E0C7A8",
      bg: "#120D08",
      text: "#FAF6F0",
    },
  },
  "rosa-boom": {
    id: "rosa-boom",
    name: "Rosa Boom",
    signature: {
      fr: "Own your sensual energy",
      en: "Own your sensual energy",
    },
    energyPillars: {
      fr: "Uplifting / Love / Sensualité",
      en: "Uplifting / Love / Sensuality",
    },
    olfactiveFamily: {
      fr: "Floral fruité",
      en: "Fruity floral",
    },
    keyIngredients: {
      fr: "Litchi / Rose / Oud",
      en: "Lychee / Rose / Oud",
    },
    notes: {
      fr: "Litchi / Bergamote / Pétales de rose / Rose absolue / Patchouli / Noix de muscade / Labdanum / Papyrus / Ambre gris",
      en: "Lychee / Bergamot / Rose petals / Rose absolute / Patchouli / Nutmeg / Labdanum / Papyrus / Ambergris",
    },
    phrase: {
      fr: "Floral frais. Fruit juteux. Sensuel. Puissant.",
      en: "Fresh floral. Juicy fruit. Sensual. Powerful.",
    },
    colors: {
      primary: "#E94B8A",
      soft: "#F7C6D9",
      deep: "#B7316C",
      accent: "#E94B8A",
      bg: "#150008",
      text: "#FFF0F5",
    },
  },
};

export const ENERGY_OPTIONS: EnergyOption[] = [
  {
    id: "intense-vibrant",
    fragranceId: "ginger-aphrodisiac",
    label: {
      fr: "Intense, vibrant",
      en: "Intense, vibrant",
    },
  },
  {
    id: "solar-luminous",
    fragranceId: "maracuja-samba",
    label: {
      fr: "Solaire, lumineux",
      en: "Solar, luminous",
    },
  },
  {
    id: "calm-balanced",
    fragranceId: "matcha-star",
    label: {
      fr: "Calme, équilibré",
      en: "Calm, balanced",
    },
  },
  {
    id: "soft-enveloping",
    fragranceId: "vanilla-chill",
    label: {
      fr: "Doux, enveloppant",
      en: "Soft, enveloping",
    },
  },
  {
    id: "sensual-elegant",
    fragranceId: "rosa-boom",
    label: {
      fr: "Sensuel, élégant",
      en: "Sensual, elegant",
    },
  },
];

export const NOTE_OPTIONS: NoteOption[] = [
  {
    id: "spicy",
    fragranceId: "ginger-aphrodisiac",
    label: {
      fr: "Épicées : gingembre, poivre noir, zeste de citron vert",
      en: "Spicy: ginger, black pepper, lime zest",
    },
  },
  {
    id: "fruity",
    fragranceId: "maracuja-samba",
    label: {
      fr: "Fruitées : fruit de la passion, mangue, orange sanguine",
      en: "Fruity: passion fruit, mango, blood orange",
    },
  },
  {
    id: "green-woody",
    fragranceId: "matcha-star",
    label: {
      fr: "Vertes / boisées : thé matcha, figue, cèdre",
      en: "Green / woody: matcha tea, fig, cedarwood",
    },
  },
  {
    id: "gourmand",
    fragranceId: "vanilla-chill",
    label: {
      fr: "Gourmandes : vanille bourbon, lait de coco, sésame",
      en: "Gourmand: bourbon vanilla, coconut milk, sesame",
    },
  },
  {
    id: "floral",
    fragranceId: "rosa-boom",
    label: {
      fr: "Florales : litchi, rose, oud",
      en: "Floral: lychee, rose, oud",
    },
  },
];

export const MOMENT_OPTIONS: MomentOption[] = [
  {
    id: "soiree",
    boostFragrances: ["ginger-aphrodisiac", "rosa-boom"],
    label: {
      fr: "Soirée",
      en: "Night out",
    },
  },
  {
    id: "sport",
    boostFragrances: ["maracuja-samba", "matcha-star"],
    label: {
      fr: "Sport",
      en: "Sport",
    },
  },
  {
    id: "quotidien",
    boostFragrances: ["maracuja-samba", "matcha-star", "rosa-boom"],
    label: {
      fr: "Quotidien",
      en: "Everyday",
    },
  },
  {
    id: "detente",
    boostFragrances: ["vanilla-chill", "matcha-star"],
    label: {
      fr: "Détente",
      en: "Relaxation",
    },
  },
];

const DEFAULT_ALT_FRAGRANCE_ID: FragranceId = "maracuja-samba";

export const DEFAULT_FRAGRANCE_ID: FragranceId = "ginger-aphrodisiac";

export function resolveFragranceRecommendations(params: {
  energyId: EnergyChoiceId;
  noteIds: NoteChoiceId[];
  momentId: MomentChoiceId;
}) {
  const scores: Record<FragranceId, number> = {
    "ginger-aphrodisiac": 0,
    "maracuja-samba": 0,
    "matcha-star": 0,
    "vanilla-chill": 0,
    "rosa-boom": 0,
  };

  const energyPick = ENERGY_OPTIONS.find((option) => option.id === params.energyId);
  if (!energyPick) {
    return {
      primaryId: DEFAULT_FRAGRANCE_ID,
      secondaryId: DEFAULT_ALT_FRAGRANCE_ID,
      scoreMap: scores,
    };
  }

  // Weight model: energy 40%, notes 45%, moment 15%.
  scores[energyPick.fragranceId] += 40;

  const validNotes = params.noteIds
    .map((noteId) => NOTE_OPTIONS.find((option) => option.id === noteId))
    .filter((value): value is NoteOption => Boolean(value));
  const noteWeight = validNotes.length > 0 ? 45 / validNotes.length : 0;
  for (const notePick of validNotes) {
    scores[notePick.fragranceId] += noteWeight;
  }

  const momentPick = MOMENT_OPTIONS.find((option) => option.id === params.momentId);
  const momentTargets = momentPick?.boostFragrances ?? [];
  const momentWeight = momentTargets.length > 0 ? 15 / momentTargets.length : 0;
  for (const fragranceId of momentTargets) {
    scores[fragranceId] += momentWeight;
  }

  const preferredTieBreaker: FragranceId[] = [
    energyPick.fragranceId,
    ...(validNotes.map((entry) => entry.fragranceId) as FragranceId[]),
    DEFAULT_FRAGRANCE_ID,
    DEFAULT_ALT_FRAGRANCE_ID,
  ];

  const ranking = (Object.keys(scores) as FragranceId[]).sort((a, b) => {
    if (scores[b] !== scores[a]) {
      return scores[b] - scores[a];
    }
    return preferredTieBreaker.indexOf(a) - preferredTieBreaker.indexOf(b);
  });

  const primaryId = ranking[0] ?? energyPick.fragranceId;
  const secondaryId = ranking.find((candidate) => candidate !== primaryId) ?? DEFAULT_ALT_FRAGRANCE_ID;

  return {
    primaryId,
    secondaryId,
    scoreMap: scores,
  };
}

export function resolveFragranceMatch(params: {
  energyId: EnergyChoiceId;
  noteIds: NoteChoiceId[];
  momentId: MomentChoiceId;
}) {
  return resolveFragranceRecommendations(params).primaryId;
}
