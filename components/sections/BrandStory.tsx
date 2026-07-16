import { ArrowRight } from "lucide-react";
import { AmbientScene } from "@/components/ui/AmbientScene";
import { Reveal } from "@/components/ui/Reveal";

const livingValues = [
  ["Craft", "The hand behind the object"],
  ["Health", "Material-conscious choices"],
  ["Memory", "The rituals we repeat"],
  ["Legacy", "The life beyond us"],
] as const;

export function BrandStory() {
  return (
    <>
      <section id="story" className="relative min-h-[980px] overflow-hidden bg-[#211e1a] text-[#f7f2e8]" aria-labelledby="brand-statement">
        <div className="absolute inset-0">
          <AmbientScene
            src="/images/artisan.jpg"
            alt="Metal artisan at work in a warm Dharohar workshop"
            className="h-full w-full"
            imagePosition="68% 52%"
            overlayClassName="bg-[linear-gradient(90deg,rgba(23,17,13,.97)_0%,rgba(23,17,13,.89)_42%,rgba(23,17,13,.48)_74%,rgba(23,17,13,.72)_100%)]"
          />
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-[48%] hidden w-px bg-gradient-to-b from-transparent via-[#d8b86b]/35 to-transparent lg:block" />
        <div className="site-container relative flex min-h-[980px] flex-col justify-between py-[clamp(6rem,11vw,10rem)]">
          <Reveal>
            <p className="eyebrow !text-[#d8b86b]">Our point of view</p>
            <h2 id="brand-statement" className="mt-8 max-w-5xl font-serif text-[clamp(3rem,8vw,8.8rem)] leading-[0.86] tracking-[-0.055em]">
              We do not simply sell cookware. <span className="text-[#d8b86b]">We create heirlooms.</span>
            </h2>
          </Reveal>

          <div className="mt-24 grid border-y border-white/14 lg:grid-cols-[.82fr_1.18fr]">
            <Reveal className="flex items-end border-b border-white/14 py-8 lg:border-b-0 lg:border-r lg:pr-12">
              <p className="max-w-md text-base leading-7 text-white/62">Every Dharohar piece connects the customer to its maker, material, cultural origin and future generations.</p>
            </Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {livingValues.map(([word, note], index) => (
                <Reveal key={word} delay={index * 0.08} className="group relative min-h-44 border-l border-white/10 p-5 first:border-l-0 sm:p-6">
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[#d8b86b]">0{index + 1}</span>
                  <p className="mt-9 font-serif text-3xl sm:text-4xl">{word}</p>
                  <p className="mt-3 text-xs leading-5 text-white/45 transition-colors duration-500 group-hover:text-white/72">{note}</p>
                  <span className="absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 bg-[#d8b86b] transition-transform duration-700 group-hover:scale-x-100" />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad overflow-hidden bg-[#f7f2e8]" aria-labelledby="bridge-title">
        <div className="site-container">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#2d2018] shadow-[0_45px_120px_rgba(55,36,24,.16)]">
            <div className="grid min-h-[760px] lg:grid-cols-2">
              <AmbientScene
                src="/images/hero-kitchen.jpg"
                alt="A modern kitchen containing time-worn copper cookware"
                className="min-h-[560px] lg:min-h-[760px]"
                imagePosition="68% 54%"
                overlayClassName="bg-gradient-to-t from-[#19130f]/95 via-[#241a14]/45 to-black/10"
                intensity="quiet"
              >
                <div className="flex h-full flex-col justify-end p-7 pb-44 text-white sm:p-10 sm:pb-48 lg:pb-60">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e2c580]">The modern kitchen</p>
                  <h2 className="mt-5 max-w-xl font-serif text-[clamp(2.6rem,4.5vw,5rem)] leading-[.96]">Convenient, but increasingly disposable and emotionally generic.</h2>
                  <p className="mt-5 max-w-lg text-sm leading-7 text-white/62">We have gained speed, yet often lost the object stories and material confidence that once shaped a kitchen.</p>
                </div>
              </AmbientScene>

              <AmbientScene
                src="/images/heritage-kitchen.jpg"
                alt="An inherited kitchen filled with memory and old cookware"
                className="min-h-[560px] border-t border-white/10 lg:min-h-[760px] lg:border-l lg:border-t-0"
                imagePosition="48% 52%"
                overlayClassName="bg-gradient-to-t from-[#221710]/95 via-[#362419]/52 to-black/8"
                intensity="quiet"
              >
                <div className="flex h-full flex-col justify-end p-7 pb-44 text-white sm:p-10 sm:pb-48 lg:pb-60">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e2c580]">The inherited kitchen</p>
                  <h2 className="mt-5 max-w-xl font-serif text-[clamp(2.6rem,4.5vw,5rem)] leading-[.96]">Meaningful, but fragmented, difficult to trust and rarely designed for modern homes.</h2>
                  <p className="mt-5 max-w-lg text-sm leading-7 text-white/62">Dharohar brings clarity, contemporary utility and care to a living tradition without sanding away its character.</p>
                </div>
              </AmbientScene>
            </div>
            <span className="living-gold-seam hidden lg:block" aria-hidden="true" />

            <Reveal className="absolute inset-x-4 bottom-4 z-30 overflow-hidden rounded-[1.8rem] border border-white/15 bg-[#9d5836]/92 px-6 py-6 text-[#fff8ed] shadow-2xl backdrop-blur-xl sm:inset-x-6 sm:bottom-6 sm:px-8 lg:px-10">
              <div className="ambient-reflection pointer-events-none absolute inset-y-0 -left-1/3 w-1/3" />
              <div className="relative grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/65">The Dharohar bridge</p>
                  <h2 id="bridge-title" className="mt-2 font-serif text-[clamp(2rem,4vw,4.2rem)] leading-tight">Authentic craft. Modern usability. Lifetime ownership.</h2>
                </div>
                <a className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] underline decoration-white/35 underline-offset-8 hover:decoration-white" href="#collection">
                  See the system <ArrowRight size={16} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
