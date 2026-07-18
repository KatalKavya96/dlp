"use client";

import {
  ArrowRight,
  BookOpenText,
  Building2,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CirclePause,
  CirclePlay,
  Clock3,
  ExternalLink,
  Feather,
  Gift,
  Hammer,
  HeartHandshake,
  Mail,
  Menu,
  MessageCircle,
  PackageCheck,
  QrCode,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Users,
  WandSparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import { DharoharImage, DharoharLoader } from "@/components/DharoharLoading";
import {
  type ComponentPropsWithoutRef,
  type FormEvent,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type StoreIntent = { href: string; label: string; path: string };
type StoreLinkProps = ComponentPropsWithoutRef<"a"> & { path: string; eventLabel: string };

const heroFrames = [
  { image: "/images/heritage-product-rail.webp", label: "The family table", position: "58% 50%" },
  { image: "/images/artisan.jpg", label: "The maker’s hand", position: "50% 30%" },
  { image: "/images/curated/ptal-styled-copper-pair.webp", label: "Objects held in light", position: "50% 50%" },
  { image: "/images/indian-table.jpg", label: "The ritual, carried forward", position: "50% 55%" },
] as const;

const materials = [
  {
    id: "copper",
    name: "Copper",
    indianName: "Tamra",
    line: "Fast, responsive and luminous.",
    story: "A material of ceremony and control, chosen for slow dishes, considered serving and objects intended to age beautifully.",
    bestFor: "Slow cooking · Festive tables · Statement gifts",
    care: "Dry promptly; restore the exterior glow when desired.",
    image: "/images/curated/ptal-copper-madurai-handi.webp",
    path: "/collections/copper-cookware",
    tone: "#a85d35",
  },
  {
    id: "brass",
    name: "Brass",
    indianName: "Peetal",
    line: "Warm, familiar and enduring.",
    story: "The golden metal of the Indian rasoi, suited to practical everyday forms and generous vessels made for sharing.",
    bestFor: "Everyday curries · Serving · Complete rasoi sets",
    care: "Use the intended lining; wash gently and dry completely.",
    image: "/images/curated/ptal-brass-kadhai-set.webp",
    path: "/collections/brass-cookware",
    tone: "#b78b3c",
  },
  {
    id: "kansa",
    name: "Bronze",
    indianName: "Kansa",
    line: "Grounded, resonant and timeless.",
    story: "An alloy associated with the table and daily ritual, valued for its distinctive tone, weight and quietly evolving patina.",
    bestFor: "Dining rituals · Heirloom serveware · Mindful gifting",
    care: "Allow a natural patina or polish occasionally for brightness.",
    image: "/images/materials/bronze/kansa-kadai-main.png",
    path: "/collections/kansa",
    tone: "#8f7a46",
  },
] as const;

const generations = [
  {
    number: "01",
    era: "Made today",
    title: "An artisan gives it form.",
    copy: "The hammer marks remain visible. The maker, material and intended use begin the object’s recorded story.",
    image: "/images/artisan.jpg",
  },
  {
    number: "02",
    era: "Lived with",
    title: "A family gives it meaning.",
    copy: "It gathers recipes, celebrations and the warm evidence of use—then returns for care whenever it needs attention.",
    image: "/images/curated/ptal-styled-copper-pair.webp",
  },
  {
    number: "03",
    era: "Carried forward",
    title: "The next generation receives both.",
    copy: "The vessel travels with its provenance, care history and the names that transformed a useful object into a family inheritance.",
    image: "/images/indian-table.jpg",
  },
] as const;

const curatedProducts = [
  { name: "The Everyday Kadhai", material: "Brass", purpose: "For tadkas, curries and the meals that quietly become family rituals.", price: "Indicative from ₹4,900", image: "/images/curated/ptal-brass-flat-kadhai.webp", path: "/collections/everyday-cookware" },
  { name: "The Signature Lagaan", material: "Brass", purpose: "A generous celebratory form created for shared meals and slow recipes.", price: "Indicative from ₹7,500", image: "/images/curated/ptal-brass-lagaan.webp", path: "/collections/signature-cookware" },
  { name: "The Tamra Legacy Handi", material: "Copper", purpose: "A luminous centrepiece designed for slow cooking and personal engraving.", price: "Indicative from ₹8,400", image: "/images/curated/ptal-copper-madurai-handi.webp", path: "/collections/copper-cookware" },
  { name: "The Family Patila", material: "Brass", purpose: "A familiar kitchen essential reintroduced with material clarity and care.", price: "Indicative from ₹3,900", image: "/images/curated/ptal-brass-patila.webp", path: "/collections/everyday-cookware" },
  { name: "The Heritage Kadhai Set", material: "Brass", purpose: "Three practical sizes for a considered kitchen built piece by piece.", price: "Indicative from ₹13,500", image: "/images/curated/ptal-brass-kadhai-set.webp", path: "/collections/complete-rasoi" },
  { name: "The Celebration Lagaan", material: "Copper", purpose: "A memorable object for gifting, gathering and occasions of consequence.", price: "Indicative from ₹8,900", image: "/images/curated/ptal-copper-lagaan.webp", path: "/collections/wedding-gifts" },
] as const;

const passportDetails = [
  { id: "maker", icon: Hammer, label: "Maker & origin", title: "A person, not a production line.", copy: "The passport records the artisan or workshop responsible for the piece and the craft region it belongs to." },
  { id: "material", icon: ShieldCheck, label: "Material clarity", title: "Know what touches your food.", copy: "Composition, lining, intended use and care boundaries stay attached to the object throughout its life." },
  { id: "care", icon: HeartHandshake, label: "Care history", title: "Restoration becomes part of the story.", copy: "Guidance, repair and future restoration visits can be recorded rather than forgotten between generations." },
  { id: "family", icon: BookOpenText, label: "Family record", title: "Ownership carries meaning.", copy: "Names, dates and the reason the piece entered the family create a provenance that can travel with it." },
] as const;

const intentions = [
  { eyebrow: "For daily rituals", title: "Everyday cookware", copy: "Begin with one useful piece, chosen for the food you cook most often.", image: "/images/curated/ptal-brass-flat-kadhai.webp", path: "/collections/everyday-cookware", cta: "Shop everyday", icon: HeartHandshake },
  { eyebrow: "For milestones", title: "Wedding & festive gifting", copy: "Personalised pieces and presentation-ready sets for beginnings worth remembering.", image: "/images/curated/ptal-copper-madurai-handi.webp", path: "/collections/wedding-gifts", cta: "Explore gifting", icon: Gift },
  { eyebrow: "For the whole home", title: "The complete rasoi", copy: "A consultation-led collection shaped around your cooking, family and rituals.", image: "/images/curated/ptal-brass-kadhai-set.webp", path: "/collections/complete-rasoi", cta: "Build your rasoi", icon: PackageCheck },
  { eyebrow: "For projects", title: "Design & hospitality", copy: "A dedicated path for designers, restaurants, boutique stays and thoughtful spaces.", image: "/images/indian-table.jpg", path: "/pages/trade-and-hospitality", cta: "Start a project", icon: Building2 },
] as const;

function storeHref(path: string, content: string) {
  const store = process.env.NEXT_PUBLIC_STORE_URL?.replace(/\/$/, "");
  if (!store) return "#consultation";
  const url = new URL(`${store}${path.startsWith("/") ? path : `/${path}`}`);
  url.searchParams.set("utm_source", "dharohar_brand");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", "cinematic_gateway");
  url.searchParams.set("utm_content", content);
  return url.toString();
}

function track(action: string, label: string) {
  if (typeof window === "undefined") return;
  const analyticsWindow = window as typeof window & { gtag?: (command: string, action: string, params: Record<string, string>) => void };
  analyticsWindow.gtag?.("event", action, { event_category: "brand_gateway", event_label: label });
  window.dispatchEvent(new CustomEvent("dharohar:conversion", { detail: { action, label } }));
}

function StoreLink({ path, eventLabel, onClick, ...props }: StoreLinkProps) {
  const href = storeHref(path, eventLabel);
  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        event.preventDefault();
        track("store_intent", eventLabel);
        window.dispatchEvent(new CustomEvent<StoreIntent>("dharohar:store-intent", { detail: { href, label: eventLabel, path } }));
        onClick?.(event);
      }}
    />
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .8, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

function GatewayHeader() {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: .25 });
  const links = [["Materials", "#materials"], ["Our story", "#journey"], ["Collection", "#collection"], ["Personalise", "#legacy"]] as const;

  return (
    <>
      <div className="bg-[#120c09] px-5 py-2.5 text-center text-[9px] font-bold uppercase tracking-[.22em] text-[#d9bd83]">Handcrafted in India · Pure metals · Personal stories · Lifetime care</div>
      <header className="sticky top-0 z-50 border-b border-[#d8b86b]/20 bg-[#18110d]/95 text-[#fff1d2] shadow-[0_10px_35px_rgba(0,0,0,.2)] backdrop-blur-xl">
        <motion.div className="absolute inset-x-0 top-0 h-px origin-left bg-[#e1bd6d]" style={{ scaleX: progress }} />
        <div className="site-container flex h-[76px] items-center justify-between gap-5">
          <a href="#top" aria-label="Dharohar home" className="flex items-center gap-3">
            <span className="relative block size-11 overflow-hidden rounded-full bg-[#fffaf0] sm:size-13"><Image src="/images/dharohar-mark.png" alt="" fill priority unoptimized sizes="52px" className="object-contain mix-blend-multiply" /></span>
            <span><strong className="block font-serif text-2xl font-medium tracking-[.1em] text-[#f2dcae] sm:text-3xl">DHAROHAR</strong><span className="hidden text-[7px] font-bold uppercase tracking-[.31em] text-[#cda75e] sm:block">Heritage Kitchen</span></span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">{links.map(([label, href]) => <a key={href} href={href} className="text-[9px] font-bold uppercase tracking-[.16em] text-white/60 transition hover:text-[#e2c27d]">{label}</a>)}</nav>
          <div className="flex items-center gap-2">
            <StoreLink path="/collections/all" eventLabel="header_visit_store" className="heritage-button heritage-button-filled hidden sm:inline-flex">Visit store <ExternalLink size={14} /></StoreLink>
            <button type="button" className="grid size-11 place-items-center rounded-full border border-[#d8b86b]/30 text-[#e2c27d] lg:hidden" aria-expanded={open} aria-controls="gateway-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>{open ? <X size={19} /> : <Menu size={19} />}</button>
          </div>
        </div>
        <AnimatePresence>{open ? <motion.div id="gateway-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-[#d8b86b]/20 bg-[#18110d] px-5 lg:hidden"><nav className="site-container flex flex-col py-4" aria-label="Mobile navigation">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-white/10 py-4 font-serif text-3xl">{label}</a>)}<StoreLink path="/collections/all" eventLabel="mobile_visit_store" onClick={() => setOpen(false)} className="heritage-button heritage-button-filled my-5 justify-center">Visit the store <ArrowRight size={15} /></StoreLink></nav></motion.div> : null}</AnimatePresence>
      </header>
    </>
  );
}

function CinematicHero() {
  const reducedMotion = useReducedMotion();
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(!reducedMotion);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!playing || reducedMotion) return;
    const timer = window.setInterval(() => setFrame((value) => (value + 1) % heroFrames.length), 6200);
    return () => window.clearInterval(timer);
  }, [playing, reducedMotion]);

  function pointerMove(event: ReactMouseEvent<HTMLElement>) {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    heroRef.current?.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
    heroRef.current?.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
  }

  return (
    <section ref={heroRef} onMouseMove={pointerMove} id="top" className="cinematic-hero relative isolate min-h-[calc(100svh-108px)] overflow-hidden bg-[#17110d] text-[#fff5df]" aria-labelledby="hero-title">
      <AnimatePresence initial={false} mode="sync">
        <motion.div key={heroFrames[frame].image} className="absolute inset-0 -z-30" initial={{ opacity: 0, scale: 1.035 }} animate={{ opacity: 1, scale: playing ? 1.085 : 1.04 }} exit={{ opacity: 0 }} transition={{ opacity: { duration: 1.8 }, scale: { duration: 9, ease: "linear" } }}>
          <DharoharImage src={heroFrames[frame].image} alt="Copper and brass heritage cookware and its making" fill priority={frame === 0} unoptimized sizes="100vw" className="object-cover" style={{ objectPosition: heroFrames[frame].position }} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(18,12,8,.98)_0%,rgba(18,12,8,.86)_38%,rgba(18,12,8,.28)_72%,rgba(18,12,8,.2)),linear-gradient(180deg,rgba(8,5,3,.04),rgba(8,5,3,.58))]" />
      <div className="ambient-window-light pointer-events-none absolute -inset-[20%] -z-10" />
      <div className="ambient-dust pointer-events-none absolute inset-0 -z-10" />
      <div className="cinematic-pointer-light pointer-events-none absolute inset-0 -z-10" />
      <div className="site-container flex min-h-[calc(100svh-108px)] items-center py-16 sm:py-20">
        <div className="max-w-[790px]">
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .2 }} className="flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[.26em] text-[#dfbd77]"><Sparkles size={13} /> India’s heritage kitchen, reimagined</motion.p>
          <motion.h1 id="hero-title" initial={{ opacity: 0, y: 52 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.05, delay: .32, ease: [.16, 1, .3, 1] }} className="mt-7 font-serif text-[clamp(4rem,7vw,8rem)] leading-[.82] tracking-[-.048em] text-[#fff4dc]">Crafted by tradition.<br /><span className="italic text-[#e7c886]">Carried by you.</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .62 }} className="mt-7 max-w-xl text-base leading-8 text-white/70 sm:text-lg">Handcrafted copper, brass and kansa objects with a clear maker story, thoughtful personalisation and a lifetime path of care.</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .78 }} className="mt-8 flex flex-wrap gap-3"><StoreLink path="/collections/all" eventLabel="hero_shop_collection" className="heritage-button heritage-button-filled">Enter the collection <ArrowRight size={16} /></StoreLink><a href="#journey" className="heritage-button !border-white/35 !text-[#fff5df] hover:!border-[#dfbd77]">Follow the story</a><a href="#finder" className="inline-flex items-center px-3 text-[10px] font-bold uppercase tracking-[.13em] text-[#e5c98b] underline decoration-[#e5c98b]/35 underline-offset-8">Find my piece</a></motion.div>
        </div>
      </div>
      <StoreLink path="/collections/all" eventLabel="hero_visual_portal" aria-label="Enter the collection" className="hero-hover-portal hidden lg:grid">
        <span className="hero-hover-portal-ring" />
        <span className="hero-hover-portal-label">Enter collection <ArrowRight size={14} /></span>
      </StoreLink>
      <div className="absolute inset-x-0 bottom-0 border-t border-white/12 bg-black/12 backdrop-blur-sm">
        <div className="site-container flex items-center justify-between py-4">
          <div className="flex items-center gap-3" aria-label={`Scene ${frame + 1} of ${heroFrames.length}: ${heroFrames[frame].label}`}><span className="text-[9px] font-bold tracking-[.2em] text-[#e2c27d]">0{frame + 1}</span><span className="h-px w-10 bg-white/25" /><span className="text-[9px] uppercase tracking-[.18em] text-white/45">{heroFrames[frame].label}</span></div>
          <div className="flex items-center gap-2">{heroFrames.map((item, index) => <button key={item.label} type="button" onClick={() => setFrame(index)} aria-label={`Show ${item.label}`} className={`h-1 rounded-full transition-all ${index === frame ? "w-8 bg-[#dfbd77]" : "w-3 bg-white/25"}`} />)}<button type="button" onClick={() => setPlaying((value) => !value)} className="ml-3 grid size-9 place-items-center rounded-full border border-white/20 text-white/65" aria-label={playing ? "Pause cinematic motion" : "Play cinematic motion"}>{playing ? <CirclePause size={16} /> : <CirclePlay size={16} />}</button></div>
        </div>
      </div>
    </section>
  );
}

function MaterialExplorer() {
  const [activeId, setActiveId] = useState<(typeof materials)[number]["id"]>("copper");
  const active = materials.find((item) => item.id === activeId) ?? materials[0];
  return (
    <section id="materials" className="overflow-hidden bg-[#f5ecdd] px-5 py-[clamp(5rem,9vw,8rem)]" aria-labelledby="materials-title">
      <div className="site-container">
        <Reveal><div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"><div><p className="heritage-label w-fit">Material, understood</p><h2 id="materials-title" className="heritage-display mt-7 max-w-4xl text-[clamp(3.5rem,6vw,6.7rem)] leading-[.88]">Choose the character of your kitchen.</h2></div><p className="max-w-md text-sm leading-7 text-[#746756]">Each metal behaves, ages and serves differently. Explore the qualities before choosing a form.</p></div></Reveal>
        <div className="mt-12 grid overflow-hidden rounded-[2rem] border border-[#b78b3c]/25 bg-[#fffaf0] shadow-[0_30px_90px_rgba(91,56,21,.12)] lg:grid-cols-[.9fr_1.1fr]">
          <div className="order-2 p-6 sm:p-10 lg:order-1 lg:p-14">
            <div role="tablist" aria-label="Cookware materials" className="flex border-b border-[#b78b3c]/20">{materials.map((item) => <button key={item.id} type="button" role="tab" aria-selected={activeId === item.id} aria-controls="material-panel" onClick={() => setActiveId(item.id)} className={`flex-1 border-b-2 px-2 py-4 text-[10px] font-bold uppercase tracking-[.16em] transition ${activeId === item.id ? "border-[#9d712a] text-[#734d1e]" : "border-transparent text-[#8d7d68] hover:text-[#734d1e]"}`}>{item.name}</button>)}</div>
            <AnimatePresence mode="wait"><motion.div id="material-panel" role="tabpanel" key={active.id} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .48, ease: [.22, 1, .36, 1] }} className="pt-10"><p className="text-[10px] font-bold uppercase tracking-[.22em]" style={{ color: active.tone }}>{active.indianName}</p><h3 className="mt-3 font-serif text-5xl text-[#49331f] sm:text-6xl">{active.line}</h3><p className="mt-6 max-w-xl text-base leading-8 text-[#746756]">{active.story}</p><div className="mt-8 grid gap-5 border-y border-[#b78b3c]/20 py-6 sm:grid-cols-2"><div><p className="text-[9px] font-bold uppercase tracking-[.17em] text-[#9a8468]">Best suited to</p><p className="mt-2 text-sm leading-6 text-[#5d4933]">{active.bestFor}</p></div><div><p className="text-[9px] font-bold uppercase tracking-[.17em] text-[#9a8468]">Care rhythm</p><p className="mt-2 text-sm leading-6 text-[#5d4933]">{active.care}</p></div></div><StoreLink path={active.path} eventLabel={`material_${active.id}`} className="heritage-button mt-7">View all {active.name} pieces <ArrowRight size={14} /></StoreLink></motion.div></AnimatePresence>
          </div>
          <StoreLink path={active.path} eventLabel={`material_visual_${active.id}`} aria-label={`View all ${active.name} pieces`} className="group relative order-1 min-h-[460px] overflow-hidden bg-[#e4d4c1] lg:order-2 lg:min-h-[680px]">
            <AnimatePresence mode="wait"><motion.div key={active.image} className="absolute inset-0" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .8 }}><DharoharImage src={active.image} alt={`${active.name} heritage cookware`} fill unoptimized sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /><div className="product-glint absolute -inset-y-[20%] left-[-25%] w-[18%] rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm" /></motion.div></AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-white/10" /><div className="absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full border border-white/35 bg-black/25 px-4 py-2 text-[9px] font-bold uppercase tracking-[.18em] text-white backdrop-blur transition duration-300 group-hover:-translate-y-1 group-hover:bg-black/45">View all {active.name} <ArrowRight size={13} /></div>
          </StoreLink>
        </div>
      </div>
    </section>
  );
}

function GenerationalStory() {
  const [activeStep, setActiveStep] = useState(0);
  const active = generations[activeStep];
  return (
    <section id="journey" className="overflow-clip bg-[#17100c] px-5 py-[clamp(6rem,10vw,10rem)] text-[#fff4dc]" aria-labelledby="journey-title">
      <div className="site-container">
        <Reveal className="mx-auto max-w-5xl text-center"><p className="text-[10px] font-bold uppercase tracking-[.26em] text-[#d8b86b]">One object · Three generations</p><h2 id="journey-title" className="mt-6 font-serif text-[clamp(4rem,7vw,8rem)] leading-[.84]">A vessel can hold more than a recipe.</h2><p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/58">Follow one object from the workshop to the family table—and onwards to the person who receives its story.</p></Reveal>
        <div className="mt-16 grid items-start gap-8 lg:grid-cols-[1.16fr_.84fr] lg:gap-16">
          <div className="sticky top-[96px] h-[72svh] min-h-[580px] overflow-hidden rounded-[2rem] border border-white/12 bg-[#241711] shadow-[0_35px_100px_rgba(0,0,0,.35)]">
            <AnimatePresence mode="sync">
              <motion.div key={active.image} className="absolute inset-0" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .985 }} transition={{ duration: 1.05, ease: [.22, 1, .36, 1] }}>
                <DharoharImage src={active.image} alt="" fill unoptimized sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" style={{ objectPosition: activeStep === 0 ? "50% 30%" : "50% 50%" }} />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,8,5,.05),rgba(14,8,5,.08)_48%,rgba(14,8,5,.88)),linear-gradient(90deg,rgba(14,8,5,.24),transparent_55%)]" />
            <div className="ambient-window-light pointer-events-none absolute -inset-[20%]" />
            <div className="absolute inset-x-7 bottom-7 flex items-end justify-between gap-5 sm:inset-x-10 sm:bottom-10">
              <div><p className="text-[9px] font-bold uppercase tracking-[.22em] text-[#e2c27d]">{active.era}</p><p className="mt-2 max-w-lg font-serif text-4xl leading-none sm:text-5xl">{active.title}</p></div>
              <span className="portal-number font-serif text-7xl text-[#f1d99d]/35 sm:text-8xl">{active.number}</span>
            </div>
            <div className="absolute left-0 top-0 h-1 bg-[#d8b86b] transition-[width] duration-700" style={{ width: `${((activeStep + 1) / generations.length) * 100}%` }} />
          </div>
          <div className="relative">
            <div className="absolute bottom-[18%] left-[18px] top-[18%] w-px bg-white/12"><motion.span className="block w-px origin-top bg-[#d8b86b]" animate={{ height: `${((activeStep + 1) / generations.length) * 100}%` }} transition={{ duration: .65 }} /></div>
            {generations.map((item, index) => <motion.article key={item.number} onViewportEnter={() => setActiveStep(index)} viewport={{ amount: .58 }} className="flex min-h-[68svh] items-center py-14 pl-16"><div className={`transition duration-500 ${activeStep === index ? "opacity-100" : "opacity-[.38]"}`}><span className={`absolute left-[10px] mt-1 grid size-4 place-items-center rounded-full border transition ${activeStep === index ? "border-[#d8b86b] bg-[#d8b86b] shadow-[0_0_22px_rgba(216,184,107,.55)]" : "border-white/20 bg-[#17100c]"}`} /><p className="text-[9px] font-bold uppercase tracking-[.22em] text-[#d8b86b]">Chapter {item.number} · {item.era}</p><h3 className="mt-5 max-w-md font-serif text-5xl leading-[.92] sm:text-6xl">{item.title}</h3><p className="mt-6 max-w-md text-base leading-8 text-white/58">{item.copy}</p><p className="mt-8 inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[.18em] text-white/38"><span className="h-px w-8 bg-[#d8b86b]/55" /> Scroll to carry it forward</p></div></motion.article>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index, shortlisted, onShortlist }: { product: (typeof curatedProducts)[number]; index: number; shortlisted: boolean; onShortlist: () => void }) {
  return (
    <article className={`product-portrait group relative flex min-w-[84vw] snap-center flex-col overflow-hidden rounded-[1.6rem] border border-[#b78b3c]/25 bg-[#fffaf0] shadow-[0_24px_60px_rgba(91,56,21,.1)] sm:min-w-[440px] lg:min-w-0 ${index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-4"}`}>
      <div className={`relative overflow-hidden bg-[#ede3d6] ${index < 2 ? "aspect-[1.28/1]" : "aspect-square"}`}><DharoharImage src={product.image} alt={`${product.name}, ${product.material.toLowerCase()} cookware`} fill unoptimized sizes="(max-width: 1024px) 85vw, 42vw" className="object-cover transition duration-[1100ms] group-hover:scale-[1.035]" /><div className="product-glint absolute -inset-y-[20%] left-[-25%] w-[18%] rotate-12 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-sm" /><span className="absolute left-4 top-4 rounded-full border border-[#8b632a]/25 bg-[#fffaf0]/88 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[.18em] text-[#855d25] backdrop-blur">{product.material}</span><button type="button" aria-pressed={shortlisted} onClick={onShortlist} className={`absolute right-4 top-4 grid size-10 place-items-center rounded-full border backdrop-blur transition ${shortlisted ? "border-[#8f5f27] bg-[#8f5f27] text-white" : "border-[#8b632a]/25 bg-[#fffaf0]/88 text-[#855d25]"}`} aria-label={`${shortlisted ? "Remove" : "Add"} ${product.name} ${shortlisted ? "from" : "to"} shortlist`}><HeartHandshake size={17} /></button></div>
      <div className="flex flex-1 flex-col p-6 sm:p-7"><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#a27a3d]">Curator’s selection 0{index + 1}</p><h3 className="mt-3 font-serif text-4xl leading-none text-[#4c351f]">{product.name}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-[#746756]">{product.purpose}</p><div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-[#b78b3c]/20 pt-5"><span className="text-xs font-semibold text-[#8c652d]">{product.price}</span><StoreLink path={product.path} eventLabel={`product_${index + 1}`} className="inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[.16em] text-[#7b5522]">Discover <ArrowRight size={14} /></StoreLink></div></div>
    </article>
  );
}

function EditorialCollection() {
  const [shortlist, setShortlist] = useState<string[]>([]);
  const railRef = useRef<HTMLDivElement>(null);
  const shareShortlist = () => {
    const names = shortlist.length ? shortlist.join(", ") : "the Dharohar collection";
    const text = encodeURIComponent(`I would like to discuss ${names}. ${window.location.href.split("#")[0]}`);
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
    track("shortlist_share", shortlist.join("|") || "empty");
    window.open(`https://wa.me/${number}?text=${text}`, "_blank", "noopener,noreferrer");
  };
  const scrollRail = (direction: number) => railRef.current?.scrollBy({ left: direction * Math.min(window.innerWidth * .82, 520), behavior: "smooth" });

  return (
    <section id="collection" className="bg-[#f6efe3] px-5 py-[clamp(5rem,9vw,8rem)]" aria-labelledby="collection-title">
      <div className="site-container">
        <Reveal><div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between"><div><p className="heritage-label w-fit">A curated glimpse</p><h2 id="collection-title" className="heritage-display mt-7 max-w-4xl text-[clamp(3.5rem,6vw,6.5rem)] leading-[.88]">Objects chosen like chapters, not inventory.</h2></div><div className="max-w-md"><p className="text-sm leading-7 text-[#746756]">Add pieces that speak to you, then send the shortlist directly to a Dharohar consultant.</p><div className="mt-6 flex flex-wrap gap-3"><button type="button" onClick={shareShortlist} className="heritage-button heritage-button-filled"><MessageCircle size={15} /> Share shortlist {shortlist.length ? `(${shortlist.length})` : ""}</button><StoreLink path="/collections/all" eventLabel="collection_view_all" className="heritage-button">Complete store <ExternalLink size={14} /></StoreLink></div></div></div></Reveal>
        <div className="mt-8 flex justify-end gap-2 lg:hidden"><button type="button" onClick={() => scrollRail(-1)} aria-label="Previous collection pieces" className="grid size-11 place-items-center rounded-full border border-[#b78b3c]/35 text-[#765323]"><ChevronLeft size={18} /></button><button type="button" onClick={() => scrollRail(1)} aria-label="Next collection pieces" className="grid size-11 place-items-center rounded-full border border-[#b78b3c]/35 text-[#765323]"><ChevronRight size={18} /></button></div>
        <div ref={railRef} className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 lg:mt-12 lg:grid lg:grid-cols-12 lg:overflow-visible">{curatedProducts.map((product, index) => <ProductCard key={product.name} product={product} index={index} shortlisted={shortlist.includes(product.name)} onShortlist={() => setShortlist((current) => current.includes(product.name) ? current.filter((item) => item !== product.name) : [...current, product.name])} />)}</div>
        <p className="mt-3 text-center text-[10px] uppercase tracking-[.16em] text-[#8c765a]">Preview imagery and indicative prices are for review; the commerce catalogue remains the source of truth.</p>
      </div>
    </section>
  );
}

function GuidedFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ moment: "", cooking: "", household: "" });
  const questions = [
    { key: "moment", prompt: "What brings you here?", options: ["An everyday beginning", "A wedding or milestone", "A complete kitchen", "A design project"] },
    { key: "cooking", prompt: "What matters most?", options: ["Daily versatility", "Slow cooking", "Presentation", "A meaningful gift"] },
    { key: "household", prompt: "Who is this for?", options: ["One or two", "A growing family", "A large household", "Guests and hospitality"] },
  ] as const;
  const result = useMemo(() => {
    if (answers.moment.includes("wedding") || answers.cooking.includes("gift")) return { title: "A personalised celebration piece", copy: "Begin with copper or brass forms that allow engraving and presentation-ready gifting.", path: "/collections/wedding-gifts", image: "/images/curated/ptal-styled-copper-closed.webp", picks: [2, 5] };
    if (answers.moment.includes("complete") || answers.household.includes("large")) return { title: "A considered complete rasoi", copy: "Build a practical family set across sizes with a consultation before purchase.", path: "/collections/complete-rasoi", image: "/images/curated/ptal-brass-kadhai-set.webp", picks: [4, 1] };
    if (answers.moment.includes("design") || answers.household.includes("hospitality")) return { title: "A project-led collection", copy: "Start with a materials and volume conversation for spaces, tables and hospitality.", path: "/pages/trade-and-hospitality", image: "/images/indian-table.jpg", picks: [5, 2] };
    return { title: "One useful everyday heirloom", copy: "Start with a versatile brass kadhai or patila chosen for the food you make most.", path: "/collections/everyday-cookware", image: "/images/curated/ptal-brass-flat-kadhai.webp", picks: [0, 3] };
  }, [answers]);

  const visual = useMemo(() => {
    if (step >= questions.length) return { image: result.image, eyebrow: "Your recommendation", title: result.title };
    if (answers.moment.includes("wedding")) return { image: "/images/curated/ptal-styled-copper-closed.webp", eyebrow: "A milestone", title: "Warm copper. Personal marks. A memorable arrival." };
    if (answers.moment.includes("complete")) return { image: "/images/curated/ptal-brass-kadhai-set.webp", eyebrow: "A complete rasoi", title: "Several forms, chosen as one considered family system." };
    if (answers.moment.includes("design")) return { image: "/images/indian-table.jpg", eyebrow: "A composed space", title: "Material, scale and atmosphere considered together." };
    if (answers.moment.includes("everyday")) return { image: "/images/curated/ptal-brass-flat-kadhai.webp", eyebrow: "A daily beginning", title: "One useful form that earns its place through use." };
    return { image: "/images/curated/ptal-styled-copper-pair.webp", eyebrow: "The consultation table", title: "Your answers will change the room." };
  }, [answers, result, step, questions.length]);

  function choose(value: string) {
    const key = questions[step].key;
    setAnswers((current) => ({ ...current, [key]: value }));
    setStep((current) => current + 1);
  }

  return (
    <section id="finder" className="overflow-hidden bg-[#21150f] px-5 py-[clamp(5rem,9vw,8rem)] text-[#fff3da]" aria-labelledby="finder-title">
      <div className="site-container">
        <Reveal className="mx-auto max-w-5xl text-center"><p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#d8b86b]">A quiet recommendation</p><h2 id="finder-title" className="mt-6 font-serif text-[clamp(3.8rem,6vw,7rem)] leading-[.86]">Find your first Dharohar piece.</h2><p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-white/58">Three answers shape the object, material and atmosphere on your consultation table.</p></Reveal>
        <div className="mt-14 grid overflow-hidden rounded-[2rem] border border-white/12 bg-[#2b1c14] shadow-[0_35px_110px_rgba(0,0,0,.32)] lg:grid-cols-[.9fr_1.1fr]">
          <div className="flex min-h-[620px] flex-col justify-center p-6 sm:p-10 lg:p-12">
            <div className="mb-9 flex items-center gap-3">{questions.map((question, index) => <div key={question.key} className="flex items-center gap-3"><span className={`grid size-8 place-items-center rounded-full border text-[9px] font-bold transition ${index < step ? "border-[#d8b86b] bg-[#d8b86b] text-[#2b1c14]" : index === step ? "border-[#d8b86b] text-[#e5c98b]" : "border-white/14 text-white/28"}`}>{index < step ? <Check size={13} /> : index + 1}</span>{index < questions.length - 1 ? <span className={`h-px w-5 sm:w-9 ${index < step ? "bg-[#d8b86b]" : "bg-white/12"}`} /> : null}</div>)}</div>
            <AnimatePresence mode="wait">{step < questions.length ? <motion.div key={step} initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: .45 }}><p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#d8b86b]">Consultation chapter {step + 1}</p><h3 className="mt-5 font-serif text-4xl sm:text-5xl">{questions[step].prompt}</h3><div className="mt-8 grid gap-3">{questions[step].options.map((option) => <button key={option} type="button" onClick={() => choose(option)} className="group flex min-h-16 items-center justify-between rounded-2xl border border-white/12 bg-black/10 px-5 py-4 text-left text-sm text-white/70 transition hover:translate-x-1 hover:border-[#d8b86b]/65 hover:bg-[#d8b86b]/10 hover:text-white"><span>{option}</span><ArrowRight size={16} className="text-[#d8b86b] transition group-hover:translate-x-1" /></button>)}</div></motion.div> : <motion.div key="result" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}><WandSparkles className="text-[#d8b86b]" size={30} /><p className="mt-6 text-[9px] font-bold uppercase tracking-[.2em] text-[#d8b86b]">Your considered beginning</p><h3 className="mt-4 max-w-xl font-serif text-5xl leading-[.92] sm:text-6xl">{result.title}</h3><p className="mt-5 max-w-xl text-base leading-8 text-white/58">{result.copy}</p><div className="mt-8 flex flex-wrap gap-3"><StoreLink path={result.path} eventLabel="finder_result" className="heritage-button heritage-button-filled">Continue with this route <ArrowRight size={15} /></StoreLink><button type="button" onClick={() => { setStep(0); setAnswers({ moment: "", cooking: "", household: "" }); }} className="heritage-button !border-white/20 !text-white"><RotateCcw size={14} /> Begin again</button></div></motion.div>}</AnimatePresence>
          </div>
          <div className="relative min-h-[600px] overflow-hidden bg-[#3b261b]">
            <AnimatePresence mode="wait"><motion.div key={visual.image} className="absolute inset-0" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .985 }} transition={{ duration: .85 }}><DharoharImage src={visual.image} alt="Styled heritage cookware selected by the guided consultation" fill unoptimized sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /></motion.div></AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#160e09]/95 via-[#160e09]/12 to-black/5" />
            <div className="ambient-reflection pointer-events-none absolute inset-y-0 left-0 w-32" />
            <div className="absolute inset-x-7 bottom-7 sm:inset-x-9 sm:bottom-9"><p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#e2c27d]">{visual.eyebrow}</p><AnimatePresence mode="wait"><motion.h3 key={visual.title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mt-3 max-w-xl font-serif text-4xl leading-[.96] sm:text-5xl">{visual.title}</motion.h3></AnimatePresence>{step >= questions.length ? <div className="mt-6 grid grid-cols-2 gap-3">{result.picks.map((index) => { const product = curatedProducts[index]; return <div key={product.name} className="flex items-center gap-3 rounded-xl border border-white/15 bg-black/25 p-3 backdrop-blur"><span className="relative size-13 shrink-0 overflow-hidden rounded-lg"><DharoharImage src={product.image} alt="" fill unoptimized sizes="52px" className="object-cover" /></span><span><span className="block text-[8px] font-bold uppercase tracking-[.14em] text-[#e2c27d]">Suggested piece</span><span className="mt-1 block font-serif text-lg leading-none">{product.name}</span></span></div>; })}</div> : <div className="mt-5 flex flex-wrap gap-2">{Object.values(answers).filter(Boolean).map((answer) => <span key={answer} className="rounded-full border border-white/18 bg-black/18 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[.13em] text-white/65 backdrop-blur">{answer}</span>)}</div>}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PassportExperience() {
  const [activeId, setActiveId] = useState("maker");
  const active = passportDetails.find((item) => item.id === activeId) ?? passportDetails[0];
  const Icon = active.icon;
  return (
    <section id="passport" className="overflow-hidden bg-[#fffaf0] px-5 py-[clamp(5rem,9vw,8rem)]" aria-labelledby="passport-title">
      <div className="site-container grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <Reveal className="relative min-h-[680px] overflow-hidden rounded-[2rem]"><DharoharImage src="/images/artisan.jpg" alt="Metal artisan working in a traditional workshop" fill unoptimized sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" style={{ objectPosition: "50% 30%" }} /><div className="absolute inset-0 bg-gradient-to-t from-[#160e09]/92 via-transparent to-transparent" /><div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/25 bg-[#fffaf0]/92 p-6 text-[#4b3824] shadow-2xl backdrop-blur sm:inset-x-8 sm:bottom-8"><div className="flex items-center justify-between gap-4"><div><p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#9d712a]">Demonstration passport</p><p className="mt-2 font-serif text-3xl">DH–2037 · Family Lagaan</p></div><QrCode size={34} className="text-[#8b632a]" /></div><AnimatePresence mode="wait"><motion.div key={active.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-5 border-t border-[#b78b3c]/20 pt-5"><div className="flex items-start gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#9d712a] text-white"><Icon size={18} /></span><div><h3 className="font-serif text-2xl">{active.title}</h3><p className="mt-2 text-sm leading-6 text-[#746756]">{active.copy}</p></div></div></motion.div></AnimatePresence></div></Reveal>
        <Reveal delay={.12}><p className="heritage-label w-fit">Heritage passport</p><h2 id="passport-title" className="heritage-display mt-7 text-[clamp(3.6rem,6vw,6.5rem)] leading-[.88]">The story stays with the object.</h2><p className="mt-6 max-w-xl text-base leading-8 text-[#746756]">Open each chapter of the passport to see how provenance can remain legible long after the box is gone.</p><div className="mt-9 space-y-2">{passportDetails.map((item, index) => { const ItemIcon = item.icon; const selected = activeId === item.id; return <button key={item.id} type="button" onClick={() => setActiveId(item.id)} className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${selected ? "border-[#b78b3c] bg-[#f0e1c8]" : "border-[#b78b3c]/18 bg-transparent hover:border-[#b78b3c]/45"}`}><span className={`grid size-11 place-items-center rounded-full ${selected ? "bg-[#9d712a] text-white" : "bg-[#efe2ce] text-[#9d712a]"}`}><ItemIcon size={18} /></span><span><span className="block text-[9px] font-bold uppercase tracking-[.18em] text-[#9a8468]">Chapter 0{index + 1}</span><span className="mt-1 block font-serif text-2xl text-[#4d3823]">{item.label}</span></span><ArrowRight size={15} className="ml-auto text-[#9d712a]" /></button>; })}</div></Reveal>
      </div>
    </section>
  );
}

function PersonalisationStudio() {
  const [engraving, setEngraving] = useState("The Sharma Family");
  const [style, setStyle] = useState<"family" | "wedding" | "message">("family");
  const placeholders = { family: "The Sharma Family", wedding: "Aarav & Meera · 2027", message: "With love, always" };
  return (
    <section id="legacy" className="overflow-hidden bg-[#efe1cb] px-5 py-[clamp(5rem,9vw,8rem)]" aria-labelledby="legacy-title">
      <div className="site-container grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <Reveal className="relative mx-auto aspect-square w-full max-w-[680px] overflow-hidden rounded-full border-[16px] border-[#fffaf0]/70 bg-[#c38257] shadow-[0_38px_100px_rgba(94,52,23,.22)]"><Image src="/images/curated/ptal-copper-madurai-handi.webp" alt="Copper handi with a live engraving preview" fill unoptimized sizes="(max-width: 1024px) 95vw, 52vw" className="object-cover" /><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(56,24,10,.32)_100%)]" /><div className="absolute inset-x-[17%] bottom-[17%] rounded-xl border border-[#ffe2b3]/35 bg-[#4e2615]/42 px-4 py-4 text-center text-[#ffe6b8] shadow-2xl backdrop-blur-[3px]"><Feather className="mx-auto mb-2" size={19} strokeWidth={1.2} /><AnimatePresence mode="wait"><motion.p key={`${style}-${engraving}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="font-serif text-[clamp(1.25rem,4vw,2.3rem)] leading-none text-shadow-sm">{engraving || placeholders[style]}</motion.p></AnimatePresence><p className="mt-2 text-[7px] font-bold uppercase tracking-[.28em] text-[#f4c77d]">Preview engraving</p></div><div className="ambient-reflection pointer-events-none absolute inset-y-0 left-0 w-28" /></Reveal>
        <Reveal delay={.12}><p className="heritage-label w-fit">Personalisation studio</p><h2 id="legacy-title" className="heritage-display mt-7 text-[clamp(3.6rem,6vw,6.5rem)] leading-[.88]">See your story on the object.</h2><p className="mt-6 max-w-xl text-base leading-8 text-[#746756]">Create a live first impression. Final placement, scale and spelling remain subject to engraving approval.</p><div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Engraving type">{(["family", "wedding", "message"] as const).map((item) => <button key={item} type="button" onClick={() => { setStyle(item); setEngraving(placeholders[item]); }} className={`rounded-full border px-4 py-2 text-[9px] font-bold uppercase tracking-[.16em] transition ${style === item ? "border-[#8f5f27] bg-[#8f5f27] text-white" : "border-[#b78b3c]/35 text-[#765323]"}`}>{item === "family" ? "Family name" : item === "wedding" ? "Wedding date" : "Short message"}</button>)}</div><label className="mt-6 block max-w-lg"><span className="heritage-field-label">Your engraving preview</span><input value={engraving} maxLength={32} onChange={(event) => setEngraving(event.target.value)} className="heritage-input" aria-label="Your engraving preview" /></label><div className="mt-6 flex flex-wrap gap-3"><StoreLink path="/collections/personalised-gifts" eventLabel="personalisation_continue" className="heritage-button heritage-button-filled">Personalise on the store <ArrowRight size={15} /></StoreLink><a href="#consultation" className="heritage-button">Ask an engraving expert</a></div><div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-xs text-[#725c41]">{["Product selection", "Engraving approval", "Presentation-ready packaging"].map((item) => <span key={item} className="flex items-center gap-2"><Check size={14} className="text-[#a4772d]" />{item}</span>)}</div></Reveal>
      </div>
    </section>
  );
}

function OccasionRoutes() {
  return <section id="occasions" className="bg-[#fffaf0] px-5 py-[clamp(5rem,9vw,8rem)]" aria-labelledby="occasions-title"><div className="site-container"><Reveal className="mx-auto max-w-4xl text-center"><p className="heritage-label">Shop by intention</p><h2 id="occasions-title" className="heritage-display mt-7 text-[clamp(3.5rem,6vw,6.4rem)] leading-[.88]">Four doorways into Dharohar.</h2><p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#746756]">Every route preserves your purpose before you enter the commerce catalogue.</p></Reveal><div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible">{intentions.map((item, index) => { const Icon = item.icon; return <motion.article key={item.title} whileHover={{ y: -7 }} transition={{ duration: .35 }} className="group relative min-h-[460px] min-w-[85vw] snap-center overflow-hidden rounded-[1.8rem] text-white md:min-w-0"><DharoharImage src={item.image} alt="" fill unoptimized sizes="(max-width: 768px) 88vw, 50vw" className="object-cover transition duration-[1200ms] group-hover:scale-[1.045]" /><div className="absolute inset-0 bg-gradient-to-t from-[#160e09]/95 via-[#160e09]/28 to-black/5" /><div className="absolute inset-x-0 bottom-0 p-7 sm:p-9"><span className="grid size-12 place-items-center rounded-full border border-white/30 bg-black/15 backdrop-blur"><Icon size={21} /></span><p className="mt-5 text-[9px] font-bold uppercase tracking-[.2em] text-[#e2c27d]">{item.eyebrow}</p><h3 className="mt-2 font-serif text-4xl sm:text-5xl">{item.title}</h3><p className="mt-3 max-w-md text-sm leading-6 text-white/64">{item.copy}</p><StoreLink path={item.path} eventLabel={`intention_${index + 1}`} className="mt-6 inline-flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[.16em] text-[#f2d79c]">{item.cta} <ArrowRight size={14} /></StoreLink></div></motion.article>; })}</div></div></section>;
}

function TrustSequence() {
  const steps = [
    { icon: ShieldCheck, stage: "Before purchase", title: "Material clarity", copy: "Understand composition, use and care before choosing." },
    { icon: Hammer, stage: "With the object", title: "Visible making", copy: "Keep the maker and craft process connected to the piece." },
    { icon: BookOpenText, stage: "Through ownership", title: "Recorded provenance", copy: "Carry names, dates and guidance beyond the packaging." },
    { icon: HeartHandshake, stage: "Years later", title: "A route back to care", copy: "Make polishing, repair and restoration easy to begin." },
  ];
  return <section className="border-y border-[#b78b3c]/20 bg-[#f5ecdd] px-5 py-[clamp(4rem,7vw,6rem)]" aria-labelledby="trust-title"><div className="site-container"><Reveal><div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p className="heritage-label w-fit">Proof before promise</p><h2 id="trust-title" className="heritage-display mt-6 text-[clamp(3rem,5vw,5rem)]">Confidence across the object’s lifetime.</h2></div><p className="max-w-md text-sm leading-7 text-[#746756]">Real client testimonials and press marks should be added only after approval; this review version uses verifiable experience commitments instead.</p></div></Reveal><div className="mt-10 grid gap-px overflow-hidden rounded-[1.5rem] border border-[#b78b3c]/20 bg-[#b78b3c]/20 sm:grid-cols-2 lg:grid-cols-4">{steps.map((item, index) => { const Icon = item.icon; return <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} className="bg-[#fffaf0] p-6"><Icon size={21} className="text-[#a4772d]" /><p className="mt-5 text-[9px] font-bold uppercase tracking-[.18em] text-[#9a8468]">{item.stage}</p><h3 className="mt-2 font-serif text-3xl text-[#4d3823]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#746756]">{item.copy}</p></motion.div>; })}</div></div></section>;
}

function ConsultationGateway() {
  const [status, setStatus] = useState("We usually reply within one working day.");
  const [interest, setInterest] = useState("Complete heritage kitchen");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const interest = String(form.get("interest") ?? "");
    const timing = String(form.get("timing") ?? "");
    const occasionDate = String(form.get("occasionDate") ?? "");
    const quantity = String(form.get("quantity") ?? "");
    const budget = String(form.get("budget") ?? "");
    const message = String(form.get("message") ?? "");
    const destination = process.env.NEXT_PUBLIC_CONSULTATION_EMAIL ?? "hello@dharohar.in";
    const subject = encodeURIComponent(`Dharohar consultation — ${interest || "heritage kitchen"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nInterest: ${interest}\nPreferred timing: ${timing}\nOccasion date: ${occasionDate || "Not specified"}\nQuantity: ${quantity || "Not specified"}\nBudget: ${budget || "Not specified"}\n\n${message}`);
    track("consultation_start", interest || "general");
    setStatus("Your email app is opening with the enquiry prepared.");
    window.location.href = `mailto:${destination}?subject=${subject}&body=${body}`;
  }
  const gifting = interest === "Wedding or festive gifting";
  return <form onSubmit={submit} className="consultation-card rounded-[2rem] border border-[#d8b86b]/24 bg-[#f4eadb]/96 p-6 text-[#3c2a1e] shadow-[0_28px_90px_rgba(0,0,0,.28)] backdrop-blur sm:p-8"><div className="mb-6 flex items-center justify-between gap-4 border-b border-[#9a7040]/18 pb-5"><div><p className="text-[8px] font-bold uppercase tracking-[.2em] text-[#9a7040]">Private consultation</p><p className="mt-1 font-serif text-2xl">A thoughtful first conversation</p></div><span className="grid size-12 place-items-center rounded-full border border-[#9a7040]/30 text-[#9a7040]"><Feather size={18} /></span></div><div className="grid gap-4 sm:grid-cols-2"><label><span className="consult-label">Your name</span><input required name="name" className="consult-input" placeholder="Name" /></label><label><span className="consult-label">Email</span><input required name="email" type="email" className="consult-input" placeholder="you@example.com" /></label></div><div className="mt-4 grid gap-4 sm:grid-cols-2"><label><span className="consult-label">I am interested in</span><select name="interest" className="consult-input" value={interest} onChange={(event) => setInterest(event.target.value)}><option>Complete heritage kitchen</option><option>Wedding or festive gifting</option><option>Everyday cookware</option><option>Design or hospitality project</option><option>Engraving consultation</option></select></label><label><span className="consult-label">Preferred time</span><select name="timing" className="consult-input" defaultValue="Weekday morning"><option>Weekday morning</option><option>Weekday afternoon</option><option>Weekday evening</option><option>Weekend</option></select></label></div><AnimatePresence initial={false}>{gifting ? <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="mt-4 grid gap-4 sm:grid-cols-3"><label><span className="consult-label">Occasion date</span><input name="occasionDate" type="date" className="consult-input" /></label><label><span className="consult-label">Quantity</span><input name="quantity" inputMode="numeric" className="consult-input" placeholder="e.g. 25" /></label><label><span className="consult-label">Budget range</span><input name="budget" className="consult-input" placeholder="₹ range" /></label></div></motion.div> : null}</AnimatePresence><label className="mt-4 block"><span className="consult-label">Tell us a little more</span><textarea name="message" rows={4} className="consult-input h-auto resize-none py-3" placeholder="The occasion, family size, preferred metals or engraving needs…" /></label><button type="submit" className="mt-4 inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-xl bg-[#251711] px-6 text-[10px] font-bold uppercase tracking-[.15em] text-[#f6e7cb] transition hover:bg-[#3b2419]">Prepare consultation request <Send size={15} /></button><p aria-live="polite" className="mt-3 min-h-5 text-center text-xs text-[#7d5b36]">{status}</p></form>;
}

function StoreHandoff({ intent, onClose }: { intent: StoreIntent; onClose: () => void }) {
  const connected = intent.href !== "#consultation";
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", closeOnEscape);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", closeOnEscape); };
  }, [onClose]);
  return <motion.div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/55 p-3 backdrop-blur-sm sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="handoff-title" aria-describedby="handoff-description" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}><motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: .45, ease: [.22, 1, .36, 1] }} className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-[#d8b86b]/30 bg-[#20150f] p-7 text-[#fff3da] shadow-2xl sm:p-10"><button autoFocus type="button" onClick={onClose} aria-label="Close store handoff" className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-white/15 text-white/65"><X size={17} /></button><p className="text-[9px] font-bold uppercase tracking-[.22em] text-[#d8b86b]">Your intention is remembered</p><h2 id="handoff-title" className="mt-5 max-w-lg font-serif text-5xl leading-[.92]">{connected ? "Continue into the commerce collection." : "The commerce connection is being prepared."}</h2><p id="handoff-description" className="mt-5 max-w-lg text-sm leading-7 text-white/58">{connected ? "You’re leaving the brand experience for the most relevant purchasing route. Availability and final pricing will be confirmed there." : "For this review build, store routes lead to a private consultation until the purchasing-site URL is supplied."}</p><div className="mt-8 flex flex-wrap gap-3">{connected ? <a href={intent.href} onClick={() => track("store_continue", intent.label)} className="heritage-button heritage-button-filled">Continue to store <ExternalLink size={14} /></a> : <a href="#consultation" onClick={onClose} className="heritage-button heritage-button-filled">Continue to consultation <ArrowRight size={14} /></a>}<button type="button" onClick={onClose} className="heritage-button !border-white/20 !text-white">Stay in the story</button></div></motion.div></motion.div>;
}

export function BrandGateway() {
  const [storeIntent, setStoreIntent] = useState<StoreIntent | null>(null);
  useEffect(() => {
    const listener = (event: Event) => setStoreIntent((event as CustomEvent<StoreIntent>).detail);
    window.addEventListener("dharohar:store-intent", listener);
    return () => window.removeEventListener("dharohar:store-intent", listener);
  }, []);

  const booking = process.env.NEXT_PUBLIC_BOOKING_URL;
  return (
    <>
      <DharoharLoader />
      <GatewayHeader />
      <main>
        <CinematicHero />
        <section className="marquee-mask overflow-hidden border-y border-[#b78b3c]/25 bg-[#fff8eb]" aria-label="Dharohar assurances"><div className="heritage-marquee flex w-max">{[0, 1].map((set) => <div key={set} aria-hidden={set === 1} className="flex">{[[Hammer, "Handcrafted in India"], [ShieldCheck, "Copper, brass & kansa"], [Feather, "Personal engraving"], [HeartHandshake, "Lifetime restoration"]].map(([Icon, label]) => <div key={`${set}-${label as string}`} className="flex min-w-[300px] items-center gap-4 border-r border-[#b78b3c]/20 px-8 py-5"><span className="grid size-11 place-items-center rounded-full border border-[#b78b3c]/40 text-[#a4772d]"><Icon size={19} /></span><span className="font-serif text-xl text-[#4f3b25]">{label as string}</span></div>)}</div>)}</div></section>
        <MaterialExplorer />
        <GenerationalStory />
        <EditorialCollection />
        <GuidedFinder />
        <PassportExperience />
        <PersonalisationStudio />
        <OccasionRoutes />
        <TrustSequence />
        <section id="consultation" className="consultation-salon relative isolate overflow-hidden bg-[#100b08] px-5 text-[#fff8e9]" aria-labelledby="consultation-title"><Image src="/images/curated/ptal-styled-copper-detail.webp" alt="" fill unoptimized sizes="100vw" className="-z-30 object-cover opacity-[.38]" style={{ objectPosition: "30% 50%" }} /><div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(16,11,8,.94),rgba(16,11,8,.82)_43%,rgba(16,11,8,.66)),radial-gradient(circle_at_20%_45%,rgba(171,90,49,.28),transparent_38%)]" /><div className="ambient-window-light pointer-events-none absolute -inset-[20%] -z-10" /><div className="site-container grid gap-14 py-[clamp(6rem,10vw,9rem)] lg:grid-cols-[.9fr_1.1fr] lg:items-center"><Reveal><div className="mb-9 inline-flex items-center gap-3 rounded-full border border-[#e0bd76]/25 bg-black/20 px-4 py-2 backdrop-blur"><span className="grid size-7 place-items-center rounded-full bg-[#e0bd76] text-[#2b1a12]"><Feather size={13} /></span><span className="text-[8px] font-bold uppercase tracking-[.2em] text-[#e8cc91]">The Dharohar private salon</span></div><p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#e0bd76]">Gift concierge · Kitchen consultation</p><h2 id="consultation-title" className="mt-5 max-w-2xl font-serif text-[clamp(3.8rem,6vw,6.8rem)] leading-[.88]">A quieter way to begin.</h2><p className="mt-6 max-w-xl text-base leading-8 text-white/65">Tell us about the rituals, gifting moment or design project you are considering. We’ll prepare a thoughtful route into the collection.</p><div className="mt-8 flex flex-wrap gap-3">{booking ? <a href={booking} target="_blank" rel="noreferrer" onClick={() => track("booking_click", "consultation")} className="heritage-button !border-[#e0bd76] !bg-[#f2dfbd] !text-[#2c1c13]"><CalendarDays size={15} /> Reserve 20 minutes</a> : <a href={`mailto:${process.env.NEXT_PUBLIC_CONSULTATION_EMAIL ?? "hello@dharohar.in"}?subject=Dharohar%2020-minute%20consultation`} className="heritage-button !border-[#e0bd76] !bg-[#f2dfbd] !text-[#2c1c13]"><Clock3 size={15} /> Request 20 minutes</a>}<a href={`mailto:${process.env.NEXT_PUBLIC_CONSULTATION_EMAIL ?? "hello@dharohar.in"}`} className="heritage-button !border-white/25 !text-white"><Mail size={15} /> Email directly</a></div><div className="mt-10 flex flex-wrap gap-5 text-xs text-white/55"><span className="flex items-center gap-2"><Users size={15} className="text-[#e0bd76]" /> Personal recommendations</span><span className="flex items-center gap-2"><Gift size={15} className="text-[#e0bd76]" /> Gifting and engraving</span></div></Reveal><ConsultationGateway /></div></section>
      </main>
      <footer className="border-t border-white/10 bg-[#18110d] px-5 text-[#fff5df]"><div className="site-container flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between"><a href="#top" className="flex items-center gap-3"><span className="relative size-14 overflow-hidden rounded-full bg-[#fffaf0]"><Image src="/images/dharohar-mark.png" alt="" fill unoptimized sizes="56px" className="object-contain mix-blend-multiply" /></span><span><strong className="block font-serif text-2xl tracking-[.12em]">DHAROHAR</strong><span className="text-[7px] font-bold uppercase tracking-[.3em] text-[#d8b86b]">Heritage Kitchen</span></span></a><nav className="flex flex-wrap gap-x-6 gap-y-3 text-[9px] font-bold uppercase tracking-[.15em] text-white/48" aria-label="Footer navigation"><a href="#materials" className="hover:text-white">Materials</a><a href="#journey" className="hover:text-white">Our story</a><a href="#collection" className="hover:text-white">Collection</a><a href="#finder" className="hover:text-white">Finder</a><a href="#consultation" className="hover:text-white">Consultation</a><StoreLink path="/collections/all" eventLabel="footer_visit_store" className="inline-flex items-center gap-1 text-[#e2c27d]">Visit store <ArrowRight size={11} /></StoreLink></nav><p className="text-[9px] uppercase tracking-[.12em] text-white/32">© 2026 Dharohar</p></div></footer>
      <AnimatePresence>{storeIntent ? <StoreHandoff intent={storeIntent} onClose={() => setStoreIntent(null)} /> : null}</AnimatePresence>
    </>
  );
}
