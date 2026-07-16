import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { FeaturedCollection } from "@/components/sections/FeaturedCollection";
import {
  ArtisanSpotlight,
  HeritageHero,
  HeritagePassport,
  HeritageTestimonials,
  MaterialExplorer,
  OwnershipJourney,
  PersonalisationStudio,
  WellnessBenefits,
} from "@/components/sections/HeritageExperience";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "#organization",
        name: "Dharohar",
        description: "Handcrafted Indian heritage cookware with personalisation, provenance and lifetime restoration.",
        areaServed: "IN",
        knowsAbout: ["Copper cookware", "Brass cookware", "Bronze cookware", "Indian metal craft", "Cookware restoration"],
      },
      {
        "@type": "ItemList",
        name: "Dharohar heritage cookware preview",
        itemListElement: [
          ["Kansa Dining Set", "Bronze", 1],
          ["Hammered Handi Pair", "Copper", 2],
          ["Celebration Thali", "Brass", 3],
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
      <Navbar />
      <main>
        <HeritageHero />
        <MaterialExplorer />
        <FeaturedCollection />
        <HeritagePassport />
        <ArtisanSpotlight />
        <PersonalisationStudio />
        <OwnershipJourney />
        <WellnessBenefits />
        <HeritageTestimonials />
      </main>
      <Footer />
    </>
  );
}
