type Tone = "honey" | "sky" | "mint" | "peach" | "berry";

const chip: Record<Tone, string> = {
  honey: "bg-sun-soft text-honey-deep ring-sun",
  sky: "bg-white text-sky-deep ring-sky",
  mint: "bg-white text-mint-deep ring-mint",
  peach: "bg-white text-peach-deep ring-peach",
  berry: "bg-white text-berry-deep ring-berry-soft",
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  tone = "honey",
  align = "center",
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: Tone;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <div className={`reveal mb-8 max-w-2xl lg:mb-10 ${center ? "mx-auto text-center" : ""}`}>
      <p className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-extrabold ring-2 ${chip[tone]}`}>
        <svg viewBox="0 0 12 14" className="size-3" aria-hidden="true">
          <path d="M6 .8 11.2 3.9v6.2L6 13.2.8 10.1V3.9Z" fill="currentColor" />
        </svg>
        {eyebrow}
      </p>
      <h2 id={id} className="mt-3 text-[28px] leading-[1.15] font-extrabold text-ink sm:text-[34px] lg:text-[40px]">
        {title}
      </h2>
      {lead ? <p className="mt-3 text-[16px] text-ink-soft sm:text-[17px]">{lead}</p> : null}
    </div>
  );
}
