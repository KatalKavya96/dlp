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
        name: "A glimpse of the Dharohar collection",
        itemListElement: [
          ["The Everyday Kadhai", "Brass", 1],
          ["The Tamra Legacy Handi", "Copper", 2],
          ["The Heritage Kadhai Set", "Brass", 3],
        ].map(([name, material, position]) => ({
          "@type": "ListItem",
          position,
          item: { "@type": "Product", name, material, brand: { "@id": "#organization" } },
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
