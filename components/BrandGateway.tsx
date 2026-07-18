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
  History,
  Mail,
  Menu,
  MessageCircle,
  PackageCheck,
  PenLine,
  QrCode,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Droplets,
  Users,
  Wrench,
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
  useRef,
  useState,
} from "react";

type StoreIntent = { href: string; label: string; path: string };
type StoreLinkProps = ComponentPropsWithoutRef<"a"> & { path: string; eventLabel: string };

const gatewayLinks = [["Materials", "#materials"], ["Your story", "#legacy"], ["Material wisdom", "#care-guide"], ["Objects", "#rituals"], ["Lifetime care", "#restoration"]] as const;

const heroFrames = [
  { image: "/images/curated/ptal-styled-copper-pair.webp", label: "Objects held in light", position: "50% 50%" },
  { image: "/images/curated/ptal-copper-dispenser-lifestyle.jpg", label: "The water ritual", position: "50% 48%" },
  { image: "/images/curated/brass-ladles-clean.png", label: "Tools of the rasoi", position: "50% 62%" },
  { image: "/images/curated/ptal-brass-masala-box.jpg", label: "Objects of preparation", position: "50% 50%" },
  { image: "/images/curated/ptal-brass-paraat.jpg", label: "The preparation form", position: "50% 54%" },
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
    image: "/images/curated/kansa-thaali-clean.jpg",
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
  { id: "guidance", icon: HeartHandshake, label: "Care guidance", title: "Guidance shaped around the object.", copy: "Cleaning, storage, food compatibility and everyday care remain easy to revisit whenever the piece is used." },
  { id: "restoration", icon: History, label: "Restoration history", title: "Every return becomes a chapter.", copy: "Re-tinning, polishing, dent repair and engraving updates form a dated service record instead of disappearing with time." },
  { id: "family", icon: PenLine, label: "Engraving & family record", title: "Ownership carries meaning.", copy: "Names, dates and the reason the piece entered the family create a provenance that can travel with it." },
  { id: "transfer", icon: BookOpenText, label: "Next keeper", title: "The record travels forward.", copy: "A future owner receives the maker story, care history and family context together with the physical object." },
] as const;

const intentions = [
  { eyebrow: "Cook", title: "At the flame", copy: "Kadhais, handis, patilas, lagans and tawas for the meals your home returns to.", image: "/images/curated/ptal-brass-flat-kadhai.webp", path: "/collections/everyday-cookware", cta: "Enter cookware", icon: HeartHandshake },
  { eyebrow: "Serve", title: "Around the table", copy: "Thalis, bowls, platters, cutlery and serving forms that turn food into gathering.", image: "/images/curated/kansa-thaali-clean.jpg", path: "/collections/tableware", cta: "Set the table", icon: PackageCheck },
  { eyebrow: "Hydrate", title: "The water ritual", copy: "Copper bottles, tumblers, glasses, carafes, jugs and dispensers for considered daily use.", image: "/images/curated/ptal-copper-dispenser-lifestyle.jpg", path: "/collections/drinkware", cta: "Explore hydration", icon: Droplets },
  { eyebrow: "Gift", title: "For a milestone", copy: "Personalised pieces and presentation-ready sets for beginnings worth remembering.", image: "/images/curated/brass-davara-clean.jpg", path: "/collections/wedding-gifts", cta: "Choose a gift", icon: Gift },
  { eyebrow: "Restore", title: "Return it to care", copy: "A clear route to re-tinning, polishing, dent repair, engraving updates and expert guidance.", image: "/images/artisan.jpg", path: "/pages/restoration-care", cta: "Begin restoration", icon: Wrench },
] as const;

const ritualWorlds = [
  {
    id: "hydrate",
    eyebrow: "Hydration ritual",
    title: "Water, carried beautifully.",
    copy: "From a hand-hammered bottle at your desk to tumblers, carafes, jugs and dispensers at the family table.",
    image: "/images/curated/ptal-copper-dispenser-lifestyle.jpg",
    path: "/collections/drinkware",
    objects: ["Bottles", "Tumblers", "Glasses", "Carafes & jugs", "Dispensers"],
    gallery: [["/images/curated/ptal-copper-bottle.jpg", "Copper bottle"], ["/images/curated/ptal-copper-dispenser-lifestyle.jpg", "Copper water vessel"], ["/images/curated/ptal-copper-dispenser.png", "Water dispenser"]],
  },
  {
    id: "morning",
    eyebrow: "Morning ritual",
    title: "The first pour of the day.",
    copy: "Davara coffee sets and small serving forms made for familiar gestures that deserve better objects.",
    image: "/images/curated/brass-davara-clean.jpg",
    path: "/collections/drinkware",
    objects: ["Davara sets", "Coffee tumblers", "Tea service", "Small trays"],
    gallery: [["/images/curated/brass-davara-clean.jpg", "Brass davara set"], ["/images/curated/ptal-copper-bottle.jpg", "Copper bottle"], ["/images/curated/ptal-brass-roti-box.jpg", "Brass roti box"]],
  },
  {
    id: "table",
    eyebrow: "Table ritual",
    title: "A table with material memory.",
    copy: "Thalis, bowls, platters and cutlery composed as a warm, generous landscape rather than separate products.",
    image: "/images/curated/kansa-thaali-clean.jpg",
    path: "/collections/tableware",
    objects: ["Thalis", "Bowls", "Platters", "Cutlery", "Serveware"],
    gallery: [["/images/curated/kansa-thaali-clean.jpg", "Kansa thali"], ["/images/curated/ptal-brass-cutlery.jpg", "Engraved cutlery"], ["/images/curated/ptal-brass-roti-box.jpg", "Roti dabba"]],
  },
  {
    id: "prepare",
    eyebrow: "Kitchen ritual",
    title: "Before the flame is lit.",
    copy: "Paraats, masala boxes, ghee pots and ladles bring craft into the quieter moments of preparation.",
    image: "/images/curated/brass-ladles-clean.png",
    path: "/collections/kitchen-utensils",
    objects: ["Paraats", "Masala boxes", "Ghee pots", "Ladles", "Preparation bowls"],
    gallery: [["/images/curated/ptal-brass-paraat.jpg", "Brass paraat"], ["/images/curated/ptal-brass-masala-box.jpg", "Masala daani"], ["/images/curated/brass-ladles-clean.png", "Ladle set"]],
  },
] as const;

const utensilCarousel = [
  { number: "01", name: "Masala Daani", material: "Hammered brass", purpose: "Preparation", copy: "A lidded spice box that brings a familiar kitchen object into sharper material focus.", image: "/images/curated/ptal-brass-masala-box.jpg", path: "/products/brass-masala-box" },
  { number: "02", name: "Brass Paraat", material: "Hand-shaped brass", purpose: "Mixing & kneading", copy: "A broad preparation form with a luminous hammered surface and generous working area.", image: "/images/curated/ptal-brass-paraat.jpg", path: "/products/brass-paraat" },
  { number: "03", name: "Rasoi Ladle Set", material: "Brass · Wood", purpose: "Cooking tools", copy: "Four distinct working ends turn the everyday cooking tool into a considered set.", image: "/images/curated/brass-ladles-clean.png", path: "/products/set-of-brass-ladles" },
  { number: "04", name: "Roti Dabba", material: "Hammered brass", purpose: "Table service", copy: "A warm, sculptural chapati box designed to move easily from kitchen to table.", image: "/images/curated/ptal-brass-roti-box.jpg", path: "/products/brass-chapati-box-roti-dabba" },
  { number: "05", name: "Engraved Cutlery", material: "Patterned brass", purpose: "Table detail", copy: "Forks and spoons with a decorative handle language that rewards a closer look.", image: "/images/curated/ptal-brass-cutlery.jpg", path: "/products/brass-spoons-forks" },
  { number: "06", name: "Kansa Thaali", material: "Kansa bronze", purpose: "Dining ritual", copy: "A complete plate, bowls, glass and spoon composed as one material family.", image: "/images/curated/kansa-thaali-clean.jpg", path: "/products/kansa-thaali-set" },
  { number: "07", name: "Copper Bottle", material: "Hammered copper", purpose: "Hydration", copy: "A modern upright form with a tactile hammered body and cork-finished cap.", image: "/images/curated/ptal-copper-bottle.jpg", path: "/products/copper-water-bottle" },
  { number: "08", name: "Davara Set", material: "Polished brass", purpose: "Morning ritual", copy: "A paired coffee service that carries a distinctly Indian ritual into the present.", image: "/images/curated/brass-davara-clean.jpg", path: "/products/brass-dabara-coffee-serving-tumbler-set-set-of-2" },
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

function storeHandoffSeen() {
  try {
    return window.sessionStorage.getItem("dharohar-store-handoff-seen") === "true";
  } catch {
    return false;
  }
}

function rememberStoreHandoff() {
  try {
    window.sessionStorage.setItem("dharohar-store-handoff-seen", "true");
  } catch {
    // Direct store navigation still works when storage is unavailable.
  }
}

function StoreLink({ path, eventLabel, onClick, ...props }: StoreLinkProps) {
  const href = storeHref(path, eventLabel);
  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        track("store_intent", eventLabel);
        onClick?.(event);
        if (event.defaultPrevented) return;
        const handoffSeen = href !== "#consultation" && storeHandoffSeen();
        if (handoffSeen) {
          track("store_direct", eventLabel);
          return;
        }
        event.preventDefault();
        window.dispatchEvent(new CustomEvent<StoreIntent>("dharohar:store-intent", { detail: { href, label: eventLabel, path } }));
      }}
    />
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: .76, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-36px" }} transition={{ duration: .72, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

function GatewayHeader() {
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#top");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: .25 });

  useEffect(() => {
    const sections = ["top", ...gatewayLinks.map(([, href]) => href.slice(1))].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveHref(`#${visible.target.id}`);
    }, { rootMargin: "-28% 0px -58%", threshold: [0, .2, .55] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="bg-[#120c09] px-3 py-2 text-center text-[7px] font-bold uppercase tracking-[.15em] text-[#d9bd83] sm:px-5 sm:py-2.5 sm:text-[9px] sm:tracking-[.22em]">Handcrafted in India · Pure metals · Personal stories · Lifetime care</div>
      <header className="sticky top-0 z-50 border-b border-[#d8b86b]/20 bg-[#18110d]/95 text-[#fff1d2] shadow-[0_10px_35px_rgba(0,0,0,.2)] backdrop-blur-xl">
        <motion.div className="absolute inset-x-0 top-0 h-px origin-left bg-[#e1bd6d]" style={{ scaleX: progress }} />
        <div className="site-container flex h-[70px] items-center justify-between gap-2 sm:h-[76px] sm:gap-5">
          <a href="#top" aria-label="Dharohar home" className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
            <span className="relative block size-10 shrink-0 overflow-hidden rounded-full bg-[#fffaf0] sm:size-13"><Image src="/images/dharohar-mark.png" alt="" fill priority unoptimized sizes="52px" className="object-contain mix-blend-multiply" /></span>
            <span className="min-w-0"><strong className="block whitespace-nowrap font-serif text-[1.35rem] font-medium tracking-[.065em] text-[#f2dcae] sm:text-3xl sm:tracking-[.1em]">DHAROHAR</strong><span className="hidden text-[7px] font-bold uppercase tracking-[.31em] text-[#cda75e] sm:block">Heritage Kitchen</span></span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">{gatewayLinks.map(([label, href]) => <a key={href} href={href} aria-current={activeHref === href ? "location" : undefined} className={`relative py-3 text-[9px] font-bold uppercase tracking-[.16em] transition after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:bg-[#e2c27d] after:transition-transform ${activeHref === href ? "text-[#e2c27d] after:scale-x-100" : "text-white/60 after:scale-x-0 hover:text-[#e2c27d] hover:after:scale-x-100"}`}>{label}</a>)}</nav>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <StoreLink path="/collections/all" eventLabel="header_visit_store" className="header-store-compact" aria-label="Visit the Dharohar store">Store <ExternalLink size={12} /></StoreLink>
            <StoreLink path="/collections/all" eventLabel="header_visit_store" className="header-store-full heritage-button heritage-button-filled">Visit store <ExternalLink size={14} /></StoreLink>
            <button type="button" className="grid size-10 shrink-0 place-items-center rounded-full border border-[#d8b86b]/30 text-[#e2c27d] sm:size-11 lg:hidden" aria-expanded={open} aria-controls="gateway-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>{open ? <X size={19} /> : <Menu size={19} />}</button>
          </div>
        </div>
        <AnimatePresence>{open ? <motion.div id="gateway-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-[#d8b86b]/20 bg-[#18110d] px-5 lg:hidden"><nav className="site-container flex flex-col py-4" aria-label="Mobile navigation">{gatewayLinks.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-white/10 py-4 font-serif text-3xl">{label}</a>)}<StoreLink path="/collections/all" eventLabel="mobile_visit_store" onClick={() => setOpen(false)} className="heritage-button heritage-button-filled my-5 justify-center">Visit the store <ArrowRight size={15} /></StoreLink></nav></motion.div> : null}</AnimatePresence>
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .78 }} className="mt-8 flex flex-wrap gap-3"><StoreLink path="/collections/all" eventLabel="hero_shop_collection" className="heritage-button heritage-button-filled">Enter the collection <ArrowRight size={16} /></StoreLink><a href="#legacy" className="heritage-button !border-white/35 !text-[#fff5df] hover:!border-[#dfbd77]">Follow the story</a></motion.div>
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
    <section id="materials" className="overflow-hidden px-5 py-[clamp(3.75rem,6vw,6rem)] transition-colors duration-700" style={{ background: `radial-gradient(circle at 84% 18%, ${active.tone}26, transparent 34%), #f5ecdd` }} aria-labelledby="materials-title">
      <div className="site-container">
        <Reveal><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><p className="heritage-label w-fit">Material, understood</p><h2 id="materials-title" className="heritage-display mt-5 max-w-4xl text-[clamp(3.1rem,5vw,5.5rem)] leading-[.9]">Choose the character of your kitchen.</h2></div><p className="max-w-md text-sm leading-7 text-[#746756]">Each metal behaves, ages and serves differently. Explore the qualities before choosing a form.</p></div></Reveal>
        <div className="mt-9 grid overflow-hidden rounded-[1.6rem] border border-[#b78b3c]/25 bg-[#fffaf0] shadow-[0_24px_70px_rgba(91,56,21,.1)] lg:grid-cols-[.9fr_1.1fr]">
          <div className="order-2 p-5 sm:p-8 lg:order-1 lg:p-10">
            <div role="tablist" aria-label="Cookware materials" className="flex border-b border-[#b78b3c]/20">{materials.map((item) => <button key={item.id} type="button" role="tab" aria-selected={activeId === item.id} aria-controls="material-panel" onClick={() => setActiveId(item.id)} className={`flex-1 border-b-2 px-2 py-4 text-[10px] font-bold uppercase tracking-[.16em] transition ${activeId === item.id ? "border-[#9d712a] text-[#734d1e]" : "border-transparent text-[#8d7d68] hover:text-[#734d1e]"}`}>{item.name}</button>)}</div>
            <AnimatePresence mode="wait"><motion.div id="material-panel" role="tabpanel" key={active.id} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .48, ease: [.22, 1, .36, 1] }} className="pt-10"><p className="text-[10px] font-bold uppercase tracking-[.22em]" style={{ color: active.tone }}>{active.indianName}</p><h3 className="mt-3 font-serif text-5xl text-[#49331f] sm:text-6xl">{active.line}</h3><p className="mt-6 max-w-xl text-base leading-8 text-[#746756]">{active.story}</p><div className="mt-8 grid gap-5 border-y border-[#b78b3c]/20 py-6 sm:grid-cols-2"><div><p className="text-[9px] font-bold uppercase tracking-[.17em] text-[#9a8468]">Best suited to</p><p className="mt-2 text-sm leading-6 text-[#5d4933]">{active.bestFor}</p></div><div><p className="text-[9px] font-bold uppercase tracking-[.17em] text-[#9a8468]">Care rhythm</p><p className="mt-2 text-sm leading-6 text-[#5d4933]">{active.care}</p></div></div><StoreLink path={active.path} eventLabel={`material_${active.id}`} className="heritage-button mt-7">View all {active.name} pieces <ArrowRight size={14} /></StoreLink></motion.div></AnimatePresence>
          </div>
          <StoreLink path={active.path} eventLabel={`material_visual_${active.id}`} aria-label={`View all ${active.name} pieces`} className="group relative order-1 min-h-[360px] overflow-hidden bg-[#e4d4c1] lg:order-2 lg:min-h-[520px]">
            <AnimatePresence mode="wait"><motion.div key={active.image} className="absolute inset-0" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .8 }}><DharoharImage src={active.image} alt={`${active.name} heritage cookware`} fill unoptimized sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /><div className="product-glint absolute -inset-y-[20%] left-[-25%] w-[18%] rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm" /></motion.div></AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-white/10" /><div className="absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full border border-white/35 bg-black/25 px-4 py-2 text-[9px] font-bold uppercase tracking-[.18em] text-white backdrop-blur transition duration-300 group-hover:-translate-y-1 group-hover:bg-black/45">View all {active.name} <ArrowRight size={13} /></div>
          </StoreLink>
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index, shortlisted, onShortlist }: { product: (typeof curatedProducts)[number]; index: number; shortlisted: boolean; onShortlist: () => void }) {
  return (
    <article className={`product-portrait group relative flex min-w-[78vw] snap-center flex-col overflow-hidden rounded-[1.35rem] border border-[#b78b3c]/25 bg-[#fffaf0] shadow-[0_18px_48px_rgba(91,56,21,.09)] sm:min-w-[380px] lg:min-w-0 ${index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-4"}`}>
      <div className={`relative overflow-hidden bg-[#ede3d6] ${index < 2 ? "aspect-[1.28/1]" : "aspect-square"}`}><DharoharImage src={product.image} alt={`${product.name}, ${product.material.toLowerCase()} cookware`} fill unoptimized sizes="(max-width: 1024px) 85vw, 42vw" className="object-cover transition duration-[1100ms] group-hover:scale-[1.035]" /><div className="product-glint absolute -inset-y-[20%] left-[-25%] w-[18%] rotate-12 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-sm" /><span className="absolute left-4 top-4 rounded-full border border-[#8b632a]/25 bg-[#fffaf0]/88 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[.18em] text-[#855d25] backdrop-blur">{product.material}</span><button type="button" aria-pressed={shortlisted} onClick={onShortlist} className={`absolute right-4 top-4 grid size-10 place-items-center rounded-full border backdrop-blur transition ${shortlisted ? "border-[#8f5f27] bg-[#8f5f27] text-white" : "border-[#8b632a]/25 bg-[#fffaf0]/88 text-[#855d25]"}`} aria-label={`${shortlisted ? "Remove" : "Add"} ${product.name} ${shortlisted ? "from" : "to"} shortlist`}><HeartHandshake size={17} /></button></div>
      <div className="flex flex-1 flex-col p-5 sm:p-6"><p className="text-[8px] font-bold uppercase tracking-[.18em] text-[#a27a3d]">Curator’s selection 0{index + 1}</p><h3 className="mt-2 font-serif text-3xl leading-none text-[#4c351f] sm:text-4xl">{product.name}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-[#746756]">{product.purpose}</p><div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-[#b78b3c]/20 pt-4"><span className="text-xs font-semibold text-[#8c652d]">{product.price}</span><StoreLink path={product.path} eventLabel={`product_${index + 1}`} className="inline-flex items-center gap-2 text-[8px] font-extrabold uppercase tracking-[.16em] text-[#7b5522]">Discover <ArrowRight size={13} /></StoreLink></div></div>
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
    <section id="collection" className="bg-[#f6efe3] px-5 py-[clamp(3.75rem,6vw,6rem)]" aria-labelledby="collection-title">
      <div className="site-container">
        <Reveal><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><p className="heritage-label w-fit">A curated glimpse</p><h2 id="collection-title" className="heritage-display mt-5 max-w-4xl text-[clamp(3.1rem,5vw,5.4rem)] leading-[.9]">Objects chosen like chapters, not inventory.</h2></div><div className="max-w-md"><p className="text-sm leading-7 text-[#746756]">Add pieces that speak to you, then send the shortlist directly to a Dharohar consultant.</p><div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={shareShortlist} className="heritage-button heritage-button-filled"><MessageCircle size={15} /> Share shortlist {shortlist.length ? `(${shortlist.length})` : ""}</button><StoreLink path="/collections/all" eventLabel="collection_view_all" className="heritage-button">Complete store <ExternalLink size={14} /></StoreLink></div></div></div></Reveal>
        <div className="mt-8 flex justify-end gap-2 lg:hidden"><button type="button" onClick={() => scrollRail(-1)} aria-label="Previous collection pieces" className="grid size-11 place-items-center rounded-full border border-[#b78b3c]/35 text-[#765323]"><ChevronLeft size={18} /></button><button type="button" onClick={() => scrollRail(1)} aria-label="Next collection pieces" className="grid size-11 place-items-center rounded-full border border-[#b78b3c]/35 text-[#765323]"><ChevronRight size={18} /></button></div>
        <div ref={railRef} className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:mt-9 lg:grid lg:grid-cols-12 lg:overflow-visible">{curatedProducts.map((product, index) => <ProductCard key={product.name} product={product} index={index} shortlisted={shortlist.includes(product.name)} onShortlist={() => setShortlist((current) => current.includes(product.name) ? current.filter((item) => item !== product.name) : [...current, product.name])} />)}</div>
        <p className="mt-3 text-center text-[10px] uppercase tracking-[.16em] text-[#8c765a]">Preview imagery and indicative prices are for review; the commerce catalogue remains the source of truth.</p>
      </div>
    </section>
  );
}

function RitualUniverse() {
  const [activeId, setActiveId] = useState<(typeof ritualWorlds)[number]["id"]>("hydrate");
  const active = ritualWorlds.find((item) => item.id === activeId) ?? ritualWorlds[0];
  const reducedMotion = useReducedMotion();

  return (
    <section id="rituals" className="ritual-cinema relative isolate overflow-hidden bg-[#0f0a07] px-5 py-[clamp(4rem,7vw,7rem)] text-[#fff4dc]" aria-labelledby="rituals-title">
      <div className="absolute inset-0 -z-30">
        {reducedMotion ? <Image src="/videos/water-ritual-poster.jpg" alt="" fill unoptimized sizes="100vw" className="object-cover" /> : <video className="cinematic-film h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster="/videos/water-ritual-poster.jpg" aria-hidden="true"><source src="/videos/water-ritual-master.mp4" type="video/mp4" /></video>}
      </div>
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(12,7,4,.96)_0%,rgba(12,7,4,.78)_42%,rgba(12,7,4,.26)_72%,rgba(12,7,4,.7)),linear-gradient(180deg,rgba(10,6,4,.16),rgba(10,6,4,.9))]" />
      <div className="cinema-grain pointer-events-none absolute inset-0 -z-10" />
      <div className="site-container">
        <Reveal className="max-w-5xl">
          <p className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.24em] text-[#e0c27d]"><Droplets size={14} /> Beyond the stove</p>
          <h2 id="rituals-title" className="mt-5 font-serif text-[clamp(3.3rem,5.5vw,6rem)] leading-[.85]">The collection travels<br /><span className="italic text-[#e7ca8d]">beyond the flame.</span></h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/62 sm:text-base">One metal home, seen through the gestures that give each object purpose—from the first pour to the family table.</p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <div className="cinema-chapters min-w-0 rounded-[1.8rem] border border-white/14 bg-black/28 p-4 shadow-[0_35px_90px_rgba(0,0,0,.34)] backdrop-blur-xl" role="tablist" aria-label="Explore the Dharohar product world by ritual">
            <p className="px-3 pb-3 pt-2 text-[8px] font-bold uppercase tracking-[.22em] text-white/38">Four chapters of use</p>
            <div className="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2 lg:block lg:overflow-visible lg:pb-0">{ritualWorlds.map((item, index) => {
              const selected = activeId === item.id;
              return <button key={item.id} type="button" role="tab" aria-selected={selected} onClick={() => setActiveId(item.id)} className={`group flex min-w-[270px] snap-center items-center gap-4 rounded-2xl border px-4 py-4 text-left transition duration-500 lg:w-full lg:min-w-0 ${selected ? "border-[#d8b86b]/55 bg-[#d8b86b]/14 text-white" : "border-transparent text-white/48 hover:border-white/12 hover:bg-white/5 hover:text-white/78"}`}><span className={`grid size-10 shrink-0 place-items-center rounded-full border text-[9px] font-bold transition ${selected ? "border-[#d8b86b] bg-[#d8b86b] text-[#24160f]" : "border-white/18"}`}>0{index + 1}</span><span className="flex-1"><span className="block text-[8px] font-bold uppercase tracking-[.17em] text-[#d8b86b]">{item.eyebrow}</span><span className="mt-1 block font-serif text-2xl leading-none">{item.title}</span></span><ArrowRight size={14} className={`text-[#d8b86b] transition ${selected ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} /></button>;
            })}</div>
          </div>

          <AnimatePresence mode="wait">
            <motion.article key={active.id} className="ritual-glass-panel min-w-0 overflow-hidden rounded-[1.6rem] border border-white/16 bg-[#1a100a]/54 p-5 shadow-[0_28px_80px_rgba(0,0,0,.36)] backdrop-blur-xl sm:p-7" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: .58, ease: [.22, 1, .36, 1] }}>
              <div className="grid gap-6 sm:grid-cols-[1fr_190px] sm:items-end">
                <div><p className="text-[8px] font-bold uppercase tracking-[.22em] text-[#e2c27d]">Now entering · {active.eyebrow}</p><h3 className="mt-3 max-w-2xl font-serif text-[clamp(2.8rem,4.6vw,5rem)] leading-[.88]">{active.title}</h3><p className="mt-4 max-w-2xl text-sm leading-7 text-white/64">{active.copy}</p><div className="mt-4 flex flex-wrap gap-2">{active.objects.map((item) => <span key={item} className="rounded-full border border-white/16 bg-black/18 px-3 py-2 text-[8px] font-bold uppercase tracking-[.14em] text-white/65">{item}</span>)}</div><StoreLink path={active.path} eventLabel={`ritual_${active.id}`} className="heritage-button heritage-button-filled mt-5">Enter this ritual <ArrowRight size={14} /></StoreLink></div>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-1" aria-label={`${active.eyebrow} featured objects`}>{active.gallery.map(([src, label], index) => <div key={label} className={`group/thumb relative overflow-hidden rounded-xl border border-white/12 bg-white/5 ${index === 0 ? "col-span-2 aspect-[1.6/1] sm:col-span-1 sm:aspect-[1.25/1]" : "aspect-square sm:hidden"}`}><DharoharImage src={src} alt={label} fill unoptimized sizes="220px" className="object-cover transition duration-700 group-hover/thumb:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/58 to-transparent" /><p className="absolute inset-x-3 bottom-3 text-[7px] font-bold uppercase tracking-[.13em] text-white/72">{label}</p></div>)}</div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
        <p className="mt-7 text-[8px] uppercase tracking-[.17em] text-white/32">High-resolution motion study · muted by design · pauses with reduced-motion settings</p>
      </div>
    </section>
  );
}

function UtensilCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reducedMotion = useReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const active = utensilCarousel[activeIndex];

  useEffect(() => {
    if (!playing || reducedMotion) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % utensilCarousel.length), 5200);
    return () => window.clearInterval(timer);
  }, [playing, reducedMotion]);

  function select(index: number) {
    setActiveIndex(index);
    railRef.current?.children[index]?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", inline: "center", block: "nearest" });
  }

  function move(direction: number) {
    select((activeIndex + direction + utensilCarousel.length) % utensilCarousel.length);
  }

  return (
    <section className="utensil-gallery overflow-hidden bg-[#f4eadb] px-5 py-[clamp(3.75rem,6vw,6rem)]" aria-labelledby="utensil-gallery-title">
      <div className="site-container">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><p className="heritage-label w-fit">The wider object library</p><h2 id="utensil-gallery-title" className="heritage-display mt-5 max-w-5xl text-[clamp(3.2rem,5.5vw,5.7rem)] leading-[.88]">A whole rasoi,<br /><span className="italic text-[#9d712a]">object by object.</span></h2></div><div className="max-w-md"><p className="text-sm leading-7 text-[#746756]">Move beyond similar vessels into preparation tools, storage, tableware, hydration and the small details that complete a kitchen.</p><div className="mt-5 flex gap-2"><button type="button" onClick={() => move(-1)} aria-label="Previous utensil" className="carousel-control"><ChevronLeft size={18} /></button><button type="button" onClick={() => move(1)} aria-label="Next utensil" className="carousel-control"><ChevronRight size={18} /></button><button type="button" onClick={() => setPlaying((current) => !current)} aria-label={playing ? "Pause utensil carousel" : "Play utensil carousel"} className="carousel-control">{playing ? <CirclePause size={17} /> : <CirclePlay size={17} />}</button></div></div></Reveal>

        <div className="mt-9 grid overflow-hidden rounded-[1.7rem] border border-[#b78b3c]/25 bg-[#fffaf0] shadow-[0_24px_70px_rgba(88,55,23,.12)] lg:grid-cols-[1.25fr_.75fr]">
          <div className="relative min-h-[460px] overflow-hidden bg-[#d8c8b6] lg:min-h-[600px]">
            <AnimatePresence mode="wait"><motion.div key={active.image} className="absolute inset-0" initial={{ opacity: 0, scale: 1.045 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .99 }} transition={{ duration: .8, ease: [.22, 1, .36, 1] }}><DharoharImage src={active.image} alt={`${active.name}, ${active.material}`} fill unoptimized sizes="(max-width: 1024px) 100vw, 64vw" className="object-cover" /></motion.div></AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#160e09]/72 via-transparent to-white/6" />
            <div className="product-glint absolute -inset-y-[20%] left-[-25%] w-[18%] rotate-12 bg-gradient-to-r from-transparent via-white/45 to-transparent blur-sm" />
            <div className="absolute left-6 top-6 rounded-full border border-white/35 bg-black/18 px-4 py-2 text-[8px] font-bold uppercase tracking-[.18em] text-white backdrop-blur">{active.purpose}</div>
            <div className="absolute inset-x-6 bottom-6 text-white sm:inset-x-8 sm:bottom-8"><p className="text-[8px] font-bold uppercase tracking-[.2em] text-[#f0cf87]">Object {active.number} of {String(utensilCarousel.length).padStart(2, "0")}</p><h3 className="mt-2 font-serif text-[clamp(3rem,5.5vw,5.8rem)] leading-[.86]">{active.name}</h3></div>
          </div>
          <AnimatePresence mode="wait"><motion.div key={`details-${active.number}`} className="flex flex-col justify-center p-5 sm:p-7 lg:p-9" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: .5 }}><p className="text-[8px] font-bold uppercase tracking-[.2em] text-[#9d712a]">{active.material}</p><h3 className="mt-3 font-serif text-4xl leading-[.92] text-[#4d3823] sm:text-5xl">Not everything precious is a centrepiece.</h3><p className="mt-4 text-sm leading-7 text-[#746756] sm:text-base">{active.copy}</p><div className="mt-6 border-y border-[#b78b3c]/20 py-4"><p className="text-[8px] font-bold uppercase tracking-[.16em] text-[#9a8468]">Place in the home</p><p className="mt-2 font-serif text-xl text-[#5d4328]">{active.purpose}</p></div><StoreLink path={active.path} eventLabel={`utensil_${active.number}`} className="heritage-button heritage-button-filled mt-5 w-fit">View this object <ArrowRight size={14} /></StoreLink></motion.div></AnimatePresence>
        </div>

        <div ref={railRef} className="no-scrollbar mt-5 flex snap-x gap-3 overflow-x-auto pb-3" role="tablist" aria-label="Choose a utensil to feature">
          {utensilCarousel.map((item, index) => <button key={item.name} type="button" role="tab" aria-selected={activeIndex === index} onClick={() => select(index)} className={`group flex min-w-[230px] snap-center items-center gap-3 rounded-2xl border p-3 text-left transition sm:min-w-[270px] ${activeIndex === index ? "border-[#9d712a] bg-[#fffaf0] shadow-[0_12px_32px_rgba(88,55,23,.1)]" : "border-[#b78b3c]/20 bg-white/30 hover:border-[#b78b3c]/55"}`}><span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#d8c8b6]"><DharoharImage src={item.image} alt="" fill unoptimized sizes="64px" className="object-cover transition duration-500 group-hover:scale-105" /></span><span><span className="block text-[8px] font-bold uppercase tracking-[.16em] text-[#a4772d]">{item.number} · {item.purpose}</span><span className="mt-2 block font-serif text-xl leading-none text-[#4d3823]">{item.name}</span></span></button>)}
        </div>
      </div>
    </section>
  );
}

function PassportExperience() {
  const [activeId, setActiveId] = useState("maker");
  const active = passportDetails.find((item) => item.id === activeId) ?? passportDetails[0];
  const Icon = active.icon;
  const serviceHistory = [["2027", "Kalai renewed"], ["2031", "Dent repaired"], ["2035", "Engraving updated"]] as const;
  const visual = active.id === "restoration" ? "/images/curated/ptal-styled-copper-detail.webp" : "/images/artisan.jpg";
  return (
    <section id="passport" className="overflow-hidden bg-[#fffaf0] px-5 py-[clamp(3.75rem,6vw,6rem)]" aria-labelledby="passport-title">
      <div className="site-container">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <Reveal className="relative min-h-[560px] overflow-hidden rounded-[1.6rem] lg:min-h-[600px]">
          <AnimatePresence mode="wait"><motion.div key={visual} className="absolute inset-0" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .75 }}><DharoharImage src={visual} alt={active.id === "restoration" ? "Close view of a copper object receiving engraving care" : "Metal artisan working in a traditional workshop"} fill unoptimized sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" style={{ objectPosition: active.id === "restoration" ? "50% 50%" : "50% 30%" }} /></motion.div></AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-[#160e09]/92 via-transparent to-transparent" />
          <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/25 bg-[#fffaf0]/94 p-6 text-[#4b3824] shadow-2xl backdrop-blur sm:inset-x-8 sm:bottom-8">
            <div className="flex items-center justify-between gap-4"><div><p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#9d712a]">Living ownership record</p><p className="mt-2 font-serif text-3xl">DH–2037 · Family Lagaan</p></div><QrCode size={34} className="text-[#8b632a]" /></div>
            <AnimatePresence mode="wait"><motion.div key={active.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-5 border-t border-[#b78b3c]/20 pt-5"><div className="flex items-start gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#9d712a] text-white"><Icon size={18} /></span><div><h3 className="font-serif text-2xl">{active.title}</h3><p className="mt-2 text-sm leading-6 text-[#746756]">{active.copy}</p></div></div>{active.id === "restoration" ? <ol className="mt-5 grid gap-2 sm:grid-cols-3">{serviceHistory.map(([year, event]) => <li key={year} className="rounded-xl border border-[#b78b3c]/20 bg-white/65 p-3"><span className="text-[8px] font-bold uppercase tracking-[.16em] text-[#9d712a]">{year}</span><span className="mt-1 block font-serif text-lg">{event}</span></li>)}</ol> : null}</motion.div></AnimatePresence>
          </div>
        </Reveal>
          <Reveal delay={.12}>
          <p className="heritage-label w-fit">Heritage passport</p>
          <h2 id="passport-title" className="heritage-display mt-5 text-[clamp(3.1rem,5vw,5.4rem)] leading-[.9]">The story stays with the object. <span className="italic text-[#9d712a]">So does its care.</span></h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#746756] sm:text-base">Open each chapter to see how provenance, material knowledge, restoration and family history remain legible long after the box is gone.</p>
          <div className="mt-7 grid gap-2 sm:grid-cols-2">{passportDetails.map((item, index) => { const ItemIcon = item.icon; const selected = activeId === item.id; return <button key={item.id} type="button" onClick={() => setActiveId(item.id)} className={`flex min-h-20 w-full items-center gap-3 rounded-xl border p-3 text-left transition ${selected ? "border-[#b78b3c] bg-[#f0e1c8] shadow-[0_10px_24px_rgba(102,67,25,.07)]" : "border-[#b78b3c]/18 bg-transparent hover:border-[#b78b3c]/45"}`}><span className={`grid size-9 shrink-0 place-items-center rounded-full ${selected ? "bg-[#9d712a] text-white" : "bg-[#efe2ce] text-[#9d712a]"}`}><ItemIcon size={16} /></span><span><span className="block text-[7px] font-bold uppercase tracking-[.17em] text-[#9a8468]">Chapter 0{index + 1}</span><span className="mt-1 block font-serif text-lg leading-none text-[#4d3823]">{item.label}</span></span></button>; })}</div>
          <div className="mt-5 flex flex-wrap gap-3"><button type="button" onClick={() => setActiveId("restoration")} className="heritage-button heritage-button-filled">Open a sample care record <History size={14} /></button><a href="#consultation" className="heritage-button">Register my piece <ArrowRight size={14} /></a></div>
          </Reveal>
        </div>
        <Reveal className="mt-9 overflow-hidden rounded-[1.5rem] border border-[#b78b3c]/24 bg-[#f2e5d1] shadow-[0_18px_48px_rgba(90,57,23,.07)]">
          <div className="grid lg:grid-cols-[.72fr_1.28fr]">
            <div className="p-5 sm:p-7"><p className="text-[8px] font-bold uppercase tracking-[.22em] text-[#9d712a]">One object · Three keepers</p><h3 className="mt-3 font-serif text-3xl leading-[.98] text-[#4d3823] sm:text-4xl">Its life continues inside the passport.</h3><p className="mt-4 text-sm leading-7 text-[#746756]">The workshop, the family and the next generation become a concise living timeline—without adding another long section to the page.</p></div>
            <ol className="grid border-t border-[#b78b3c]/18 sm:grid-cols-3 lg:border-l lg:border-t-0">{generations.map((item) => <li key={item.number} className="group border-b border-[#b78b3c]/18 p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"><span className="font-serif text-5xl text-[#b78b3c]/45 transition group-hover:text-[#9d712a]">{item.number}</span><p className="mt-5 text-[8px] font-bold uppercase tracking-[.17em] text-[#9d712a]">{item.era}</p><h4 className="mt-2 font-serif text-2xl leading-none text-[#4d3823]">{item.title}</h4><p className="mt-3 text-xs leading-6 text-[#746756]">{item.copy}</p></li>)}</ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LifetimeRestoration() {
  const services = [
    { icon: RotateCcw, title: "Re-tinning / Kalai", copy: "Renew food-contact lining after an object-specific assessment." },
    { icon: Sparkles, title: "Polishing & patina", copy: "Restore brightness or preserve a naturally earned patina." },
    { icon: Hammer, title: "Dent & form repair", copy: "Correct dents while respecting the vessel’s handmade character." },
    { icon: ShieldCheck, title: "Fittings inspection", copy: "Review handles, lids, joints and everyday working points." },
    { icon: PenLine, title: "Engraving updates", copy: "Refresh a mark or add the next name and date." },
    { icon: HeartHandshake, title: "Care guidance", copy: "Receive lifelong, object-specific maintenance support." },
  ] as const;
  const mail = process.env.NEXT_PUBLIC_CONSULTATION_EMAIL ?? "hello@dharohar.in";

  return (
    <section id="restoration" className="compact-restoration relative overflow-hidden border-y border-[#d8b86b]/18 bg-[#2a1a12] px-5 py-[clamp(3.5rem,5vw,5rem)] text-[#fff4dc]" aria-labelledby="restoration-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_12%,rgba(205,163,79,.13),transparent_30%),linear-gradient(125deg,transparent_42%,rgba(255,238,194,.035)_52%,transparent_62%)]" />
      <div className="site-container">
        <Reveal className="relative mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[.24em] text-[#d8b86b]"><Wrench size={13} /> Lifetime restoration</p>
          <h2 id="restoration-title" className="mt-4 font-serif text-[clamp(3rem,4.7vw,4.8rem)] leading-[.88]">Care for a lifetime.<br /><span className="italic text-[#e1bd76]">Not only at purchase.</span></h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/58">Every Dharohar piece retains a clear route to skilled restoration and practical maintenance guidance throughout ownership.</p>
        </Reveal>

        <div className="relative mt-7 grid gap-px overflow-hidden rounded-[1.4rem] border border-[#d8b86b]/18 bg-[#d8b86b]/16 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => { const Icon = service.icon; return <motion.article key={service.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} className="group bg-[#321f16] p-4 transition hover:bg-[#3a251a] sm:p-5"><div className="flex items-start gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-full border border-[#d8b86b]/30 text-[#d8b86b] transition group-hover:bg-[#d8b86b] group-hover:text-[#2a1a12]"><Icon size={16} /></span><div><p className="text-[7px] font-bold uppercase tracking-[.17em] text-[#bda066]">Care 0{index + 1}</p><h3 className="mt-2 font-serif text-xl leading-none">{service.title}</h3><p className="mt-2 text-xs leading-5 text-white/46">{service.copy}</p></div></div></motion.article>; })}
        </div>

        <Reveal className="relative mt-5 flex flex-col gap-5 rounded-[1.3rem] border border-[#d8b86b]/22 bg-[#1e120d]/54 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div><p className="text-[8px] font-bold uppercase tracking-[.19em] text-[#d8b86b]">The lifelong promise</p><div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/58">{["Care remains recorded", "Repair before replacement", "Guidance throughout ownership"].map((item) => <span key={item} className="flex items-center gap-2"><Check size={13} className="text-[#d8b86b]" />{item}</span>)}</div></div>
          <a href={`mailto:${mail}?subject=Dharohar%20lifetime%20care%20request`} className="heritage-button heritage-button-filled shrink-0">Request restoration <ArrowRight size={14} /></a>
        </Reveal>
      </div>
    </section>
  );
}

function PersonalisationStudio() {
  const [engraving, setEngraving] = useState("The Sharma Family");
  const [style, setStyle] = useState<"family" | "wedding" | "message">("family");
  const placeholders = { family: "The Sharma Family", wedding: "Aarav & Meera · 2027", message: "With love, always" };
  return (
    <section id="legacy" className="overflow-hidden bg-[#efe1cb] px-5 py-[clamp(3.75rem,6vw,6rem)]" aria-labelledby="legacy-title">
      <div className="site-container grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <Reveal className="relative mx-auto aspect-square w-full max-w-[540px] overflow-hidden rounded-full border-[12px] border-[#fffaf0]/70 bg-[#c38257] shadow-[0_28px_76px_rgba(94,52,23,.18)]"><Image src="/images/curated/ptal-copper-madurai-handi.webp" alt="Copper handi with a live engraving preview" fill unoptimized sizes="(max-width: 1024px) 95vw, 52vw" className="object-cover" /><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(56,24,10,.32)_100%)]" /><div className="absolute inset-x-[17%] bottom-[17%] rounded-xl border border-[#ffe2b3]/35 bg-[#4e2615]/42 px-4 py-4 text-center text-[#ffe6b8] shadow-2xl backdrop-blur-[3px]"><Feather className="mx-auto mb-2" size={19} strokeWidth={1.2} /><AnimatePresence mode="wait"><motion.p key={`${style}-${engraving}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="font-serif text-[clamp(1.25rem,4vw,2.3rem)] leading-none text-shadow-sm">{engraving || placeholders[style]}</motion.p></AnimatePresence><p className="mt-2 text-[7px] font-bold uppercase tracking-[.28em] text-[#f4c77d]">Preview engraving</p></div><div className="ambient-reflection pointer-events-none absolute inset-y-0 left-0 w-28" /></Reveal>
        <Reveal delay={.12}><p className="heritage-label w-fit">Personalisation studio</p><h2 id="legacy-title" className="heritage-display mt-5 text-[clamp(3.1rem,5vw,5.4rem)] leading-[.88]">See your story on the object.</h2><p className="mt-4 max-w-xl text-sm leading-7 sm:text-base text-[#746756]">Create a live first impression. Final placement, scale and spelling remain subject to engraving approval.</p><div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Engraving type">{(["family", "wedding", "message"] as const).map((item) => <button key={item} type="button" onClick={() => { setStyle(item); setEngraving(placeholders[item]); }} className={`rounded-full border px-4 py-2 text-[9px] font-bold uppercase tracking-[.16em] transition ${style === item ? "border-[#8f5f27] bg-[#8f5f27] text-white" : "border-[#b78b3c]/35 text-[#765323]"}`}>{item === "family" ? "Family name" : item === "wedding" ? "Wedding date" : "Short message"}</button>)}</div><label className="mt-5 block max-w-lg"><span className="heritage-field-label">Your engraving preview</span><input value={engraving} maxLength={32} onChange={(event) => setEngraving(event.target.value)} className="heritage-input" aria-label="Your engraving preview" /></label><div className="mt-5 flex flex-wrap gap-3"><StoreLink path="/collections/personalised-gifts" eventLabel="personalisation_continue" className="heritage-button heritage-button-filled">Personalise on the store <ArrowRight size={15} /></StoreLink><a href="#consultation" className="heritage-button">Ask an engraving expert</a></div><div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-xs text-[#725c41]">{["Product selection", "Engraving approval", "Presentation-ready packaging"].map((item) => <span key={item} className="flex items-center gap-2"><Check size={14} className="text-[#a4772d]" />{item}</span>)}</div></Reveal>
      </div>
    </section>
  );
}

function OccasionRoutes() {
  return (
    <section id="occasions" className="bg-[#fffaf0] px-5 py-[clamp(3.75rem,6vw,6rem)]" aria-labelledby="occasions-title">
      <div className="site-container">
        <Reveal className="mx-auto max-w-5xl text-center"><p className="heritage-label">Objects for every ritual</p><h2 id="occasions-title" className="heritage-display mt-5 text-[clamp(3.2rem,5.5vw,5.7rem)] leading-[.88]">From flame to table.<br />From water to memory.</h2><p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#746756] sm:text-base">Cook, serve, hydrate, gift—and care for objects made to remain.</p></Reveal>
        <div className="no-scrollbar mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-12 lg:overflow-visible">
          {intentions.map((item, index) => { const Icon = item.icon; return (
            <motion.article key={item.title} whileHover={{ y: -6 }} transition={{ duration: .35 }} className={`ritual-doorway group relative min-h-[400px] min-w-[80vw] snap-center overflow-hidden rounded-[1.5rem] text-white lg:min-w-0 ${index === 0 ? "lg:col-span-7 lg:min-h-[500px]" : index === 1 ? "lg:col-span-5 lg:min-h-[500px]" : "lg:col-span-4"}`}>
              <DharoharImage src={item.image} alt={`${item.title} in the Dharohar collection`} fill unoptimized sizes="(max-width: 1024px) 88vw, 48vw" className="object-cover transition duration-[1400ms] group-hover:scale-[1.055]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160e09]/96 via-[#160e09]/26 to-black/5" />
              <div className="doorway-light pointer-events-none absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7"><span className="grid size-10 place-items-center rounded-full border border-white/30 bg-black/15 backdrop-blur transition duration-500 group-hover:border-[#e2c27d] group-hover:bg-[#e2c27d] group-hover:text-[#2a1a12]"><Icon size={18} /></span><p className="mt-4 text-[8px] font-bold uppercase tracking-[.2em] text-[#e2c27d]">{item.eyebrow}</p><h3 className="mt-2 font-serif text-3xl sm:text-4xl">{item.title}</h3><p className="mt-3 max-w-md text-sm leading-6 text-white/64">{item.copy}</p><StoreLink path={item.path} eventLabel={`intention_${index + 1}`} className="mt-5 inline-flex items-center gap-2 text-[8px] font-extrabold uppercase tracking-[.16em] text-[#f2d79c] transition group-hover:gap-4">{item.cta} <ArrowRight size={14} /></StoreLink></div>
            </motion.article>
          ); })}
        </div>
        <Reveal className="mt-6 flex flex-col gap-6 rounded-[1.6rem] border border-[#b78b3c]/24 bg-[#f3e6d2] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"><div className="flex items-start gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-full border border-[#b78b3c]/35 text-[#9d712a]"><Building2 size={20} /></span><div><p className="text-[8px] font-bold uppercase tracking-[.19em] text-[#9d712a]">For designers and hospitality</p><h3 className="mt-2 font-serif text-3xl text-[#4d3823]">Objects composed for a larger space.</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-[#746756]">A separate project route for restaurants, boutique stays, gifting programmes and considered interiors.</p></div></div><StoreLink path="/pages/trade-and-hospitality" eventLabel="trade_route" className="heritage-button shrink-0">Start a project <ArrowRight size={14} /></StoreLink></Reveal>
      </div>
    </section>
  );
}

function TrustSequence() {
  const principles = [
    { icon: ShieldCheck, title: "Material clarity", copy: "Know the metal, lining, intended use and the care boundaries that matter." },
    { icon: Sparkles, title: "Heat character", copy: "Choose forms suited to slow cooking, serving, coffee or water storage." },
    { icon: Droplets, title: "Food compatibility", copy: "Understand when lining matters and which ingredients or liquids need extra care." },
    { icon: HeartHandshake, title: "Care & longevity", copy: "Recognise daily care, restoration cues and the route back to an artisan." },
  ];
  return (
    <section id="care-guide" className="material-wisdom relative overflow-hidden border-y border-[#b78b3c]/20 bg-[#f8eedf] px-5 py-[clamp(3.75rem,6vw,6rem)]" aria-labelledby="trust-title">
      <span className="wisdom-border pointer-events-none absolute inset-6 rounded-[2.5rem] border border-[#b78b3c]/28" aria-hidden="true" />
      <div className="site-container relative">
        <Reveal className="mx-auto max-w-5xl text-center"><p className="heritage-label">Heritage, explained with care</p><h2 id="trust-title" className="heritage-display mt-5 text-[clamp(3.2rem,5.5vw,5.7rem)] leading-[.9]">Material wisdom.<br />Modern clarity.</h2><p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#746756] sm:text-base">Useful knowledge without broad medical promises—so every object is chosen, used and maintained with confidence.</p></Reveal>
        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{principles.map((item, index) => { const Icon = item.icon; return <motion.article key={item.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} className="wisdom-card group rounded-[1.4rem] border border-[#b78b3c]/25 bg-[#fffaf0]/76 p-5 text-center shadow-[0_14px_36px_rgba(94,61,25,.05)] backdrop-blur"><span className="mx-auto grid size-16 place-items-center rounded-full border border-[#b78b3c]/40 text-[#a4772d] transition duration-500 group-hover:-translate-y-1 group-hover:bg-[#a4772d] group-hover:text-white"><Icon size={24} strokeWidth={1.35} /></span><p className="mt-4 text-[7px] font-bold uppercase tracking-[.18em] text-[#a4772d]">Principle 0{index + 1}</p><h3 className="mt-2 font-serif text-2xl text-[#4d3823]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#746756]">{item.copy}</p><div className="mt-4 border-t border-[#b78b3c]/20 pt-3 text-left"><p className="text-[7px] font-bold uppercase tracking-[.15em] text-[#9a8468]">Inside the guide</p><p className="mt-2 text-xs leading-5 text-[#6c5a43]">Tradition · Evidence · Safe everyday use</p></div></motion.article>; })}</div>
        <Reveal className="mx-auto mt-9 max-w-4xl rounded-2xl border border-[#b78b3c]/24 bg-white/45 p-5 text-center"><p className="text-sm leading-7 text-[#695a47]"><strong className="font-semibold text-[#4d3823]">Our evidence standard:</strong> composition, lining, use guidance and care boundaries remain specific to the object. Any health-related statement should appear only with relevant product testing and an accessible source.</p><div className="mt-5 flex flex-wrap justify-center gap-3"><StoreLink path="/pages/material-and-care-guide" eventLabel="material_guide" className="heritage-button">Open the material guide <BookOpenText size={14} /></StoreLink><a href="#consultation" className="heritage-button heritage-button-filled">Ask a material question <ArrowRight size={14} /></a></div></Reveal>
      </div>
    </section>
  );
}

function ConsultationGateway() {
  const [status, setStatus] = useState("We usually reply within one working day.");
  const [interest, setInterest] = useState("Complete heritage kitchen");
  const [submitting, setSubmitting] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const interest = String(form.get("interest") ?? "");
    const timing = String(form.get("timing") ?? "");
    const occasionDate = String(form.get("occasionDate") ?? "");
    const quantity = String(form.get("quantity") ?? "");
    const budget = String(form.get("budget") ?? "");
    const message = String(form.get("message") ?? "");
    const endpoint = process.env.NEXT_PUBLIC_CONSULTATION_ENDPOINT;
    const destination = process.env.NEXT_PUBLIC_CONSULTATION_EMAIL ?? "hello@dharohar.in";
    const subject = encodeURIComponent(`Dharohar consultation — ${interest || "heritage kitchen"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nInterest: ${interest}\nPreferred timing: ${timing}\nOccasion date: ${occasionDate || "Not specified"}\nQuantity: ${quantity || "Not specified"}\nBudget: ${budget || "Not specified"}\n\n${message}`);
    track("consultation_start", interest || "general");
    if (endpoint) {
      setSubmitting(true);
      setStatus("Sending your private consultation request…");
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, interest, timing, occasionDate, quantity, budget, message, source: "dharohar-brand-gateway" }),
        });
        if (!response.ok) throw new Error("Consultation endpoint rejected the request");
        track("consultation_submitted", interest || "general");
        setStatus("Thank you. Your request is with the Dharohar care team.");
        formElement.reset();
        setInterest("Complete heritage kitchen");
      } catch {
        setStatus("We could not send this request. Please use ‘Email directly’ and we’ll help personally.");
      } finally {
        setSubmitting(false);
      }
      return;
    }
    setStatus("Your email app is opening with the enquiry prepared.");
    window.location.href = `mailto:${destination}?subject=${subject}&body=${body}`;
  }
  const gifting = interest === "Wedding or festive gifting";
  return <form onSubmit={submit} className="consultation-card rounded-[1.5rem] border border-[#d8b86b]/24 bg-[#f4eadb]/96 p-5 text-[#3c2a1e] shadow-[0_20px_64px_rgba(0,0,0,.24)] backdrop-blur sm:p-6"><div className="mb-5 flex items-center justify-between gap-4 border-b border-[#9a7040]/18 pb-4"><div><p className="text-[8px] font-bold uppercase tracking-[.2em] text-[#9a7040]">Private consultation</p><p className="mt-1 font-serif text-xl">A thoughtful first conversation</p></div><span className="grid size-10 place-items-center rounded-full border border-[#9a7040]/30 text-[#9a7040]"><Feather size={16} /></span></div><div className="grid gap-4 sm:grid-cols-2"><label><span className="consult-label">Your name</span><input required name="name" autoComplete="name" className="consult-input" placeholder="Name" /></label><label><span className="consult-label">Email</span><input required name="email" type="email" autoComplete="email" className="consult-input" placeholder="you@example.com" /></label></div><div className="mt-4 grid gap-4 sm:grid-cols-2"><label><span className="consult-label">I am interested in</span><select name="interest" className="consult-input" value={interest} onChange={(event) => setInterest(event.target.value)}><option>Complete heritage kitchen</option><option>Wedding or festive gifting</option><option>Everyday cookware</option><option>Lifetime restoration and care</option><option>Design or hospitality project</option><option>Engraving consultation</option></select></label><label><span className="consult-label">Preferred time</span><select name="timing" className="consult-input" defaultValue="Weekday morning"><option>Weekday morning</option><option>Weekday afternoon</option><option>Weekday evening</option><option>Weekend</option></select></label></div><AnimatePresence initial={false}>{gifting ? <motion.div initial={{ height: 0, opacity: .7 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: .7 }} className="overflow-hidden"><div className="mt-4 grid gap-4 sm:grid-cols-3"><label><span className="consult-label">Occasion date</span><input name="occasionDate" type="date" className="consult-input" /></label><label><span className="consult-label">Quantity</span><input name="quantity" inputMode="numeric" className="consult-input" placeholder="e.g. 25" /></label><label><span className="consult-label">Budget range</span><input name="budget" className="consult-input" placeholder="₹ range" /></label></div></motion.div> : null}</AnimatePresence><label className="mt-4 block"><span className="consult-label">Tell us a little more</span><textarea name="message" rows={3} className="consult-input h-auto resize-none py-3" placeholder="The occasion, family size, preferred metals, engraving or care needs…" /></label><button type="submit" disabled={submitting} className="mt-4 inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-xl bg-[#251711] px-6 text-[10px] font-bold uppercase tracking-[.15em] text-[#f6e7cb] transition hover:bg-[#3b2419] disabled:cursor-wait disabled:opacity-60">{submitting ? "Sending request" : "Prepare consultation request"} <Send size={15} /></button><p aria-live="polite" className="mt-3 min-h-5 text-center text-xs text-[#7d5b36]">{status}</p><p className="mt-1 text-center text-[9px] leading-4 text-[#8b765d]">Your details are used only to respond to this enquiry.</p></form>;
}

function CareDock() {
  const [visible, setVisible] = useState(false);
  const [suppressed, setSuppressed] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 760);
    update();
    window.addEventListener("scroll", update, { passive: true });
    const visibleSections = new Set<string>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting ? visibleSections.add(entry.target.id) : visibleSections.delete(entry.target.id));
      setSuppressed(visibleSections.size > 0);
    }, { threshold: .12 });
    ["restoration", "consultation"].map((id) => document.getElementById(id)).filter(Boolean).forEach((section) => observer.observe(section as HTMLElement));
    return () => { window.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);
  return <AnimatePresence>{visible && !suppressed ? <motion.a href="#restoration" aria-label="Open the lifetime restoration programme" className="care-dock group fixed bottom-5 right-5 z-40 hidden h-12 w-12 items-center overflow-hidden rounded-full border border-[#d8b86b]/35 bg-[#18110d]/94 p-1.5 text-[#f3dfb5] shadow-[0_14px_50px_rgba(0,0,0,.28)] backdrop-blur-xl transition-[width] duration-500 hover:w-[220px] focus-visible:w-[220px] sm:flex" initial={{ opacity: 0, scale: .88 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .9 }}><span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#d8b86b] text-[#24150e]"><Wrench size={15} /></span><span className="ml-3 min-w-[154px] translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"><span className="block text-[7px] font-bold uppercase tracking-[.18em] text-[#d8b86b]">Lifetime programme</span><span className="mt-0.5 block font-serif text-lg leading-none">Care for my piece</span></span></motion.a> : null}</AnimatePresence>;
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
  return <motion.div className="fixed inset-0 z-[90] flex items-end justify-center bg-black/55 p-3 backdrop-blur-sm sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="handoff-title" aria-describedby="handoff-description" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}><motion.div initial={{ y: 60, opacity: .75 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: .75 }} transition={{ duration: .45, ease: [.22, 1, .36, 1] }} className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-[#d8b86b]/30 bg-[#20150f] p-7 text-[#fff3da] shadow-2xl sm:p-10"><button autoFocus type="button" onClick={onClose} aria-label="Close store handoff" className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-white/15 text-white/65"><X size={17} /></button><p className="text-[9px] font-bold uppercase tracking-[.22em] text-[#d8b86b]">Your intention is remembered</p><h2 id="handoff-title" className="mt-5 max-w-lg font-serif text-5xl leading-[.92]">{connected ? "Continue into the commerce collection." : "The commerce connection is being prepared."}</h2><p id="handoff-description" className="mt-5 max-w-lg text-sm leading-7 text-white/58">{connected ? "You’re leaving the brand experience for the most relevant purchasing route. Availability and final pricing will be confirmed there. Future store links will open directly during this visit." : "For this review build, store routes lead to a private consultation until the purchasing-site URL is supplied."}</p><div className="mt-8 flex flex-wrap gap-3">{connected ? <a href={intent.href} onClick={() => { rememberStoreHandoff(); track("store_continue", intent.label); }} className="heritage-button heritage-button-filled">Continue to store <ExternalLink size={14} /></a> : <a href="#consultation" onClick={onClose} className="heritage-button heritage-button-filled">Continue to consultation <ArrowRight size={14} /></a>}<button type="button" onClick={onClose} className="heritage-button !border-white/20 !text-white">Stay in the story</button></div></motion.div></motion.div>;
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
        <EditorialCollection />
        <section className="marquee-mask overflow-hidden border-y border-[#b78b3c]/25 bg-[#fff8eb]" aria-label="Dharohar assurances"><div className="heritage-marquee flex w-max">{[0, 1].map((set) => <div key={set} aria-hidden={set === 1} className="flex">{[[Hammer, "Handcrafted in India"], [ShieldCheck, "Copper, brass & kansa"], [Feather, "Personal engraving"], [HeartHandshake, "Lifetime restoration"]].map(([Icon, label]) => <div key={`${set}-${label as string}`} className="flex min-w-[300px] items-center gap-4 border-r border-[#b78b3c]/20 px-8 py-5"><span className="grid size-11 place-items-center rounded-full border border-[#b78b3c]/40 text-[#a4772d]"><Icon size={19} /></span><span className="font-serif text-xl text-[#4f3b25]">{label as string}</span></div>)}</div>)}</div></section>
        <MaterialExplorer />
        <PersonalisationStudio />
        <TrustSequence />
        <RitualUniverse />
        <UtensilCarousel />
        <LifetimeRestoration />
        <PassportExperience />
        <OccasionRoutes />
        <section id="consultation" className="consultation-salon relative isolate overflow-hidden bg-[#100b08] px-5 text-[#fff8e9]" aria-labelledby="consultation-title"><Image src="/images/curated/ptal-styled-copper-detail.webp" alt="" fill unoptimized sizes="100vw" className="-z-30 object-cover opacity-[.38]" style={{ objectPosition: "30% 50%" }} /><div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(16,11,8,.94),rgba(16,11,8,.82)_43%,rgba(16,11,8,.66)),radial-gradient(circle_at_20%_45%,rgba(171,90,49,.28),transparent_38%)]" /><div className="ambient-window-light pointer-events-none absolute -inset-[20%] -z-10" /><div className="site-container grid gap-9 py-[clamp(4rem,6.5vw,6.5rem)] lg:grid-cols-[.9fr_1.1fr] lg:items-center"><Reveal><div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#e0bd76]/25 bg-black/20 px-4 py-2 backdrop-blur"><span className="grid size-7 place-items-center rounded-full bg-[#e0bd76] text-[#2b1a12]"><Feather size={13} /></span><span className="text-[8px] font-bold uppercase tracking-[.2em] text-[#e8cc91]">The Dharohar private salon</span></div><p className="text-[10px] font-bold uppercase tracking-[.24em] text-[#e0bd76]">Gift concierge · Kitchen consultation</p><h2 id="consultation-title" className="mt-5 max-w-2xl font-serif text-[clamp(3.2rem,5vw,5.5rem)] leading-[.88]">A quieter way to begin.</h2><p className="mt-4 max-w-xl text-sm leading-7 sm:text-base text-white/65">Tell us about the rituals, gifting moment or design project you are considering. We’ll prepare a thoughtful route into the collection.</p><div className="mt-6 flex flex-wrap gap-3">{booking ? <a href={booking} target="_blank" rel="noreferrer" onClick={() => track("booking_click", "consultation")} className="heritage-button heritage-button-filled"><CalendarDays size={15} /> Reserve 20 minutes</a> : <a href={`mailto:${process.env.NEXT_PUBLIC_CONSULTATION_EMAIL ?? "hello@dharohar.in"}?subject=Dharohar%2020-minute%20consultation`} className="heritage-button heritage-button-filled"><Clock3 size={15} /> Request 20 minutes</a>}<a href={`mailto:${process.env.NEXT_PUBLIC_CONSULTATION_EMAIL ?? "hello@dharohar.in"}`} className="heritage-button !border-white/25 !text-white"><Mail size={15} /> Email directly</a></div><div className="mt-7 flex flex-wrap gap-5 text-xs text-white/55"><span className="flex items-center gap-2"><Users size={15} className="text-[#e0bd76]" /> Personal recommendations</span><span className="flex items-center gap-2"><Gift size={15} className="text-[#e0bd76]" /> Gifting and engraving</span></div></Reveal><ConsultationGateway /></div></section>
      </main>
      <CareDock />
      <footer className="border-t border-white/10 bg-[#18110d] px-5 text-[#fff5df]"><div className="site-container flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between"><a href="#top" className="flex items-center gap-3"><span className="relative size-14 overflow-hidden rounded-full bg-[#fffaf0]"><Image src="/images/dharohar-mark.png" alt="" fill unoptimized sizes="56px" className="object-contain mix-blend-multiply" /></span><span><strong className="block font-serif text-2xl tracking-[.12em]">DHAROHAR</strong><span className="text-[7px] font-bold uppercase tracking-[.3em] text-[#d8b86b]">Heritage Kitchen</span></span></a><nav className="flex flex-wrap gap-x-6 gap-y-3 text-[9px] font-bold uppercase tracking-[.15em] text-white/48" aria-label="Footer navigation"><a href="#materials" className="hover:text-white">Materials</a><a href="#legacy" className="hover:text-white">Your story</a><a href="#care-guide" className="hover:text-white">Material wisdom</a><a href="#rituals" className="hover:text-white">Objects</a><a href="#restoration" className="hover:text-white">Lifetime care</a><a href="#consultation" className="hover:text-white">Consultation</a><StoreLink path="/collections/all" eventLabel="footer_visit_store" className="inline-flex items-center gap-1 text-[#e2c27d]">Visit store <ArrowRight size={11} /></StoreLink></nav><p className="text-[9px] uppercase tracking-[.12em] text-white/32">© 2026 Dharohar</p></div></footer>
      <AnimatePresence>{storeIntent ? <StoreHandoff intent={storeIntent} onClose={() => setStoreIntent(null)} /> : null}</AnimatePresence>
    </>
  );
}
