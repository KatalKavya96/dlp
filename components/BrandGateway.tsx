"use client";

import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  CirclePause,
  CirclePlay,
  Clock3,
  Crown,
  ExternalLink,
  Facebook,
  Feather,
  Gift,
  Hammer,
  HeartHandshake,
  History,
  Home,
  Hotel,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Palette,
  PartyPopper,
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

const gatewayLinks = [["Collections", "#collection"], ["Commissions", "#commissions"], ["Artisans", "#artisan-network"], ["Craft", "#care-guide"], ["Care", "#restoration"], ["Salon", "#consultation"]] as const;

const heroFrames = [
  { image: "/images/hero-parallax/sunset-background.webp", label: "Sunset over the lake", layer: "backdrop" },
  { image: "/images/hero-parallax/architecture.webp", label: "The carved pavilion", layer: "architecture" },
  { image: "/images/hero-parallax/cookware.webp", label: "Objects gathered in light", layer: "cookware" },
  { image: "/images/hero-parallax/curtain.webp", label: "The nearest veil", layer: "curtain" },
] as const;

const parallaxPlanes = [
  { x: 1.2, y: .8, scroll: 2, scale: 1 },
  { x: 2, y: 1.2, scroll: 4, scale: 1 },
  { x: 3, y: 1.8, scroll: 6, scale: 1 },
  { x: 4, y: 2.4, scroll: 8, scale: 1 },
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

const clientPaths = [
  { id: "home", label: "Homes & collectors", eyebrow: "Private homes", title: "A kitchen shaped around your rituals.", copy: "Complete kitchen curation, material guidance and personal objects selected for the way your family cooks and gathers.", detail: "Family rhythm · Metal curation · Heirloom engraving", image: "/images/heritage-kitchen.jpg", icon: Home, service: "Complete heritage kitchen" },
  { id: "wedding", label: "Weddings & gifting", eyebrow: "Celebrations", title: "A gift that enters another family’s story.", copy: "Engraved objects, presentation-ready packaging and thoughtful fulfilment for intimate ceremonies or large guest lists.", detail: "Quantity planning · Engraving · Multi-city delivery", image: "/images/curated/brass-davara-clean.jpg", icon: Crown, service: "Wedding or celebration gifting" },
  { id: "events", label: "Event planners", eyebrow: "Event commissions", title: "A tablescape that arrives ready.", copy: "Coordinated serveware and gifting programmes shaped around the venue, guest count and a fixed production calendar.", detail: "Guest count · Venue schedule · Fulfilment window", image: "/images/indian-table.jpg", icon: PartyPopper, service: "Event planning and tablescape" },
  { id: "design", label: "Interior designers", eyebrow: "Trade & interiors", title: "Material character for a larger space.", copy: "Finish libraries, custom dimensions and specification support for residences, studios and considered hospitality interiors.", detail: "Samples · Finish approval · Project specifications", image: "/images/hero-kitchen.jpg", icon: Palette, service: "Interior design or trade project" },
  { id: "hospitality", label: "Restaurants & hotels", eyebrow: "Hospitality", title: "Made for service, night after night.", copy: "Cookware, tableware and replacement continuity designed around covers, cuisine and the pace of a professional service.", detail: "Covers · Service rhythm · Scheduled care", image: "/images/brass-collection.jpg", icon: Hotel, service: "Restaurant or hospitality project" },
  { id: "corporate", label: "Corporate gifting", eyebrow: "Institutions", title: "A meaningful gesture, delivered at scale.", copy: "Brand-considered gifting with personal notes, selective co-branding and one coordinated route from approval to dispatch.", detail: "Recipient tiers · Presentation · Distributed fulfilment", image: "/images/product-heritage-set-v3.png", icon: BriefcaseBusiness, service: "Corporate or institutional gifting" },
] as const;

const artisanRegions = [
  { id: "jandiala", town: "Jandiala Guru", state: "Punjab", craft: "Thathera hand-hammering", objects: "Copper and brass pots, plates, bowls and community vessels.", status: "Core network", x: 35, y: 15 },
  { id: "jagadhri", town: "Jagadhri", state: "Haryana", craft: "Utensil forming & finishing", objects: "Brass, copper and steel kitchen forms shaped for dependable production.", status: "Core network", x: 39, y: 23 },
  { id: "moradabad", town: "Moradabad", state: "Uttar Pradesh", craft: "Casting, chasing & engraving", objects: "Detailed brassware, bowls, serveware and sculptural metal objects.", status: "Core network", x: 48, y: 28 },
  { id: "lucknow", town: "Lucknow", state: "Uttar Pradesh", craft: "Sheet-metal repoussé", objects: "Parat, deg, sini, patili, paandaan and water vessels.", status: "Core network", x: 56, y: 36 },
  { id: "varanasi", town: "Varanasi", state: "Uttar Pradesh", craft: "Repoussé & relief work", objects: "Decorative utensils and hand-worked copper and brass surfaces.", status: "Craft atlas", x: 62, y: 42 },
  { id: "kumaon", town: "Kumaon", state: "Uttarakhand", craft: "Tamta copper work", objects: "Hand-beaten copper kitchen vessels, kalash and water forms.", status: "Craft atlas", x: 48, y: 18 },
  { id: "sarthebari", town: "Sarthebari", state: "Assam", craft: "Bell-metal forming", objects: "Kahi dishes, bati bowls, lota, sarai and ceremonial vessels.", status: "Craft atlas", x: 84, y: 38 },
  { id: "mannar", town: "Mannar", state: "Kerala", craft: "Bronze casting", objects: "Urulis, ladles and enduring ritual and household metalware.", status: "Craft atlas", x: 42, y: 83 },
] as const;

const commissionBriefs = [
  { number: "01", audience: "Wedding atelier", title: "A family mark, repeated with care.", copy: "Object selection, engraving approval, presentation and distributed delivery organised as one commission.", meta: ["50–500+ gifts", "Personal engraving", "Presentation boxes"], image: "/images/product-heritage-set-v3.png" },
  { number: "02", audience: "Hospitality table", title: "A material language built for service.", copy: "A coordinated collection for the kitchen and dining room, supported by replacement continuity and scheduled care.", meta: ["Cook & serve", "Sample approval", "Care rotation"], image: "/images/indian-table.jpg" },
  { number: "03", audience: "Private kitchen", title: "The complete rasoi, considered together.", copy: "A household brief translated into cookware, tableware, water objects and future heirlooms.", meta: ["Family consultation", "Metal curation", "Object passport"], image: "/images/heritage-kitchen.jpg" },
] as const;

const tableObjects = [
  { id: "thali", number: "01", name: "Kansa Thali", material: "Kansa bronze", purpose: "The complete place setting", copy: "A generous thali, katoris and tumbler composed as one calm material family.", path: "/products/kansa-thaali-set", image: "/images/curated/kansa-thaali-clean.jpg", x: 55, y: 70 },
  { id: "roti", number: "02", name: "Roti Dabba", material: "Hammered brass", purpose: "Warmth at the centre", copy: "A sculptural chapati box made to travel naturally from the rasoi to the family table.", path: "/products/brass-chapati-box-roti-dabba", image: "/images/curated/brass-roti-box.jpg", x: 88, y: 51 },
  { id: "bottle", number: "03", name: "Copper Bottle", material: "Hammered copper", purpose: "The water ritual", copy: "A quiet upright form that brings hand-worked copper into an everyday gesture.", path: "/products/copper-water-bottle", image: "/images/curated/copper-bottle.jpg", x: 75, y: 34 },
  { id: "handi", number: "04", name: "Copper Handi", material: "Copper · Brass", purpose: "From flame to table", copy: "A rounded serving form whose warm surface holds the light as beautifully as the meal.", path: "/collections/copper-cookware", image: "/images/curated/copper-madurai-handi.webp", x: 64, y: 52 },
  { id: "serve", number: "05", name: "Serving Kadhai", material: "Polished brass", purpose: "For shared dishes", copy: "A wide handled form made for generous serving and the rituals that happen around it.", path: "/products/brass-kadhai", image: "/images/curated/brass-flat-kadhai.webp", x: 42, y: 52 },
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

function DharoharWordmark({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span className={`dharohar-brand-wordmark relative block ${className}`}>
      <Image src="/images/dharohar-wordmark.png" alt="Dharohar Heritage Kitchen" fill priority={priority} unoptimized sizes="260px" className="object-contain" />
    </span>
  );
}

function DharoharImageSignature({ className = "" }: { className?: string }) {
  return (
    <span className={`dharohar-image-signature ${className}`} aria-hidden="true">
      <span className="relative block h-full w-full">
        <Image src="/images/dharohar-wordmark.png" alt="" fill unoptimized sizes="170px" className="object-contain" />
      </span>
    </span>
  );
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
          <DharoharWordmark priority className="h-[3.8rem] w-[9.75rem] sm:h-[4.5rem] sm:w-[12rem]" />
        </a>
        <nav className="hidden items-center gap-[clamp(1.4rem,2.6vw,3.2rem)] lg:flex" aria-label="Primary navigation">{gatewayLinks.map(([label, href]) => <a key={href} href={href} aria-current={activeHref === href ? "location" : undefined} className={`relative py-3 text-[12px] font-medium tracking-[-.01em] transition after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:bg-[#f1d39b] after:transition-transform ${activeHref === href ? "text-[#f2d39a] after:scale-x-100" : "text-white/78 after:scale-x-0 hover:text-white hover:after:scale-x-100"}`}>{label}</a>)}</nav>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <StoreLink path="/search" eventLabel="header_search" aria-label="Search the collection" className="hero-nav-icon hidden sm:grid"><Search size={19} strokeWidth={1.5} /></StoreLink>
          <StoreLink path="/account" eventLabel="header_account" aria-label="Open your account" className="hero-nav-icon hidden sm:grid"><UserRound size={19} strokeWidth={1.5} /></StoreLink>
          <StoreLink path="/collections/all" eventLabel="header_visit_store" aria-label="Visit the Dharohar store" className="hero-nav-icon grid"><ShoppingBag size={19} strokeWidth={1.5} /></StoreLink>
          <button type="button" className="hero-nav-icon grid lg:hidden" aria-expanded={open} aria-controls="gateway-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/38 via-transparent to-white/10" />
            <DharoharImageSignature className="left-5 top-5 sm:left-7 sm:top-7" />
            <div className="absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-full border border-white/35 bg-black/25 px-4 py-2 text-[9px] font-bold uppercase tracking-[.18em] text-white backdrop-blur transition duration-300 group-hover:-translate-y-1 group-hover:bg-black/45">View all {active.name} <ArrowRight size={13} /></div>
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
              <DharoharImageSignature className="left-5 top-5 sm:left-7 sm:top-7" />
              <span className="absolute right-5 top-5 z-[7] font-serif text-2xl italic text-white/75 sm:right-7 sm:top-7">{String(index + 1).padStart(2, "0")}</span>
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

function DharoharTable() {
  const [activeId, setActiveId] = useState<(typeof tableObjects)[number]["id"]>("thali");
  const active = tableObjects.find((item) => item.id === activeId) ?? tableObjects[0];

  return (
    <section id="rituals" className="dharohar-table overflow-hidden bg-[#1d1114] px-5 py-[clamp(4rem,7vw,7rem)] text-[#fff8ed]" aria-labelledby="dharohar-table-title">
      <div className="site-container">
        <Reveal className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[.25em] text-[#d8b06f]"><span className="h-px w-8 bg-[#d8b06f]/55" /> The Dharohar table</p>
            <h2 id="dharohar-table-title" className="mt-5 max-w-5xl font-serif text-[clamp(3.35rem,6vw,6.6rem)] leading-[.84] tracking-[-.035em]"><span className="table-title-line">A table is where metal</span><br /><span className="italic text-[#d9a2ab]">becomes memory.</span></h2>
          </div>
          <div className="max-w-sm lg:pb-2">
            <p className="text-sm leading-7 text-white/55">Select an object inside the scene. Each piece has a place, a purpose and a route into your home.</p>
            <StoreLink path="/collections/tableware" eventLabel="table_complete" className="table-complete-link mt-5">Complete this table <ArrowRight size={15} /></StoreLink>
          </div>
        </Reveal>
      </div>

      <Reveal className="dharohar-table-stage mx-auto mt-10 max-w-[1500px]">
        <div className="dharohar-table-image-frame relative isolate overflow-hidden rounded-[1.7rem] border border-white/14 bg-[#29171a] shadow-[0_42px_120px_rgba(0,0,0,.4)]">
          <Image src="/images/experience/dharohar-table-v1.webp" alt="A composed Dharohar table with copper, brass and kansa objects at blue hour" fill unoptimized sizes="(max-width: 767px) 100vw, 1500px" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,9,11,.46),transparent_42%),linear-gradient(180deg,transparent_54%,rgba(16,8,10,.34))]" />
          <div className="table-vignette pointer-events-none absolute inset-0" />
          <DharoharImageSignature className="right-5 top-5 sm:right-7 sm:top-7" />
          <p className="absolute left-5 top-5 rounded-full border border-white/18 bg-[#251316]/58 px-4 py-2 text-[8px] font-bold uppercase tracking-[.2em] text-white/68 backdrop-blur-md sm:left-7 sm:top-7">Select a glowing marker</p>

          {tableObjects.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={activeId === item.id}
              aria-label={`Explore ${item.name}`}
              onClick={() => setActiveId(item.id)}
              className="table-hotspot"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
            >
              <span className="table-hotspot-pulse" />
              <span className="table-hotspot-core">+</span>
              <span className="sr-only">{item.name}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.aside key={active.id} className="dharohar-table-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .4, ease: [.22, 1, .36, 1] }} aria-live="polite">
            <div className="grid grid-cols-[4.4rem_1fr] gap-4">
              <div className="relative aspect-square overflow-hidden rounded-xl bg-[#d6c3b2]">
                <DharoharImage src={active.image} alt="" fill unoptimized sizes="72px" className="object-cover" />
              </div>
              <div>
                <p className="text-[7px] font-bold uppercase tracking-[.22em] text-[#d8b06f]">Object {active.number} · {active.material}</p>
                <h3 className="mt-2 font-serif text-[1.7rem] leading-none text-white">{active.name}</h3>
                <p className="mt-2 text-[9px] font-bold uppercase tracking-[.14em] text-[#d9a2ab]">{active.purpose}</p>
              </div>
            </div>
            <p className="mt-4 text-xs leading-6 text-white/58">{active.copy}</p>
            <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/12 pt-4">
              <StoreLink path={active.path} eventLabel={`table_${active.id}`} className="inline-flex items-center gap-2 text-[8px] font-bold uppercase tracking-[.18em] text-[#edc787]">View this object <ArrowRight size={13} /></StoreLink>
              <span className="text-[8px] uppercase tracking-[.16em] text-white/30">{active.number} / 05</span>
            </div>
          </motion.aside>
        </AnimatePresence>

        <div className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-2 md:hidden" role="tablist" aria-label="Objects on the Dharohar table">
          {tableObjects.map((item) => <button key={item.id} type="button" role="tab" aria-selected={activeId === item.id} onClick={() => setActiveId(item.id)} className="table-mobile-tab">{item.number} · {item.name}</button>)}
        </div>
      </Reveal>
    </section>
  );
}

function LifetimeRestoration() {
  const [careMode, setCareMode] = useState<"restore" | "membership" | "hospitality">("restore");
  const services = [
    { icon: RotateCcw, title: "Re-tinning / Kalai", copy: "Renew food-contact lining after an object-specific assessment." },
    { icon: Sparkles, title: "Polishing & patina", copy: "Restore brightness or preserve a naturally earned patina." },
    { icon: Hammer, title: "Dent & form repair", copy: "Correct dents while respecting the vessel’s handmade character." },
    { icon: ShieldCheck, title: "Fittings inspection", copy: "Review handles, lids, joints and everyday working points." },
    { icon: PenLine, title: "Engraving updates", copy: "Refresh a mark or add the next name and date." },
    { icon: HeartHandshake, title: "Care guidance", copy: "Receive lifelong, object-specific maintenance support." },
  ] as const;
  const memberships = [
    { name: "Ghar Care", price: "₹4,900", cadence: "per year", credits: "4 care credits", features: ["Annual condition review", "One pickup and return cycle", "10% off additional care"], recommended: false },
    { name: "Heirloom Circle", price: "₹9,900", cadence: "per year", credits: "10 care credits", features: ["Two logistics cycles", "Priority artisan queue", "Engraving refresh credit", "Digital care ledger"], recommended: true },
    { name: "Collector’s Reserve", price: "₹18,000", cadence: "per year", credits: "20 care credits", features: ["Twice-yearly review", "Dedicated care advisor", "Priority restoration", "Provenance record"], recommended: false },
  ] as const;
  const mail = process.env.NEXT_PUBLIC_CONSULTATION_EMAIL ?? "hello@dharohar.in";

  return (
    <section id="restoration" className="rose-dark-surface rose-restoration restoration-reference compact-restoration relative overflow-hidden border-y border-[#d8b86b]/18 px-5 py-[clamp(5.5rem,8vw,8.5rem)] text-[#fff4dc]" aria-labelledby="restoration-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_83%_16%,rgba(192,104,120,.14),transparent_34%),radial-gradient(circle_at_15%_82%,rgba(168,104,69,.1),transparent_30%)]" />
      <div className="site-container">
        <Reveal className="restoration-intro relative mx-auto max-w-5xl text-center">
          <p className="inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[.24em] text-[#d8b86b]"><Wrench size={13} /> Lifetime restoration</p>
          <h2 id="restoration-title" className="mt-6 font-serif text-[clamp(3.4rem,5.4vw,5.8rem)] leading-[.9]">Care for a lifetime.<br /><span className="italic">Not only at purchase.</span></h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/58 sm:text-base">Every Dharohar piece retains a clear route to skilled restoration<br className="hidden sm:block" /> and practical maintenance guidance throughout ownership.</p>
        </Reveal>

        <div className="care-mode-tabs relative mx-auto mt-9 flex max-w-3xl rounded-full border border-white/12 bg-black/15 p-1" role="tablist" aria-label="Dharohar care programmes">
          {[
            ["restore", "One-time restoration"],
            ["membership", "Care memberships"],
            ["hospitality", "Hospitality care"],
          ].map(([id, label]) => <button key={id} type="button" role="tab" aria-selected={careMode === id} onClick={() => setCareMode(id as typeof careMode)} className={`care-mode-tab ${careMode === id ? "is-active" : ""}`}>{label}</button>)}
        </div>

        <AnimatePresence mode="wait">
          {careMode === "restore" ? (
            <motion.div key="restore" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="relative mt-9 grid gap-px overflow-hidden rounded-[1.45rem] border border-white/12 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => { const Icon = service.icon; return <article key={service.title} className="group min-h-[180px] bg-[#321f16] p-6 transition hover:bg-[#3a251a] sm:p-7"><div className="grid grid-cols-[2.5rem_1fr] items-start gap-5"><span className="pt-2 text-[#d8a2aa] transition group-hover:-translate-y-1 group-hover:text-[#f0c5ca]"><Icon size={24} strokeWidth={1.25} /></span><div><p className="text-[7px] font-bold uppercase tracking-[.2em] text-[#d8b86b]">Care 0{index + 1}</p><h3 className="mt-3 font-serif text-[1.65rem] leading-none">{service.title}</h3><p className="mt-3 max-w-[18rem] text-sm leading-6 text-white/48">{service.copy}</p></div></div></article>; })}
            </motion.div>
          ) : null}

          {careMode === "membership" ? (
            <motion.div key="membership" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="mt-9 grid gap-4 lg:grid-cols-3">
              {memberships.map((plan) => (
                <article key={plan.name} className={`care-plan-card relative rounded-[1.45rem] border p-6 sm:p-8 ${plan.recommended ? "is-recommended" : ""}`}>
                  {plan.recommended ? <span className="absolute right-5 top-5 rounded-full bg-[#d8b86b] px-3 py-1 text-[7px] font-black uppercase tracking-[.14em] text-[#2b151a]">Most considered</span> : null}
                  <p className="text-[8px] font-bold uppercase tracking-[.2em] text-[#d8b86b]">{plan.credits}</p>
                  <h3 className="mt-4 font-serif text-4xl">{plan.name}</h3>
                  <div className="mt-5 flex items-end gap-2"><strong className="font-serif text-5xl font-medium text-[#fff4dc]">{plan.price}</strong><span className="pb-2 text-xs text-white/36">{plan.cadence}</span></div>
                  <div className="mt-6 space-y-3 border-t border-white/10 pt-5">{plan.features.map((feature) => <p key={feature} className="flex items-center gap-3 text-sm text-white/55"><Check size={14} className="text-[#d8b86b]" />{feature}</p>)}</div>
                  <a href={`mailto:${mail}?subject=${encodeURIComponent(`Dharohar ${plan.name} membership`)}`} className="restoration-request mt-7 w-full">Choose {plan.name} <ArrowRight size={14} /></a>
                </article>
              ))}
              <p className="col-span-full mt-2 text-center text-[10px] leading-5 text-white/34">Indicative launch pricing. Final inclusions and logistics are confirmed against object size, condition and serviceable location.</p>
            </motion.div>
          ) : null}

          {careMode === "hospitality" ? (
            <motion.div key="hospitality" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="hospitality-care-panel mt-9 overflow-hidden rounded-[1.45rem] border border-white/12 bg-[#241018]/76">
              <div className="grid lg:grid-cols-[.92fr_1.08fr]">
                <div className="p-7 sm:p-10">
                  <p className="text-[8px] font-bold uppercase tracking-[.22em] text-[#d8b86b]">Capacity held for your service</p>
                  <h3 className="mt-4 max-w-xl font-serif text-[clamp(2.8rem,4.7vw,5rem)] leading-[.88]">Care that moves in batches, not emergencies.</h3>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-white/52">A scheduled restoration route for restaurants, hotels and event collections—so part of the service is cared for while the rest remains in use.</p>
                  <div className="mt-7 flex items-end gap-3"><strong className="font-serif text-5xl font-medium text-[#efd49a]">₹25,000</strong><span className="pb-2 text-xs text-white/38">from / quarter</span></div>
                  <a href={`mailto:${mail}?subject=Dharohar%20hospitality%20care`} className="restoration-request mt-7">Build a care rotation <ArrowRight size={14} /></a>
                </div>
                <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                  {[["01", "Condition audit", "Review the working collection and identify priority objects."], ["02", "Rolling batches", "Keep service running while selected pieces return to care."], ["03", "Priority turnaround", "Reserve artisan capacity around the operating calendar."], ["04", "Continuity ledger", "Record work, replacements and future service dates."]].map(([number, title, copy]) => <article key={number} className="bg-[#2b141d] p-6 sm:p-8"><span className="text-[8px] font-bold tracking-[.18em] text-[#d8b86b]">{number}</span><h4 className="mt-4 font-serif text-3xl">{title}</h4><p className="mt-3 text-sm leading-6 text-white/45">{copy}</p></article>)}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

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
  const [previewState, setPreviewState] = useState<"before" | "engraved">("engraved");
  const [copyStatus, setCopyStatus] = useState("Keep this inscription");
  const placeholders = { family: "The Sharma Family", wedding: "Aarav & Meera · 2027", message: "With love, always" };

  async function copyInscription() {
    try {
      await navigator.clipboard.writeText(engraving || placeholders[style]);
      setCopyStatus("Inscription copied");
    } catch {
      setCopyStatus("Your inscription is ready");
    }
    window.setTimeout(() => setCopyStatus("Keep this inscription"), 2200);
  }

  return (
    <section id="legacy" className="engraving-story relative isolate overflow-hidden bg-[#efe1cb] px-5 py-[clamp(4rem,7vw,7rem)]" aria-labelledby="legacy-title">
      <div className="engraving-glow pointer-events-none absolute -right-[14%] top-[8%] -z-10 size-[42rem] rounded-full" />
      <div className="site-container grid gap-10 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
        <Reveal className="engraving-object-stage relative overflow-hidden rounded-[1.8rem] border border-[#b78b3c]/25 bg-[#f8eee1] shadow-[0_32px_90px_rgba(79,42,24,.16)]">
          <div className="absolute inset-x-5 top-5 z-20 flex items-center justify-between gap-4 sm:inset-x-7 sm:top-7">
            <p className="text-[8px] font-bold uppercase tracking-[.22em] text-[#8d5b2c]">Live object study</p>
            <div className="flex rounded-full border border-[#8d5b2c]/20 bg-[#fffaf0]/78 p-1 backdrop-blur" role="group" aria-label="Compare engraving">
              <button type="button" onClick={() => setPreviewState("before")} aria-pressed={previewState === "before"} className={`engraving-view-button ${previewState === "before" ? "engraving-view-button-active" : ""}`}>Before</button>
              <button type="button" onClick={() => setPreviewState("engraved")} aria-pressed={previewState === "engraved"} className={`engraving-view-button ${previewState === "engraved" ? "engraving-view-button-active" : ""}`}>Engraved</button>
            </div>
          </div>

          <div className="relative aspect-[4/5] sm:aspect-[5/4]">
            <Image src="/images/curated/copper-madurai-handi.webp" alt="Copper handi with a live personalised engraving preview" fill unoptimized sizes="(max-width: 1024px) 100vw, 56vw" className="engraving-object-image object-cover" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_53%_66%,transparent_24%,rgba(83,42,25,.1)_70%,rgba(83,42,25,.24)_100%)]" />
            <DharoharImageSignature className="bottom-5 right-5 sm:bottom-7 sm:right-7" />
            <AnimatePresence>
              {previewState === "engraved" ? (
                <motion.div key={`${style}-${engraving}`} initial={{ opacity: 0, scale: .94, x: "-50%", y: "-50%", filter: "blur(5px)" }} animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%", filter: "blur(0px)" }} exit={{ opacity: 0, scale: .96, x: "-50%", y: "-50%", filter: "blur(4px)" }} transition={{ duration: .5 }} className="engraving-mark">
                  <Feather className="mx-auto mb-2" size={15} strokeWidth={1.15} />
                  <p className="font-serif leading-[.95]">{engraving || placeholders[style]}</p>
                  <span className="mt-2 block text-[6px] font-bold uppercase tracking-[.28em]">Dharohar personalisation</span>
                </motion.div>
              ) : null}
            </AnimatePresence>
            <div className="ambient-reflection pointer-events-none absolute inset-y-0 left-0 w-28" />
          </div>

          <div className="grid border-t border-[#b78b3c]/18 bg-[#fffaf0]/72 sm:grid-cols-2">
            <button type="button" onClick={() => setPreviewState("before")} className={`engraving-state-copy ${previewState === "before" ? "engraving-state-copy-active" : ""}`}><span>Before engraving</span><strong>An object from Dharohar.</strong></button>
            <button type="button" onClick={() => setPreviewState("engraved")} className={`engraving-state-copy border-t border-[#b78b3c]/18 sm:border-l sm:border-t-0 ${previewState === "engraved" ? "engraving-state-copy-active" : ""}`}><span>After engraving</span><strong>An object from your family.</strong></button>
          </div>
        </Reveal>

        <Reveal delay={.12}>
          <p className="heritage-label w-fit">Personalisation studio</p>
          <h2 id="legacy-title" className="heritage-display mt-5 text-[clamp(3.35rem,5.4vw,5.9rem)] leading-[.86]">A name changes<br /><span className="italic text-[#9d6570]">the object.</span></h2>
          <p className="mt-5 max-w-xl font-serif text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.15] text-[#5d4632]">Until it carries your name, it belongs to the collection. After that, it belongs to your story.</p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#746756]">Create a live first impression. Final placement, scale and spelling remain subject to engraving approval.</p>

          <div className="mt-7 flex flex-wrap gap-2" role="group" aria-label="Engraving type">
            {(["family", "wedding", "message"] as const).map((item) => <button key={item} type="button" onClick={() => { setStyle(item); setEngraving(placeholders[item]); setPreviewState("engraved"); }} className={`engraving-mode-button ${style === item ? "engraving-mode-button-active" : ""}`}>{item === "family" ? "Family name" : item === "wedding" ? "Wedding date" : "Short message"}</button>)}
          </div>

          <label className="mt-5 block max-w-xl">
            <span className="heritage-field-label">Your engraving preview</span>
            <input value={engraving} maxLength={32} onChange={(event) => { setEngraving(event.target.value); setPreviewState("engraved"); }} className="heritage-input engraving-input" aria-label="Your engraving preview" />
          </label>

          <div className="mt-5 flex flex-wrap gap-3">
            <StoreLink path="/collections/personalised-gifts" eventLabel="personalisation_continue" className="heritage-button heritage-button-filled">Begin personalisation <ArrowRight size={15} /></StoreLink>
            <button type="button" onClick={copyInscription} className="heritage-button">{copyStatus}</button>
            <a href="#consultation" className="heritage-button">Ask an engraving expert</a>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-xs text-[#725c41]">{["Product selection", "Engraving approval", "Presentation-ready packaging"].map((item) => <span key={item} className="flex items-center gap-2"><Check size={14} className="text-[#a4772d]" />{item}</span>)}</div>
        </Reveal>
      </div>
    </section>
  );
}

function CommissioningHall() {
  const [activeId, setActiveId] = useState<(typeof clientPaths)[number]["id"]>("home");
  const active = clientPaths.find((item) => item.id === activeId) ?? clientPaths[0];
  const ActiveIcon = active.icon;

  function prepareConsultation() {
    window.dispatchEvent(new CustomEvent("dharohar:consultation-persona", { detail: { persona: active.label, service: active.service } }));
    track("commission_path", active.id);
  }

  return (
    <section id="commissions" className="commissioning-hall relative isolate overflow-hidden bg-[#f8efe9] px-5 py-[clamp(4.5rem,7vw,7rem)]" aria-labelledby="commissions-title">
      <div className="commissioning-hall-glow pointer-events-none absolute inset-0 -z-10" />
      <div className="site-container">
        <Reveal className="grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="heritage-label">The commissioning hall</p>
            <h2 id="commissions-title" className="heritage-display mt-5 max-w-4xl text-[clamp(3.2rem,5.5vw,5.9rem)] leading-[.87]">One craft.<br /><span className="italic text-[#a26069]">Many kinds of tables.</span></h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#756269] sm:text-base lg:justify-self-end">From one family kitchen to a wedding of five hundred, every commission begins with how the objects will be lived with.</p>
        </Reveal>

        <div className="mt-10 grid overflow-hidden rounded-[1.8rem] border border-[#a26069]/22 bg-[#2a171c] shadow-[0_32px_100px_rgba(74,32,43,.18)] lg:grid-cols-[.37fr_.63fr]">
          <div role="tablist" aria-label="Who Dharohar serves" className="commission-audience-tabs no-scrollbar flex gap-2 overflow-x-auto border-b border-white/10 p-3 lg:flex-col lg:overflow-visible lg:border-b-0 lg:border-r lg:p-5">
            {clientPaths.map((item, index) => {
              const Icon = item.icon;
              const selected = item.id === active.id;
              return (
                <button key={item.id} type="button" role="tab" aria-selected={selected} aria-controls="commission-audience-panel" onClick={() => setActiveId(item.id)} className={`commission-audience-tab ${selected ? "is-active" : ""}`}>
                  <span className="text-[8px] font-semibold tracking-[.16em] text-white/28">0{index + 1}</span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/12"><Icon size={16} strokeWidth={1.4} /></span>
                  <span className="whitespace-nowrap text-left text-[10px] font-bold uppercase tracking-[.12em]">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div id="commission-audience-panel" role="tabpanel" className="relative min-h-[560px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div key={active.id} className="absolute inset-0" initial={{ opacity: 0, scale: 1.035 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .985 }} transition={{ duration: .7, ease: [.22, 1, .36, 1] }}>
                <DharoharImage src={active.image} alt={`${active.label} commission by Dharohar`} fill unoptimized sizes="(max-width: 1024px) 100vw, 64vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160b10] via-[#1a0d12]/34 to-black/4" />
                <DharoharImageSignature className="right-5 top-5 sm:right-7 sm:top-7" />
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div key={`${active.id}-copy`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .48 }} className="absolute inset-x-0 bottom-0 p-6 text-[#fff8ec] sm:p-9">
                <span className="grid size-11 place-items-center rounded-full border border-[#e2c27d]/35 bg-black/20 text-[#ebc88a] backdrop-blur"><ActiveIcon size={19} strokeWidth={1.35} /></span>
                <p className="mt-5 text-[8px] font-bold uppercase tracking-[.22em] text-[#e4bd79]">{active.eyebrow}</p>
                <h3 className="mt-3 max-w-2xl font-serif text-[clamp(2.45rem,4vw,4.6rem)] leading-[.9]">{active.title}</h3>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/66">{active.copy}</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <span className="text-[9px] font-bold uppercase tracking-[.14em] text-white/45">{active.detail}</span>
                  <a href="#consultation" onClick={prepareConsultation} className="commission-brief-cta">Build my commission <ArrowRight size={14} /></a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArtisanNetwork() {
  const [activeId, setActiveId] = useState<(typeof artisanRegions)[number]["id"]>("jandiala");
  const active = artisanRegions.find((item) => item.id === activeId) ?? artisanRegions[0];

  return (
    <section id="artisan-network" className="artisan-network relative isolate overflow-hidden bg-[#1a1012] px-5 py-[clamp(4.5rem,7vw,7rem)] text-[#fff5e5]" aria-labelledby="artisan-network-title">
      <div className="artisan-network-aura pointer-events-none absolute inset-0 -z-10" />
      <div className="site-container">
        <Reveal className="artisan-network-intro grid gap-7 lg:grid-cols-[1fr_.8fr] lg:items-end">
          <div><p className="inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[.24em] text-[#d8b86b]"><MapPin size={13} /> The hands of Dharohar</p><h2 id="artisan-network-title" className="mt-5 max-w-5xl font-serif text-[clamp(3.4rem,5.8vw,6.3rem)] leading-[.86]">A country of hands<br /><span className="italic text-[#d89aa6]">behind every object.</span></h2></div>
          <p className="max-w-xl text-sm leading-7 text-white/55 sm:text-base lg:justify-self-end">A reliable network across North India, connected to a wider atlas of living metal traditions and matched to the process each commission needs.</p>
        </Reveal>

        <div className="artisan-network-grid mt-10 grid gap-5 lg:grid-cols-[1.12fr_.88fr]">
          <Reveal className="artisan-map-shell relative min-h-[520px] overflow-hidden rounded-[1.8rem] border border-[#d8b86b]/18 bg-[#241416] p-6 sm:p-9">
            <div className="artisan-map-grid pointer-events-none absolute inset-0" />
            <div className="artisan-map-silhouette absolute left-[9%] top-[7%] h-[84%] w-[70%]" aria-hidden="true" />
            <div className="absolute left-6 top-6 z-20 rounded-full border border-[#d8b86b]/24 bg-[#170c0f]/72 px-4 py-2 text-[8px] font-bold uppercase tracking-[.18em] text-[#e5c684] backdrop-blur sm:left-9 sm:top-9">Select a workshop region</div>
            {artisanRegions.map((region) => (
              <button key={region.id} type="button" onClick={() => setActiveId(region.id)} aria-label={`Explore ${region.town}, ${region.state}`} aria-pressed={active.id === region.id} className={`artisan-map-pin ${active.id === region.id ? "is-active" : ""}`} style={{ left: `${region.x}%`, top: `${region.y}%` }}>
                <span />
                <small>{region.town}</small>
              </button>
            ))}
            <AnimatePresence mode="wait">
              <motion.div key={active.id} className="artisan-map-story absolute inset-x-6 bottom-6 z-20 rounded-[1.3rem] border border-white/12 bg-[#1b0d12]/88 p-5 backdrop-blur-xl sm:inset-x-auto sm:bottom-9 sm:left-9 sm:w-[24rem] sm:p-6" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="flex items-center justify-between gap-4"><p className="text-[8px] font-bold uppercase tracking-[.2em] text-[#d8b86b]">{active.status}</p><span className="text-[8px] uppercase tracking-[.15em] text-white/32">{active.state}</span></div>
                <h3 className="mt-3 font-serif text-4xl">{active.town}</h3>
                <p className="mt-2 text-sm font-semibold text-[#e8b5be]">{active.craft}</p>
                <p className="mt-3 text-sm leading-6 text-white/52">{active.objects}</p>
              </motion.div>
            </AnimatePresence>
          </Reveal>

          <Reveal className="artisan-ledger rounded-[1.8rem] border border-white/10 bg-white/[.035] p-6 sm:p-8">
            <p className="text-[8px] font-bold uppercase tracking-[.22em] text-[#d8b86b]">Network ledger</p>
            <h3 className="mt-4 max-w-xl font-serif text-[clamp(2.5rem,4vw,4.2rem)] leading-[.9]">The right hand for every process.</h3>
            <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-[1.2rem] border border-white/10 bg-white/10">
              {[["04", "Core regions"], ["08", "Craft traditions"], ["06", "Care processes"], ["01", "Quality standard"]].map(([value, label]) => <div key={label} className="bg-[#211216] p-5"><strong className="font-serif text-4xl font-medium text-[#efd59e]">{value}</strong><span className="mt-1 block text-[8px] font-bold uppercase tracking-[.14em] text-white/38">{label}</span></div>)}
            </div>
            <div className="mt-7 space-y-3">
              {["Workshop matched to process", "Samples approved before scale", "Quality checks recorded", "Repair route retained after delivery"].map((item) => <div key={item} className="flex items-center gap-3 border-b border-white/8 pb-3 text-sm text-white/58"><BadgeCheck size={16} className="shrink-0 text-[#d8b86b]" />{item}</div>)}
            </div>
            <p className="mt-6 text-xs leading-6 text-white/34">Core network identifies active Dharohar workshop relationships. Craft atlas locations recognise important regional traditions and should be presented as partners only after formal onboarding.</p>
            <a href="#consultation" onClick={() => window.dispatchEvent(new CustomEvent("dharohar:consultation-persona", { detail: { persona: "Interior designers", service: "Custom product development" } }))} className="restoration-request mt-7">Discuss a custom commission <ArrowRight size={14} /></a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CommissionProof() {
  const tools = [
    { icon: Layers3, label: "Trade material library", title: "Specify before you commission.", copy: "Review finish directions, care requirements, dimensions and sample routes for an interior or hospitality brief.", persona: "Interior designers", service: "Interior design or trade project" },
    { icon: Gift, label: "Wedding gift atelier", title: "Build the gift around the moment.", copy: "Shape quantity, object, engraving, presentation and delivery into one approval-ready gifting brief.", persona: "Weddings & gifting", service: "Wedding or celebration gifting" },
    { icon: BookOpen, label: "Object passport", title: "Keep the story with the object.", copy: "Record material, workshop region, engraving, care guidance and future restoration events.", persona: "Homes & collectors", service: "Object passport and provenance" },
  ] as const;

  function routeToConsultation(persona: string, service: string) {
    window.dispatchEvent(new CustomEvent("dharohar:consultation-persona", { detail: { persona, service } }));
  }

  return (
    <section id="commission-archive" className="commission-proof overflow-hidden bg-[#fffaf4] px-5 py-[clamp(4.5rem,7vw,7rem)]" aria-labelledby="commission-proof-title">
      <div className="site-container">
        <Reveal className="grid gap-7 lg:grid-cols-[1fr_.72fr] lg:items-end">
          <div><p className="heritage-label">The commission room</p><h2 id="commission-proof-title" className="heritage-display mt-5 max-w-5xl text-[clamp(3.25rem,5.5vw,5.9rem)] leading-[.87]">Briefs designed<br /><span className="italic text-[#a26069]">to become heirlooms.</span></h2></div>
          <p className="max-w-lg text-sm leading-7 text-[#756269] sm:text-base lg:justify-self-end">Three ways Dharohar can turn scale, specification and personal meaning into one composed collection.</p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          {commissionBriefs.map((brief, index) => (
            <motion.article key={brief.number} whileHover={{ y: -5 }} className={`commission-case group relative min-h-[430px] overflow-hidden rounded-[1.55rem] text-white ${index === 0 ? "lg:col-span-5" : index === 1 ? "lg:col-span-4" : "lg:col-span-3"}`}>
              <DharoharImage src={brief.image} alt={`${brief.audience} commission direction`} fill unoptimized sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover transition duration-[1200ms] group-hover:scale-[1.045]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#160d10]/98 via-[#241318]/28 to-black/6" />
              <DharoharImageSignature className="right-5 top-5" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-center justify-between"><p className="text-[8px] font-bold uppercase tracking-[.2em] text-[#e2c27d]">{brief.audience}</p><span className="text-[8px] tracking-[.16em] text-white/42">{brief.number}</span></div>
                <h3 className="mt-3 font-serif text-[2.25rem] leading-[.9]">{brief.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/58">{brief.copy}</p>
                <div className="mt-5 flex flex-wrap gap-2">{brief.meta.map((item) => <span key={item} className="rounded-full border border-white/14 bg-black/14 px-3 py-1.5 text-[7px] font-bold uppercase tracking-[.12em] text-white/58 backdrop-blur">{item}</span>)}</div>
              </div>
            </motion.article>
          ))}
        </div>

        <Reveal className="commission-journey mt-5 rounded-[1.55rem] border border-[#a26069]/20 bg-[#f7eae7] p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div><p className="text-[8px] font-bold uppercase tracking-[.2em] text-[#9d5864]">From brief to heirloom</p><h3 className="mt-2 font-serif text-3xl text-[#4c2e35]">A production journey you can see.</h3></div>
            <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
              {["Consultation", "Curation", "Sample", "Approval", "Production", "Quality", "Delivery", "Lifetime care"].map((step, index) => <div key={step} className="commission-step"><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong>{index < 7 ? <ArrowRight size={12} /> : null}</div>)}
            </div>
          </div>
        </Reveal>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Reveal key={tool.label} className="commission-tool rounded-[1.55rem] border border-[#a26069]/20 bg-white p-6 shadow-[0_18px_48px_rgba(83,35,47,.06)] sm:p-8">
                <span className="grid size-12 place-items-center rounded-full border border-[#a26069]/24 text-[#9d5864]"><Icon size={20} strokeWidth={1.35} /></span>
                <p className="mt-6 text-[8px] font-bold uppercase tracking-[.2em] text-[#9d5864]">{tool.label}</p>
                <h3 className="mt-3 font-serif text-3xl leading-none text-[#4c2e35]">{tool.title}</h3>
                <p className="mt-4 text-sm leading-6 text-[#756269]">{tool.copy}</p>
                <a href="#consultation" onClick={() => routeToConsultation(tool.persona, tool.service)} className="mt-6 inline-flex items-center gap-2 text-[8px] font-black uppercase tracking-[.17em] text-[#8d4653]">Prepare this brief <ArrowRight size={13} /></a>
              </Reveal>
            );
          })}
        </div>
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

export function LegacyConsultationGateway() {
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

function ConsultationGateway() {
  type ConsultationField = {
    name: string;
    label: string;
    placeholder?: string;
    type?: "text" | "date" | "number" | "url";
    options?: readonly string[];
  };

  const audiences = [
    { label: "Homes & collectors", icon: Home },
    { label: "Weddings & gifting", icon: Crown },
    { label: "Event planners", icon: PartyPopper },
    { label: "Interior designers", icon: Palette },
    { label: "Restaurants & hotels", icon: Hotel },
    { label: "Corporate gifting", icon: BriefcaseBusiness },
  ] as const;
  const services = [
    "Complete heritage kitchen",
    "Wedding or celebration gifting",
    "Bulk or trade order",
    "Restaurant or hospitality project",
    "Custom product development",
    "Engraving and personalisation",
    "Restoration",
    "Annual care membership",
  ] as const;
  const fieldsByAudience: Record<string, ConsultationField[]> = {
    "Homes & collectors": [
      { name: "householdSize", label: "Household size", type: "number", placeholder: "e.g. 5" },
      { name: "cookingStyle", label: "Cooking rhythm", options: ["Daily family cooking", "Slow and ceremonial", "Entertaining often", "Building a complete kitchen"] },
      { name: "preferredMetal", label: "Preferred metal", options: ["Help me choose", "Copper / Tamra", "Brass / Peetal", "Bronze / Kansa", "A considered mix"] },
      { name: "city", label: "City", placeholder: "Where the collection will live" },
    ],
    "Weddings & gifting": [
      { name: "eventDate", label: "Celebration date", type: "date" },
      { name: "quantity", label: "Number of gifts", type: "number", placeholder: "e.g. 150" },
      { name: "budget", label: "Budget per gift", placeholder: "₹ range" },
      { name: "engraving", label: "Personalisation", options: ["Names or initials", "Wedding date", "Family mark", "Not decided yet"] },
    ],
    "Event planners": [
      { name: "eventDate", label: "Event date", type: "date" },
      { name: "guestCount", label: "Guest count", type: "number", placeholder: "e.g. 300" },
      { name: "venue", label: "Venue & city", placeholder: "Venue or destination" },
      { name: "fulfilment", label: "Requirement", options: ["Guest gifting", "Tablescape and service", "Ceremonial objects", "Complete event commission"] },
    ],
    "Interior designers": [
      { name: "projectType", label: "Project type", options: ["Private residence", "Restaurant or café", "Boutique stay", "Retail or studio", "Other interior"] },
      { name: "city", label: "Project city", placeholder: "City" },
      { name: "quantity", label: "Estimated quantity", placeholder: "Pieces or room count" },
      { name: "referenceLink", label: "Drawings / moodboard link", type: "url", placeholder: "https://" },
    ],
    "Restaurants & hotels": [
      { name: "covers", label: "Number of covers", type: "number", placeholder: "e.g. 80" },
      { name: "openingDate", label: "Opening / service date", type: "date" },
      { name: "requirement", label: "Primary requirement", options: ["Cookware", "Tableware", "Serveware", "A complete material language"] },
      { name: "careCadence", label: "Care cadence", options: ["One-time project", "Quarterly rotation", "Annual programme", "Help me decide"] },
    ],
    "Corporate gifting": [
      { name: "quantity", label: "Recipient count", type: "number", placeholder: "e.g. 250" },
      { name: "deliveryDate", label: "Required by", type: "date" },
      { name: "budget", label: "Budget per recipient", placeholder: "₹ range" },
      { name: "branding", label: "Presentation", options: ["Dharohar presentation", "Personal note", "Selective co-branding", "Multiple recipient tiers"] },
    ],
  };

  const [status, setStatus] = useState("We usually reply within one working day.");
  const [persona, setPersona] = useState("Homes & collectors");
  const [service, setService] = useState("Complete heritage kitchen");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const selectPersona = (event: Event) => {
      const detail = (event as CustomEvent<{ persona?: string; service?: string }>).detail;
      if (detail.persona) setPersona(detail.persona);
      if (detail.service) setService(detail.service);
    };
    window.addEventListener("dharohar:consultation-persona", selectPersona);
    return () => window.removeEventListener("dharohar:consultation-persona", selectPersona);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const entries = Array.from(new FormData(formElement).entries()).map(([key, value]) => [key, String(value)] as const);
    const payload = Object.fromEntries(entries);
    const endpoint = process.env.NEXT_PUBLIC_CONSULTATION_ENDPOINT;
    const destination = process.env.NEXT_PUBLIC_CONSULTATION_EMAIL ?? "hello@dharohar.in";
    const subject = encodeURIComponent(`Dharohar consultation — ${persona} — ${service}`);
    const body = encodeURIComponent(entries.filter(([, value]) => value.trim()).map(([key, value]) => `${key.replace(/([A-Z])/g, " $1")}: ${value}`).join("\n"));
    track("consultation_start", `${persona}:${service}`);

    if (endpoint) {
      setSubmitting(true);
      setStatus("Sending your private consultation request…");
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, persona, service, source: "dharohar-brand-gateway" }),
        });
        if (!response.ok) throw new Error("Consultation endpoint rejected the request");
        track("consultation_submitted", `${persona}:${service}`);
        setStatus("Thank you. Your considered brief is with the Dharohar team.");
        formElement.reset();
      } catch {
        setStatus("We could not send this request. Please use ‘Email directly’ and we’ll help personally.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    setStatus("Your email app is opening with the brief prepared.");
    window.location.href = `mailto:${destination}?subject=${subject}&body=${body}`;
  }

  const dynamicFields = fieldsByAudience[persona] ?? fieldsByAudience["Homes & collectors"];

  return (
    <form onSubmit={submit} className="consultation-card consultation-card-dark rounded-[1.6rem] border p-5 shadow-[0_28px_80px_rgba(0,0,0,.28)] backdrop-blur sm:p-8">
      <div className="mb-6 flex items-end justify-between gap-5 border-b border-white/10 pb-5">
        <div><p className="text-[8px] font-bold uppercase tracking-[.2em] text-[#d77f90]">Request consultation</p><p className="mt-2 font-serif text-[2rem] leading-none text-[#fff5e7]">A brief that understands you</p></div>
        <span className="hidden text-[8px] font-bold uppercase tracking-[.16em] text-white/28 sm:block">About 60 seconds</span>
      </div>

      <fieldset>
        <legend className="consult-label">01 · Who are we creating for?</legend>
        <div className="consult-persona-grid">
          {audiences.map((audience) => {
            const Icon = audience.icon;
            return <button key={audience.label} type="button" aria-pressed={persona === audience.label} onClick={() => setPersona(audience.label)} className={`consult-persona ${persona === audience.label ? "is-active" : ""}`}><Icon size={15} /><span>{audience.label}</span></button>;
          })}
        </div>
        <input type="hidden" name="persona" value={persona} />
      </fieldset>

      <label className="mt-6 block">
        <span className="consult-label">02 · What would you like help with?</span>
        <select name="service" className="consult-input" value={service} onChange={(event) => setService(event.target.value)}>
          {services.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>

      <fieldset className="mt-6">
        <legend className="consult-label">03 · The useful details</legend>
        <AnimatePresence mode="wait">
          <motion.div key={persona} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {dynamicFields.map((field) => (
              <label key={field.name}>
                <span className="consult-label">{field.label}</span>
                {field.options ? (
                  <select name={field.name} className="consult-input" defaultValue={field.options[0]}>{field.options.map((option) => <option key={option}>{option}</option>)}</select>
                ) : (
                  <input name={field.name} type={field.type ?? "text"} className="consult-input" placeholder={field.placeholder} />
                )}
              </label>
            ))}
          </motion.div>
        </AnimatePresence>
      </fieldset>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label><span className="consult-label">Your name</span><input required name="name" autoComplete="name" className="consult-input" placeholder="Name" /></label>
        <label><span className="consult-label">Email</span><input required name="email" type="email" autoComplete="email" className="consult-input" placeholder="you@example.com" /></label>
      </div>
      <label className="mt-4 block"><span className="consult-label">Anything we should understand?</span><textarea name="message" rows={3} className="consult-input h-auto resize-none py-3" placeholder="The occasion, design intention, preferred metals, care needs or anything that matters…" /></label>
      <label className="mt-4 block"><span className="consult-label">Preferred conversation</span><select name="timing" className="consult-input" defaultValue="Weekday morning"><option>Weekday morning</option><option>Weekday afternoon</option><option>Weekday evening</option><option>Weekend</option></select></label>
      <button type="submit" disabled={submitting} className="consult-submit mt-5 inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-lg px-6 text-[10px] font-bold uppercase tracking-[.18em] transition disabled:cursor-wait disabled:opacity-60">{submitting ? "Sending request" : "Prepare consultation request"} <ArrowRight size={15} /></button>
      <p aria-live="polite" className="mt-4 min-h-5 text-center text-xs text-white/58"><ShieldCheck size={14} className="mr-2 inline text-[#ce7587]" />{status}</p>
      <p className="mt-1 text-center text-[9px] leading-4 text-white/38">Your details are handled privately and used only to prepare this consultation.</p>
    </form>
  );
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
        <CommissioningHall />
        <MaterialExplorer />
        <PersonalisationStudio />
        <ArtisanNetwork />
        <TrustSequence />
        <DharoharTable />
        <LifetimeRestoration />
        <CommissionProof />
        <section id="consultation" className="rose-dark-surface rose-consultation consultation-reference consultation-salon relative isolate overflow-hidden px-5 text-[#fff8e9]" aria-labelledby="consultation-title"><div className="consultation-orb pointer-events-none absolute -left-[18%] top-[10%] -z-10 size-[48rem] rounded-full" /><div className="site-container grid gap-12 py-[clamp(5.5rem,8vw,8rem)] lg:grid-cols-[.8fr_1.2fr] lg:items-start"><Reveal className="consultation-intro lg:sticky lg:top-32"><p className="text-[9px] font-bold uppercase tracking-[.24em] text-[#d7a56f]">The Dharohar private salon</p><p className="mt-6 text-[10px] font-bold uppercase tracking-[.24em] text-[#d77f90]">Homes <span className="px-2 text-[#d7a56f]">•</span> Celebrations <span className="px-2 text-[#d7a56f]">•</span> Trade</p><h2 id="consultation-title" className="mt-7 max-w-2xl font-serif text-[clamp(3.7rem,6vw,6.6rem)] leading-[.87]">A quieter way<br />to begin.</h2><span className="mt-7 block h-px w-10 bg-[#d7a56f]" /><p className="mt-6 max-w-xl text-sm leading-7 text-white/60 sm:text-base">Choose who you are creating for and what you need. The brief will adapt—whether it is one home, a wedding, an interior or a restaurant in service.</p><div className="mt-8 flex flex-wrap gap-3">{booking ? <a href={booking} target="_blank" rel="noreferrer" onClick={() => track("booking_click", "consultation")} className="salon-primary-button"><CalendarDays size={16} /> Speak for 30 minutes</a> : <a href={`mailto:${process.env.NEXT_PUBLIC_CONSULTATION_EMAIL ?? "hello@dharohar.in"}?subject=Dharohar%2030-minute%20consultation`} className="salon-primary-button"><CalendarDays size={16} /> Speak for 30 minutes</a>}<a href={`mailto:${process.env.NEXT_PUBLIC_CONSULTATION_EMAIL ?? "hello@dharohar.in"}`} className="salon-secondary-button"><Mail size={16} /> Email directly</a></div><div className="mt-9 flex flex-wrap gap-6 text-[9px] font-bold uppercase tracking-[.14em] text-white/42"><span className="flex items-center gap-3"><Users size={17} className="text-[#ce7587]" /> Personal concierge</span><span className="hidden h-5 w-px bg-white/12 sm:block" /><span className="flex items-center gap-3"><Clock3 size={17} className="text-[#ce7587]" /> One working day response</span></div></Reveal><ConsultationGateway /></div></section>
      </main>
      <CareDock />
      <footer className="rose-footer border-t border-white/10 bg-[#18110d] px-5 text-[#fff5df]">
        <div className="site-container flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:justify-between">
          <a href="#top" aria-label="Dharohar home"><DharoharWordmark className="h-[5rem] w-[13.5rem]" /></a>
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-[9px] font-bold uppercase tracking-[.15em] text-white/48" aria-label="Footer navigation"><a href="#collection" className="hover:text-white">Collections</a><a href="#commissions" className="hover:text-white">Commissions</a><a href="#artisan-network" className="hover:text-white">Artisans</a><a href="#rituals" className="hover:text-white">Objects</a><a href="#restoration" className="hover:text-white">Care plans</a><a href="#consultation" className="hover:text-white">Consultation</a><StoreLink path="/collections/all" eventLabel="footer_visit_store" className="inline-flex items-center gap-1 text-[#e2c27d]">Visit store <ArrowRight size={11} /></StoreLink></nav>
          <nav className="flex items-center gap-2" aria-label="Dharohar on social media">
            <a href="https://www.instagram.com/dharohar91/" target="_blank" rel="noreferrer" aria-label="Dharohar on Instagram" className="grid size-9 place-items-center rounded-full border border-white/15 text-white/55 transition hover:border-[#e2c27d]/60 hover:text-[#e2c27d]"><Instagram size={15} /></a>
            <a href="https://www.linkedin.com/company/dharohar91/?viewAsMember=true" target="_blank" rel="noreferrer" aria-label="Dharohar on LinkedIn" className="grid size-9 place-items-center rounded-full border border-white/15 text-white/55 transition hover:border-[#e2c27d]/60 hover:text-[#e2c27d]"><Linkedin size={15} /></a>
            <a href="https://x.com/Dharoharxt42" target="_blank" rel="noreferrer" aria-label="Dharohar on X" className="grid size-9 place-items-center rounded-full border border-white/15 text-white/55 transition hover:border-[#e2c27d]/60 hover:text-[#e2c27d]"><span className="text-[13px] font-medium leading-none">𝕏</span></a>
            <a href="https://www.facebook.com/profile.php?id=61592081474548" target="_blank" rel="noreferrer" aria-label="Dharohar on Facebook" className="grid size-9 place-items-center rounded-full border border-white/15 text-white/55 transition hover:border-[#e2c27d]/60 hover:text-[#e2c27d]"><Facebook size={15} /></a>
          </nav>
          <p className="text-[9px] uppercase tracking-[.12em] text-white/32">© 2026 Dharohar</p>
        </div>
      </footer>
      <AnimatePresence>{storeIntent ? <StoreHandoff intent={storeIntent} onClose={() => setStoreIntent(null)} /> : null}</AnimatePresence>
    </>
  );
}
