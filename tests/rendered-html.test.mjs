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
  assert.match(html, /India’s heritage kitchen,/);
  assert.match(html, /reimagined\./);
  assert.match(html, /Handcrafted copper, brass and bronze cookware/);
  assert.match(html, /Owned for generations\. Restored, not replaced\./);
  assert.match(html, /Carry the legacy forward\./);
  assert.match(html, /<meta property="og:image" content="http:\/\/localhost:3000\/og\.png"/i);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("keeps the production shell, SEO, and accessibility safeguards in source", async () => {
  const [page, layout, css, packageJson, readme] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../README.md", import.meta.url), "utf8"),
  ]);

  assert.match(page, /"@type": "Organization"/);
  assert.match(page, /<Navbar \/>/);
  assert.match(page, /<FeaturedCollection \/>/);
  assert.match(layout, /generateMetadata/);
  assert.match(layout, /x-forwarded-host/);
  assert.match(layout, /openGraph/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
  assert.match(packageJson, /"framer-motion"/);
  assert.match(packageJson, /"lucide-react"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.match(readme, /Photography handoff/);

  await access(new URL("../public/og.png", import.meta.url));
  await access(new URL("../public/images/hero-kitchen.jpg", import.meta.url));
});
