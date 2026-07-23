import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished Dharohar brand gateway", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Dharohar — Crafted by Tradition\. Carried by You\.<\/title>/i);
  assert.match(html, /More Than/);
  assert.match(html, /It’s a Living/);
  assert.match(html, /Heritage\./);
  assert.match(html, /Gathering the collection/);
  assert.match(html, /Explore the collection/);
  assert.match(html, /Choose the character of your kitchen\./);
  assert.match(html, /View all Copper pieces/);
  assert.doesNotMatch(html, /A vessel can hold more than a recipe\./);
  assert.doesNotMatch(html, /The collection travels/);
  assert.doesNotMatch(html, /beyond the flame\./);
  assert.match(html, /A table is where metal/);
  assert.match(html, /becomes memory\./);
  assert.match(html, /Complete this table/);
  assert.match(html, /Kansa Thali/);
  assert.match(html, /Roti Dabba/);
  assert.match(html, /Every ritual\./);
  assert.match(html, /Every category\./);
  assert.match(html, /Kitchen Utensils/);
  assert.match(html, /Kitchen Accessories/);
  assert.match(html, /Copper for Water/);
  assert.match(html, /Brass for Cooking &amp; Eating/);
  assert.match(html, /Kansa for Eating/);
  assert.match(html, /Pooja &amp; Ritual/);
  assert.doesNotMatch(html, /The Everyday Kadhai/);
  assert.doesNotMatch(html, /P[•·.\-]?TAL/i);
  assert.doesNotMatch(html, /Find your first Dharohar piece\./);
  assert.match(html, /Care remains recorded/);
  assert.doesNotMatch(html, /The story stays with the object\./);
  assert.doesNotMatch(html, /So does its care\./);
  assert.match(html, /Care for a lifetime\./);
  assert.match(html, /Not only at purchase\./);
  assert.match(html, /A name changes/);
  assert.match(html, /the object\./);
  assert.match(html, /An object from your family\./);
  assert.match(html, /One craft\./);
  assert.match(html, /Many kinds of tables\./);
  assert.match(html, /Homes &amp; collectors/);
  assert.match(html, /Weddings &amp; gifting/);
  assert.match(html, /A country of hands/);
  assert.match(html, /behind every object\./);
  assert.match(html, /Care memberships/);
  assert.match(html, /Hospitality care/);
  assert.match(html, /Briefs designed/);
  assert.match(html, /to become heirlooms\./);
  assert.match(html, /Who are we creating for\?/);
  assert.match(html, /Material wisdom\./);
  assert.match(html, /Modern clarity\./);
  assert.match(html, /A quieter way/);
  assert.match(html, /to begin\./);
  assert.match(html, /<meta property="og:image" content="http:\/\/localhost:3000\/og\.png"/i);
  assert.match(html, /<link rel="icon" href="http:\/\/localhost:3000\/favicon\.png"/i);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("keeps the production shell, SEO, and accessibility safeguards in source", async () => {
  const [page, gateway, loading, layout, css, packageJson, readme] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/BrandGateway.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/DharoharLoading.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../README.md", import.meta.url), "utf8"),
  ]);

  assert.match(page, /"@type": "Organization"/);
  assert.match(page, /<BrandGateway \/>/);
  assert.match(gateway, /aria-labelledby="hero-title"/);
  assert.match(gateway, /NEXT_PUBLIC_STORE_URL/);
  assert.match(gateway, /utm_campaign/);
  assert.match(gateway, /dharohar:conversion/);
  assert.match(gateway, /NEXT_PUBLIC_CONSULTATION_EMAIL/);
  assert.match(gateway, /NEXT_PUBLIC_CONSULTATION_ENDPOINT/);
  assert.match(gateway, /Prepare consultation request/);
  assert.match(gateway, /Pause cinematic motion/);
  assert.doesNotMatch(gateway, /cinematic-pointer-light/);
  assert.match(gateway, /Select a glowing marker/);
  assert.doesNotMatch(gateway, /hero-craft-card|Legacy of Craft|Our evidence standard|Move beyond similar vessels/);
  assert.match(gateway, /LifetimeRestoration/);
  assert.match(gateway, /Re-tinning \/ Kalai/);
  assert.match(gateway, /function CommissioningHall/);
  assert.match(gateway, /function ArtisanNetwork/);
  assert.match(gateway, /function CommissionProof/);
  assert.match(gateway, /dharohar:consultation-persona/);
  assert.match(gateway, /Annual care membership/);
  assert.match(gateway, /Ghar Care/);
  assert.match(gateway, /Heirloom Circle/);
  assert.match(gateway, /dharohar-wordmark\.png/);
  assert.match(loading, /dharohar-wordmark\.png/);
  assert.match(gateway, /function DharoharImageSignature/);
  assert.ok((gateway.match(/<DharoharImageSignature/g) ?? []).length >= 6);
  assert.match(css, /\.dharohar-image-signature/);
  assert.match(css, /\.restoration-reference,[\s\S]*min-height:\s*100svh/);
  assert.match(css, /\.artisan-network \.artisan-map-shell/);
  assert.match(css, /\.consultation-reference \.consult-persona-grid/);
  assert.match(css, /width:\s*clamp\(5\.8rem,\s*8vw,\s*7\.35rem\)/);
  const heroFramesSource = gateway.match(/const heroFrames = \[([\s\S]*?)\] as const;/)?.[1] ?? "";
  assert.doesNotMatch(heroFramesSource, /artisan|indian-table/i);
  assert.doesNotMatch(gateway, /P[•·.\-]?TAL/i);
  assert.doesNotMatch(loading, /P[•·.\-]?TAL/i);
  assert.match(gateway, /<DharoharLoader \/>/);
  assert.match(loading, /Promise\.race/);
  assert.match(loading, /document\.fonts/);
  assert.match(loading, /DharoharImage/);
  assert.match(gateway, /NEXT_PUBLIC_BOOKING_URL/);
  assert.match(gateway, /dharohar:store-intent/);
  assert.match(gateway, /dharohar-store-handoff-seen/);
  assert.match(gateway, /function CareDock/);
  assert.ok(gateway.indexOf("<PersonalisationStudio />") < gateway.indexOf("<DharoharTable />"));
  assert.ok(gateway.indexOf("<TrustSequence />") < gateway.indexOf("<DharoharTable />"));
  assert.ok(gateway.indexOf("<CommissioningHall />") < gateway.indexOf("<MaterialExplorer />"));
  assert.ok(gateway.indexOf("<ArtisanNetwork />") < gateway.indexOf("<TrustSequence />"));
  assert.ok(gateway.indexOf("<LifetimeRestoration />") < gateway.indexOf("<CommissionProof />"));
  assert.doesNotMatch(gateway.match(/<main>([\s\S]*?)<\/main>/)?.[1] ?? "", /<RitualUniverse \/>|<PassportExperience \/>/);
  assert.doesNotMatch(gateway, /function GuidedFinder/);
  assert.doesNotMatch(gateway, /href="#finder"/);
  assert.doesNotMatch(gateway.match(/<main>([\s\S]*?)<\/main>/)?.[1] ?? "", /<GenerationalStory \/>/);
  assert.match(gateway, /function DharoharTable/);
  assert.match(gateway, /dharohar-table-v1\.webp/);
  assert.match(gateway, /function PersonalisationStudio/);
  assert.match(gateway, /copyInscription/);
  assert.match(gateway, /function CategoryCarousel/);
  assert.match(gateway, /category carousel/);
  assert.match(gateway, /categoryCollections\.length/);
  assert.match(gateway, /useReducedMotion/);
  assert.doesNotMatch(gateway, /\.example/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /Cormorant_Garamond/);
  assert.match(layout, /Manrope/);
  assert.match(layout, /x-forwarded-host/);
  assert.match(layout, /openGraph/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /dharohar-image-skeleton/);
  assert.match(css, /header-store-compact/);
  assert.match(css, /karchi-cursor\.svg/);
  assert.match(css, /0 4px 0 #704510/);
  assert.match(loading, /criticalAssets/);
  assert.match(loading, /secondaryAssets/);
  assert.match(loading, /dharohar-loader-seen/);
  assert.match(packageJson, /"framer-motion"/);
  assert.match(packageJson, /"lucide-react"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(readme, /Photography handoff/);
  assert.match(readme, /NEXT_PUBLIC_STORE_URL/);

  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../public/favicon.png", import.meta.url));
  await access(new URL("../public/apple-touch-icon.png", import.meta.url));
  await access(new URL("../public/images/dharohar-mark.png", import.meta.url));
  await access(new URL("../public/images/dharohar-wordmark.png", import.meta.url));
  await access(new URL("../public/icons/karchi-cursor.svg", import.meta.url));
  await access(new URL("../public/images/dharohar-hero-copper.png", import.meta.url));
  await access(new URL("../public/images/heritage-product-rail.webp", import.meta.url));
  await access(new URL("../public/images/curated/brass-kadhai-set.webp", import.meta.url));
  await access(new URL("../public/images/curated/copper-madurai-handi.webp", import.meta.url));
  await access(new URL("../public/images/experience/dharohar-table-v1.webp", import.meta.url));
  await access(new URL("../public/images/curated/styled-copper-pair.webp", import.meta.url));
  await access(new URL("../public/images/curated/styled-copper-detail.webp", import.meta.url));
  await access(new URL("../public/images/curated/copper-bottle.jpg", import.meta.url));
  await access(new URL("../public/images/curated/copper-dispenser-lifestyle.jpg", import.meta.url));
  await access(new URL("../public/images/curated/brass-davara-clean.jpg", import.meta.url));
  await access(new URL("../public/images/curated/brass-masala-box.jpg", import.meta.url));
  await access(new URL("../public/images/curated/brass-paraat.jpg", import.meta.url));
  await access(new URL("../public/images/curated/brass-ladles-clean.png", import.meta.url));
  await access(new URL("../public/images/curated/brass-roti-box.jpg", import.meta.url));
  await access(new URL("../public/images/curated/brass-cutlery.jpg", import.meta.url));
  await access(new URL("../public/images/curated/kansa-thaali-clean.jpg", import.meta.url));
  await access(new URL("../public/images/dharohar-categories/cookware.webp", import.meta.url));
  await access(new URL("../public/images/dharohar-categories/kitchen-utensils.webp", import.meta.url));
  await access(new URL("../public/images/dharohar-categories/kitchen-accessories-clean.webp", import.meta.url));
  await access(new URL("../public/images/dharohar-categories/drinkware-clean.webp", import.meta.url));
  await access(new URL("../public/images/dharohar-categories/tableware-clean.webp", import.meta.url));
  await access(new URL("../public/images/dharohar-categories/dinnerware.webp", import.meta.url));
  await access(new URL("../public/images/dharohar-categories/sets.webp", import.meta.url));
  await access(new URL("../public/images/dharohar-categories/copper-water.webp", import.meta.url));
  await access(new URL("../public/images/dharohar-categories/brass.webp", import.meta.url));
  await access(new URL("../public/images/dharohar-categories/kansa-clean.webp", import.meta.url));
  await access(new URL("../public/images/dharohar-categories/home-decor.webp", import.meta.url));
  await access(new URL("../public/images/dharohar-categories/pooja-clean.webp", import.meta.url));
  await access(new URL("../public/videos/copper-craft-master.mp4", import.meta.url));
  await access(new URL("../public/videos/copper-craft-poster.jpg", import.meta.url));
  await access(new URL("../public/videos/water-ritual-master.mp4", import.meta.url));
  await access(new URL("../public/videos/water-ritual-poster.jpg", import.meta.url));
});
