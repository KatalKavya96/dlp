"use client";

import {
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CirclePause,
  CirclePlay,
  ExternalLink,
  Feather,
  Gift,
  Hammer,
  HeartHandshake,
  History,
  Mail,
  Menu,
  PackageCheck,
  PenLine,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Droplets,
  UserRound,
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

const gatewayLinks = [["Collections", "#collection"], ["Our story", "#legacy"], ["Craftsmanship", "#care-guide"], ["Journal", "#rituals"], ["Experience", "#restoration"]] as const;

const heroFrames = [
  { image: "/images/hero-parallax/sunset-background.webp", label: "Sunset over the lake", layer: "backdrop" },
  { image: "/images/hero-parallax/architecture.webp", label: "The carved pavilion", layer: "architecture" },
  { image: "/images/hero-parallax/cookware.webp", label: "Objects gathered in light", layer: "cookware" },
  { image: "/images/hero-parallax/curtain.webp", label: "The nearest veil", layer: "curtain" },
] as const;

const parallaxPlanes = [
  { x: 1.2, y: .8, scroll: 3, scale: 1.002 },
  { x: 3, y: 2, scroll: 8, scale: .985 },
  { x: 6, y: 3.5, scroll: 14, scale: .92 },
  { x: 8, y: 5, scroll: 20, scale: .965 },
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
    image: "/images/curated/copper-madurai-handi.webp",
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
    image: "/images/curated/brass-kadhai-set.webp",
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

const categoryCollections = [
  { name: "Cookware", detail: "Kadhais, patilas, tawas and lagans made for the everyday flame.", image: "/images/dharohar-categories/cookware.webp", path: "/collections/cookware" },
  { name: "Kitchen Utensils", detail: "Purposeful forms for stirring, turning, simmering and serving.", image: "/images/dharohar-categories/kitchen-utensils.webp", path: "/collections/kitchen-utensils" },
  { name: "Kitchen Accessories", detail: "The smaller objects that make a thoughtful rasoi feel complete.", image: "/images/dharohar-categories/kitchen-accessories-clean.webp", path: "/collections/kitchen-accessories" },
  { name: "Drinkware", detail: "Bottles, glasses, tumblers and dispensers for a considered water ritual.", image: "/images/dharohar-categories/drinkware-clean.webp", path: "/collections/drinkware" },
  { name: "Tableware", detail: "Handcrafted pieces that bring warmth and ceremony to every setting.", image: "/images/dharohar-categories/tableware-clean.webp", path: "/collections/tableware" },
  { name: "Dinnerware", detail: "Complete thaalis and dining sets for tables made to gather around.", image: "/images/dharohar-categories/dinnerware.webp", path: "/collections/dinnerware" },
  { name: "Sets & Combos", detail: "Useful pairings assembled for new kitchens, gifting and everyday ease.", image: "/images/dharohar-categories/sets.webp", path: "/collections/combos-and-sets" },
  { name: "Copper for Water", detail: "Tamba vessels shaped around storing, pouring and sharing water.", image: "/images/dharohar-categories/copper-water.webp", path: "/collections/copper-tamba-utensils-and-vessels" },
  { name: "Brass for Cooking & Eating", detail: "The golden character of peetal, from the stove to the family table.", image: "/images/dharohar-categories/brass.webp", path: "/collections/brass-pital-utensils-and-vessels" },
  { name: "Kansa for Eating", detail: "Bronze dining forms with a grounded weight and unmistakable resonance.", image: "/images/dharohar-categories/kansa-clean.webp", path: "/collections/kansa-bronze-utensils-and-vessels" },
  { name: "Home Décor", detail: "Metal accents and quiet statements for the spaces around the table.", image: "/images/dharohar-categories/home-decor.webp", path: "/collections/home-decor-1" },
  { name: "Pooja & Ritual", detail: "Handcrafted diya forms made for prayer, celebration and daily devotion.", image: "/images/dharohar-categories/pooja-clean.webp", path: "/collections/pooja-items" },
] as const;

const intentions = [
  { eyebrow: "Cook", title: "At the flame", copy: "Kadhais, handis, patilas, lagans and tawas for the meals your home returns to.", image: "/images/curated/brass-flat-kadhai.webp", path: "/collections/everyday-cookware", cta: "Enter cookware", icon: HeartHandshake },
  { eyebrow: "Serve", title: "Around the table", copy: "Thalis, bowls, platters, cutlery and serving forms that turn food into gathering.", image: "/images/curated/kansa-thaali-clean.jpg", path: "/collections/tableware", cta: "Set the table", icon: PackageCheck },
  { eyebrow: "Hydrate", title: "The water ritual", copy: "Copper bottles, tumblers, glasses, carafes, jugs and dispensers for considered daily use.", image: "/images/curated/copper-dispenser-lifestyle.jpg", path: "/collections/drinkware", cta: "Explore hydration", icon: Droplets },
  { eyebrow: "Gift", title: "For a milestone", copy: "Personalised pieces and presentation-ready sets for beginnings worth remembering.", image: "/images/curated/brass-davara-clean.jpg", path: "/collections/wedding-gifts", cta: "Choose a gift", icon: Gift },
  { eyebrow: "Restore", title: "Return it to care", copy: "A clear route to re-tinning, polishing, dent repair, engraving updates and expert guidance.", image: "/images/artisan.jpg", path: "/pages/restoration-care", cta: "Begin restoration", icon: Wrench },
] as const;

const utensilCarousel = [
  { number: "01", name: "Masala Daani", material: "Hammered brass", purpose: "Preparation", copy: "A lidded spice box that brings a familiar kitchen object into sharper material focus.", image: "/images/curated/brass-masala-box.jpg", path: "/products/brass-masala-box" },
  { number: "02", name: "Brass Paraat", material: "Hand-shaped brass", purpose: "Mixing & kneading", copy: "A broad preparation form with a luminous hammered surface and generous working area.", image: "/images/curated/brass-paraat.jpg", path: "/products/brass-paraat" },
  { number: "03", name: "Rasoi Ladle Set", material: "Brass · Wood", purpose: "Cooking tools", copy: "Four distinct working ends turn the everyday cooking tool into a considered set.", image: "/images/curated/brass-ladles-clean.png", path: "/products/set-of-brass-ladles" },
  { number: "04", name: "Roti Dabba", material: "Hammered brass", purpose: "Table service", copy: "A warm, sculptural chapati box designed to move easily from kitchen to table.", image: "/images/curated/brass-roti-box.jpg", path: "/products/brass-chapati-box-roti-dabba" },
  { number: "05", name: "Engraved Cutlery", material: "Patterned brass", purpose: "Table detail", copy: "Forks and spoons with a decorative handle language that rewards a closer look.", image: "/images/curated/brass-cutlery.jpg", path: "/products/brass-spoons-forks" },
  { number: "06", name: "Kansa Thaali", material: "Kansa bronze", purpose: "Dining ritual", copy: "A complete plate, bowls, glass and spoon composed as one material family.", image: "/images/curated/kansa-thaali-clean.jpg", path: "/products/kansa-thaali-set" },
  { number: "07", name: "Copper Bottle", material: "Hammered copper", purpose: "Hydration", copy: "A modern upright form with a tactile hammered body and cork-finished cap.", image: "/images/curated/copper-bottle.jpg", path: "/products/copper-water-bottle" },
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
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: .25 });

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 44);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    const sections = ["top", ...gatewayLinks.map(([, href]) => href.slice(1))].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveHref(`#${visible.target.id}`);
    }, { rootMargin: "-28% 0px -58%", threshold: [0, .2, .55] });
    sections.forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("scroll", updateHeader);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={`gateway-header fixed inset-x-0 top-0 z-50 text-[#fff9ed] transition duration-500 ${scrolled || open ? "gateway-header-scrolled" : "gateway-header-top"}`}>
      <motion.div className="absolute inset-x-0 bottom-0 h-px origin-left bg-[#e4c789]" style={{ scaleX: progress }} />
      <div className="site-container flex h-[88px] items-center justify-between gap-4 sm:h-[100px]">
        <a href="#top" aria-label="Dharohar home" className="min-w-0 shrink-0">
          <strong className="block whitespace-nowrap font-serif text-[1.65rem] font-medium leading-none tracking-[.075em] text-white sm:text-[2rem]">DHAROHAR</strong>
          <span className="mt-2 block text-center text-[6px] font-bold uppercase tracking-[.42em] text-white/62 sm:text-[7px]">Heritage utensils</span>
        </a>
        <nav className="hidden items-center gap-[clamp(1.4rem,2.6vw,3.2rem)] lg:flex" aria-label="Primary navigation">{gatewayLinks.map(([label, href]) => <a key={href} href={href} aria-current={activeHref === href ? "location" : undefined} className={`relative py-3 text-[12px] font-medium tracking-[-.01em] transition after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:bg-[#f1d39b] after:transition-transform ${activeHref === href ? "text-[#f2d39a] after:scale-x-100" : "text-white/78 after:scale-x-0 hover:text-white hover:after:scale-x-100"}`}>{label}</a>)}</nav>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <StoreLink path="/search" eventLabel="header_search" aria-label="Search the collection" className="hero-nav-icon hidden sm:grid"><Search size={19} strokeWidth={1.5} /></StoreLink>
          <StoreLink path="/account" eventLabel="header_account" aria-label="Open your account" className="hero-nav-icon hidden sm:grid"><UserRound size={19} strokeWidth={1.5} /></StoreLink>
          <StoreLink path="/collections/all" eventLabel="header_visit_store" aria-label="Visit the Dharohar store" className="hero-nav-icon"><ShoppingBag size={19} strokeWidth={1.5} /></StoreLink>
          <button type="button" className="hero-nav-icon lg:hidden" aria-expanded={open} aria-controls="gateway-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      <AnimatePresence>{open ? <motion.div id="gateway-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-white/12 bg-[#17100c]/96 px-5 backdrop-blur-2xl lg:hidden"><nav className="site-container flex flex-col py-4" aria-label="Mobile navigation">{gatewayLinks.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="border-b border-white/10 py-4 font-serif text-3xl">{label}</a>)}<StoreLink path="/collections/all" eventLabel="mobile_visit_store" onClick={() => setOpen(false)} className="heritage-button heritage-button-filled my-5 justify-center">Visit the store <ArrowRight size={15} /></StoreLink></nav></motion.div> : null}</AnimatePresence>
    </header>
  );
}

function CinematicHero() {
  const reducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState(!reducedMotion);
  const heroRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pointerRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const scheduleParallaxRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    let frameRequest: number | null = null;

    const renderParallax = () => {
      frameRequest = null;
      const pointer = playing && !reducedMotion ? pointerRef.current : { x: 0, y: 0 };
      const scroll = playing && !reducedMotion ? scrollRef.current : 0;

      layerRefs.current.forEach((layer, index) => {
        if (!layer) return;
        const plane = parallaxPlanes[index];
        const x = pointer.x * plane.x * -1;
        const y = (pointer.y * plane.y * -1) - (scroll * plane.scroll);
        layer.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${plane.scale})`;
      });
    };

    const schedule = () => {
      if (frameRequest !== null) return;
      frameRequest = window.requestAnimationFrame(renderParallax);
    };

    const updateScroll = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      scrollRef.current = Math.max(0, Math.min(1, -rect.top / Math.max(rect.height, 1)));
      schedule();
    };

    scheduleParallaxRef.current = schedule;
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScroll);
      if (frameRequest !== null) window.cancelAnimationFrame(frameRequest);
    };
  }, [playing, reducedMotion]);

  function pointerMove(event: ReactMouseEvent<HTMLElement>) {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerRef.current = {
      x: ((event.clientX - rect.left) / rect.width - .5) * 2,
      y: ((event.clientY - rect.top) / rect.height - .5) * 2,
    };
    scheduleParallaxRef.current();
  }

  function pointerLeave() {
    pointerRef.current = { x: 0, y: 0 };
    scheduleParallaxRef.current();
  }

  return (
    <section ref={heroRef} onMouseMove={pointerMove} onMouseLeave={pointerLeave} id="top" className="cinematic-hero immersive-parallax-hero relative isolate min-h-screen overflow-hidden bg-[#17110d] text-[#fff5df]" aria-labelledby="hero-title">
      <div className="parallax-scene absolute inset-0 -z-30" aria-hidden="true">
        {heroFrames.map((item, index) => (
          <div
            key={item.image}
            ref={(node) => { layerRefs.current[index] = node; }}
            className={`parallax-layer parallax-layer-${item.layer}`}
          >
            <Image src={item.image} alt="" fill priority unoptimized sizes="100vw" />
          </div>
        ))}
      </div>
      <div className="parallax-color-grade pointer-events-none absolute inset-0 -z-20" />
      <div className="parallax-sun-bloom pointer-events-none absolute -z-10" />
      <div className="ambient-dust pointer-events-none absolute inset-0 -z-10" />
      <div className="site-container parallax-hero-content flex min-h-screen items-start pb-[9.5rem] pt-[8.25rem] sm:pb-[10rem] sm:pt-[8.75rem]">
        <div className="max-w-[480px]">
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .2 }} className="flex w-fit items-center gap-3 text-[10px] font-semibold uppercase tracking-[.24em] text-[#eec08d]"><span className="h-px w-7 bg-[#eec08d]/65" /> Rooted in tradition</motion.p>
          <motion.h1 id="hero-title" initial={{ opacity: 0, y: 52 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.05, delay: .32, ease: [.16, 1, .3, 1] }} className="mt-5 font-serif text-[clamp(3.4rem,4.4vw,5.3rem)] leading-[.86] tracking-[-.035em] text-[#fff9ef]"><span className="whitespace-nowrap">More Than</span><br />Utensils.<br />It’s a Living<br />Heritage.</motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .62 }} className="mt-6 max-w-[390px] text-sm leading-7 text-white/76 sm:text-base">Timeless Indian cookware, handcrafted by skilled artisans. Made to be used, loved, and passed down for generations.</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .78 }} className="mt-7 flex flex-wrap items-center gap-4"><StoreLink path="/collections/all" eventLabel="hero_shop_collection" className="hero-primary-cta">Explore the collection <ArrowRight size={16} /></StoreLink><a href="#legacy" className="hero-story-link"><span className="grid size-10 place-items-center rounded-full border border-white/35"><CirclePlay size={16} /></span> Our story</a></motion.div>
        </div>
      </div>
      <div className="hero-lower-deck absolute inset-x-0 bottom-0 z-20">
        <div className="site-container flex items-end justify-between gap-8 pb-8">
          <div className="hero-assurances flex min-w-0 items-center" aria-label="Dharohar assurances">
            {[[Hammer, "Handcrafted", "Excellence"], [ShieldCheck, "Traditional", "Metals"], [History, "Made to Last", "Generations"]].map(([Icon, title, detail]) => <div key={title as string} className="hero-assurance"><span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/30 text-[#f2cc9a]"><Icon size={16} strokeWidth={1.4} /></span><span><strong>{title as string}</strong><small>{detail as string}</small></span></div>)}
          </div>
          <button type="button" onClick={() => setPlaying((value) => !value)} className="hidden size-10 shrink-0 place-items-center rounded-full border border-white/20 bg-[#2b1a13]/45 text-white/70 backdrop-blur-md lg:grid" aria-label={playing ? "Pause cinematic motion" : "Play cinematic motion"}>{playing ? <CirclePause size={15} /> : <CirclePlay size={15} />}</button>
        </div>
      </div>
    </section>
  );
}

function MaterialExplorer() {
  const [activeId, setActiveId] = useState<(typeof materials)[number]["id"]>("copper");
  const active = materials.find((item) => item.id === activeId) ?? materials[0];
  return (
    <section id="materials" className="rose-surface rose-materials overflow-hidden px-5 py-[clamp(3.75rem,6vw,6rem)] transition-colors duration-700" style={{ background: `radial-gradient(circle at 84% 18%, ${active.tone}18, transparent 34%), radial-gradient(circle at 8% 82%, rgba(183,110,121,.1), transparent 30%), #fcf9f8` }} aria-labelledby="materials-title">
      <div className="site-container">
        <Reveal><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><p className="heritage-label w-fit">Material, understood</p><h2 id="materials-title" className="heritage-display mt-5 max-w-4xl text-[clamp(3.1rem,5vw,5.5rem)] leading-[.9]">Choose the character of your kitchen.</h2></div><p className="max-w-md text-sm leading-7 text-[#746756]">Each metal behaves, ages and serves differently. Explore the qualities before choosing a form.</p></div></Reveal>
        <div className="rose-material-card mt-9 grid overflow-hidden rounded-[1.6rem] border border-[#b78b3c]/25 bg-[#fffaf0] shadow-[0_24px_70px_rgba(91,56,21,.1)] lg:grid-cols-[.9fr_1.1fr]">
          <div className="order-2 p-5 sm:p-8 lg:order-1 lg:p-10">
            <div role="tablist" aria-label="Cookware materials" className="flex border-b border-[#b78b3c]/20">{materials.map((item) => <button key={item.id} type="button" role="tab" aria-selected={activeId === item.id} aria-controls="material-panel" onClick={() => setActiveId(item.id)} className={`flex-1 border-b-2 px-2 py-4 text-[10px] font-bold uppercase tracking-[.16em] transition ${activeId === item.id ? "border-[#9d712a] text-[#734d1e]" : "border-transparent text-[#8d7d68] hover:text-[#734d1e]"}`}>{item.name}</button>)}</div>
            <AnimatePresence mode="wait"><motion.div id="material-panel" role="tabpanel" key={active.id} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .48, ease: [.22, 1, .36, 1] }} className="pt-10"><p className="text-[10px] font-bold uppercase tracking-[.22em]" style={{ color: active.tone }}>{active.indianName}</p><h3 className="mt-3 font-serif text-5xl text-[#49331f] sm:text-6xl">{active.line}</h3><p className="mt-6 max-w-xl text-base leading-8 text-[#746756]">{active.story}</p><div className="mt-8 grid gap-5 border-y border-[#b78b3c]/20 py-6 sm:grid-cols-2"><div><p className="text-[9px] font-bold uppercase tracking-[.17em] text-[#9a8468]">Best suited to</p><p className="mt-2 text-sm leading-6 text-[#5d4933]">{active.bestFor}</p></div><div><p className="text-[9px] font-bold uppercase tracking-[.17em] text-[#9a8468]">Care rhythm</p><p className="mt-2 text-sm leading-6 text-[#5d4933]">{active.care}</p></div></div><StoreLink path={active.path} eventLabel={`material_${active.id}`} className="heritage-button mt-7">View all {active.name} pieces <ArrowRight size={14} /></StoreLink></motion.div></AnimatePresence>
          </div>
          <StoreLink path={active.path} eventLabel={`material_visual_${active.id}`} aria-label={`View all ${active.name} pieces`} className="rose-image-well group relative order-1 min-h-[360px] overflow-hidden bg-[#e4d4c1] lg:order-2 lg:min-h-[520px]">
            <AnimatePresence mode="wait"><motion.div key={active.image} className="absolute inset-0" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .8 }}><DharoharImage src={active.image} alt={`${active.name} heritage cookware`} fill unoptimized sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /><div className="product-glint absolute -inset-y-[20%] left-[-25%] w-[18%] rotate-12 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm" /></motion.div></AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-white/10" /><div className="absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full border border-white/35 bg-black/25 px-4 py-2 text-[9px] font-bold uppercase tracking-[.18em] text-white backdrop-blur transition duration-300 group-hover:-translate-y-1 group-hover:bg-black/45">View all {active.name} <ArrowRight size={13} /></div>
          </StoreLink>
        </div>
      </div>
    </section>
  );
}

function CategoryCarousel() {
  const railRef = useRef<HTMLDivElement>(null);
  const scrollFrame = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const goTo = (index: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const nextIndex = (index + categoryCollections.length) % categoryCollections.length;
    const slide = rail.children[nextIndex] as HTMLElement | undefined;
    if (!slide) return;
    rail.scrollTo({
      left: slide.offsetLeft - (rail.clientWidth - slide.offsetWidth) / 2,
      behavior: reducedMotion ? "auto" : "smooth",
    });
    setActiveIndex(nextIndex);
  };

  const updateActiveSlide = () => {
    const rail = railRef.current;
    if (!rail) return;
    if (scrollFrame.current !== null) window.cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = window.requestAnimationFrame(() => {
      const railCentre = rail.scrollLeft + rail.clientWidth / 2;
      let nearest = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;
      Array.from(rail.children).forEach((child, index) => {
        const slide = child as HTMLElement;
        const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - railCentre);
        if (distance < nearestDistance) {
          nearest = index;
          nearestDistance = distance;
        }
      });
      setActiveIndex(nearest);
    });
  };

  useEffect(() => {
    if (!playing || reducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        const nextIndex = (current + 1) % categoryCollections.length;
        const rail = railRef.current;
        const slide = rail?.children[nextIndex] as HTMLElement | undefined;
        if (rail && slide) {
          rail.scrollTo({
            left: slide.offsetLeft - (rail.clientWidth - slide.offsetWidth) / 2,
            behavior: "smooth",
          });
        }
        return nextIndex;
      });
    }, 5200);
    return () => window.clearInterval(timer);
  }, [playing, reducedMotion]);

  useEffect(() => () => {
    if (scrollFrame.current !== null) window.cancelAnimationFrame(scrollFrame.current);
  }, []);

  return (
    <section id="collection" className="category-carousel overflow-hidden bg-[#f8f3f0] py-[clamp(4.5rem,7vw,7.5rem)]" aria-labelledby="collection-title">
      <div className="site-container px-5">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="heritage-label w-fit">The complete Dharohar world</p>
              <h2 id="collection-title" className="heritage-display mt-5 max-w-5xl text-[clamp(3.15rem,5.6vw,6rem)] leading-[.88]">Every ritual.<br /><span className="italic text-[#a26069]">Every category.</span></h2>
            </div>
            <div className="max-w-md lg:pb-1">
              <p className="text-sm leading-7 text-[#746756]">Move through the entire utensil collection—one clear category at a time, shaped around how each object lives in the home.</p>
              <div className="mt-5 flex items-center gap-2">
                <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Previous product category" className="category-carousel-control"><ChevronLeft size={18} /></button>
                <button type="button" onClick={() => setPlaying((current) => !current)} aria-label={`${playing ? "Pause" : "Play"} category carousel`} aria-pressed={!playing} className="category-carousel-control">{playing ? <CirclePause size={18} /> : <CirclePlay size={18} />}</button>
                <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Next product category" className="category-carousel-control"><ChevronRight size={18} /></button>
                <span className="ml-3 text-[9px] font-extrabold uppercase tracking-[.2em] text-[#8b7663]"><strong className="text-[#8e5860]">{String(activeIndex + 1).padStart(2, "0")}</strong> / {String(categoryCollections.length).padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <div
        ref={railRef}
        onScroll={updateActiveSlide}
        onPointerDown={() => setPlaying(false)}
        className="category-carousel-rail no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-8 sm:gap-6"
        role="region"
        aria-roledescription="carousel"
        aria-label="Dharohar product categories"
      >
        {categoryCollections.map((category, index) => (
          <article key={category.name} className="category-slide group relative isolate min-w-[86vw] snap-center overflow-hidden rounded-[1.7rem] bg-[#38241f] sm:min-w-[72vw] lg:min-w-[58vw] xl:min-w-[50vw]" aria-roledescription="slide" aria-label={`${index + 1} of ${categoryCollections.length}: ${category.name}`}>
            <div className="relative aspect-[4/5] sm:aspect-[16/10]">
              <DharoharImage src={category.image} alt={`${category.name} from Dharohar`} fill unoptimized sizes="(max-width: 639px) 86vw, (max-width: 1023px) 72vw, 58vw" className="category-slide-image object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(35,19,16,.06)_15%,rgba(35,19,16,.18)_48%,rgba(35,19,16,.88)_100%)]" />
              <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 p-5 sm:p-7">
                <span className="rounded-full border border-white/30 bg-[#321d19]/45 px-3 py-2 text-[8px] font-extrabold uppercase tracking-[.22em] text-white/90 backdrop-blur-md">Dharohar collection</span>
                <span className="font-serif text-2xl italic text-white/75">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <p className="text-[8px] font-extrabold uppercase tracking-[.24em] text-[#f3c8b6]">Explore by purpose</p>
                <h3 className="mt-2 max-w-3xl font-serif text-[clamp(2.2rem,4.3vw,4.8rem)] leading-[.9] text-white">{category.name}</h3>
                <div className="mt-4 flex flex-col gap-5 border-t border-white/18 pt-4 sm:flex-row sm:items-end sm:justify-between">
                  <p className="max-w-lg text-xs leading-6 text-white/72 sm:text-sm">{category.detail}</p>
                  <StoreLink path={category.path} eventLabel={`category_${index + 1}`} className="category-explore-button shrink-0">Explore more <ArrowRight size={15} /></StoreLink>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="site-container px-5">
        <div className="flex items-center gap-5">
          <div className="category-carousel-progress h-px flex-1 overflow-hidden bg-[#b78b3c]/18"><motion.span className="block h-full origin-left bg-[linear-gradient(90deg,#b46772,#c99c4a)]" animate={{ scaleX: (activeIndex + 1) / categoryCollections.length }} transition={{ duration: reducedMotion ? 0 : .55, ease: [.22, 1, .36, 1] }} /></div>
          <p className="hidden text-[8px] font-extrabold uppercase tracking-[.22em] text-[#907a69] sm:block">Drag or use the arrows</p>
        </div>
        <p className="sr-only" aria-live="polite">Showing {categoryCollections[activeIndex].name}</p>
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
    <section id="rituals" className="rose-surface rose-gallery utensil-gallery overflow-hidden bg-[#f4eadb] px-5 py-[clamp(3.75rem,6vw,6rem)]" aria-labelledby="utensil-gallery-title">
      <div className="site-container">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><p className="heritage-label w-fit">The wider object library</p><h2 id="utensil-gallery-title" className="heritage-display mt-5 max-w-5xl text-[clamp(3.2rem,5.5vw,5.7rem)] leading-[.88]">A whole rasoi,<br /><span className="italic text-[#9d712a]">object by object.</span></h2></div><div className="flex gap-2"><button type="button" onClick={() => move(-1)} aria-label="Previous utensil" className="carousel-control"><ChevronLeft size={18} /></button><button type="button" onClick={() => move(1)} aria-label="Next utensil" className="carousel-control"><ChevronRight size={18} /></button><button type="button" onClick={() => setPlaying((current) => !current)} aria-label={playing ? "Pause utensil carousel" : "Play utensil carousel"} className="carousel-control">{playing ? <CirclePause size={17} /> : <CirclePlay size={17} />}</button></div></Reveal>

        <div className="rose-gallery-stage mt-9 grid overflow-hidden rounded-[1.7rem] border border-[#b78b3c]/25 bg-[#fffaf0] shadow-[0_24px_70px_rgba(88,55,23,.12)] lg:grid-cols-[1.25fr_.75fr]">
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
          {utensilCarousel.map((item, index) => <button key={item.name} type="button" role="tab" aria-selected={activeIndex === index} onClick={() => select(index)} className={`rose-gallery-thumb group flex min-w-[230px] snap-center items-center gap-3 rounded-2xl border p-3 text-left transition sm:min-w-[270px] ${activeIndex === index ? "border-[#9d712a] bg-[#fffaf0] shadow-[0_12px_32px_rgba(88,55,23,.1)]" : "border-[#b78b3c]/20 bg-white/30 hover:border-[#b78b3c]/55"}`}><span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-[#d8c8b6]"><DharoharImage src={item.image} alt="" fill unoptimized sizes="64px" className="object-cover transition duration-500 group-hover:scale-105" /></span><span><span className="block text-[8px] font-bold uppercase tracking-[.16em] text-[#a4772d]">{item.number} · {item.purpose}</span><span className="mt-2 block font-serif text-xl leading-none text-[#4d3823]">{item.name}</span></span></button>)}
        </div>
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
    <section id="restoration" className="rose-dark-surface rose-restoration restoration-reference compact-restoration relative overflow-hidden border-y border-[#d8b86b]/18 px-5 py-[clamp(5.5rem,8vw,8.5rem)] text-[#fff4dc]" aria-labelledby="restoration-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_83%_16%,rgba(192,104,120,.14),transparent_34%),radial-gradient(circle_at_15%_82%,rgba(168,104,69,.1),transparent_30%)]" />
      <div className="site-container">
        <Reveal className="relative mx-auto max-w-5xl text-center">
          <p className="inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[.24em] text-[#d8b86b]"><Wrench size={13} /> Lifetime restoration</p>
          <h2 id="restoration-title" className="mt-6 font-serif text-[clamp(3.4rem,5.4vw,5.8rem)] leading-[.9]">Care for a lifetime.<br /><span className="italic">Not only at purchase.</span></h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/58 sm:text-base">Every Dharohar piece retains a clear route to skilled restoration<br className="hidden sm:block" /> and practical maintenance guidance throughout ownership.</p>
        </Reveal>

        <div className="relative mt-12 grid gap-px overflow-hidden rounded-[1.45rem] border border-white/12 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => { const Icon = service.icon; return <motion.article key={service.title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} className="group min-h-[190px] bg-[#321f16] p-6 transition hover:bg-[#3a251a] sm:p-8"><div className="grid grid-cols-[2.5rem_1fr] items-start gap-5"><span className="pt-2 text-[#d8a2aa] transition group-hover:-translate-y-1 group-hover:text-[#f0c5ca]"><Icon size={24} strokeWidth={1.25} /></span><div><p className="text-[7px] font-bold uppercase tracking-[.2em] text-[#d8b86b]">Care 0{index + 1}</p><h3 className="mt-3 font-serif text-[1.65rem] leading-none">{service.title}</h3><p className="mt-3 max-w-[18rem] text-sm leading-6 text-white/48">{service.copy}</p></div></div></motion.article>; })}
        </div>

        <Reveal className="restoration-promise relative mt-8 flex flex-col gap-7 rounded-[1.25rem] border border-white/12 bg-[#1e120d]/35 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1"><div className="flex items-center gap-5"><p className="shrink-0 text-[8px] font-bold uppercase tracking-[.22em] text-[#d8b86b]">The lifelong promise</p><span className="h-px flex-1 bg-gradient-to-r from-[#d8b86b]/25 to-transparent" /></div><div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-xs text-white/58">{["Care remains recorded", "Repair before replacement", "Guidance throughout ownership"].map((item) => <span key={item} className="flex items-center gap-2"><Check size={13} className="text-[#d8b86b]" />{item}</span>)}</div></div>
          <a href={`mailto:${mail}?subject=Dharohar%20lifetime%20care%20request`} className="restoration-request shrink-0">Request restoration <ArrowRight size={15} /></a>
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
        <Reveal className="relative mx-auto aspect-square w-full max-w-[460px] overflow-hidden rounded-full border-[10px] border-[#fffaf0]/70 bg-[#c38257] shadow-[0_28px_76px_rgba(94,52,23,.18)]"><Image src="/images/curated/copper-madurai-handi.webp" alt="Copper handi with a live engraving preview" fill unoptimized sizes="(max-width: 1024px) 95vw, 46vw" className="object-cover" /><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(56,24,10,.32)_100%)]" /><div className="absolute inset-x-[17%] bottom-[17%] rounded-xl border border-[#ffe2b3]/35 bg-[#4e2615]/42 px-4 py-4 text-center text-[#ffe6b8] shadow-2xl backdrop-blur-[3px]"><Feather className="mx-auto mb-2" size={19} strokeWidth={1.2} /><AnimatePresence mode="wait"><motion.p key={`${style}-${engraving}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="font-serif text-[clamp(1.25rem,4vw,2.3rem)] leading-none text-shadow-sm">{engraving || placeholders[style]}</motion.p></AnimatePresence><p className="mt-2 text-[7px] font-bold uppercase tracking-[.28em] text-[#f4c77d]">Preview engraving</p></div><div className="ambient-reflection pointer-events-none absolute inset-y-0 left-0 w-28" /></Reveal>
        <Reveal delay={.12}><p className="heritage-label w-fit">Personalisation studio</p><h2 id="legacy-title" className="heritage-display mt-5 text-[clamp(3.1rem,5vw,5.4rem)] leading-[.88]">See your story on the object.</h2><p className="mt-4 max-w-xl text-sm leading-7 sm:text-base text-[#746756]">Create a live first impression. Final placement, scale and spelling remain subject to engraving approval.</p><div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Engraving type">{(["family", "wedding", "message"] as const).map((item) => <button key={item} type="button" onClick={() => { setStyle(item); setEngraving(placeholders[item]); }} className={`rounded-full border px-4 py-2 text-[9px] font-bold uppercase tracking-[.16em] transition ${style === item ? "border-[#8f5f27] bg-[#8f5f27] text-white" : "border-[#b78b3c]/35 text-[#765323]"}`}>{item === "family" ? "Family name" : item === "wedding" ? "Wedding date" : "Short message"}</button>)}</div><label className="mt-5 block max-w-lg"><span className="heritage-field-label">Your engraving preview</span><input value={engraving} maxLength={32} onChange={(event) => setEngraving(event.target.value)} className="heritage-input" aria-label="Your engraving preview" /></label><div className="mt-5 flex flex-wrap gap-3"><StoreLink path="/collections/personalised-gifts" eventLabel="personalisation_continue" className="heritage-button heritage-button-filled">Personalise on the store <ArrowRight size={15} /></StoreLink><a href="#consultation" className="heritage-button">Ask an engraving expert</a></div><div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-xs text-[#725c41]">{["Product selection", "Engraving approval", "Presentation-ready packaging"].map((item) => <span key={item} className="flex items-center gap-2"><Check size={14} className="text-[#a4772d]" />{item}</span>)}</div></Reveal>
      </div>
    </section>
  );
}

function OccasionRoutes() {
  return (
    <section id="occasions" className="rose-surface rose-occasions bg-[#fffaf0] px-5 py-[clamp(3.75rem,6vw,6rem)]" aria-labelledby="occasions-title">
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
        <Reveal className="rose-trade-panel mt-6 flex flex-col gap-6 rounded-[1.6rem] border border-[#b78b3c]/24 bg-[#f3e6d2] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"><div className="flex items-start gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-full border border-[#b78b3c]/35 text-[#9d712a]"><Building2 size={20} /></span><div><p className="text-[8px] font-bold uppercase tracking-[.19em] text-[#9d712a]">For designers and hospitality</p><h3 className="mt-2 font-serif text-3xl text-[#4d3823]">Objects composed for a larger space.</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-[#746756]">A separate project route for restaurants, boutique stays, gifting programmes and considered interiors.</p></div></div><StoreLink path="/pages/trade-and-hospitality" eventLabel="trade_route" className="heritage-button shrink-0">Start a project <ArrowRight size={14} /></StoreLink></Reveal>
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
    <section id="care-guide" className="rose-surface rose-wisdom material-wisdom relative overflow-hidden border-y border-[#b78b3c]/20 bg-[#f8eedf] px-5 py-[clamp(3.75rem,6vw,6rem)]" aria-labelledby="trust-title">
      <span className="wisdom-border pointer-events-none absolute inset-6 rounded-[2.5rem] border border-[#b78b3c]/28" aria-hidden="true" />
      <div className="site-container relative">
        <Reveal className="mx-auto max-w-5xl text-center"><p className="heritage-label">Heritage, explained with care</p><h2 id="trust-title" className="heritage-display mt-5 text-[clamp(3.2rem,5.5vw,5.7rem)] leading-[.9]">Material wisdom.<br />Modern clarity.</h2><p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#746756] sm:text-base">Useful knowledge without broad medical promises—so every object is chosen, used and maintained with confidence.</p></Reveal>
        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{principles.map((item, index) => { const Icon = item.icon; return <motion.article key={item.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} className="wisdom-card group rounded-[1.4rem] border border-[#b78b3c]/25 bg-[#fffaf0]/76 p-5 text-center shadow-[0_14px_36px_rgba(94,61,25,.05)] backdrop-blur"><span className="mx-auto grid size-16 place-items-center rounded-full border border-[#b78b3c]/40 text-[#a4772d] transition duration-500 group-hover:-translate-y-1 group-hover:bg-[#a4772d] group-hover:text-white"><Icon size={24} strokeWidth={1.35} /></span><p className="mt-4 text-[7px] font-bold uppercase tracking-[.18em] text-[#a4772d]">Principle 0{index + 1}</p><h3 className="mt-2 font-serif text-2xl text-[#4d3823]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-[#746756]">{item.copy}</p><div className="mt-4 border-t border-[#b78b3c]/20 pt-3 text-left"><p className="text-[7px] font-bold uppercase tracking-[.15em] text-[#9a8468]">Inside the guide</p><p className="mt-2 text-xs leading-5 text-[#6c5a43]">Tradition · Evidence · Safe everyday use</p></div></motion.article>; })}</div>
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
  return <form onSubmit={submit} className="consultation-card consultation-card-dark rounded-[1.6rem] border p-5 shadow-[0_28px_80px_rgba(0,0,0,.28)] backdrop-blur sm:p-8"><div className="mb-6 border-b border-white/10 pb-5"><p className="text-[8px] font-bold uppercase tracking-[.2em] text-[#d77f90]">Request consultation</p><p className="mt-2 font-serif text-[1.75rem] leading-none text-[#fff5e7]">A thoughtful first conversation</p></div><div className="grid gap-5 sm:grid-cols-2"><label><span className="consult-label">Your name</span><input required name="name" autoComplete="name" className="consult-input" placeholder="Name" /></label><label><span className="consult-label">Email</span><input required name="email" type="email" autoComplete="email" className="consult-input" placeholder="you@example.com" /></label></div><div className="mt-5 grid gap-5 sm:grid-cols-2"><label><span className="consult-label">I am interested in</span><select name="interest" className="consult-input" value={interest} onChange={(event) => setInterest(event.target.value)}><option>Complete heritage kitchen</option><option>Wedding or festive gifting</option><option>Everyday cookware</option><option>Lifetime restoration and care</option><option>Design or hospitality project</option><option>Engraving consultation</option></select></label><label><span className="consult-label">Preferred time</span><select name="timing" className="consult-input" defaultValue="Weekday morning"><option>Weekday morning</option><option>Weekday afternoon</option><option>Weekday evening</option><option>Weekend</option></select></label></div><AnimatePresence initial={false}>{gifting ? <motion.div initial={{ height: 0, opacity: .7 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: .7 }} className="overflow-hidden"><div className="mt-5 grid gap-5 sm:grid-cols-3"><label><span className="consult-label">Occasion date</span><input name="occasionDate" type="date" className="consult-input" /></label><label><span className="consult-label">Quantity</span><input name="quantity" inputMode="numeric" className="consult-input" placeholder="e.g. 25" /></label><label><span className="consult-label">Budget range</span><input name="budget" className="consult-input" placeholder="₹ range" /></label></div></motion.div> : null}</AnimatePresence><label className="mt-5 block"><span className="consult-label">Tell us a little more</span><textarea name="message" rows={3} className="consult-input h-auto resize-none py-3" placeholder="The occasion, family size, preferred metals, engraving or care needs…" /></label><button type="submit" disabled={submitting} className="consult-submit mt-5 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg px-6 text-[10px] font-bold uppercase tracking-[.18em] transition disabled:cursor-wait disabled:opacity-60">{submitting ? "Sending request" : "Prepare consultation request"} <ArrowRight size={15} /></button><p aria-live="polite" className="mt-4 min-h-5 text-center text-xs text-white/58"><ShieldCheck size={14} className="mr-2 inline text-[#ce7587]" />{status}</p><p className="mt-1 text-center text-[9px] leading-4 text-white/38">Your details are safe and handled with care.</p></form>;
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
        <CategoryCarousel />
        <section className="rose-marquee marquee-mask overflow-hidden border-y border-[#b78b3c]/25 bg-[#fff8eb]" aria-label="Dharohar assurances"><div className="heritage-marquee flex w-max">{[0, 1].map((set) => <div key={set} aria-hidden={set === 1} className="flex">{[[Hammer, "Handcrafted in India"], [ShieldCheck, "Copper, brass & kansa"], [Feather, "Personal engraving"], [HeartHandshake, "Lifetime restoration"]].map(([Icon, label]) => <div key={`${set}-${label as string}`} className="flex min-w-[300px] items-center gap-4 border-r border-[#b78b3c]/20 px-8 py-5"><span className="grid size-11 place-items-center rounded-full border border-[#b78b3c]/40 text-[#a4772d]"><Icon size={19} /></span><span className="font-serif text-xl text-[#4f3b25]">{label as string}</span></div>)}</div>)}</div></section>
        <MaterialExplorer />
        <PersonalisationStudio />
        <TrustSequence />
        <UtensilCarousel />
        <LifetimeRestoration />
        <OccasionRoutes />
        <section id="consultation" className="rose-dark-surface rose-consultation consultation-reference consultation-salon relative isolate overflow-hidden px-5 text-[#fff8e9]" aria-labelledby="consultation-title"><div className="consultation-orb pointer-events-none absolute -left-[18%] top-[10%] -z-10 size-[48rem] rounded-full" /><div className="site-container grid gap-12 py-[clamp(5.5rem,8vw,8rem)] lg:grid-cols-[.9fr_1.1fr] lg:items-center"><Reveal><p className="text-[9px] font-bold uppercase tracking-[.24em] text-[#d7a56f]">The Dharohar private salon</p><p className="mt-6 text-[10px] font-bold uppercase tracking-[.24em] text-[#d77f90]">Gift concierge <span className="px-2 text-[#d7a56f]">•</span> Kitchen consultation</p><h2 id="consultation-title" className="mt-7 max-w-2xl font-serif text-[clamp(3.7rem,6vw,6.6rem)] leading-[.87]">A quieter way<br />to begin.</h2><span className="mt-7 block h-px w-10 bg-[#d7a56f]" /><p className="mt-6 max-w-xl text-sm leading-7 text-white/60 sm:text-base">Tell us about the rituals, gifting moment or design project you are considering. We’ll prepare a thoughtful curation into the collection.</p><div className="mt-8 flex flex-wrap gap-3">{booking ? <a href={booking} target="_blank" rel="noreferrer" onClick={() => track("booking_click", "consultation")} className="salon-primary-button"><CalendarDays size={16} /> Prepare in 30 minutes</a> : <a href={`mailto:${process.env.NEXT_PUBLIC_CONSULTATION_EMAIL ?? "hello@dharohar.in"}?subject=Dharohar%2030-minute%20consultation`} className="salon-primary-button"><CalendarDays size={16} /> Prepare in 30 minutes</a>}<a href={`mailto:${process.env.NEXT_PUBLIC_CONSULTATION_EMAIL ?? "hello@dharohar.in"}`} className="salon-secondary-button"><Mail size={16} /> Email directly</a></div><div className="mt-9 flex flex-wrap gap-6 text-[9px] font-bold uppercase tracking-[.14em] text-white/42"><span className="flex items-center gap-3"><Users size={17} className="text-[#ce7587]" /> Personal concierge care</span><span className="hidden h-5 w-px bg-white/12 sm:block" /><span className="flex items-center gap-3"><Gift size={17} className="text-[#ce7587]" /> Gifting and designing</span></div></Reveal><ConsultationGateway /></div></section>
      </main>
      <CareDock />
      <footer className="rose-footer border-t border-white/10 bg-[#18110d] px-5 text-[#fff5df]"><div className="site-container flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between"><a href="#top" className="flex items-center gap-3"><span className="relative size-14 overflow-hidden rounded-full bg-[#fffaf0]"><Image src="/images/dharohar-mark.png" alt="" fill unoptimized sizes="56px" className="object-contain mix-blend-multiply" /></span><span><strong className="block font-serif text-2xl tracking-[.12em]">DHAROHAR</strong><span className="text-[7px] font-bold uppercase tracking-[.3em] text-[#d8b86b]">Heritage Kitchen</span></span></a><nav className="flex flex-wrap gap-x-6 gap-y-3 text-[9px] font-bold uppercase tracking-[.15em] text-white/48" aria-label="Footer navigation"><a href="#materials" className="hover:text-white">Materials</a><a href="#legacy" className="hover:text-white">Your story</a><a href="#care-guide" className="hover:text-white">Material wisdom</a><a href="#rituals" className="hover:text-white">Objects</a><a href="#restoration" className="hover:text-white">Lifetime care</a><a href="#consultation" className="hover:text-white">Consultation</a><StoreLink path="/collections/all" eventLabel="footer_visit_store" className="inline-flex items-center gap-1 text-[#e2c27d]">Visit store <ArrowRight size={11} /></StoreLink></nav><p className="text-[9px] uppercase tracking-[.12em] text-white/32">© 2026 Dharohar</p></div></footer>
      <AnimatePresence>{storeIntent ? <StoreHandoff intent={storeIntent} onClose={() => setStoreIntent(null)} /> : null}</AnimatePresence>
    </>
  );
}
