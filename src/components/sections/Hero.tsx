"use client";

import Image from "next/image";
import { ArrowRight, Clock, Phone } from "lucide-react";
import { useT } from "@/lib/i18n";
import { heroPhoto } from "@/lib/media";
import { onAnchorClick } from "@/lib/scroll";
import { site } from "@/lib/site";
import { Bee, Cloud, Flower, Sparkle, Star, Sun, Wave } from "../decor/Doodles";
import { KindergartenScene } from "../decor/Illustrations";

/** Пропорции рамки: берём пропорции фото, но в разумных пределах (почти без обрезки). */
function frameRatio() {
  if (!heroPhoto) return 6 / 5;
  const r = heroPhoto.width / heroPhoto.height;
  return Math.min(Math.max(r, 4 / 5), 4 / 3);
}

const CHIP = ["bg-sun-soft ring-sun text-honey-deep", "bg-mint-soft ring-mint text-mint-deep", "bg-peach-soft ring-peach text-peach-deep"];

export function Hero() {
  const t = useT();
  const h = t.hero;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#cfeefe_0%,#e6f6fd_38%,#fffdf6_100%)] pt-[calc(var(--header-h)+24px)] pb-16 sm:pb-20 lg:pt-[calc(var(--header-h)+40px)] lg:pb-24"
    >
      {/* декор фона — небольшой и за контентом */}
      <Sun className="decor -z-10 top-[calc(var(--header-h)+6px)] right-3 w-14 sm:w-16 lg:top-[calc(var(--header-h)+18px)] lg:right-[4%] lg:w-24" />
      <Cloud className="decor -z-10 top-[calc(var(--header-h)+70px)] left-[-18px] w-20 animate-drift opacity-90 sm:w-24 lg:top-[calc(var(--header-h)+28px)] lg:left-[3%] lg:w-32" />
      <Cloud className="decor -z-10 top-[42%] right-[-26px] w-20 animate-drift-slow opacity-80 lg:right-[44%] lg:top-[calc(var(--header-h)+12px)] lg:w-24" />
      <Cloud className="decor -z-10 bottom-24 left-[46%] hidden w-20 animate-drift opacity-70 lg:block" />
      <Star className="decor -z-10 top-[calc(var(--header-h)+130px)] right-[30%] w-4 animate-twinkle lg:w-5" />
      <Star className="decor -z-10 bottom-32 left-[6%] hidden w-5 animate-twinkle [animation-delay:1.2s] sm:block" tone="#f7a928" />
      <Sparkle className="decor -z-10 top-[calc(var(--header-h)+40%)] left-[52%] hidden w-4 animate-twinkle [animation-delay:.6s] lg:block" tone="#7cc8ef" />

      <div className="container-x grid items-center gap-9 lg:grid-cols-[1.08fr_1fr] lg:gap-14">
        {/* Текст */}
        <div className="relative max-w-xl">
          <p className="reveal inline-flex items-center gap-2 rounded-full bg-white/85 px-3.5 py-1.5 text-[13.5px] font-extrabold text-sky-deep shadow-soft ring-1 ring-sky sm:text-sm">
            <span className="size-2 rounded-full bg-mint-deep" aria-hidden="true" />
            {h.badge}
          </p>
          <h1 id="hero-title" className="reveal mt-4 leading-[1.02] font-black text-ink" style={{ "--d": "60ms" } as React.CSSProperties}>
            <span className="block text-[44px] sm:text-[60px] lg:text-[68px] xl:text-[76px]">
              <span className="text-honey">«</span>Балжан-1<span className="text-honey">»</span>
            </span>
            <span className="mt-1.5 block text-[24px] text-sky-deep sm:text-[30px] lg:text-[34px]">{t.brandSub}</span>
          </h1>
          <p
            className="reveal font-display mt-5 text-[21px] leading-snug font-extrabold text-berry-deep sm:text-[24px] lg:text-[26px]"
            style={{ "--d": "120ms" } as React.CSSProperties}
          >
            {h.tagline}
          </p>
          <p className="reveal mt-3 max-w-lg text-[16px] text-ink-soft sm:text-[17.5px]" style={{ "--d": "160ms" } as React.CSSProperties}>
            {h.subtitle}
          </p>

          <ul className="reveal mt-5 flex flex-wrap gap-2" style={{ "--d": "200ms" } as React.CSSProperties}>
            {h.chips.map((c, i) => (
              <li key={c} className={`rounded-full px-3.5 py-1.5 text-[14.5px] font-extrabold ring-2 ${CHIP[i]}`}>
                {c}
              </li>
            ))}
          </ul>

          <div className="reveal mt-7 flex flex-col gap-3 sm:flex-row" style={{ "--d": "240ms" } as React.CSSProperties}>
            <a href="#contacts" onClick={onAnchorClick} className="btn btn-primary text-[16.5px]">
              <Phone className="size-5" aria-hidden="true" />
              {h.ctaPrimary}
            </a>
            <a href="#about" onClick={onAnchorClick} className="btn btn-ghost text-[16.5px]">
              {h.ctaSecondary}
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Фото в арочной рамке */}
        <div className="reveal relative mx-auto w-full max-w-[440px] lg:max-w-[480px]" style={{ "--d": "140ms" } as React.CSSProperties}>
          <div className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-[48%_48%_36px_36px/34%_34%_36px_36px] bg-sun sm:translate-x-5 sm:translate-y-4" aria-hidden="true" />
          <div
            className="relative overflow-hidden rounded-[48%_48%_36px_36px/34%_34%_36px_36px] border-[6px] border-white bg-sky-soft shadow-lift"
            style={{ aspectRatio: frameRatio() }}
          >
            {heroPhoto ? (
              <Image
                src={heroPhoto.src}
                alt={h.photoAlt}
                fill
                preload
                sizes="(min-width: 1024px) 480px, (min-width: 480px) 440px, 92vw"
                quality={80}
                className="object-cover"
              />
            ) : (
              <KindergartenScene title={h.sceneAlt} className="absolute inset-0 size-full" />
            )}
          </div>

          <Bee className="decor -top-3 -left-2 w-16 animate-fly sm:-left-6 sm:w-20" />
          <Flower className="decor -right-1 top-[38%] w-8 animate-bob sm:-right-4 sm:w-10" petal="#7cc8ef" />

          <div className="absolute -bottom-5 left-3 flex items-center gap-3 rounded-2xl bg-white px-3.5 py-2.5 shadow-lift ring-1 ring-line sm:-left-6">
            <span className="grid size-10 place-items-center rounded-xl bg-mint text-mint-deep">
              <Clock className="size-5" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-[12.5px] font-bold text-ink-soft">{h.hoursLabel}</span>
              <span className="block text-[17px] font-extrabold text-ink">{site.hours}</span>
            </span>
          </div>
        </div>
      </div>

      <Wave className="absolute inset-x-0 -bottom-px h-8 w-full sm:h-12" fill="#fff8e6" />
    </section>
  );
}
