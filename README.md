# Dharohar landing page

A responsive, editorial landing page for Dharohar — a heritage kitchen brand built around Indian metal craft, personalisation, provenance and lifetime restoration.

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

To send the new hero product “Buy” actions to the commerce site, set:

```bash
NEXT_PUBLIC_STORE_URL=https://shop.dharohar.com
```

Until that destination is supplied, the buttons intentionally fall back to the private consultation section instead of opening a broken store.

## Structure

- `app/` — App Router page, metadata and global design tokens
- `components/sections/` — page sections and interactive product stories
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

Also replace `.example` email addresses with production destinations and supply verified market statistics for the clearly labelled “Why now” placeholders.

## Accessibility and performance

Controls are keyboard accessible, animated sections respect `prefers-reduced-motion`, local imagery uses `next/image`, the mobile navigation is modal, and semantic section landmarks support screen readers and search engines.
