# Dharohar landing page

A responsive, editorial brand gateway for Dharohar — built to establish desire and trust, preview a concise collection and send qualified visitors to the main commerce site or consultation channel.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by the development server. Production validation:

```bash
npm run build
npm run lint
```

To route every store-facing action to the commerce site, set:

```bash
NEXT_PUBLIC_STORE_URL=https://shop.dharohar.com
```

Store links receive `utm_source`, `utm_medium`, `utm_campaign` and `utm_content` parameters. Until the commerce destination is supplied, they intentionally fall back to the private consultation section instead of opening a broken store.

Set the consultation email used by the enquiry form:

```bash
NEXT_PUBLIC_CONSULTATION_EMAIL=hello@dharohar.in
```

The form prepares a complete email in the visitor's mail app and never shows a false "received" state. Replace this with a CRM or transactional form endpoint when the production destination is available.

## Structure

- `app/` — App Router page, metadata and global design tokens
- `components/BrandGateway.tsx` — active brand gateway, curated product preview, routing and consultation journey
- `components/sections/` — retained experimental product-story sections
- `components/ui/` — reusable reveal, image and heading components
- `data/dharohar.ts` — typed product and editorial content
- `public/images/` — optimized local reference photography

## Photography handoff

The current images are editorial placeholders sourced under the Unsplash license and should be replaced with a Dharohar-owned campaign shoot before commercial launch. Preserve the existing aspect ratios and filenames to replace them without layout changes.

| File | Current reference | Replace with |
| --- | --- | --- |
| `hero-kitchen.jpg` | [Colin Watts / Unsplash](https://unsplash.com/photos/3wyjFuwbp2s) | Wide premium kitchen with Dharohar copper cookware |
| `artisan.jpg` | [Photographer / Unsplash](https://unsplash.com/photos/BtA02jWiJ88) | Vertical artisan portrait with maker consent and full provenance |
| `brass-collection.jpg` | [Dileesh Kumar / Unsplash](https://unsplash.com/photos/zo3nvUCaSUA) | Editorial studio collection of Dharohar brass and bronze pieces |
| `heritage-kitchen.jpg` | [Annie Spratt / Unsplash](https://unsplash.com/photos/3dmD-6PN-hM) | Old-meets-new kitchen detail for the heirloom collection |
| `indian-table.jpg` | [Jon Handley / Unsplash](https://unsplash.com/photos/zr1R6gEQ0_M) | Warm family dining moment featuring Dharohar serveware |

`heritage-product-rail.webp` is an optimized original AI-generated Dharohar visual created for the compact product rail, with the high-resolution PNG retained as its editable campaign master. It contains no copied branding, packaging, reviews or discount claims from the supplied references.

The high-resolution P-TAL files requested for design review are stored under `public/images/reference/ptal/`, with optimized derivatives under `public/images/curated/`. They are temporary reference assets and require usage permission or replacement with Dharohar-owned photography before commercial launch.

## Accessibility and performance

Controls are keyboard accessible, animated sections respect `prefers-reduced-motion`, local imagery uses `next/image`, the mobile navigation is modal, and semantic section landmarks support screen readers and search engines.
