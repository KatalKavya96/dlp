"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Feather,
  Flame,
  Gem,
  Hammer,
  Heart,
  Leaf,
  MapPin,
  PackageCheck,
  QrCode,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";

const materials = [
  {
    name: "Copper",
    subtitle: "Timeless & traditional",
    tone: "#bc7047",
    title: "Tamra Handi",
    detail: "Hammered. Heritage. Handcrafted.",
    image: "/images/dharohar-hero-copper.png",
    position: "70% 54%",
    benefits: [
      ["Heat retention", "Excellent", 5],
      ["Ritual value", "High", 5],
      ["Wellness", "Natural & beneficial", 4],
      ["Care level", "Moderate", 3],
    ],
  },
  {
    name: "Brass",
    subtitle: "Balanced & auspicious",
    tone: "#b5933d",
    title: "Peetal Kadhai",
    detail: "Balanced. Radiant. Ceremonial.",
    image: "/images/heritage-product-rail.webp",
    position: "82% 58%",
    benefits: [
      ["Heat retention", "Very good", 4],
      ["Ritual value", "Excellent", 5],
      ["Wellness", "Traditional choice", 4],
      ["Care level", "Considered", 3],
    ],
  },
  {
    name: "Bronze",
    subtitle: "Strong & enduring",
    tone: "#766248",
    title: "Kansa Urli",
    detail: "Enduring. Sculptural. Grounded.",
    image: "/images/product-wellness-handi-v2.png",
    position: "50% 48%",
    benefits: [
      ["Heat retention", "Excellent", 5],
      ["Ritual value", "High", 4],
      ["Wellness", "Material conscious", 4],
      ["Care level", "Easy", 4],
    ],
  },
] as const;

const journey = [
  [Search, "Discover", "Find pieces shaped for the rituals of your home."],
  [Users, "Consult", "Choose material and form with informed guidance."],
  [PackageCheck, "Purchase", "Receive a registered object, packed with care."],
  [UtensilsCrossed, "Use", "Bring heritage craft into everyday cooking."],
  [Hammer, "Restore", "Return for expert care whenever the years ask."],
  [Leaf, "Pass on", "Transfer its passport and story to the next keeper."],
] as const;

const testimonials = [
  ["The Tamra Handi is not just cookware; it feels like a piece of our family’s heritage.", "Ananya Sharma", "Jaipur"],
  ["Heirloom-worthy and quietly stunning. It has become the centrepiece of our kitchen.", "Rohan Mehta", "Mumbai"],
  ["Dharohar brings tradition into everyday cooking with unusual grace and clarity.", "Meera Iyer", "Bengaluru"],
] as const;

function HeritageFrame({ children, className = "", id, labelledBy }: { children: React.ReactNode; className?: string; id?: string; labelledBy?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`heritage-frame relative overflow-hidden ${className}`}>
      <span className="heritage-corner heritage-corner-tl" aria-hidden="true" />
      <span className="heritage-corner heritage-corner-tr" aria-hidden="true" />
      <span className="heritage-corner heritage-corner-bl" aria-hidden="true" />
      <span className="heritage-corner heritage-corner-br" aria-hidden="true" />
      {children}
    </section>
  );
}

function HeritageLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="heritage-label">
      <Sparkles size={12} aria-hidden="true" />
      {children}
      <Sparkles size={12} aria-hidden="true" />
    </p>
  );
}

export function HeritageHero() {
  const reducedMotion = useReducedMotion();

  return (
    <div id="top">
      <section className="relative isolate min-h-[calc(100svh-122px)] overflow-hidden bg-[#17110d] text-[#fff5df]" aria-labelledby="hero-title">
        <motion.div className="absolute inset-0 -z-20" initial={reducedMotion ? false : { scale: 1.06, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}>
          <SafeImage src="/images/heritage-product-rail.webp" alt="Copper and brass Dharohar cookware in a carved heritage interior" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: "58% 50%" }} />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(18,12,8,.98)_0%,rgba(18,12,8,.86)_34%,rgba(18,12,8,.32)_64%,rgba(18,12,8,.2)),linear-gradient(180deg,rgba(8,5,3,.16),rgba(8,5,3,.4))]" />
        <div className="ambient-dust absolute inset-0 -z-10 opacity-20" />
        <div className="site-container flex min-h-[calc(100svh-122px)] items-center py-16 sm:py-20">
          <Reveal className="max-w-[720px]">
            <p className="flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[.26em] text-[#dfbd77]"><Sparkles size={13} /> Heritage collection</p>
            <h1 id="hero-title" className="mt-7 font-serif text-[clamp(3.8rem,7vw,7.8rem)] leading-[.82] tracking-[-.045em] text-[#fff4dc]">
              Rooted in heritage.<br />Crafted for generations.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/68 sm:text-lg">Handcrafted copper, brass and bronze cookware that nourishes wellbeing, elevates every meal and becomes a legacy to pass on.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#collection" className="heritage-button heritage-button-filled">Explore collections <ArrowRight size={16} /></a><a href="#consultation" className="heritage-button !border-white/35 !text-[#fff5df] hover:!border-[#dfbd77]">Begin your kitchen</a></div>
            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-px border-y border-[#d8b86b]/25 bg-[#d8b86b]/20 sm:grid-cols-4">
              {["Pure metals", "Artisan made", "Wellness focused", "Made to last"].map((item) => <div key={item} className="flex items-center gap-2 bg-[#17110d]/85 px-3 py-4 text-[9px] font-semibold uppercase tracking-[.11em] text-[#f2dfb7]"><Check size={14} className="text-[#dfbd77]" /> {item}</div>)}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="border-y border-[#b78b3c]/25 bg-[#fff8eb] px-5 py-8 text-[#4a351f]" aria-labelledby="promise-title">
        <div className="site-container">
          <h2 id="promise-title" className="text-center font-serif text-3xl sm:text-4xl">The Dharohar promise</h2>
          <div className="mt-7 grid gap-px border-y border-[#b78b3c]/20 bg-[#b78b3c]/20 sm:grid-cols-2 lg:grid-cols-4">
            {[[Leaf,"Wellness first","Pure materials and thoughtful cooking."],[Hammer,"Timeless craftsmanship","Every piece shaped with practiced hands."],[ShieldCheck,"Sustainable luxury","Repairable objects made for real use."],[Feather,"Legacy in every piece","Personal stories designed to travel forward."]].map(([Icon,title,copy]) => <div key={title as string} className="flex gap-4 bg-[#fff8eb] px-5 py-5"><span className="grid size-12 shrink-0 place-items-center rounded-full border border-[#b78b3c]/40 text-[#a4772d]"><Icon size={20} /></span><div><h3 className="font-serif text-xl">{title as string}</h3><p className="mt-1 text-xs leading-5 text-[#756958]">{copy as string}</p></div></div>)}
          </div>
        </div>
      </section>
    </div>
  );
}

export function MaterialExplorer() {
  const [active, setActive] = useState(0);
  const material = materials[active];

  return (
    <div className="heritage-page-pad">
      <HeritageFrame id="materials" labelledBy="materials-title" className="px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.05fr_.9fr] lg:items-center">
          <Reveal>
            <HeritageLabel>Material selector</HeritageLabel>
            <h2 id="materials-title" className="heritage-display mt-8 text-5xl leading-[.95] sm:text-6xl">Explore the essence of each metal.</h2>
            <div className="heritage-divider my-8" />
            <p className="max-w-md text-base leading-8 text-[#746756]">Select a material to understand its cooking character, ritual meaning and care needs.</p>
            <div className="mt-9 flex items-center gap-4 rounded-2xl border border-[#b78b3c]/25 bg-white/35 p-5 text-sm leading-6 text-[#745e42]"><Leaf className="shrink-0 text-[#b78b3c]" /> Each metal is chosen with purpose. Every piece is made to last.</div>
          </Reveal>

          <motion.div key={material.name} className="text-center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
            <div className="heritage-product-arch relative mx-auto aspect-[4/5] max-w-[470px] overflow-hidden">
              <SafeImage src={material.image} alt={`${material.name} cookware selection`} fill sizes="(max-width: 1024px) 90vw, 34vw" className="object-cover" style={{ objectPosition: material.position }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#fff9ed] via-transparent to-transparent" />
            </div>
            <h3 className="mt-5 font-serif text-3xl uppercase tracking-[.08em] text-[#4a3420]">{material.title}</h3>
            <p className="mt-2 text-sm text-[#776a59]">{material.detail}</p>
          </motion.div>

          <Reveal delay={.1}>
            <p className="mb-6 text-center text-xs font-bold uppercase tracking-[.24em] text-[#a77a30] lg:text-left">Key benefits</p>
            <div className="overflow-hidden rounded-[1.6rem] border border-[#b78b3c]/28 bg-white/30">
              {material.benefits.map(([name, value, rating], index) => (
                <div key={name} className="flex items-center gap-4 border-b border-[#b78b3c]/20 px-5 py-5 last:border-0">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-[#b78b3c]/45 text-[#a77a30]">{index === 0 ? <Flame size={19} /> : index === 1 ? <Leaf size={19} /> : index === 2 ? <Heart size={19} /> : <ShieldCheck size={19} />}</span>
                  <div className="min-w-0 flex-1"><p className="font-serif text-xl">{name}</p><p className="mt-1 text-xs text-[#7a6a55]">{value}</p></div>
                  <div className="flex gap-1" aria-label={`${rating} out of 5`}>
                    {[1, 2, 3, 4, 5].map((dot) => <span key={dot} className={`size-2 rounded-full ${dot <= rating ? "bg-[#b78b3c]" : "bg-[#d8cdbb]"}`} />)}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-3">
          {materials.map((item, index) => (
            <button key={item.name} type="button" aria-pressed={active === index} onClick={() => setActive(index)} className={`flex items-center gap-4 rounded-[1.3rem] border p-4 text-left transition duration-300 ${active === index ? "border-[#b78b3c] bg-white/75 shadow-[0_10px_28px_rgba(104,72,31,.1)]" : "border-[#b78b3c]/20 bg-white/25 hover:border-[#b78b3c]/55"}`}>
              <span className="size-16 rounded-full border border-white/70 shadow-inner" style={{ background: `radial-gradient(circle at 32% 25%, #f7dfab, ${item.tone} 60%, #4b3522)` }} />
              <span className="min-w-0 flex-1"><strong className="block font-serif text-2xl font-medium uppercase tracking-[.06em]">{item.name}</strong><span className="mt-1 block text-sm text-[#766957]">{item.subtitle}</span></span>
              <span className={`grid size-8 place-items-center rounded-full border ${active === index ? "border-[#b78b3c] bg-[#b78b3c] text-white" : "border-[#b78b3c]/45 text-[#9c702b]"}`}>{active === index ? <Check size={15} /> : <ArrowRight size={14} />}</span>
            </button>
          ))}
        </div>
      </HeritageFrame>
    </div>
  );
}

export function HeritagePassport() {
  const details = [
    ["Product ID", "DH-COP-TH-00125"], ["Craft", "Hand-hammered copperware"], ["Artisan", "Ramesh Khatri · 3rd generation"],
    ["Collection", "Heritage Collection"], ["Region", "Vijayapur, Karnataka"], ["Material", "100% pure copper"],
  ];
  const care = [["Rinse", "Before first use"], ["Nourish", "Lemon + salt cleanse"], ["Polish", "Occasionally"], ["Store", "Keep dry"], ["Treasure", "Pass it on"]];

  return (
    <div className="heritage-page-pad">
      <HeritageFrame id="craft" labelledBy="passport-heading" className="overflow-visible">
        <div className="grid lg:grid-cols-[.86fr_1.22fr_.64fr]">
          <Reveal className="relative min-h-[520px] overflow-hidden border-b border-[#b78b3c]/25 lg:border-b-0 lg:border-r">
            <SafeImage src="/images/dharohar-hero-copper.png" alt="Dharohar certified copper handi" fill sizes="(max-width: 1024px) 100vw, 32vw" className="object-cover" style={{ objectPosition: "70% 52%" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#5b3419]/30 to-transparent" />
            <div className="absolute left-6 top-6 rounded-full border border-[#b78b3c]/45 bg-[#fff9ed]/90 px-4 py-3 text-center text-[9px] font-bold uppercase tracking-[.2em] text-[#8d6427] backdrop-blur">Dharohar<br />Certified</div>
          </Reveal>
          <div className="px-7 py-12 sm:px-10 lg:px-12">
            <HeritageLabel>Heritage passport</HeritageLabel>
            <h2 id="passport-heading" className="heritage-display mt-7 text-5xl leading-[.95] sm:text-6xl">Timeless craft.<br />Certified heritage.</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#746858]">This piece carries a record of hands, region, material, care and honest craftsmanship.</p>
            <dl className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-[#b78b3c]/22 bg-[#b78b3c]/22 sm:grid-cols-2">
              {details.map(([label, value]) => <div key={label} className="bg-[#fffaf0] p-5"><dt className="text-[10px] font-bold uppercase tracking-[.15em] text-[#a47831]">{label}</dt><dd className="mt-2 text-sm leading-6 text-[#514636]">{value}</dd></div>)}
            </dl>
          </div>
          <Reveal delay={.12} className="flex flex-col items-center justify-center border-t border-[#b78b3c]/25 px-7 py-12 text-center lg:border-l lg:border-t-0">
            <div className="grid size-28 place-items-center rounded-full border border-[#b78b3c]/45 text-[#a67a31]"><Leaf size={46} strokeWidth={1.2} /></div>
            <p className="mt-5 text-xs font-bold uppercase tracking-[.2em] text-[#a4772d]">Authenticity seal</p>
            <div className="my-7 h-px w-full bg-[#b78b3c]/25" />
            <QrCode size={118} strokeWidth={1.1} className="text-[#896126]" aria-label="Sample heritage passport QR code" />
            <p className="mt-5 text-sm leading-6 text-[#655542]">Scan to follow the provenance journey of your piece.</p>
          </Reveal>
        </div>
        <div className="border-t border-[#b78b3c]/25 px-6 py-7 sm:px-10">
          <p className="text-center text-xs font-bold uppercase tracking-[.22em] text-[#a4772d]">Care journey</p>
          <div className="no-scrollbar mt-6 flex overflow-x-auto">
            {care.map(([title, copy], index) => <div key={title} className="flex min-w-[210px] flex-1 items-center gap-3 border-r border-[#b78b3c]/20 px-4 last:border-0"><span className="grid size-11 shrink-0 place-items-center rounded-full border border-[#b78b3c]/40 font-serif text-lg text-[#a4772d]">{index + 1}</span><div><strong className="block text-xs uppercase tracking-[.1em]">{title}</strong><span className="mt-1 block text-xs text-[#766957]">{copy}</span></div></div>)}
          </div>
        </div>
      </HeritageFrame>
    </div>
  );
}

export function ArtisanSpotlight() {
  return (
    <div className="heritage-page-pad">
      <HeritageFrame id="story" labelledBy="artisan-heading" className="p-6 sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-stretch">
          <Reveal className="flex flex-col justify-center lg:px-6">
            <HeritageLabel>Artisan story spotlight</HeritageLabel>
            <h2 id="artisan-heading" className="heritage-display mt-8 text-5xl leading-[.93] sm:text-7xl">Handed down.<br />Heartfelt always.</h2>
            <blockquote className="mt-8 max-w-xl border-l-2 border-[#b78b3c] pl-6 text-lg leading-9 text-[#675c4d]">“Copper has been part of my life since childhood. I learned this craft from my father, and each piece still begins with the same patience.”</blockquote>
            <p className="mt-7 flex flex-wrap items-center gap-4 text-sm text-[#6d5d48]"><MapPin className="text-[#b78b3c]" size={18} /> Jaipur, Rajasthan <span className="h-5 w-px bg-[#b78b3c]/30" /> 28+ years of practice</p>
            <div className="mt-8 grid max-w-xl grid-cols-3 divide-x divide-[#b78b3c]/25 border-y border-[#b78b3c]/25 py-5 text-center"><div><strong className="font-serif text-2xl">3rd</strong><span className="mt-1 block text-xs text-[#776957]">Generation</span></div><div><strong className="font-serif text-2xl">1000+</strong><span className="mt-1 block text-xs text-[#776957]">Pieces crafted</span></div><div><strong className="font-serif text-2xl">4.9/5</strong><span className="mt-1 block text-xs text-[#776957]">Customer rating</span></div></div>
            <a href="#craft" className="heritage-button heritage-button-filled mt-8 w-fit">Meet the artisan <ArrowRight size={15} /></a>
          </Reveal>
          <Reveal delay={.1} className="relative min-h-[570px] overflow-hidden rounded-[46%_46%_1.8rem_1.8rem/22%_22%_1.8rem_1.8rem] border border-[#b78b3c]/35">
            <SafeImage src="/images/artisan.jpg" alt="Indian metal artisan in his workshop" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" style={{ objectPosition: "50% 28%" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4d321d]/48 via-transparent to-transparent" />
            <div className="absolute inset-x-6 bottom-6 flex items-center gap-4 rounded-2xl border border-white/50 bg-[#fffaf0]/92 p-4 shadow-xl backdrop-blur"><div className="relative size-20 overflow-hidden rounded-xl"><SafeImage src="/images/dharohar-hero-copper.png" alt="Featured Tamra Handi" fill sizes="80px" className="object-cover" style={{ objectPosition: "70% 54%" }} /></div><div><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#a4772d]">Featured handmade</p><p className="mt-1 font-serif text-2xl">Tamra Handi</p><p className="text-xs text-[#756652]">Hammered copper · Brass handles</p></div></div>
          </Reveal>
        </div>
      </HeritageFrame>
    </div>
  );
}

export function PersonalisationStudio() {
  const [name, setName] = useState("Sharma");
  const [year, setYear] = useState("1998");
  const [message, setMessage] = useState("Made with love, served with pride");
  const [style, setStyle] = useState("Classic");

  return (
    <div className="heritage-page-pad">
      <HeritageFrame id="personalisation" labelledBy="personalisation-heading" className="p-6 sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <Reveal className="relative min-h-[620px] rounded-[2rem] bg-[radial-gradient(circle_at_50%_35%,#fff8e8,#efe0c7)] p-6">
            <p className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full border border-[#b78b3c]/35 bg-white/65 px-4 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#9d712a]"><span className="size-2 animate-pulse rounded-full bg-[#b78b3c]" /> Live preview</p>
            <div className="absolute inset-x-[6%] top-[8%] aspect-square rounded-full border-[15px] border-[#9e562f] bg-[radial-gradient(circle_at_34%_24%,#f9c999,#bd6d42_42%,#8e482a_72%,#d79668)] shadow-[inset_0_0_0_4px_#f1b57e,inset_0_0_80px_rgba(77,32,14,.28),0_30px_55px_rgba(91,52,21,.2)] sm:inset-x-[12%] lg:inset-x-[7%]">
              <div className="absolute inset-[7%] grid place-items-center rounded-full border border-[#704027]/55 bg-[radial-gradient(circle,#d99262_1px,transparent_1.5px)] bg-[length:11px_11px] text-center text-[#57331f]">
                <div className="px-5"><Feather className="mx-auto mb-4" size={34} strokeWidth={1.2} /><p className="text-xs uppercase tracking-[.38em]">The</p><p className="font-serif text-[clamp(2.6rem,7vw,5.6rem)] uppercase leading-none tracking-[.08em]">{name || "Family"}</p><p className="mt-2 text-sm uppercase tracking-[.3em]">Family</p><div className="mx-auto my-5 h-px w-40 bg-[#704027]/70" /><p className="font-serif text-2xl tracking-[.12em]">Est. {year || "—"}</p><p className="mt-6 max-w-xs text-sm italic">{message || "Your message"}</p><p className="mt-5 text-[9px] font-bold uppercase tracking-[.24em] text-[#704027]/70">{style} engraving</p></div>
              </div>
            </div>
            <div className="absolute bottom-5 left-5 rounded-2xl border border-[#b78b3c]/30 bg-[#fffaf0]/88 px-5 py-4 text-sm shadow-lg backdrop-blur"><ShieldCheck className="mb-2 text-[#b78b3c]" /> Deep engraving · Lifetime assurance</div>
          </Reveal>

          <Reveal delay={.1} className="rounded-[2rem] border border-[#b78b3c]/28 bg-white/38 p-6 sm:p-9">
            <HeritageLabel>Live engraving</HeritageLabel>
            <h2 id="personalisation-heading" className="heritage-display mt-7 text-5xl leading-[.95] sm:text-6xl">Personalise your heirloom.</h2>
            <p className="mt-4 text-base leading-7 text-[#756958]">Made uniquely yours today, and recognisable to your family for generations.</p>
            <div className="mt-8 space-y-5">
              <label className="block"><span className="heritage-field-label">Family name</span><input value={name} maxLength={20} onChange={(event) => setName(event.target.value)} className="heritage-input" /></label>
              <label className="block"><span className="heritage-field-label">Est. date</span><input value={year} maxLength={10} onChange={(event) => setYear(event.target.value)} className="heritage-input" /></label>
              <label className="block"><span className="heritage-field-label">Special message</span><input value={message} maxLength={50} onChange={(event) => setMessage(event.target.value)} className="heritage-input" /></label>
            </div>
            <fieldset className="mt-6"><legend className="heritage-field-label">Choose style</legend><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{["Classic", "Floral", "Heritage", "Modern"].map((item) => <button key={item} type="button" aria-pressed={style === item} onClick={() => setStyle(item)} className={`rounded-xl border px-2 py-4 text-xs uppercase tracking-[.08em] transition ${style === item ? "border-[#b78b3c] bg-[#b78b3c] text-white" : "border-[#b78b3c]/30 bg-white/45 text-[#6b5539] hover:border-[#b78b3c]"}`}>{item}</button>)}</div></fieldset>
            <div className="mt-7 flex gap-3"><a href="#consultation" className="heritage-button heritage-button-filled flex-1 justify-center">Buy personalised <ArrowRight size={15} /></a><button type="button" className="heritage-button" onClick={() => { setName("Sharma"); setYear("1998"); setMessage("Made with love, served with pride"); setStyle("Classic"); }}>Reset</button></div>
          </Reveal>
        </div>
        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[#b78b3c]/25 bg-[#b78b3c]/20 sm:grid-cols-4">{[[Gem,"Pure metal"],[Hammer,"Artisan made"],[Feather,"Custom for you"],[PackageCheck,"Ships with care"]].map(([Icon,label]) => <div key={label as string} className="flex items-center justify-center gap-3 bg-[#fffaf0] p-4 text-xs uppercase tracking-[.1em] text-[#715d43]"><Icon className="text-[#b78b3c]" size={18} /> {label as string}</div>)}</div>
      </HeritageFrame>
    </div>
  );
}

export function OwnershipJourney() {
  return (
    <div className="heritage-page-pad">
      <HeritageFrame id="care" labelledBy="journey-heading" className="px-6 py-14 text-center sm:px-10 lg:px-16 lg:py-20">
        <Reveal>
          <HeritageLabel>A journey that lasts generations</HeritageLabel>
          <h2 id="journey-heading" className="heritage-display mx-auto mt-7 max-w-5xl text-5xl leading-[.95] sm:text-7xl">Lifetime ownership. Timeless bond.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#756958]">From the moment you discover Dharohar to the day it becomes an heirloom, the relationship continues.</p>
        </Reveal>
        <ol className="no-scrollbar relative mt-14 flex snap-x overflow-x-auto pb-5 lg:grid lg:grid-cols-6 lg:overflow-visible">
          <span className="absolute left-[8%] right-[8%] top-[58px] hidden h-px bg-[#b78b3c]/55 lg:block" aria-hidden="true" />
          {journey.map(([Icon, title, copy], index) => (
            <li key={title} className="relative min-w-[230px] snap-center px-5 lg:min-w-0">
              <p className="font-serif text-xl text-[#a4772d]">0{index + 1}</p>
              <div className="relative z-10 mx-auto mt-3 grid size-20 place-items-center rounded-full border border-[#b78b3c]/55 bg-[#fffaf0] text-[#a4772d] shadow-[0_8px_25px_rgba(101,68,27,.1)]"><Icon size={28} strokeWidth={1.35} /></div>
              <h3 className="mt-5 font-serif text-3xl">{title}</h3>
              <p className="mx-auto mt-3 max-w-[190px] text-sm leading-6 text-[#776a59]">{copy}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-[10px] font-bold uppercase tracking-[.28em] text-[#a4772d]">Crafted with purpose · Cherished for generations</p>
      </HeritageFrame>
    </div>
  );
}

export function WellnessBenefits() {
  const benefits = useMemo(() => [
    [Leaf, "Material-conscious cooking", "Pure, uncoated metals selected for traditional food preparation."],
    [Gem, "Rich material character", "Copper and brass bring responsive heat and a distinctive cooking experience."],
    [ShieldCheck, "Built for restoration", "Repairable forms are designed to remain useful instead of disposable."],
    [Flame, "Even heat, considered use", "Thoughtful shapes support slow, attentive everyday cooking."],
  ] as const, []);

  return (
    <div className="heritage-page-pad">
      <HeritageFrame labelledBy="wellness-heading" className="px-6 py-14 text-center sm:px-10 lg:px-16 lg:py-20">
        <Reveal><HeritageLabel>Wellness & material benefits</HeritageLabel><h2 id="wellness-heading" className="heritage-display mt-7 text-5xl leading-[.95] sm:text-7xl">Good for your rituals. Built to last.</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#756958]">Pure materials and repairable craft for mindful living and generations of nourishing meals.</p></Reveal>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr_1fr] lg:items-center">
          <div className="space-y-10 text-left lg:text-right">{benefits.slice(0,2).map(([Icon,title,copy]) => <Reveal key={title} className="flex gap-5 lg:flex-row-reverse"><span className="grid size-16 shrink-0 place-items-center rounded-full border border-[#b78b3c]/45 text-[#a4772d]"><Icon size={27} /></span><div><h3 className="font-serif text-3xl">{title}</h3><p className="mt-2 text-sm leading-6 text-[#756958]">{copy}</p></div></Reveal>)}</div>
          <Reveal className="relative mx-auto aspect-square w-full max-w-[560px] rounded-full border border-dashed border-[#b78b3c]/55 bg-[radial-gradient(circle,#fff9ec_0,#f6e8d3_68%,transparent_69%)]">
            <SafeImage src="/images/dharohar-hero-copper.png" alt="Copper handi demonstrating material benefits" fill sizes="(max-width: 1024px) 90vw, 40vw" className="rounded-full object-cover" style={{ objectPosition: "72% 55%" }} />
            <div className="absolute inset-0 rounded-full border-[18px] border-[#fffaf0]/45" />
          </Reveal>
          <div className="space-y-10 text-left">{benefits.slice(2).map(([Icon,title,copy]) => <Reveal key={title} className="flex gap-5"><span className="grid size-16 shrink-0 place-items-center rounded-full border border-[#b78b3c]/45 text-[#a4772d]"><Icon size={27} /></span><div><h3 className="font-serif text-3xl">{title}</h3><p className="mt-2 text-sm leading-6 text-[#756958]">{copy}</p></div></Reveal>)}</div>
        </div>
      </HeritageFrame>
    </div>
  );
}

export function HeritageTestimonials() {
  return (
    <div className="heritage-page-pad pb-16">
      <HeritageFrame labelledBy="testimonials-heading" className="px-6 py-14 text-center sm:px-10 lg:px-16 lg:py-20">
        <Reveal><HeritageLabel>Trusted by generations</HeritageLabel><h2 id="testimonials-heading" className="heritage-display mt-7 text-5xl leading-[.95] sm:text-7xl">Crafted with care. Loved for generations.</h2><p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[#756958]">Chosen by homes that value tradition, beauty and a lifetime of meaningful use.</p></Reveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map(([quote, name, city], index) => <Reveal key={name} delay={index * .07} className="rounded-[1.7rem] border border-[#b78b3c]/28 bg-white/32 px-7 py-9"><div className="mx-auto grid size-20 place-items-center rounded-full border border-[#b78b3c]/35 bg-[#eadcc5] font-serif text-3xl text-[#9b712f]">{name.charAt(0)}</div><div className="mt-5 flex justify-center gap-1 text-[#b78b3c]" aria-label="Five star review">{[1,2,3,4,5].map(star => <Star key={star} size={15} fill="currentColor" />)}</div><blockquote className="mt-5 font-serif text-2xl italic leading-9 text-[#5d4a34]">“{quote}”</blockquote><p className="mt-6 font-serif text-xl">{name}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[.2em] text-[#9a712f]">{city}</p></Reveal>)}
        </div>
        <div className="relative mt-7 min-h-[220px] overflow-hidden rounded-[1.7rem] border border-[#b78b3c]/28 text-left"><SafeImage src="/images/heritage-product-rail.webp" alt="Dharohar copper and brass collection in a heritage interior" fill sizes="90vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-[#755127]/92 via-[#755127]/25 to-transparent" /><p className="absolute left-7 top-1/2 max-w-xs -translate-y-1/2 text-xs font-bold uppercase leading-6 tracking-[.18em] text-[#fff8e8] sm:left-12">Featured in homes that cherish heritage</p></div>
      </HeritageFrame>
    </div>
  );
}
