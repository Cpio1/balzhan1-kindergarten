"use client";

import Image from "next/image";
import { Clock, Languages, MapPin, Users, Utensils, Smile } from "lucide-react";
import { useLang, useT } from "@/lib/i18n";
import { aboutPhoto } from "@/lib/media";
import { site } from "@/lib/site";
import { Bee, Cloud, Flower, Hexagon, Star } from "../decor/Doodles";
import { SectionHeading } from "../ui/SectionHeading";

const ICONS = [Users, Smile, Languages, Utensils, Clock];
const TONES = [
  { hex: "#ffe17a", card: "bg-white", icon: "text-honey-deep" },
  { hex: "#bfe5fa", card: "bg-white", icon: "text-sky-deep" },
  { hex: "#bdebd7", card: "bg-white", icon: "text-mint-deep" },
  { hex: "#ffd2bd", card: "bg-white", icon: "text-peach-deep" },
  { hex: "#d9d0ff", card: "bg-white", icon: "text-lilac-deep" },
];

export function About() {
  const t = useT();
  const [lang] = useLang();
  const a = t.about;

  return (
    <section id="about" data-section aria-labelledby="about-title" className="section-y honeycomb relative isolate overflow-hidden bg-cream">
      <Flower className="decor -z-10 top-8 right-[6%] w-8 animate-bob lg:w-10" />
      <Star className="decor -z-10 bottom-10 left-[4%] w-5 animate-twinkle" tone="#f7a928" />

      <div className="container-x grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
        <div>
          <SectionHeading id="about-title" eyebrow={a.eyebrow} title={a.title} align="left" />
          <p className="reveal -mt-3 max-w-xl text-[16px] text-ink-soft sm:text-[17px] lg:-mt-5">{a.lead}</p>

          <div className="reveal mt-6 lg:mt-8">
            {aboutPhoto ? (
              <div className="relative overflow-hidden rounded-[32px] border-[5px] border-white shadow-lift" style={{ aspectRatio: Math.min(Math.max(aboutPhoto.width / aboutPhoto.height, 1), 16 / 10) }}>
                <Image
                  src={aboutPhoto.src}
                  alt={a.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 520px, 92vw"
                  quality={80}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#bfe5fa,#eaf6fd)] p-5 shadow-soft ring-4 ring-white sm:p-6">
                <Cloud className="decor top-3 right-24 w-16 opacity-90" />
                <Cloud className="decor bottom-2 left-[40%] w-12 opacity-70" />
                <Bee className="decor top-3 right-3 w-16 animate-fly sm:w-20" />
                <div className="relative flex max-w-[78%] items-start gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-berry-deep shadow-soft">
                    <MapPin className="size-5" aria-hidden="true" />
                  </span>
                  <p className="text-[15.5px] leading-snug font-bold text-ink">{site.address[lang]}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Карточки-преимущества в «сотовой» раскладке */}
        <ul className="grid grid-cols-2 gap-3 sm:gap-4">
          {a.features.map((f, i) => {
            const Icon = ICONS[i];
            const tone = TONES[i];
            const wide = i === 2;
            return (
              <li
                key={f.title}
                className={`reveal group relative rounded-[26px] ${tone.card} p-4 shadow-soft ring-1 ring-line transition-transform duration-300 hover:-translate-y-1 sm:p-5 ${
                  wide ? "col-span-2 flex items-center gap-4" : ""
                }`}
                style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
              >
                <span className={`relative grid size-14 shrink-0 place-items-center ${wide ? "" : "mb-3"}`}>
                  <Hexagon tone={tone.hex} className="absolute inset-0 size-full transition-transform duration-500 group-hover:rotate-[30deg]" />
                  <Icon className={`relative size-6 ${tone.icon}`} aria-hidden="true" />
                </span>
                <span className="block">
                  <span className="font-display block text-[18px] leading-tight font-extrabold text-ink sm:text-[20px]">{f.title}</span>
                  <span className="mt-1 block text-[14px] leading-snug text-ink-soft sm:text-[15px]">{f.text}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
