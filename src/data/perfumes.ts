export type Lang = "fr" | "en";

export type IngredientImage = {
  label: string;
  image: string;
};

export type Perfume = {
  id: string;
  name: string;
  format: string;
  sprayMood: string;
  claim: string;
  description: string;
  inspiration: string;
  keyNotes: IngredientImage[];
  bottleImage: string;
  moodImage: string;
  olfactivePyramid: { title: string; notes: string[] }[];
  ingredients: string[];
  legal: string[];
  price: number;
  colors: {
    bg: string;
    accent: string;
    text: string;
  };
};

export const PERFUMES: Record<Lang, Perfume[]> = {
  fr: [
    {
      id: "ginger-aphrodisiac",
      name: "Ginger Aphrodisiac",
      format: "Eau de Parfum 100 ml",
      sprayMood: "Spray Desire",
      claim: "Mood : Séduction & Assurance",
      description:
        "Un parfum vibrant et audacieux.\nLe piquant du gingembre rencontre la fraîcheur du citron vert, adouci par la profondeur du vétiver. Une signature tonique et sensuelle, comme une impulsion d’énergie maîtrisée.",
      inspiration:
        "Un shot gingembre–citron vert, intense et électrisant.\nUne impulsion fraîche et vibrante qui réveille les sens, entre énergie brute, clarté lumineuse et sensualité affirmée.",
      bottleImage: "/images/flacon-ginger.jpg",
      moodImage: "/images/ginger-aphrodisiac-mood.jpg",
      keyNotes: [
        { label: "Gingembre", image: "/images/note-ginger.jpg" },
        { label: "Citron vert", image: "/images/note-lime.jpg" },
        { label: "Vétiver", image: "/images/note-vetiver.jpg" },
      ],
      olfactivePyramid: [
        { title: "TÊTE", notes: ["Gingembre Frais BIO HE*", "Zeste Citron Vert", "Poivre Noir HE*"] },
        { title: "COEUR", notes: ["Néroli HE*", "Baies Roses Extraction CO2*", "Iris"] },
        { title: "FOND", notes: ["Vetiver HE*", "Fève Tonka ABS*"] },
      ],
      ingredients: [
        "Alcohol Denat.",
        "Parfum",
        "Aqua",
        "Limonene",
        "Linalool",
        "Citral",
        "Geraniol",
      ],
      legal: ["G 125 14703", "*Matière première naturelle", "Formule vegan", "Made in France", "Informations supplémentaires : Geranium HE, Egypte* - UEBT vérifié Responsibly Sourced", "Gingembre Extraction par CO2*"],
      price: 120,
      colors: {
        bg: "from-lime-50 via-yellow-100 to-amber-50",
        accent: "bg-red-700",
        text: "text-amber-900",
      },
    },
    {
      id: "maracuja-samba",
      name: "Maracuja Samba",
      format: "Eau de Parfum 100 ml",
      sprayMood: "Spray Happiness",
      claim: "Mood : Joie & Énergie",
      description:
        "Une fragrance solaire et éclatante.\nLe fruit de la passion et la mangue se mêlent à la fraîcheur du basilic pour une composition juteuse, lumineuse et irrésistiblement vivante.",
      inspiration:
        "Un smoothie tropical éclatant, solaire et addictif.\nUne explosion fruitée et lumineuse, entre fraîcheur juteuse, douceur florale et énergie positive.",
      bottleImage: "/images/flacon-maracuja.jpg",
      moodImage: "/images/maracuja-samba-mood.jpg",
      keyNotes: [
        { label: "Fruit de la passion", image: "/images/note-passion-fruit.jpg" },
        { label: "Mangue", image: "/images/note-mango.jpg" },
        { label: "Basilic", image: "/images/note-basil.jpg" },
      ],
      olfactivePyramid: [
        {
          title: "TÊTE",
          notes: ["Basilic HE*", "Fruit De La Passion", "Orange Sanguine upcyclé HE*"],
        },
        { title: "COEUR", notes: ["Mangue", "Fleur d'Oranger ABS*", "Cèdre Fraction HE*"] },
        { title: "FOND", notes: ["Osmanthus ABS*", "Bois Ambrés", "Muscs"] },
      ],
      ingredients: [
        "Alcohol Denat.",
        "Parfum",
        "Aqua",
        "Limonene",
        "Linalool",
        "Citral",
      ],
      legal: ["G 125 13100", "*Matière première naturelle", "Formule vegan", "Made in France"],
      price: 120,
      colors: {
        bg: "from-amber-50 via-orange-100 to-orange-100",
        accent: "bg-orange-600",
        text: "text-orange-900",
      },
    },
    {
      id: "matcha-star",
      name: "Matcha Star",
      format: "Eau de Parfum 100 ml",
      sprayMood: "Spray Power",
      claim: "Mood : Équilibre & Puissance",
      description:
        "Un parfum vert et structuré.\nLe matcha intense s’accorde à la figue et au cèdre pour une signature à la fois profonde, élégante et parfaitement équilibrée.",
      inspiration:
        "Un matcha concentré, profond et énergisant.\nUne expérience sensorielle entre fraîcheur végétale, tension boisée et harmonie intérieure.",
      bottleImage: "/images/flacon-matcha.jpg",
      moodImage: "/images/matcha-star-mood.jpg",
      keyNotes: [
        { label: "Matcha", image: "/images/note-matcha.jpg" },
        { label: "Figue", image: "/images/note-fig.jpg" },
        { label: "Cèdre", image: "/images/note-cedarwood.jpg" },
      ],
      olfactivePyramid: [
        { title: "TÊTE", notes: ["Accord Thé Matcha", "Bergamote HE*"] },
        { title: "COEUR", notes: ["Thé Noir fumé HE*", "Figue", "Maté ABS*"] },
        { title: "FOND", notes: ["Vétiver HE*", "Cèdre upcyclé HE*", "Labdanum ABS*"] },
      ],
      ingredients: [
        "Alcohol Denat.",
        "Parfum",
        "Aqua",
        "Limonene",
        "Linalool",
        "Citral",
      ],
      legal: ["G 125 13097", "*Matière première naturelle", "Formule vegan", "Made in France"],
      price: 120,
      colors: {
        bg: "from-lime-50 via-emerald-100 to-emerald-200",
        accent: "bg-emerald-900",
        text: "text-emerald-900",
      },
    },
    {
      id: "vanilla-chill",
      name: "Vanilla Chill",
      format: "Eau de Parfum 100 ml",
      sprayMood: "Spray Cocooning",
      claim: "Mood : Bien-être & Confort",
      description:
        "Une fragrance douce et enveloppante.\nLa vanille et le lait de coco s’unissent à la lavande pour créer une sensation de chaleur, de confort et d’apaisement immédiat.",
      inspiration:
        "Un latte chaud, crémeux et réconfortant.\nUne caresse olfactive entre douceur gourmande, chaleur enveloppante et sérénité absolue.",
      bottleImage: "/images/flacon-vanilla.jpg",
      moodImage: "/images/vanilla-chill-mood.jpg",
      keyNotes: [
        { label: "Vanille", image: "/images/note-vanilla.jpg" },
        { label: "Sésame", image: "/images/note-sesame.jpg" },
        { label: "Lavande", image: "/images/note-lavender.jpg" },
      ],
      olfactivePyramid: [
        { title: "TÊTE", notes: ["Lavande Sault HE*", "Sésame ABS*", "Amande"] },
        { title: "COEUR", notes: ["Fleur d'Oranger ABS*", "Vanille Bourbon BIO ABS*"] },
        { title: "FOND", notes: ["Son De Riz upcyclé ABS*", "Lait de Coco", "Fève Tonka"] },
      ],
      ingredients: [
        "Alcohol Denat.",
        "Parfum",
        "Aqua",
        "Linalool",
        "Coumarin",
        "Limonene",
      ],
      legal: ["G 125 13102", "*Matière première naturelle", "Formule vegan", "Made in France", "Informations supplémentaires : Orange Sanguine upcyclée HE, Italie* - produit upcyclé de l'industrie du jus"],
      price: 120,
      colors: {
        bg: "from-amber-100 via-orange-200 to-amber-200",
        accent: "bg-stone-900",
        text: "text-slate-900",
      },
    },
    {
      id: "rosa-boom",
      name: "Rosa Boom",
      format: "Eau de Parfum 100 ml",
      sprayMood: "Spray Love",
      claim: "Mood : Amour & Sensualité",
      description:
        "Un parfum floral et vibrant.\nLe litchi juteux rencontre la rose et un fond profond pour une signature à la fois lumineuse, sensuelle et addictive.",
      inspiration:
        "Une infusion florale intense et lumineuse.\nUn équilibre délicat entre fraîcheur fruitée, élégance florale et profondeur sensuelle.",
      bottleImage: "/images/flacon-rosa.jpg",
      moodImage: "/images/rosa-boom-mood.jpg",
      keyNotes: [
        { label: "Rose", image: "/images/note-rose.jpg" },
        { label: "Litchi", image: "/images/note-lychee.jpg" },
        { label: "Patchouli", image: "/images/note-patchouli.jpg" },
      ],
      olfactivePyramid: [
        {
          title: "TÊTE",
          notes: ["Litchi", "Bergamote HE*", "Pétales de Rose"],
        },
        { title: "COEUR", notes: ["Rose ABS*", "Patchouli Fraction HE*", "Noix de Muscade Fraction HE*"] },
        { title: "FOND", notes: ["Labdanum ABS*", "Papyrus HE*", "Ambre Gris"] },
      ],
      ingredients: [
        "Alcohol Denat.",
        "Parfum",
        "Aqua",
        "Linalool",
        "Limonene",
        "Geraniol",
      ],
      legal: ["G 125 13765", "*Matière première naturelle", "Formule vegan", "Made in France"],
      price: 120,
      colors: {
        bg: "from-rose-50 via-fuchsia-100 to-purple-50",
        accent: "bg-fuchsia-600",
        text: "text-rose-900",
      },
    },
  ],
  en: [
    {
      id: "ginger-aphrodisiac",
      name: "Ginger Aphrodisiac",
      format: "Eau de Parfum 100 ml",
      sprayMood: "Spray Desire",
      claim: "Mood: Seduction & Confidence",
      description:
        "A vibrant and bold fragrance.\nThe spicy edge of ginger meets the freshness of lime, softened by the depth of vetiver. An energizing and sensual signature, like a controlled burst of confidence.",
      inspiration:
        "An intense, electrifying ginger-lime shot.\nA fresh and vibrant impulse that awakens the senses, balancing raw energy, bright clarity, and confident sensuality.",
      bottleImage: "/images/flacon-ginger.jpg",
      moodImage: "/images/ginger-aphrodisiac-mood.jpg",
      keyNotes: [
        { label: "Ginger", image: "/images/note-ginger.jpg" },
        { label: "Lime", image: "/images/note-lime.jpg" },
        { label: "Vetiver", image: "/images/note-vetiver.jpg" },
      ],
      olfactivePyramid: [
        { title: "TOP", notes: ["Fresh Ginger BIO HE*", "Lime Zest", "Black Pepper HE*"] },
        { title: "HEART", notes: ["Neroli HE*", "Pink Pepper CO2 Extraction*", "Iris"] },
        { title: "BASE", notes: ["Vetiver HE*", "Tonka Bean ABS*"] },
      ],
      ingredients: [
        "Alcohol Denat.",
        "Parfum",
        "Aqua",
        "Limonene",
        "Linalool",
        "Citral",
        "Geraniol",
      ],
      legal: ["G 125 14703", "*Natural raw material", "Vegan formula", "Made in France", "Additional information: Geranium HE* - UEBT verified Responsibly Sourced", "Ginger CO2 Extraction*"],
      price: 120,
      colors: {
        bg: "from-lime-50 via-yellow-100 to-amber-50",
        accent: "bg-red-700",
        text: "text-amber-900",
      },
    },
    {
      id: "maracuja-samba",
      name: "Maracuja Samba",
      format: "Eau de Parfum 100 ml",
      sprayMood: "Spray Happiness",
      claim: "Mood: Joy & Energy",
      description:
        "A radiant, sunlit fragrance.\nPassion fruit and mango blend with the freshness of basil in a juicy, luminous composition that feels irresistibly alive.",
      inspiration:
        "A bright, sunny, addictive tropical smoothie.\nA fruity and radiant explosion that balances juicy freshness, floral softness, and positive energy.",
      bottleImage: "/images/flacon-maracuja.jpg",
      moodImage: "/images/maracuja-samba-mood.jpg",
      keyNotes: [
        { label: "Passion Fruit", image: "/images/note-passion-fruit.jpg" },
        { label: "Mango", image: "/images/note-mango.jpg" },
        { label: "Basil", image: "/images/note-basil.jpg" },
      ],
      olfactivePyramid: [
        { title: "TOP", notes: ["Basil HE*", "Passion Fruit", "Upcycled Blood Orange HE*"] },
        { title: "HEART", notes: ["Mango", "Orange Blossom ABS*", "Cedarwood Fraction HE*"] },
        { title: "BASE", notes: ["Osmanthus ABS*", "Amber Woods", "Musks"] },
      ],
      ingredients: [
        "Alcohol Denat.",
        "Parfum",
        "Aqua",
        "Limonene",
        "Linalool",
        "Citral",
      ],
      legal: ["G 125 13100", "*Natural raw material", "Vegan formula", "Made in France"],
      price: 120,
      colors: {
        bg: "from-amber-50 via-orange-100 to-orange-100",
        accent: "bg-orange-600",
        text: "text-orange-900",
      },
    },
    {
      id: "matcha-star",
      name: "Matcha Star",
      format: "Eau de Parfum 100 ml",
      sprayMood: "Spray Power",
      claim: "Mood: Balance & Power",
      description:
        "A green, structured fragrance.\nIntense matcha pairs with fig and cedarwood to create a signature that is deep, elegant, and perfectly balanced.",
      inspiration:
        "A concentrated, deep, energizing matcha.\nA sensory experience between green freshness, woody tension, and inner harmony.",
      bottleImage: "/images/flacon-matcha.jpg",
      moodImage: "/images/matcha-star-mood.jpg",
      keyNotes: [
        { label: "Matcha", image: "/images/note-matcha.jpg" },
        { label: "Fig", image: "/images/note-fig.jpg" },
        { label: "Cedarwood", image: "/images/note-cedarwood.jpg" },
      ],
      olfactivePyramid: [
        { title: "TOP", notes: ["Matcha Tea Accord", "Bergamot HE*"] },
        { title: "HEART", notes: ["Smoked Black Tea HE*", "Fig", "Maté ABS*"] },
        { title: "BASE", notes: ["Vetiver HE*", "Upcycled Cedarwood HE*", "Labdanum ABS*"] },
      ],
      ingredients: [
        "Alcohol Denat.",
        "Parfum",
        "Aqua",
        "Limonene",
        "Linalool",
        "Citral",
      ],
      legal: ["G 125 13097", "*Natural raw material", "Vegan formula", "Made in France"],
      price: 120,
      colors: {
        bg: "from-lime-50 via-emerald-100 to-emerald-200",
        accent: "bg-emerald-900",
        text: "text-emerald-900",
      },
    },
    {
      id: "vanilla-chill",
      name: "Vanilla Chill",
      format: "Eau de Parfum 100 ml",
      sprayMood: "Spray Cocooning",
      claim: "Mood: Well-being & Comfort",
      description:
        "A soft, enveloping fragrance.\nVanilla and coconut milk blend with lavender to create an immediate feeling of warmth, comfort, and calm.",
      inspiration:
        "A warm, creamy, comforting latte.\nAn olfactive caress between gourmand softness, enveloping warmth, and absolute serenity.",
      bottleImage: "/images/flacon-vanilla.jpg",
      moodImage: "/images/vanilla-chill-mood.jpg",
      keyNotes: [
        { label: "Vanilla", image: "/images/note-vanilla.jpg" },
        { label: "Sesame", image: "/images/note-sesame.jpg" },
        { label: "Lavender", image: "/images/note-lavender.jpg" },
      ],
      olfactivePyramid: [
        { title: "TOP", notes: ["Lavender HE*", "Sesame ABS*", "Almond"] },
        { title: "HEART", notes: ["Orange Blossom ABS*", "BIO Bourbon Vanilla ABS*"] },
        { title: "BASE", notes: ["Upcycled Rice Bran ABS*", "Coconut Milk", "Tonka Bean"] },
      ],
      ingredients: [
        "Alcohol Denat.",
        "Parfum",
        "Aqua",
        "Linalool",
        "Coumarin",
        "Limonene",
      ],
      legal: ["G 125 13102", "*Natural raw material", "Vegan formula", "Made in France", "Additional information: Upcycled Blood Orange HE, Italy* - upcycled ingredient from the juice industry"],
      price: 120,
      colors: {
        bg: "from-amber-100 via-orange-200 to-amber-200",
        accent: "bg-stone-900",
        text: "text-slate-900",
      },
    },
    {
      id: "rosa-boom",
      name: "Rosa Boom",
      format: "Eau de Parfum 100 ml",
      sprayMood: "Spray Love",
      claim: "Mood: Love & Sensuality",
      description:
        "A vibrant floral fragrance.\nJuicy lychee meets rose and a deep base for a signature that is luminous, sensual, and addictive.",
      inspiration:
        "An intense, radiant floral infusion.\nA delicate balance between fruity freshness, floral elegance, and sensual depth.",
      bottleImage: "/images/flacon-rosa.jpg",
      moodImage: "/images/rosa-boom-mood.jpg",
      keyNotes: [
        { label: "Rose", image: "/images/note-rose.jpg" },
        { label: "Lychee", image: "/images/note-lychee.jpg" },
        { label: "Patchouli", image: "/images/note-patchouli.jpg" },
      ],
      olfactivePyramid: [
        { title: "TOP", notes: ["Lychee", "Bergamot HE*", "Rose Petals"] },
        { title: "HEART", notes: ["Rose ABS*", "Patchouli Fraction HE*", "Nutmeg Fraction HE*"] },
        { title: "BASE", notes: ["Labdanum ABS*", "Papyrus HE*", "Ambergris"] },
      ],
      ingredients: [
        "Alcohol Denat.",
        "Parfum",
        "Aqua",
        "Linalool",
        "Limonene",
        "Geraniol",
      ],
      legal: ["G 125 13765", "*Natural raw material", "Vegan formula", "Made in France"],
      price: 120,
      colors: {
        bg: "from-rose-50 via-fuchsia-100 to-purple-50",
        accent: "bg-fuchsia-600",
        text: "text-rose-900",
      },
    },
  ],
};

export const COPY = {
  fr: {
    pageTitle: "Parfums",
    intro: "Cinq parfums inspirés de boissons iconiques.",
    notesLabel: "Notes principales",
    pyramidLabel: "Pyramide olfactive",
    ingredientsLabel: "Ingrédients légaux",
    legalInfo: "Information légale",
    addToCartButton: "Ajouter au panier",
    addToCart: "Porter cette énergie",
    close: "Fermer",
    inspiration: "Inspiration",
    backToCollection: "Retour à la collection",
    prevPerfume: "Parfum précédent",
    nextPerfume: "Parfum suivant",
  },
  en: {
    pageTitle: "Perfumes",
    intro: "Five fragrances inspired by iconic drinks.",
    notesLabel: "Main notes",
    pyramidLabel: "Olfactive pyramid",
    ingredientsLabel: "Legal ingredients",
    legalInfo: "Legal information",
    addToCartButton: "Add to cart",
    addToCart: "Wear this energy",
    close: "Close",
    inspiration: "Inspiration",
    backToCollection: "Back to collection",
    prevPerfume: "Previous perfume",
    nextPerfume: "Next perfume",
  },
};
