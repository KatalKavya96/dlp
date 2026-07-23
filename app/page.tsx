import { BrandGateway } from "@/components/BrandGateway";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "#organization",
        name: "Dharohar",
        description: "A premium brand gateway for handcrafted Indian heritage cookware, personalisation, provenance and lifetime restoration.",
        areaServed: "IN",
        knowsAbout: ["Copper cookware", "Brass cookware", "Bronze cookware", "Indian metal craft", "Cookware restoration"],
      },
      {
        "@type": "ItemList",
        name: "P•TAL utensil categories",
        itemListElement: [
          ["Cookware", "/collections/cookware-by-p-tal"],
          ["Kitchen Utensils", "/collections/kitchen-utensils"],
          ["Kitchen Accessories", "/collections/kitchen-accessories"],
          ["Drinkware", "/collections/drinkware"],
          ["Tableware", "/collections/tableware"],
          ["Dinnerware", "/collections/dinnerware"],
          ["Sets & Combos", "/collections/combos-and-sets"],
          ["Copper for Water", "/collections/copper-tamba-utensils-and-vessels"],
          ["Brass for Cooking & Eating", "/collections/brass-pital-utensils-and-vessels"],
          ["Kansa for Eating", "/collections/kansa-bronze-utensils-and-vessels"],
          ["Home Décor", "/collections/home-decor-1"],
          ["Pooja & Ritual", "/collections/pooja-items"],
        ].map(([name, url], index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: { "@type": "CollectionPage", name, url },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <BrandGateway />
    </>
  );
}
