import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function BrandStory() {
  return (
    <>
      <section id="story" className="section-pad relative overflow-hidden bg-[#211e1a] text-[#f7f2e8]" aria-labelledby="brand-statement">
        <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_0%_100%,#a85d35,transparent_30%),radial-gradient(circle_at_100%_0%,#6e7352,transparent_24%)]" />
        <div className="site-container relative">
          <Reveal>
            <p className="eyebrow !text-[#d8b86b]">Our point of view</p>
            <h2 id="brand-statement" className="mt-8 max-w-6xl font-serif text-[clamp(3rem,8vw,8.8rem)] leading-[0.88] tracking-[-0.055em]">
              We do not simply sell cookware. <span className="text-[#d8b86b]">We create heirlooms.</span>
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-10 border-t border-white/12 pt-8 lg:grid-cols-[.7fr_1.3fr]">
            <Reveal>
              <p className="max-w-md text-base leading-7 text-white/58">Every Dharohar piece connects the customer to its maker, material, cultural origin and future generations.</p>
            </Reveal>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
              {[
                ["Craft", "The hand behind the object"],
                ["Health", "Material-conscious choices"],
                ["Memory", "The rituals we repeat"],
                ["Legacy", "The life beyond us"],
              ].map(([word, note], index) => (
                <Reveal key={word} delay={index * 0.08} className="bg-[#25211e] p-5 sm:min-h-44 sm:p-6">
                  <span className="text-[10px] font-semibold tracking-[0.2em] text-[#d8b86b]">0{index + 1}</span>
                  <p className="mt-8 font-serif text-3xl sm:text-4xl">{word}</p>
                  <p className="mt-3 text-xs leading-5 text-white/42">{note}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-[#f7f2e8]" aria-labelledby="bridge-title">
        <div className="site-container">
          <div className="grid gap-5 lg:grid-cols-2">
            <Reveal className="rounded-[2rem] border border-black/8 bg-[#fcfaf6] p-7 sm:p-10">
              <p className="eyebrow">The modern kitchen</p>
              <h2 className="mt-6 font-serif text-3xl leading-tight sm:text-5xl">Convenient, but increasingly disposable and emotionally generic.</h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-[#6b6258]">We have gained speed, yet often lost the object stories and material confidence that once shaped a kitchen.</p>
            </Reveal>
            <Reveal className="rounded-[2rem] border border-black/8 bg-[#ece2d3] p-7 sm:p-10" delay={0.08}>
              <p className="eyebrow">The inherited kitchen</p>
              <h2 className="mt-6 font-serif text-3xl leading-tight sm:text-5xl">Meaningful, but fragmented, difficult to trust and rarely designed for modern homes.</h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-[#6b6258]">Dharohar brings clarity, contemporary utility and care to a living tradition without sanding away its character.</p>
            </Reveal>
          </div>
          <Reveal className="relative mt-5 overflow-hidden rounded-[2rem] bg-[#a85d35] p-7 text-[#fff8ed] sm:p-10">
            <div className="absolute -right-20 -top-28 size-72 rounded-full border border-white/15" />
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">The Dharohar bridge</p>
                <h2 id="bridge-title" className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">Authentic craft. Modern usability. Lifetime ownership.</h2>
              </div>
              <a className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] underline decoration-white/35 underline-offset-8 hover:decoration-white" href="#collection">
                See the system <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
