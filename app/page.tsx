import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { BrandStory } from "@/components/sections/BrandStory";
import { BusinessStory } from "@/components/sections/BusinessStory";
import { CraftAndPassport } from "@/components/sections/CraftAndPassport";
import { FeaturedCollection } from "@/components/sections/FeaturedCollection";
import { Hero } from "@/components/sections/Hero";
import { PersonalisationOwnership } from "@/components/sections/PersonalisationOwnership";
import { ProductEcosystem } from "@/components/sections/ProductEcosystem";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dharohar",
    description: "Handcrafted Indian heritage cookware with personalisation, provenance and lifetime restoration.",
    areaServed: "IN",
    knowsAbout: ["Copper cookware", "Brass cookware", "Bronze cookware", "Indian metal craft", "Cookware restoration"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Navbar />
      <main>
        <Hero />
        <BrandStory />
        <ProductEcosystem />
        <FeaturedCollection />
        <CraftAndPassport />
        <PersonalisationOwnership />
        <BusinessStory />
      </main>
      <Footer />
    </>
  );
}
