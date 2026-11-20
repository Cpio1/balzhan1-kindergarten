"use client";

import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { useLang, useT } from "@/lib/i18n";
import { routeHref, site, telHref, twoGisEmbed, twoGisHref, waHref } from "@/lib/site";
import { Bee, Cloud, Flower, Wave } from "../decor/Doodles";
import { MapScene } from "../decor/Illustrations";
import { InstagramIcon, WhatsAppIcon } from "../ui/BrandIcons";
import { SectionHeading } from "../ui/SectionHeading";

export function Contacts() {
  const t = useT();
  const [lang] = useLang();
  const c = t.contacts;
  const embed = twoGisEmbed();
  const wa = waHref(t.wa.message);

  return (
    <section
      id="contacts"
      data-section
      aria-labelledby="contacts-title"
      className="section-y relative isolate overflow-hidden bg-[linear-gradient(180deg,#eaf6fd,#d7f0ff)]"
    >
      <Wave className="absolute inset-x-0 top-0 h-6 w-full sm:h-10" fill="#fff8e6" flip />
      <Cloud className="decor -z-10 top-16 right-[-16px] w-20 animate-drift-slow lg:right-[5%] lg:w-28" />
      <Cloud className="decor -z-10 bottom-16 left-[-20px] w-16 animate-drift opacity-80 lg:w-24" />

      <div className="container-x">
        <SectionHeading id="contacts-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="sky" />

        <div className="grid gap-4 lg:grid-cols-[1fr_1.05fr] lg:gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Адрес */}
            <div className="reveal rounded-[26px] bg-white p-5 shadow-soft ring-1 ring-sky sm:col-span-2">
              <p className="flex items-center gap-2.5 text-[14.5px] font-extrabold text-berry-deep">
                <span className="grid size-9 place-items-center rounded-xl bg-berry-soft">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                {c.address}
              </p>
              <address className="mt-2.5 text-[16.5px] leading-snug font-bold text-ink not-italic">{site.address[lang]}</address>
            </div>

            {/* Телефоны */}
            <div className="reveal rounded-[26px] bg-white p-5 shadow-soft ring-1 ring-sky sm:col-span-2" style={{ "--d": "60ms" } as React.CSSProperties}>
              <p className="flex items-center gap-2.5 text-[14.5px] font-extrabold text-mint-deep">
                <span className="grid size-9 place-items-center rounded-xl bg-mint-soft">
                  <Phone className="size-5" aria-hidden="true" />
                </span>
                {c.phones}
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-2">
                {site.phones.map((p) => (
                  <li key={p.e164}>
                    <a
                      href={telHref(p.e164)}
                      aria-label={c.callTo(p.display)}
                      className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-mint-soft px-3 text-[15.5px] font-extrabold whitespace-nowrap text-ink ring-1 ring-mint transition-colors hover:bg-mint"
                    >
                      <Phone className="size-4 shrink-0 text-mint-deep" aria-hidden="true" />
                      {p.display}
                    </a>
                  </li>
                ))}
              </ul>
              {wa ? (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn mt-3 w-full bg-[#1f9d55] text-white hover:bg-[#178246]">
                  <WhatsAppIcon className="size-5" />
                  {t.wa.button}
                </a>
              ) : null}
            </div>

            {/* Режим работы */}
            <div className="reveal relative overflow-hidden rounded-[26px] bg-sun-soft p-5 shadow-soft ring-1 ring-sun" style={{ "--d": "120ms" } as React.CSSProperties}>
              <Bee className="decor right-2 bottom-2 w-12 opacity-90" />
              <p className="flex items-center gap-2.5 text-[14.5px] font-extrabold text-honey-deep">
                <span className="grid size-9 place-items-center rounded-xl bg-white">
                  <Clock className="size-5" aria-hidden="true" />
                </span>
                {c.hours}
              </p>
              <p className="font-display mt-2.5 text-[26px] font-extrabold text-ink">{site.hours}</p>
            </div>

            {/* Instagram */}
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal group relative overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#ffe8ee,#fff0e7)] p-5 shadow-soft ring-1 ring-berry-soft transition-transform duration-300 hover:-translate-y-1"
              style={{ "--d": "180ms" } as React.CSSProperties}
            >
              <Flower className="decor right-3 bottom-3 w-8" petal="#f7a928" />
              <span className="flex items-center gap-2.5 text-[14.5px] font-extrabold text-berry-deep">
                <span className="grid size-9 place-items-center rounded-xl bg-white">
                  <InstagramIcon className="size-5" />
                </span>
                {c.instagram}
              </span>
              <span className="mt-2.5 block text-[17px] font-extrabold break-all text-ink group-hover:underline">{site.instagram.handle}</span>
            </a>
          </div>

          {/* Карта 2GIS */}
          <div className="reveal flex flex-col overflow-hidden rounded-[30px] bg-white shadow-soft ring-1 ring-sky" style={{ "--d": "120ms" } as React.CSSProperties}>
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:min-h-[300px] lg:flex-1">
              {embed ? (
                <iframe
                  src={embed}
                  title={c.mapTitle}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full border-0"
                />
              ) : (
                <a href={twoGisHref()} target="_blank" rel="noopener noreferrer" className="absolute inset-0 block" aria-label={c.map2gis}>
                  <MapScene title={c.mapAlt} className="size-full" />
                </a>
              )}
            </div>
            <div className="flex flex-col gap-3 p-4 sm:p-5">
              {!embed ? <p className="text-[14.5px] text-ink-soft">{c.mapNote}</p> : null}
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <a href={twoGisHref()} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex-1 text-[15.5px]">
                  <MapPin className="size-4.5" aria-hidden="true" />
                  {c.map2gis}
                </a>
                <a href={routeHref()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1 text-[15.5px]">
                  <Navigation className="size-4.5 text-sky-deep" aria-hidden="true" />
                  {c.route}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
