import type { ReactNode } from "react";

export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
  align = "left",
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-5 font-serif text-[clamp(2.4rem,6vw,5.4rem)] leading-[0.96] tracking-[-0.045em] text-balance">
        {title}
      </h2>
      {children ? <div className="mt-6 max-w-2xl text-base leading-7 text-[color:var(--muted)] sm:text-lg">{children}</div> : null}
    </div>
  );
}
