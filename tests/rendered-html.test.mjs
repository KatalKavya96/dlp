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

test("server-renders the finished Dharohar landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Dharohar — India’s Heritage Kitchen, Reimagined<\/title>/i);
  assert.match(html, /Rooted in heritage\./);
  assert.match(html, /Crafted for generations\./);
  assert.match(html, /Handcrafted copper, brass and bronze cookware/);
  assert.match(html, /Explore the essence of each metal\./);
  assert.match(html, /Two rows of objects, made for a lifetime\./);
  assert.match(html, /The Everyday Kadai/);
  assert.match(html, /Tamra Handi/);
  assert.match(html, /Celebration Serveware/);
  assert.match(html, /Personalise your heirloom\./);
  assert.match(html, /Lifetime ownership\. Timeless bond\./);
  assert.match(html, /Build a kitchen your family will remember\./);
  assert.match(html, /<meta property="og:image" content="http:\/\/localhost:3000\/og\.png"/i);
  assert.match(html, /<link rel="icon" href="http:\/\/localhost:3000\/favicon\.png"/i);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("keeps the production shell, SEO, and accessibility safeguards in source", async () => {
  const [page, experience, collection, layout, css, packageJson, readme] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/sections/HeritageExperience.tsx", import.meta.url), "utf8"),
    readFile(new URL("../components/sections/FeaturedCollection.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../README.md", import.meta.url), "utf8"),
  ]);

  assert.match(page, /"@type": "Organization"/);
  assert.match(page, /<Navbar \/>/);
  assert.match(page, /<FeaturedCollection \/>/);
  assert.match(page, /<HeritageHero \/>/);
  assert.match(page, /<MaterialExplorer \/>/);
  assert.match(page, /<PersonalisationStudio \/>/);
  assert.match(experience, /aria-labelledby="hero-title"/);
  assert.match(experience, /aria-pressed={active === index}/);
  assert.match(collection, /ProductCarouselRow/);
  assert.match(collection, /dragConstraints/);
  assert.match(collection, /Show next products in row/);
  assert.match(collection, /alternate view of \$\{product\.name\}/);
  assert.match(collection, /NEXT_PUBLIC_STORE_URL/);
  assert.doesNotMatch(collection, /role="dialog"|createPortal/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /x-forwarded-host/);
  assert.match(layout, /openGraph/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(packageJson, /"framer-motion"/);
  assert.match(packageJson, /"lucide-react"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(readme, /Photography handoff/);
  assert.match(readme, /NEXT_PUBLIC_STORE_URL/);

  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../public/favicon.png", import.meta.url));
  await access(new URL("../public/apple-touch-icon.png", import.meta.url));
  await access(new URL("../public/images/dharohar-mark.png", import.meta.url));
  await access(new URL("../public/images/dharohar-hero-copper.png", import.meta.url));
  await access(new URL("../public/images/heritage-product-rail.webp", import.meta.url));
});
