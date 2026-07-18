"use client";

import {
  ArrowRight,
  BookOpenText,
  Building2,
  Check,
  ExternalLink,
  Feather,
  Gift,
  Hammer,
  HeartHandshake,
  Mail,
  Menu,
  PackageCheck,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import Image from "next/image";
import { type ComponentPropsWithoutRef, type FormEvent, useState } from "react";

type StoreLinkProps = ComponentPropsWithoutRef<"a"> & {
  path: string;
  eventLabel: string;
};

const curatedProducts = [
  {
    name: "The Everyday Kadhai",
    material: "Brass",
    purpose: "An approachable first piece for everyday tadkas, curries and slow cooking.",
    price: "Indicative from ₹4,900",
    image: "/images/curated/ptal-brass-flat-kadhai.webp",
    path: "/collections/everyday-cookware",
  },
  {
    name: "The Signature Lagaan",
    material: "Brass",
    purpose: "A generous celebratory form made for shared meals and family recipes.",
    price: "Indicative from ₹7,500",
    image: "/images/curated/ptal-brass-lagaan.webp",
    path: "/collections/signature-cookware",
  },
  {
    name: "The Tamra Legacy Handi",
    material: "Copper",
    purpose: "A hand-hammered heirloom designed for slow cooking and future engraving.",
    price: "Indicative from ₹8,400",
    image: "/images/curated/ptal-copper-madurai-handi.webp",
    path: "/collections/copper-cookware",
  },
  {
    name: "The Family Patila",
    material: "Brass",
    purpose: "A familiar kitchen essential reintroduced with material clarity and care guidance.",
    price: "Indicative from ₹3,900",
    image: "/images/curated/ptal-brass-patila.webp",
    path: "/collections/everyday-cookware",
  },
  {
    name: "The Heritage Kadhai Set",
    material: "Brass",
    purpose: "Three practical sizes for a considered kitchen built piece by piece.",
    price: "Indicative from ₹13,500",
    image: "/images/curated/ptal-brass-kadhai-set.webp",
    path: "/collections/complete-rasoi",
  },
  {
    name: "The Celebration Lagaan",
    material: "Copper",
    purpose: "A luminous centrepiece for gifting, gathering and memorable occasions.",
    price: "Indicative from ₹8,900",
    image: "/images/curated/ptal-copper-lagaan.webp",
    path: "/collections/wedding-gifts",
  },
] as const;

const intentions = [
  {
    eyebrow: "For daily rituals",
    title: "Everyday cookware",
    copy: "Begin with one useful piece, chosen for the food you cook most often.",
    image: "/images/curated/ptal-brass-flat-kadhai.webp",
    path: "/collections/everyday-cookware",
    cta: "Shop everyday",
    icon: HeartHandshake,
  },
  {
    eyebrow: "For milestones",
    title: "Wedding & festive gifting",
    copy: "Personalised pieces and presentation-ready sets for beginnings worth remembering.",
    image: "/images/curated/ptal-copper-madurai-handi.webp",
    path: "/collections/wedding-gifts",
    cta: "Explore gifting",
    icon: Gift,
  },
  {
    eyebrow: "For the whole home",
    title: "The complete rasoi",
    copy: "A consultation-led collection shaped around your cooking, family and rituals.",
    image: "/images/curated/ptal-brass-kadhai-set.webp",
    path: "/collections/complete-rasoi",
    cta: "Build your rasoi",
    icon: PackageCheck,
  },
  {
    eyebrow: "For projects",
    title: "Design & hospitality",
    copy: "A dedicated path for designers, restaurants, boutique stays and thoughtful spaces.",
    image: "/images/indian-table.jpg",
    path: "/pages/trade-and-hospitality",
    cta: "Start a project",
    icon: Building2,
  },
] as const;

function storeHref(path: string, content: string) {
  const store = process.env.NEXT_PUBLIC_STORE_URL?.replace(/\/$/, "");
  if (!store) return "#consultation";
  const url = new URL(`${store}${path.startsWith("/") ? path : `/${path}`}`);
  url.searchParams.set("utm_source", "dharohar_brand");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", "brand_gateway");
  url.searchParams.set("utm_content", content);
  return url.toString();
}

function track(action: string, label: string) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as typeof window & {
    gtag?: (command: string, action: string, params: Record<string, string>) => void;
  };
  analyticsWindow.gtag?.("event", action, {
    event_category: "brand_gateway",
    event_label: label,
  });
  window.dispatchEvent(new CustomEvent("dharohar:conversion", { detail: { action, label } }));
}

function StoreLink({ path, eventLabel, onClick, ...props }: StoreLinkProps) {
  return (
    <a
      {...props}
      href={storeHref(path, eventLabel)}
      onClick={(event) => {
        track("store_click", eventLabel);
        onClick?.(event);
      }}
    />
  );
}

function GatewayHeader() {
  const [open, setOpen] = useState(false);

  const links = [
    ["Our story", "#story"],
    ["Collection", "#collection"],
    ["Shop by need", "#occasions"],
    ["Legacy", "#legacy"],
  ] as const;

  return (
    <>
      <div className="bg-[#140e0a] px-5 py-2.5 text-center text-[9px] font-bold uppercase tracking-[.22em] text-[#d9bd83]">
        Handcrafted in India · Pure metals · Personal stories · Lifetime care
      </div>
      <header className="sticky top-0 z-50 border-b border-[#d8b86b]/20 bg-[#18110d]/95 text-[#fff1d2] shadow-[0_10px_35px_rgba(0,0,0,.2)] backdrop-blur-xl">
        <div className="site-container flex h-[76px] items-center justify-between gap-5">
          <a href="#top" aria-label="Dharohar home" className="flex items-center gap-3">
            <span className="relative block size-11 overflow-hidden rounded-full bg-[#fffaf0] sm:size-13">
              <Image src="/images/dharohar-mark.png" alt="" fill priority unoptimized sizes="52px" className="object-contain mix-blend-multiply" />
            </span>
            <span>
              <strong className="block font-serif text-2xl font-medium tracking-[.1em] text-[#f2dcae] sm:text-3xl">DHAROHAR</strong>
              <span className="hidden text-[7px] font-bold uppercase tracking-[.31em] text-[#cda75e] sm:block">Heritage Kitchen</span>
            </span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {links.map(([label, href]) => <a key={href} href={href} className="text-[9px] font-bold uppercase tracking-[.16em] text-white/60 transition hover:text-[#e2c27d]">{label}</a>)}
          </nav>

          <div className="flex items-center gap-2">
            <StoreLink path="/collections/all" eventLabel="header_visit_store" className="heritage-button heritage-button-filled hidden sm:inline-flex">
              Visit store <ExternalLink size={14} />
            </StoreLink>
            <button type="button" className="grid size-11 place-items-center rounded-full border border-[#d8b86b]/30 text-[#e2c27d] lg:hidden" aria-expanded={open} aria-controls="gateway-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {open ? (
          <div id="gateway-menu" className="border-t border-[#d8b86b]/20 bg-[#18110d] px-5 pb-6 lg:hidden">
            <nav className="site-container flex flex-col py-4" aria-label="Mobile navigation">
              {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-white/10 py-4 font-serif text-3xl">{label}</a>)}
              <StoreLink path="/collections/all" eventLabel="mobile_visit_store" onClick={() => setOpen(false)} className="heritage-button heritage-button-filled mt-5 justify-center">Visit the store <ArrowRight size={15} /></StoreLink>
            </nav>
          </div>
        ) : null}
      </header>
    </>
  );
}

function ProductCard({ product, index }: { product: (typeof curatedProducts)[number]; index: number }) {
  return (
    <article className={`group overflow-hidden rounded-[1.4rem] border border-[#b78b3c]/25 bg-[#fffaf0] shadow-[0_24px_60px_rgba(91,56,21,.1)] ${index === 0 || index === 5 ? "lg:col-span-2" : ""}`}>
      <div className={`relative overflow-hidden bg-[#ede3d6] ${index === 0 || index === 5 ? "aspect-[1.55/1]" : "aspect-square"}`}>
        <Image src={product.image} alt={`${product.name}, ${product.material.toLowerCase()} cookware`} fill unoptimized sizes={index === 0 || index === 5 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 25vw"} className="object-cover transition duration-700 group-hover:scale-[1.025]" />
        <span className="absolute left-4 top-4 rounded-full border border-[#8b632a]/25 bg-[#fffaf0]/88 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[.18em] text-[#855d25] backdrop-blur">{product.material}</span>
      </div>
      <div className="p-6 sm:p-7">
        <h3 className="font-serif text-3xl leading-none text-[#4c351f]">{product.name}</h3>
        <p className="mt-3 max-w-xl text-sm leading-6 text-[#746756]">{product.purpose}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#b78b3c]/20 pt-5">
          <span className="text-xs font-semibold text-[#8c652d]">{product.price}</span>
          <StoreLink path={product.path} eventLabel={`product_${index + 1}`} className="inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[.16em] text-[#7b5522] transition hover:text-[#b07829]">
            View on store <ArrowRight size={14} />
          </StoreLink>
        </div>
      </div>
    </article>
  );
}

function ConsultationGateway() {
  const [status, setStatus] = useState("We usually reply within one working day.");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const interest = String(form.get("interest") ?? "");
    const message = String(form.get("message") ?? "");
    const destination = process.env.NEXT_PUBLIC_CONSULTATION_EMAIL ?? "hello@dharohar.in";
    const subject = encodeURIComponent(`Dharohar consultation — ${interest || "heritage kitchen"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\n${message}`);
    track("consultation_start", interest || "general");
    setStatus("Your email app is opening with the enquiry prepared.");
    window.location.href = `mailto:${destination}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] border border-[#e3c27c]/28 bg-white/[.07] p-6 backdrop-blur sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label><span className="mb-2 block text-[9px] font-bold uppercase tracking-[.16em] text-[#e0bd76]">Your name</span><input required name="name" className="h-13 w-full rounded-xl border border-white/15 bg-white/8 px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#e0bd76]" placeholder="Name" /></label>
        <label><span className="mb-2 block text-[9px] font-bold uppercase tracking-[.16em] text-[#e0bd76]">Email</span><input required name="email" type="email" className="h-13 w-full rounded-xl border border-white/15 bg-white/8 px-4 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#e0bd76]" placeholder="you@example.com" /></label>
      </div>
      <label className="mt-4 block"><span className="mb-2 block text-[9px] font-bold uppercase tracking-[.16em] text-[#e0bd76]">I am interested in</span><select name="interest" className="h-13 w-full rounded-xl border border-white/15 bg-[#4e3524] px-4 text-sm text-white outline-none focus:border-[#e0bd76]" defaultValue="Complete heritage kitchen"><option>Complete heritage kitchen</option><option>Wedding or festive gifting</option><option>Everyday cookware</option><option>Design or hospitality project</option></select></label>
      <label className="mt-4 block"><span className="mb-2 block text-[9px] font-bold uppercase tracking-[.16em] text-[#e0bd76]">Tell us a little more</span><textarea name="message" rows={4} className="w-full resize-none rounded-xl border border-white/15 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#e0bd76]" placeholder="The occasion, family size, preferred metals or timeline…" /></label>
      <button type="submit" className="mt-4 inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-xl bg-[#d3a84d] px-6 text-[10px] font-bold uppercase tracking-[.15em] text-[#3c291b] transition hover:bg-[#e2c275]">Prepare consultation email <Send size={15} /></button>
      <p aria-live="polite" className="mt-3 min-h-5 text-center text-xs text-[#e8cc91]">{status}</p>
    </form>
  );
}

export function BrandGateway() {
  const [familyName, setFamilyName] = useState("Sharma");

  return (
    <>
      <GatewayHeader />
      <main>
        <section id="top" className="relative isolate min-h-[calc(100svh-108px)] overflow-hidden bg-[#17110d] text-[#fff5df]" aria-labelledby="hero-title">
          <Image src="/images/heritage-product-rail.webp" alt="Copper and brass cookware arranged in a heritage interior" fill priority unoptimized sizes="100vw" className="-z-20 object-cover" style={{ objectPosition: "58% 50%" }} />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,12,8,.98)_0%,rgba(18,12,8,.85)_38%,rgba(18,12,8,.28)_70%,rgba(18,12,8,.18)),linear-gradient(180deg,rgba(8,5,3,.1),rgba(8,5,3,.48))]" />
          <div className="site-container flex min-h-[calc(100svh-108px)] items-center py-16 sm:py-20">
            <div className="max-w-[760px]">
              <p className="flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[.26em] text-[#dfbd77]"><Sparkles size={13} /> India’s heritage kitchen, reimagined</p>
              <h1 id="hero-title" className="mt-7 font-serif text-[clamp(4rem,7vw,8rem)] leading-[.82] tracking-[-.048em] text-[#fff4dc]">Crafted by tradition.<br />Carried by you.</h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-white/70 sm:text-lg">Handcrafted copper, brass and kansa objects with a clear maker story, thoughtful personalisation and a lifetime path of care.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <StoreLink path="/collections/all" eventLabel="hero_shop_collection" className="heritage-button heritage-button-filled">Shop the collection <ArrowRight size={16} /></StoreLink>
                <a href="#story" className="heritage-button !border-white/35 !text-[#fff5df] hover:!border-[#dfbd77]">Explore our story</a>
                <a href="#consultation" className="inline-flex items-center px-3 text-[10px] font-bold uppercase tracking-[.13em] text-[#e5c98b] underline decoration-[#e5c98b]/35 underline-offset-8">Book a consultation</a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[#b78b3c]/25 bg-[#fff8eb]" aria-label="Dharohar assurances">
          <div className="site-container grid sm:grid-cols-2 lg:grid-cols-4">
            {[[Hammer,"Handcrafted in India"],[ShieldCheck,"Copper, brass & kansa"],[Feather,"Personal engraving"],[HeartHandshake,"Lifetime restoration"]].map(([Icon,label], index) => <div key={label as string} className={`flex items-center gap-4 px-5 py-5 ${index ? "border-t border-[#b78b3c]/20 sm:border-l sm:border-t-0" : ""}`}><span className="grid size-11 place-items-center rounded-full border border-[#b78b3c]/40 text-[#a4772d]"><Icon size={19} /></span><span className="font-serif text-xl text-[#4f3b25]">{label as string}</span></div>)}
          </div>
        </section>

        <section id="collection" className="bg-[#f6efe3] px-5 py-[clamp(5rem,9vw,8rem)]" aria-labelledby="collection-title">
          <div className="site-container">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <div><p className="heritage-label w-fit">A glimpse of the collection</p><h2 id="collection-title" className="heritage-display mt-7 max-w-4xl text-[clamp(3.5rem,6vw,6.5rem)] leading-[.9]">Six ways to begin a family kitchen.</h2></div>
              <div className="max-w-md"><p className="text-sm leading-7 text-[#746756]">A concise preview of the materials, forms and occasions Dharohar is being built around. Continue to the commerce catalogue for availability and final pricing.</p><StoreLink path="/collections/all" eventLabel="collection_view_all" className="heritage-button mt-6">View the complete store <ExternalLink size={14} /></StoreLink></div>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-4">
              {curatedProducts.map((product, index) => <ProductCard key={product.name} product={product} index={index} />)}
            </div>
            <p className="mt-5 text-center text-[10px] uppercase tracking-[.16em] text-[#8c765a]">Preview imagery and indicative prices are for review; the live commerce catalogue remains the source of truth.</p>
          </div>
        </section>

        <section id="story" className="overflow-hidden bg-[#1d140f] text-[#fff3da]" aria-labelledby="story-title">
          <div className="site-container grid lg:grid-cols-[.95fr_1.05fr]">
            <div className="flex flex-col justify-center py-[clamp(5rem,10vw,9rem)] lg:pr-16">
              <p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#d8b86b]">Why Dharohar</p>
              <h2 id="story-title" className="mt-6 max-w-2xl font-serif text-[clamp(3.6rem,6vw,6.7rem)] leading-[.88]">The object is only the beginning.</h2>
              <p className="mt-7 max-w-xl text-base leading-8 text-white/62">Dharohar connects a useful kitchen object to its maker, material, family identity and future care—so knowledge stays with the piece.</p>
              <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
                {[[Hammer,"Artisan craft","A visible making process and honest material specification."],[Feather,"Personal identity","Names, dates and messages engraved with restraint."],[BookOpenText,"Heritage passport","A demonstration of provenance, care and ownership history."],[ShieldCheck,"Lifetime care","A clear route for polishing, repair and future restoration."]].map(([Icon,title,copy]) => <div key={title as string} className="bg-[#241812] p-6"><Icon className="text-[#d8b86b]" size={22} /><h3 className="mt-5 font-serif text-2xl">{title as string}</h3><p className="mt-2 text-sm leading-6 text-white/52">{copy as string}</p></div>)}
              </div>
            </div>
            <div className="relative min-h-[720px] lg:min-h-0">
              <Image src="/images/artisan.jpg" alt="Metal artisan working in a traditional workshop" fill unoptimized sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" style={{ objectPosition: "50% 30%" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1d140f]/80 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/30 bg-[#fffaf0]/92 p-6 text-[#4b3824] shadow-2xl backdrop-blur sm:inset-x-8 sm:bottom-8">
                <p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#9d712a]">Demonstration heritage passport</p>
                <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2"><p><strong className="block text-[9px] uppercase tracking-[.13em] text-[#9a8468]">Maker identity</strong>Recorded with the piece</p><p><strong className="block text-[9px] uppercase tracking-[.13em] text-[#9a8468]">Material</strong>Composition and intended use</p><p><strong className="block text-[9px] uppercase tracking-[.13em] text-[#9a8468]">Care history</strong>Guidance and service record</p><p><strong className="block text-[9px] uppercase tracking-[.13em] text-[#9a8468]">Ownership</strong>Transferable family story</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="occasions" className="bg-[#fffaf0] px-5 py-[clamp(5rem,9vw,8rem)]" aria-labelledby="occasions-title">
          <div className="site-container">
            <div className="mx-auto max-w-4xl text-center"><p className="heritage-label">Shop by intention</p><h2 id="occasions-title" className="heritage-display mt-7 text-[clamp(3.5rem,6vw,6.4rem)] leading-[.9]">Find the right doorway into Dharohar.</h2><p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#746756]">Every route continues to the most relevant collection or conversation, rather than leaving you at a generic storefront.</p></div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {intentions.map((item, index) => { const Icon = item.icon; return <article key={item.title} className="group relative min-h-[430px] overflow-hidden rounded-[1.8rem] text-white"><Image src={item.image} alt="" fill unoptimized sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" /><div className="absolute inset-0 bg-gradient-to-t from-[#160e09]/95 via-[#160e09]/30 to-black/5" /><div className="absolute inset-x-0 bottom-0 p-7 sm:p-9"><span className="grid size-12 place-items-center rounded-full border border-white/30 bg-black/15 backdrop-blur"><Icon size={21} /></span><p className="mt-5 text-[9px] font-bold uppercase tracking-[.2em] text-[#e2c27d]">{item.eyebrow}</p><h3 className="mt-2 font-serif text-4xl sm:text-5xl">{item.title}</h3><p className="mt-3 max-w-md text-sm leading-6 text-white/64">{item.copy}</p><StoreLink path={item.path} eventLabel={`intention_${index + 1}`} className="mt-6 inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[.16em] text-[#f2d79c]">{item.cta} <ArrowRight size={14} /></StoreLink></div></article>; })}
            </div>
          </div>
        </section>

        <section id="legacy" className="overflow-hidden bg-[#efe1cb] px-5 py-[clamp(5rem,9vw,8rem)]" aria-labelledby="legacy-title">
          <div className="site-container grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div className="relative mx-auto aspect-square w-full max-w-[620px] rounded-full border-[18px] border-[#fffaf0]/65 bg-[radial-gradient(circle_at_40%_28%,#ffd3a8,#bd6c43_48%,#7c3c22_100%)] shadow-[0_35px_80px_rgba(94,52,23,.18)]">
              <div className="absolute inset-[8%] grid place-items-center rounded-full border border-[#704027]/55 text-center text-[#57331f]"><div className="px-7"><Feather className="mx-auto mb-5" size={32} strokeWidth={1.2} /><p className="text-xs uppercase tracking-[.35em]">The</p><p className="font-serif text-[clamp(2.8rem,7vw,5.8rem)] uppercase leading-none tracking-[.06em]">{familyName || "Family"}</p><p className="mt-2 text-sm uppercase tracking-[.28em]">Family</p><div className="mx-auto my-5 h-px w-36 bg-[#704027]/60" /><p className="font-serif text-2xl">Made to be remembered</p></div></div>
            </div>
            <div className="lg:pl-8"><p className="heritage-label w-fit">Personalisation</p><h2 id="legacy-title" className="heritage-display mt-7 text-[clamp(3.6rem,6vw,6.5rem)] leading-[.9]">Make the beginning unmistakably yours.</h2><p className="mt-6 max-w-xl text-base leading-8 text-[#746756]">Preview a family engraving here, then continue to the store’s personalisation collection for product choice, pricing and final approval.</p><label className="mt-8 block max-w-md"><span className="heritage-field-label">Family name preview</span><input value={familyName} maxLength={20} onChange={(event) => setFamilyName(event.target.value)} className="heritage-input" /></label><StoreLink path="/collections/personalised-gifts" eventLabel="personalisation_continue" className="heritage-button heritage-button-filled mt-6">Personalise on the store <ArrowRight size={15} /></StoreLink><div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-xs text-[#725c41]">{["Product selection", "Engraving approval", "Presentation-ready packaging"].map((item)=><span key={item} className="flex items-center gap-2"><Check size={14} className="text-[#a4772d]" />{item}</span>)}</div></div>
          </div>
        </section>

        <section id="consultation" className="bg-[#4d3421] px-5 text-[#fff8e9]" aria-labelledby="consultation-title">
          <div className="site-container grid gap-12 py-[clamp(5rem,9vw,8rem)] lg:grid-cols-[1fr_1.05fr] lg:items-center">
            <div><p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#e0bd76]">A private beginning</p><h2 id="consultation-title" className="mt-5 max-w-2xl font-serif text-[clamp(3.8rem,6vw,6.8rem)] leading-[.88]">Build a kitchen your family will remember.</h2><p className="mt-6 max-w-xl text-base leading-8 text-white/65">Tell us about the rituals, metals, gifting moment or design project you are considering. We’ll prepare a thoughtful route into the collection.</p><div className="mt-8 flex flex-wrap gap-3"><StoreLink path="/collections/all" eventLabel="final_visit_store" className="heritage-button heritage-button-filled">Visit the store <ExternalLink size={14} /></StoreLink><a href={`mailto:${process.env.NEXT_PUBLIC_CONSULTATION_EMAIL ?? "hello@dharohar.in"}`} className="heritage-button !border-white/25 !text-white"><Mail size={15} /> Email directly</a></div></div>
            <ConsultationGateway />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#18110d] px-5 text-[#fff5df]">
        <div className="site-container flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
          <a href="#top" className="flex items-center gap-3"><span className="relative size-14 overflow-hidden rounded-full bg-[#fffaf0]"><Image src="/images/dharohar-mark.png" alt="" fill unoptimized sizes="56px" className="object-contain mix-blend-multiply" /></span><span><strong className="block font-serif text-2xl tracking-[.12em]">DHAROHAR</strong><span className="text-[7px] font-bold uppercase tracking-[.3em] text-[#d8b86b]">Heritage Kitchen</span></span></a>
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-[9px] font-bold uppercase tracking-[.15em] text-white/48" aria-label="Footer navigation"><a href="#story" className="hover:text-white">Our story</a><a href="#collection" className="hover:text-white">Collection</a><a href="#occasions" className="hover:text-white">Shop by need</a><a href="#consultation" className="hover:text-white">Consultation</a><StoreLink path="/collections/all" eventLabel="footer_visit_store" className="inline-flex items-center gap-1 text-[#e2c27d]">Visit store <ArrowRight size={11} /></StoreLink></nav>
          <p className="text-[9px] uppercase tracking-[.12em] text-white/32">© 2026 Dharohar</p>
        </div>
      </footer>
    </>
  );
}
