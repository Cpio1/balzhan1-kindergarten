"use client";

import { Clock, Languages, Phone, Smile } from "lucide-react";
import { useT } from "@/lib/i18n";
import { onAnchorClick } from "@/lib/scroll";
import { site } from "@/lib/site";
import { Bee, Bird, Cloud, Flower, Ladybug, Sparkle, Star, Wave } from "../decor/Doodles";
import { SectionHeading } from "../ui/SectionHeading";

const CARDS = [
  {
    scene: "bg-[linear-gradient(160deg,#fff1b8,#ffe17a)]",
    badge: "bg-honey text-ink",
    Mascot: Bee,
    mascotClass: "w-24 sm:w-28 animate-fly",
    extra: <Flower className="decor bottom-3 left-5 w-8" petal="#f0607f" />,
  },
  {
    scene: "bg-[linear-gradient(160deg,#d7f0ff,#bfe5fa)]",
    badge: "bg-berry text-white",
    Mascot: Ladybug,
    mascotClass: "w-20 sm:w-24 animate-bob",
    extra: <Bird className="decor bottom-4 left-5 w-11 animate-bob [animation-delay:1s]" tone="#7fd1a8" />,
  },
];

export function Groups() {
  const t = useT();
  const g = t.groups;
  const rows = [
    { Icon: Smile, label: g.ageLabel, value: g.age },
    { Icon: Languages, label: g.langLabel, value: g.lang },
    { Icon: Clock, label: g.hoursLabel, value: site.hours },
  ];

  return (
    <section id="groups" data-section aria-labelledby="groups-title" className="section-y relative isolate overflow-hidden bg-mint-soft">
      <Wave className="absolute inset-x-0 top-0 h-6 w-full sm:h-10" fill="#fff8e6" flip />
      <Star className="decor -z-10 top-14 left-[8%] w-5 animate-twinkle" />
      <Sparkle className="decor -z-10 top-24 right-[9%] w-4 animate-twinkle [animation-delay:1s]" tone="#7cc8ef" />

      <div className="container-x">
        <SectionHeading id="groups-title" eyebrow={g.eyebrow} title={g.title} lead={g.lead} tone="mint" />

        <ul className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2 lg:gap-7">
          {CARDS.map((c, i) => (
            <li
              key={i}
              className="reveal overflow-hidden rounded-[32px] bg-white shadow-soft ring-1 ring-mint transition-transform duration-300 hover:-translate-y-1"
              style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
            >
              <div className={`relative h-32 overflow-hidden sm:h-36 ${c.scene}`}>
                <Cloud className="decor top-3 right-4 w-16 opacity-90" />
                <Cloud className="decor top-10 left-[38%] w-10 opacity-70" />
                {c.extra}
                <div className="absolute inset-0 grid place-items-center pl-20 min-[400px]:pl-0">
                  <c.Mascot className={c.mascotClass} />
                </div>
                <span className={`font-display absolute top-3 left-3 rounded-full px-3.5 py-1.5 text-[17px] font-extrabold shadow-soft ${c.badge}`}>
                  {g.name(i + 1)}
                </span>
              </div>
              <dl className="grid gap-2 p-4 sm:p-5">
                {rows.map(({ Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 rounded-2xl bg-paper px-3 py-2.5">
                    <Icon className="size-5 shrink-0 text-mint-deep" aria-hidden="true" />
                    <dt className="text-[14.5px] text-ink-soft">{label}</dt>
                    <dd className="ml-auto text-right text-[15px] font-extrabold text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>

        <div className="reveal mx-auto mt-7 flex max-w-4xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-5 sm:text-left">
          <p className="text-[15.5px] text-ink-soft">{g.note}</p>
          <a href="#contacts" onClick={onAnchorClick} className="btn btn-ghost shrink-0 text-[15.5px]">
            <Phone className="size-4.5 text-mint-deep" aria-hidden="true" />
            {g.ask}
          </a>
        </div>
      </div>
    </section>
  );
}
