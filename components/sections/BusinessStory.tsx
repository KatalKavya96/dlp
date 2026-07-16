import { ArrowRight, Building2, Check, Gift } from "lucide-react";
import { journal, journey } from "@/data/dharohar";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";

const pillars = [
  {
    number: "I",
    title: "Heritage experience",
    copy: "Consultation, artisan story, premium unboxing and personalisation turn selection into a meaningful ritual.",
  },
  {
    number: "II",
    title: "Lifetime ownership",
    copy: "Restoration, certification, legacy transfer and expert support keep the relationship alive for decades.",
  },
  {
    number: "III",
    title: "Community & knowledge",
    copy: "Recipes, material guides, masterclasses and member access make heritage cookware easier to live with.",
  },
];

const moat = ["Artisan network", "Product provenance", "Personalisation", "Lifetime restoration", "Heritage passport", "Premium design", "Cultural storytelling", "Consultation-led selling"];

export function BusinessStory() {
  return (
    <>
      <section className="section-pad overflow-hidden bg-[#fcfaf6]" aria-labelledby="pillars-title">
        <div className="site-container">
          <Reveal>
            <SectionHeading eyebrow="Three brand pillars" title="An experience designed around the whole life of an object." />
          </Reveal>
          <div className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:overflow-visible">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 0.08} className="min-w-[82vw] snap-center rounded-[2rem] border border-black/8 bg-[#f7f2e8] p-7 sm:min-w-[420px] lg:min-w-0 lg:p-9">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-4xl text-[#a85d35]">{pillar.number}</span>
                  <span className="size-2 rounded-full bg-[#b88a3b]" />
                </div>
                <h3 className="mt-16 max-w-sm font-serif text-4xl leading-[1.05]">{pillar.title}</h3>
                <p className="mt-5 max-w-md text-sm leading-7 text-[#655d54]">{pillar.copy}</p>
              </Reveal>
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

      <section className="section-pad bg-[#fcfaf6]" aria-labelledby="why-now-title">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
            <Reveal>
              <p className="eyebrow">Why now</p>
              <h2 id="why-now-title" className="mt-5 font-serif text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.05em]">Three shifts are bringing meaning back home.</h2>
            </Reveal>
            <div className="grid gap-px overflow-hidden rounded-[2rem] border border-black/8 bg-black/8 md:grid-cols-3">
              {[
                ["01", "Premium Indian homes", "A growing appetite for spaces and objects that feel expressive, considered and distinctly personal."],
                ["02", "Material consciousness", "Durability, repairability and greater curiosity about what everyday objects are made from."],
                ["03", "Cultural authenticity", "A renewed desire for Indian craftsmanship presented with context, utility and contemporary design."],
              ].map(([number, title, copy], index) => (
                <Reveal key={number} delay={index * 0.08} className="bg-[#f7f2e8] p-6 sm:p-8">
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[#a85d35]">{number}</span>
                  <h3 className="mt-10 font-serif text-3xl leading-tight">{title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#685f56]">{copy}</p>
                  <p className="mt-8 border-t border-black/10 pt-4 text-[9px] font-semibold uppercase tracking-[0.14em] text-[#a85d35]">Market data placeholder</p>
                </Reveal>
              ))}
            </div>
          </div>
          <p className="mt-5 text-right text-[10px] font-semibold uppercase tracking-[0.16em] text-[#877b6f]">Replace with verified market data before production.</p>
        </div>
      </section>

      <section className="section-pad overflow-hidden bg-[#211e1a] text-[#f7f2e8]" aria-labelledby="journey-title">
        <div className="site-container">
          <Reveal>
            <SectionHeading eyebrow="The customer journey" title="From first discovery to the next generation.">
              <p className="!text-white/55">Each stage earns a different kind of value—trust, delight, retention, referral and lifetime connection.</p>
            </SectionHeading>
          </Reveal>
          <ol className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory overflow-x-auto px-5 pb-4 sm:mx-0 sm:px-0">
            {journey.map(([stage, value], index) => (
              <li key={stage} className="relative min-w-40 snap-start border-l border-white/14 px-5 py-2 first:border-l-0 sm:min-w-48">
                <span className="text-[9px] font-semibold tracking-[0.18em] text-[#d8b86b]">0{index + 1}</span>
                <p className="mt-8 font-serif text-2xl">{stage}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.13em] text-white/38">{value}</p>
                {index < journey.length - 1 ? <ArrowRight className="absolute right-3 top-2 text-white/18" size={14} /> : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad bg-[#f7f2e8]" aria-labelledby="partnerships-title">
        <div className="site-container">
          <Reveal>
            <SectionHeading eyebrow="Gifting & partnerships" title="Made personal. Scaled with care." />
          </Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {[
              {
                icon: Gift,
                eyebrow: "Wedding & corporate gifting",
                title: "An heirloom is a gift with somewhere to go.",
                items: ["Personalised heirlooms", "Premium packaging", "Family engraving", "Bulk consultation", "Custom collections"],
                cta: "Plan a gift",
              },
              {
                icon: Building2,
                eyebrow: "Designers & hospitality",
                title: "Bring material history into rooms people remember.",
                items: ["Curated cookware and serveware", "Custom material combinations", "Boutique hospitality supply", "Heritage interior styling"],
                cta: "Partner with Dharohar",
              },
            ].map((panel, index) => {
              const Icon = panel.icon;
              return (
                <Reveal key={panel.title} delay={index * 0.08} className={`rounded-[2rem] p-7 sm:p-10 ${index === 0 ? "bg-[#a85d35] text-white" : "bg-[#3a261b] text-white"}`}>
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65">{panel.eyebrow}</p>
                    <Icon size={24} strokeWidth={1.2} className="text-[#f0d28d]" />
                  </div>
                  <h3 className="mt-14 max-w-xl font-serif text-4xl leading-[1.03] sm:text-5xl">{panel.title}</h3>
                  <ul className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
                    {panel.items.map((item) => <li key={item} className="flex items-center gap-2 text-white/68"><Check size={14} className="text-[#f0d28d]" /> {item}</li>)}
                  </ul>
                  <a className="mt-10 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] underline decoration-white/30 underline-offset-8 hover:decoration-white" href="#consultation">{panel.cta} <ArrowRight size={15} /></a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="journal" className="section-pad bg-[#fcfaf6]" aria-labelledby="journal-title">
        <div className="site-container">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading eyebrow="Community & journal" title="Knowledge for the modern Indian kitchen." />
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
              {['For homeowners', 'For designers', 'For gifting', 'For hospitality'].map((audience) => <a key={audience} className="transition hover:text-white" href="mailto:consult@dharohar.example">{audience}</a>)}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
