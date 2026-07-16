"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Building2, Check, Gift } from "lucide-react";
import { AmbientScene } from "@/components/ui/AmbientScene";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { journal, journey } from "@/data/dharohar";

const pillars = [
  {
    number: "I",
    title: "Heritage experience",
    copy: "Consultation, artisan story, premium unboxing and personalisation turn selection into a meaningful ritual.",
    image: "/images/artisan.jpg",
    position: "62% 48%",
  },
  {
    number: "II",
    title: "Lifetime ownership",
    copy: "Restoration, certification, legacy transfer and expert support keep the relationship alive for decades.",
    image: "/images/brass-collection.jpg",
    position: "58% 50%",
  },
  {
    number: "III",
    title: "Community & knowledge",
    copy: "Recipes, material guides, masterclasses and member access make heritage cookware easier to live with.",
    image: "/images/indian-table.jpg",
    position: "50% 52%",
  },
] as const;

const shifts = [
  {
    number: "01",
    title: "Premium Indian homes",
    copy: "A growing appetite for spaces and objects that feel expressive, considered and distinctly personal.",
    image: "/images/indian-table.jpg",
    position: "42% 55%",
  },
  {
    number: "02",
    title: "Material consciousness",
    copy: "Durability, repairability and greater curiosity about what everyday objects are made from.",
    image: "/images/brass-collection.jpg",
    position: "60% 48%",
  },
  {
    number: "03",
    title: "Cultural authenticity",
    copy: "A renewed desire for Indian craftsmanship presented with context, utility and contemporary design.",
    image: "/images/artisan.jpg",
    position: "66% 46%",
  },
] as const;

const partnerships = [
  {
    icon: Gift,
    eyebrow: "Wedding & corporate gifting",
    title: "An heirloom is a gift with somewhere to go.",
    items: ["Personalised heirlooms", "Premium packaging", "Family engraving", "Bulk consultation", "Custom collections"],
    cta: "Plan a gift",
    image: "/images/indian-table.jpg",
    position: "40% 52%",
  },
  {
    icon: Building2,
    eyebrow: "Designers & hospitality",
    title: "Bring material history into rooms people remember.",
    items: ["Curated cookware and serveware", "Custom material combinations", "Boutique hospitality supply", "Heritage interior styling"],
    cta: "Partner with Dharohar",
    image: "/images/hero-kitchen.jpg",
    position: "66% 52%",
  },
] as const;

const moat = ["Artisan network", "Product provenance", "Personalisation", "Lifetime restoration", "Heritage passport", "Premium design", "Cultural storytelling", "Consultation-led selling"];

export function BusinessStory() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <section className="section-pad overflow-hidden bg-[#fcfaf6]" aria-labelledby="pillars-title">
        <div className="site-container">
          <Reveal>
            <SectionHeading id="pillars-title" eyebrow="Three brand pillars" title="An experience designed around the whole life of an object." />
          </Reveal>
          <div className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {pillars.map((pillar, index) => (
              <motion.article
                key={pillar.title}
                className="min-w-[84vw] snap-center sm:min-w-[440px] lg:min-w-0"
                initial={reducedMotion ? false : { opacity: 0, y: 28 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.72, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <AmbientScene
                  src={pillar.image}
                  alt={`${pillar.title} within the Dharohar world`}
                  className="cinematic-portal min-h-[580px] rounded-[2rem]"
                  imagePosition={pillar.position}
                  overlayClassName="bg-gradient-to-t from-[#17100c]/96 via-[#21160f]/42 to-black/8"
                >
                  <div className="flex min-h-[580px] flex-col justify-between p-7 text-white sm:p-9">
                    <div className="flex items-center justify-between">
                      <span className="portal-number font-serif text-6xl text-[#e2c580]">{pillar.number}</span>
                      <span className="size-2 rounded-full bg-[#e2c580] shadow-[0_0_18px_rgba(226,197,128,.8)]" />
                    </div>
                    <div>
                      <h3 className="max-w-sm font-serif text-4xl leading-[1.02] sm:text-5xl">{pillar.title}</h3>
                      <p className="mt-5 max-w-md border-t border-white/18 pt-5 text-sm leading-7 text-white/66">{pillar.copy}</p>
                    </div>
                  </div>
                </AmbientScene>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#eee5d7]" aria-labelledby="moat-title">
        <div className="site-container grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">Why Dharohar</p>
            <h2 id="moat-title" className="mt-5 font-serif text-[clamp(2.7rem,6vw,5.8rem)] leading-[0.95] tracking-[-0.05em]">The product can be imitated. The ecosystem cannot.</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#625b53]">The advantage is not a single pan or finish. It is the connection between craft, identity, knowledge, service and long-term trust.</p>
          </Reveal>
          <Reveal className="relative mx-auto aspect-square w-full max-w-[620px]" delay={0.1}>
            <div className="absolute inset-[4%] rounded-full border border-[#a85d35]/18" />
            <div className="absolute inset-[19%] rounded-full border border-[#a85d35]/28 bg-[#f7f2e8]/50" />
            <div className="absolute inset-[35%] grid place-items-center rounded-full bg-[#211e1a] p-3 text-center font-serif text-lg leading-tight text-[#f7f2e8] shadow-[0_24px_65px_rgba(33,30,26,.25)] sm:text-2xl">Dharohar<br />ecosystem</div>
            {moat.map((item, index) => {
              const positions = ["left-[36%] top-0", "right-[2%] top-[18%]", "right-0 top-[47%]", "right-[8%] bottom-[12%]", "left-[37%] bottom-0", "left-[1%] bottom-[17%]", "left-0 top-[45%]", "left-[8%] top-[15%]"];
              return <span key={item} className={`absolute ${positions[index]} max-w-28 rounded-full border border-[#a85d35]/22 bg-[#fcfaf6] px-3 py-2 text-center text-[9px] font-semibold uppercase tracking-[0.12em] text-[#73452d] shadow-sm sm:max-w-40 sm:px-4 sm:text-[10px]`}>{item}</span>;
            })}
          </Reveal>
        </div>
      </section>

      <section className="section-pad overflow-hidden bg-[#fcfaf6]" aria-labelledby="why-now-title">
        <div className="site-container">
          <Reveal>
            <p className="eyebrow">Why now</p>
            <h2 id="why-now-title" className="mt-5 max-w-5xl font-serif text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.05em]">Three shifts are bringing meaning back home.</h2>
          </Reveal>
          <div className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {shifts.map((shift, index) => (
              <motion.article
                key={shift.number}
                className="min-w-[84vw] snap-center sm:min-w-[420px] lg:min-w-0"
                initial={reducedMotion ? false : { opacity: 0, y: 26 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
              >
                <AmbientScene
                  src={shift.image}
                  alt={`${shift.title} visual story`}
                  className="cinematic-portal min-h-[560px] rounded-[2rem]"
                  imagePosition={shift.position}
                  overlayClassName="bg-gradient-to-t from-[#1c130e]/98 via-[#281a12]/66 to-black/28"
                  intensity="quiet"
                >
                  <div className="flex min-h-[560px] flex-col justify-between p-7 text-white sm:p-8">
                    <span className="text-[10px] font-semibold tracking-[0.22em] text-[#e2c580]">{shift.number}</span>
                    <div>
                      <h3 className="font-serif text-4xl leading-[1.02] sm:text-5xl">{shift.title}</h3>
                      <p className="mt-5 text-sm leading-7 text-white/68">{shift.copy}</p>
                      <p className="mt-7 border-t border-white/16 pt-4 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#e2c580]">Market data placeholder</p>
                    </div>
                  </div>
                </AmbientScene>
              </motion.article>
            ))}
          </div>
          <p className="mt-5 text-right text-[10px] font-semibold uppercase tracking-[0.16em] text-[#877b6f]">Replace with verified market data before production.</p>
        </div>
      </section>

      <section className="relative isolate min-h-[820px] overflow-hidden bg-[#211e1a] py-[clamp(5rem,10vw,9rem)] text-[#f7f2e8]" aria-labelledby="journey-title">
        <div className="absolute inset-0 -z-20">
          <AmbientScene
            src="/images/heritage-kitchen.jpg"
            alt="A dark heritage kitchen memory behind the Dharohar journey"
            className="h-full w-full"
            imagePosition="52% 55%"
            overlayClassName="bg-[#16110e]/86"
            intensity="quiet"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_52%,rgba(168,93,53,.2),transparent_38%)]" />
        <div className="site-container">
          <Reveal>
            <SectionHeading id="journey-title" eyebrow="The customer journey" title="From first discovery to the next generation.">
              <p className="!text-white/55">Each stage earns a different kind of value—trust, delight, retention, referral and lifetime connection.</p>
            </SectionHeading>
          </Reveal>
          <div className="relative mt-14">
            <span className="engraved-thread hidden lg:block" aria-hidden="true" />
            <ol className="no-scrollbar -mx-5 flex snap-x snap-mandatory overflow-x-auto px-5 pb-4 lg:mx-0 lg:grid lg:grid-cols-9 lg:overflow-visible lg:px-0">
              {journey.map(([stage, value], index) => (
                <li key={stage} className={`group relative min-h-72 min-w-[205px] snap-center px-3 lg:min-w-0 ${index % 2 === 0 ? "flex flex-col justify-start pt-5" : "flex flex-col justify-end pb-5"}`}>
                  <span className="absolute left-3 top-1/2 z-10 size-3 -translate-y-1/2 rounded-full border border-[#e2c580]/60 bg-[#211e1a] transition duration-700 group-hover:scale-150 group-hover:bg-[#e2c580] group-hover:shadow-[0_0_24px_rgba(226,197,128,.8)] lg:left-1/2 lg:-translate-x-1/2" />
                  <div className="border-l border-white/14 pl-4 lg:border-l-0 lg:pl-0">
                    <span className="text-[9px] font-semibold tracking-[0.18em] text-[#d8b86b]">0{index + 1}</span>
                    <p className="mt-5 font-serif text-2xl transition-colors duration-500 group-hover:text-[#e2c580]">{stage}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-white/38">{value}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-pad overflow-hidden bg-[#f7f2e8]" aria-labelledby="partnerships-title">
        <div className="site-container">
          <Reveal>
            <SectionHeading id="partnerships-title" eyebrow="Gifting & partnerships" title="Made personal. Scaled with care." />
          </Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {partnerships.map((panel, index) => {
              const Icon = panel.icon;
              return (
                <motion.article
                  key={panel.title}
                  initial={reducedMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.75, delay: index * 0.08 }}
                >
                  <AmbientScene
                    src={panel.image}
                    alt={`${panel.eyebrow} in the Dharohar world`}
                    className="cinematic-portal min-h-[650px] rounded-[2.25rem]"
                    imagePosition={panel.position}
                    overlayClassName="bg-gradient-to-t from-[#1c120d]/98 via-[#2c1c14]/68 to-black/30"
                  >
                    <div className="flex min-h-[650px] flex-col justify-between p-7 text-white sm:p-10">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f0d28d]">{panel.eyebrow}</p>
                        <span className="grid size-12 place-items-center rounded-full border border-[#f0d28d]/35 bg-black/15 backdrop-blur-sm"><Icon size={22} strokeWidth={1.2} className="text-[#f0d28d]" /></span>
                      </div>
                      <div>
                        <h3 className="max-w-xl font-serif text-4xl leading-[1.01] sm:text-6xl">{panel.title}</h3>
                        <ul className="mt-8 grid gap-3 border-t border-white/18 pt-6 text-sm sm:grid-cols-2">
                          {panel.items.map((item) => <li key={item} className="flex items-center gap-2 text-white/68"><Check size={14} className="text-[#f0d28d]" /> {item}</li>)}
                        </ul>
                        <a className="mt-10 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] underline decoration-white/30 underline-offset-8 hover:decoration-white" href="#consultation">{panel.cta} <ArrowRight size={15} /></a>
                      </div>
                    </div>
                  </AmbientScene>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="journal" className="section-pad bg-[#fcfaf6]" aria-labelledby="journal-title">
        <div className="site-container">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading id="journal-title" eyebrow="Community & journal" title="Knowledge for the modern Indian kitchen." />
            </Reveal>
            <a className="secondary-button" href="#journal">Visit the journal <ArrowRight size={16} /></a>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
            {journal.map((article, index) => (
              <Reveal key={article.title} delay={index * 0.07} className={index === 0 ? "lg:row-span-2" : ""}>
                <article className={`group relative overflow-hidden rounded-[2rem] ${index === 0 ? "min-h-[540px]" : "min-h-[260px]"}`}>
                  <SafeImage src={article.image} alt={article.title} fill sizes={index === 0 ? "(max-width: 1024px) 100vw, 68vw" : "(max-width: 1024px) 100vw, 32vw"} className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#efd18c]">{article.type} · {article.time}</p>
                    <h3 className={`mt-3 max-w-2xl font-serif leading-tight ${index === 0 ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}>{article.title}</h3>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="consultation" className="relative isolate min-h-[760px] overflow-hidden bg-[#211e1a] text-white">
        <SafeImage src="/images/indian-table.jpg" alt="A generous Indian table set for sharing" fill sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#211e1a]/95 via-[#211e1a]/68 to-[#211e1a]/18" />
        <div className="site-container flex min-h-[760px] items-center py-24">
          <Reveal className="max-w-4xl">
            <p className="eyebrow !text-[#e2c580]">Your heritage kitchen</p>
            <h2 className="mt-6 font-serif text-[clamp(3.4rem,8vw,8.5rem)] leading-[0.88] tracking-[-0.055em]">Carry the legacy forward.</h2>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/68 sm:text-lg">Build a kitchen that carries craft, memory and meaning into the next generation.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a className="primary-button justify-center" href="mailto:consult@dharohar.example?subject=Heritage%20Kitchen%20Consultation">Book a heritage consultation <ArrowRight size={16} /></a>
              <a className="border-button justify-center" href="#collection">Explore the collection</a>
            </div>
            <div className="mt-14 flex flex-wrap gap-x-7 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-white/55">
              {["For homeowners", "For designers", "For gifting", "For hospitality"].map((audience) => <a key={audience} className="transition hover:text-white" href="mailto:consult@dharohar.example">{audience}</a>)}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
