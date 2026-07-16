export type Product = {
  name: string;
  collection: string;
  material: "Copper" | "Brass" | "Bronze";
  use: string;
  price: string;
  image: string;
  imagePosition?: string;
};

export const products: Product[] = [
  {
    name: "The Everyday Kadai",
    collection: "Entry Collection",
    material: "Brass",
    use: "A considered first piece for slow, everyday cooking.",
    price: "₹2,000–₹5,000",
    image: "/images/product-wellness-handi-v2.png",
    imagePosition: "50% 48%",
  },
  {
    name: "The Handi Pair",
    collection: "Signature Collection",
    material: "Copper",
    use: "Two hand-hammered forms for the modern Indian table.",
    price: "₹6,000–₹15,000",
    image: "/images/heritage-product-rail.webp",
    imagePosition: "51% 58%",
  },
  {
    name: "The Legacy Urli",
    collection: "Heirloom Collection",
    material: "Bronze",
    use: "A sculptural centrepiece made to be engraved and passed on.",
    price: "₹15,000–₹40,000",
    image: "/images/product-material-handi-v3.png",
    imagePosition: "50% 48%",
  },
  {
    name: "The Complete Rasoi",
    collection: "Complete Heritage Kitchen",
    material: "Copper",
    use: "A consultation-led kitchen collection, curated around your rituals.",
    price: "₹50,000+",
    image: "/images/product-heritage-set-v3.png",
    imagePosition: "50% 50%",
  },
  {
    name: "Tamra Handi",
    collection: "Heritage Collection",
    material: "Copper",
    use: "A lidded hammered vessel with ornate brass handles for slow, celebratory cooking.",
    price: "₹6,450",
    image: "/images/dharohar-hero-copper.png",
    imagePosition: "70% 54%",
  },
  {
    name: "Peetal Thali Set",
    collection: "Table Collection",
    material: "Brass",
    use: "A radiant serving composition shaped for everyday meals and festive tables.",
    price: "₹5,250",
    image: "/images/heritage-product-rail.webp",
    imagePosition: "80% 60%",
  },
  {
    name: "Kansa Dinner Set",
    collection: "Wellness Collection",
    material: "Bronze",
    use: "A balanced dining set in enduring kansa, selected for mindful daily rituals.",
    price: "₹8,900",
    image: "/images/product-heritage-set-v3.png",
    imagePosition: "50% 50%",
  },
  {
    name: "Celebration Serveware",
    collection: "Gifting Collection",
    material: "Brass",
    use: "An occasion-ready collection for gifting, gathering and passing traditions forward.",
    price: "₹12,800",
    image: "/images/heritage-product-rail.webp",
    imagePosition: "38% 58%",
  },
];

export const ecosystem = [
  {
    number: "01",
    title: "Handcrafted cookware",
    description: "Small-batch vessels shaped by specialist metal artisans, with a clear material story.",
    benefit: "Authenticity you can see and trace.",
  },
  {
    number: "02",
    title: "Personalisation",
    description: "Names, dates and family messages engraved with restraint, never treated as an afterthought.",
    benefit: "A functional object becomes unmistakably yours.",
  },
  {
    number: "03",
    title: "Heritage passport",
    description: "A digital record for provenance, care, recipes and the life of every registered piece.",
    benefit: "Knowledge stays with the object.",
  },
  {
    number: "04",
    title: "Care & education",
    description: "Material-specific guidance makes traditional cookware feel intuitive in a modern kitchen.",
    benefit: "Confidence from the very first use.",
  },
  {
    number: "05",
    title: "Lifetime restoration",
    description: "Re-tinning, polishing, dent repair and inspection keep good cookware in circulation.",
    benefit: "Restore what matters. Replace less.",
  },
  {
    number: "06",
    title: "Legacy transfer",
    description: "Ownership history and care records can move with the piece to its next custodian.",
    benefit: "A continuous family story.",
  },
];

export const craftSteps = [
  ["01", "The workshop", "A living practice, rooted in regional knowledge and material intuition."],
  ["02", "Metal preparation", "Copper, brass and bronze are selected and prepared for their intended use."],
  ["03", "Hammer & shape", "Repeated, measured strikes give each vessel strength and an individual rhythm."],
  ["04", "Line where needed", "Food-facing surfaces are finished appropriately for the vessel and material."],
  ["05", "Polish & inspect", "Edges, balance and surface are checked by hand before the final finish."],
  ["06", "Engrave", "A discreet family mark turns a useful object into a personal one."],
  ["07", "Wrap with care", "The passport, care guide and wooden presentation are brought together."],
  ["08", "Begin its life", "The piece reaches your kitchen ready for use, care and future restoration."],
] as const;

export const journey = [
  ["Discover", "Curiosity"],
  ["Learn", "Trust"],
  ["Consult", "Clarity"],
  ["Purchase", "Revenue"],
  ["Experience", "Delight"],
  ["Engage", "Retention"],
  ["Restore", "Renewal"],
  ["Expand", "Referral"],
  ["Pass down", "Legacy"],
] as const;

export const journal = [
  {
    type: "Material library",
    title: "Copper, brass or bronze: choosing a vessel with intention",
    time: "6 min read",
    image: "/images/brass-collection.jpg",
  },
  {
    type: "From the workshop",
    title: "Why the rhythm of the hammer remains visible",
    time: "4 min read",
    image: "/images/artisan.jpg",
  },
  {
    type: "Modern Indian kitchen",
    title: "Building a smaller, more meaningful cookware collection",
    time: "8 min read",
    image: "/images/indian-table.jpg",
  },
];
