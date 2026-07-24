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
  assert.match(html, /Repair before replacement/);
  assert.doesNotMatch(html, /The story stays with the object\./);
  assert.doesNotMatch(html, /So does its care\./);
  assert.match(html, /Care that continues beyond the purchase\./);
  assert.match(html, /Restore the shine\. Preserve the story\./);
  assert.match(html, /A name changes/);
  assert.match(html, /the object\./);
  assert.match(html, /An object from your family\./);
  assert.match(html, /One craft\./);
  assert.match(html, /Many kinds of tables\./);
  assert.match(html, /Homes &amp; collectors/);
  assert.match(html, /Weddings &amp; gifting/);
  assert.match(html, /A country of hands/);
  assert.match(html, /behind every object\./);
  assert.match(html, /Care Passport/);
  assert.match(html, /Compare the vessel before and after restoration/);
  assert.doesNotMatch(html, /Briefs designed/);
  assert.doesNotMatch(html, /to become heirlooms\./);
  assert.match(html, /Who are we creating for\?/);
  assert.match(html, /Material wisdom\./);
  assert.match(html, /Modern clarity\./);
  assert.match(html, /A quieter way/);
  assert.match(html, /to begin\./);
  assert.match(html, /https:\/\/www\.instagram\.com\/dharohar91\//);
  assert.match(html, /https:\/\/www\.linkedin\.com\/company\/dharohar91\/\?viewAsMember=true/);
  assert.match(html, /https:\/\/x\.com\/Dharoharxt42/);
  assert.match(html, /https:\/\/www\.facebook\.com\/profile\.php\?id=61592081474548/);
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
  assert.match(gateway, /Next · your details/);
  assert.match(gateway, /How may we reach you\?/);
  assert.match(gateway, /Prepare request/);
  assert.match(gateway, /Pause cinematic motion/);
  assert.match(gateway, /header_visit_store"[^>]*className="hero-nav-icon grid"/);
  assert.match(gateway, /movement > 6[\s\S]*?setVisible\(false\)/);
  assert.match(gateway, /movement < -4[\s\S]*?setVisible\(true\)/);
  assert.match(css, /\.gateway-header-hidden[\s\S]*?translateY\(calc\(-100% - 2px\)\)/);
  assert.doesNotMatch(gateway, /cinematic-pointer-light/);
  assert.match(gateway, /Select a glowing marker/);
  assert.doesNotMatch(gateway, /hero-craft-card|Legacy of Craft|Our evidence standard|Move beyond similar vessels/);
  assert.match(gateway, /LifetimeRestoration/);
  assert.match(gateway, /Re-tinning \/ Kalai/);
  assert.match(gateway, /function CommissioningHall/);
  assert.match(gateway, /Pause" : "Play"} commission carousel/);
  assert.match(gateway, /commission-cinema-portrait[\s\S]*?className="object-contain object-right"/);
  assert.match(gateway, /setActiveId\(clientPaths\[\(activeIndex \+ 1\) % clientPaths\.length\]\.id\)/);
  assert.match(gateway, /function ArtisanNetwork/);
  assert.doesNotMatch(gateway, /function CommissionProof/);
  assert.match(gateway, /dharohar:consultation-persona/);
  assert.match(gateway, /Compare the vessel before and after restoration/);
  assert.match(gateway, /care-vessel-before\.png/);
  assert.match(gateway, /care-vessel-after\.png/);
  assert.match(gateway, /dharohar-wordmark\.png/);
  assert.match(loading, /dharohar-wordmark\.png/);
  assert.match(gateway, /function DharoharImageSignature/);
  assert.equal((gateway.match(/<DharoharImageSignature/g) ?? []).length, 1);
  assert.match(gateway, /11 of 27 primary photographic states \(40\.7%\)/);
  assert.equal((gateway.match(/brandTreatment: "in-scene"/g) ?? []).length, 4);
  assert.equal((gateway.match(/brandTreatment: "engraved"/g) ?? []).length, 1);
  assert.match(gateway, /dharohar-provenance-engraving\.webp/);
  const categorySource = gateway.match(/const categoryCollections = \[([\s\S]*?)\] as const;/)?.[1] ?? "";
  const categoryTreatmentOrder = [...categorySource.matchAll(/brandTreatment: (?:"([^"]+)"|null)/g)].map((match) => match[1] ?? null);
  assert.deepEqual(categoryTreatmentOrder, [null, null, "in-scene", null, null, "in-scene", null, null, "in-scene", null, "engraved", "in-scene"]);
  const clientPathsSource = gateway.match(/const clientPaths = \[([\s\S]*?)\] as const;/)?.[1] ?? "";
  assert.match(clientPathsSource, /id: "design"[^\n]*image: "\/images\/branding\/commissions\/interior-designers\.webp"/);
  assert.match(clientPathsSource, /id: "corporate"[^\n]*image: "\/images\/branding\/commissions\/corporate-gifting\.webp"/);
  assert.match(clientPathsSource, /id: "home"[^\n]*image: "\/images\/branding\/commissions\/homes-collectors\.webp"/);
  assert.match(clientPathsSource, /id: "wedding"[^\n]*image: "\/images\/branding\/commissions\/weddings-gifting\.webp"/);
  assert.match(clientPathsSource, /id: "hospitality"[^\n]*image: "\/images\/branding\/commissions\/restaurants-hotels\.webp"/);
  assert.match(clientPathsSource, /id: "events"[^\n]*image: "\/images\/branding\/commissions\/event-planners\.webp"/);
  assert.match(css, /\.dharohar-image-signature/);
  assert.match(css, /\.branded-image-caption/);
  assert.match(css, /\.commission-progress-fill\.is-running/);
  assert.match(css, /@keyframes commission-progress/);
  assert.match(css, /\.restoration-reference,[\s\S]*min-height:\s*100svh/);
  assert.match(gateway, /const artisanProcessSteps = \[/);
  assert.equal((gateway.match(/\/images\/artisan-process\//g) ?? []).length, 6);
  assert.match(gateway, /setInterval\(\(\) => \{[\s\S]*?artisanProcessSteps\.length/);
  assert.match(css, /\.consultation-reference \.consult-persona-grid/);
  assert.match(css, /width:\s*clamp\(5\.8rem,\s*8vw,\s*7\.35rem\)/);
  assert.match(css, /Calmer desktop scale/);
  assert.match(css, /width:\s*min\(calc\(100%\s*-\s*6rem\),\s*1240px\)/);
  assert.match(css, /\.category-slide[\s\S]*min-width:\s*min\(46vw,\s*640px\)/);
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
  assert.doesNotMatch(gateway.match(/<main>([\s\S]*?)<\/main>/)?.[1] ?? "", /<RitualUniverse \/>|<PassportExperience \/>/);
  assert.doesNotMatch(gateway, /function GuidedFinder/);
  assert.doesNotMatch(gateway, /href="#finder"/);
  assert.doesNotMatch(gateway.match(/<main>([\s\S]*?)<\/main>/)?.[1] ?? "", /<GenerationalStory \/>/);
  assert.match(gateway, /function DharoharTable/);
  assert.match(gateway, /dharohar-table-business-card-v3\.webp/);
  assert.match(gateway, /function PersonalisationStudio/);
  assert.match(gateway, /copyInscription/);
  assert.match(gateway, /function CategoryCarousel/);
  assert.match(gateway, /category carousel/);
  assert.match(gateway, /categoryCollections\.length/);
  assert.match(gateway, /useReducedMotion/);
  assert.doesNotMatch(gateway, /\.example/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /Playfair_Display/);
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
  await access(new URL("../public/images/experience/dharohar-table-business-card-v3.webp", import.meta.url));
  await access(new URL("../public/images/artisan-process/regions.png", import.meta.url));
  await access(new URL("../public/images/artisan-process/artisans.png", import.meta.url));
  await access(new URL("../public/images/artisan-process/traditions.png", import.meta.url));
  await access(new URL("../public/images/artisan-process/care.png", import.meta.url));
  await access(new URL("../public/images/artisan-process/quality.png", import.meta.url));
  await access(new URL("../public/images/artisan-process/delivery.png", import.meta.url));
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
  await access(new URL("../public/images/branding/dharohar-corporate-gifting.webp", import.meta.url));
  await access(new URL("../public/images/branding/dharohar-heirloom-box.webp", import.meta.url));
  await access(new URL("../public/images/branding/dharohar-kalash-gift-box.webp", import.meta.url));
  await access(new URL("../public/images/branding/dharohar-pooja-ritual-engraved.webp", import.meta.url));
  await access(new URL("../public/images/branding/dharohar-provenance-engraving.webp", import.meta.url));
  await access(new URL("../public/images/branding/dharohar-thali-gift-box.webp", import.meta.url));
  await access(new URL("../public/images/branding/dharohar-wedding-gifting.webp", import.meta.url));
  await access(new URL("../public/images/branding/commissions/interior-designers.webp", import.meta.url));
  await access(new URL("../public/images/branding/commissions/corporate-gifting.webp", import.meta.url));
  await access(new URL("../public/images/branding/commissions/homes-collectors.webp", import.meta.url));
  await access(new URL("../public/images/branding/commissions/weddings-gifting.webp", import.meta.url));
  await access(new URL("../public/images/branding/commissions/restaurants-hotels.webp", import.meta.url));
  await access(new URL("../public/images/branding/commissions/event-planners.webp", import.meta.url));
  await access(new URL("../public/videos/copper-craft-master.mp4", import.meta.url));
  await access(new URL("../public/videos/copper-craft-poster.jpg", import.meta.url));
  await access(new URL("../public/videos/water-ritual-master.mp4", import.meta.url));
  await access(new URL("../public/videos/water-ritual-poster.jpg", import.meta.url));
});
