"use client";

import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useT } from "@/lib/i18n";
import { galleryPhotos, type Photo } from "@/lib/media";
import { site } from "@/lib/site";
import { Cloud, Flower, Sparkle, Wave } from "../decor/Doodles";
import { InstagramIcon } from "../ui/BrandIcons";
import { SectionHeading } from "../ui/SectionHeading";

const STEP = 12;

export function Gallery() {
  const t = useT();
  const g = t.gallery;
  const photos = galleryPhotos;
  const [shown, setShown] = useState(STEP);
  const [index, setIndex] = useState<number | null>(null);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);

  const close = useCallback(() => {
    if (index === null) return;
    // если пролистали дальше показанных миниатюр — раскрываем сетку, чтобы вернуть фокус на нужное фото
    if (index >= shown) setShown(Math.ceil((index + 1) / STEP) * STEP);
    setIndex(null);
    const i = index;
    requestAnimationFrame(() => requestAnimationFrame(() => thumbs.current[i]?.focus({ preventScroll: false })));
  }, [index, shown]);

  const open = (i: number) => setIndex(i);

  return (
    <section id="gallery" data-section aria-labelledby="gallery-title" className="section-y dots relative isolate overflow-hidden bg-sky-soft">
      <Wave className="absolute inset-x-0 top-0 h-6 w-full sm:h-10" fill="#fff0e7" flip />
      <Cloud className="decor -z-10 top-14 left-[-20px] w-20 animate-drift lg:left-[4%] lg:w-24" />
      <Sparkle className="decor -z-10 top-24 right-[10%] w-4 animate-twinkle" tone="#f7a928" />

      <div className="container-x">
        <SectionHeading id="gallery-title" eyebrow={g.eyebrow} title={g.title} lead={photos.length ? g.lead : undefined} tone="sky" />

        {photos.length === 0 ? (
          <div className="reveal relative mx-auto max-w-2xl overflow-hidden rounded-[32px] bg-white p-6 text-center shadow-soft ring-1 ring-sky sm:p-9">
            <Flower className="decor top-4 left-5 w-8" petal="#7cc8ef" />
            <Flower className="decor right-6 bottom-5 w-7" petal="#f0607f" />
            <div className="mx-auto grid w-fit grid-cols-3 gap-2" aria-hidden="true">
              {["bg-sun", "bg-mint", "bg-peach"].map((c, i) => (
                <span key={c} className={`grid size-14 place-items-center rounded-2xl ${c} ${i === 1 ? "-translate-y-2" : "rotate-[-6deg]"} sm:size-16`}>
                  <Camera className="size-6 text-ink/70" />
                </span>
              ))}
            </div>
            <p className="font-display mt-5 text-[19px] font-extrabold text-ink sm:text-[21px]">{g.empty}</p>
            <p className="mt-2 text-[15px] text-ink-soft">{g.emptyHint}</p>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost mt-5 text-[15.5px]"
            >
              <InstagramIcon className="size-5 text-berry-deep" />
              {site.instagram.handle}
            </a>
          </div>
        ) : (
          <>
            {/* Кладка: каждое фото в своих пропорциях — ничего не обрезается и не растягивается */}
            <ul className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
              {photos.slice(0, shown).map((p, i) => (
                <li key={p.src} className="reveal mb-3 break-inside-avoid sm:mb-4" style={{ "--d": `${(i % STEP) * 40}ms` } as React.CSSProperties}>
                  <button
                    ref={(el) => {
                      thumbs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => open(i)}
                    aria-label={g.open(i + 1)}
                    className="group relative block w-full overflow-hidden rounded-[22px] bg-white p-1.5 shadow-soft ring-1 ring-sky transition-transform duration-300 hover:-translate-y-1"
                  >
                    <Image
                      src={p.src}
                      alt={g.photoAlt(i + 1)}
                      width={p.width}
                      height={p.height}
                      sizes="(min-width: 1180px) 280px, (min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw"
                      quality={70}
                      loading="lazy"
                      className="h-auto w-full rounded-[17px] bg-sky-soft"
                    />
                    <span className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full bg-white/90 text-sky-deep opacity-0 shadow-soft transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Expand className="size-4" aria-hidden="true" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {photos.length > STEP ? (
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setShown((s) => (s >= photos.length ? STEP : s + STEP))}
                  className="btn btn-ghost text-[15.5px]"
                >
                  {shown >= photos.length ? g.less : `${g.more} (${photos.length - shown})`}
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>

      {index !== null ? <Lightbox photos={photos} index={index} onIndex={setIndex} onClose={close} /> : null}
    </section>
  );
}

function Lightbox({
  photos,
  index,
  onIndex,
  onClose,
}: {
  photos: Photo[];
  index: number;
  onIndex: (i: number) => void;
  onClose: () => void;
}) {
  const t = useT();
  const g = t.gallery;
  const total = photos.length;
  const photo = photos[index];
  const dialogRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback((d: number) => onIndex((index + d + total) % total), [index, total, onIndex]);

  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    return () => {
      root.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const items = [...dialogRef.current.querySelectorAll<HTMLElement>("button")];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, onClose]);

  // соседние фото подгружаются заранее — листание без задержек
  const neighbours = total > 1 ? [photos[(index + 1) % total], photos[(index - 1 + total) % total]] : [];

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={g.dialog}
      className="fixed inset-0 z-[100] flex flex-col bg-paper"
      style={{ colorScheme: "light" }}
      onTouchStart={(e) => {
        const p = e.touches[0];
        touch.current = { x: p.clientX, y: p.clientY };
      }}
      onTouchEnd={(e) => {
        const s = touch.current;
        touch.current = null;
        if (!s) return;
        const p = e.changedTouches[0];
        const dx = p.clientX - s.x;
        const dy = p.clientY - s.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) go(dx < 0 ? 1 : -1);
        else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) onClose();
      }}
    >
      <div className="flex items-center justify-between gap-3 px-3 pt-[max(12px,env(safe-area-inset-top))] pb-2 sm:px-5">
        <span className="rounded-full bg-sky-soft px-3.5 py-1.5 text-[15px] font-extrabold text-sky-deep ring-1 ring-sky" aria-live="polite">
          {g.counter(index + 1, total)}
        </span>
        <button
          type="button"
          data-autofocus
          onClick={onClose}
          aria-label={g.close}
          className="grid size-12 place-items-center rounded-full bg-white text-ink shadow-soft ring-1 ring-line hover:bg-sun-soft"
        >
          <X className="size-6" aria-hidden="true" />
        </button>
      </div>

      <div
        className="relative min-h-0 flex-1 px-2 sm:px-20"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="pointer-events-none relative size-full">
          <Image
            key={photo.src}
            src={photo.src}
            alt={g.photoAlt(index + 1)}
            fill
            sizes="100vw"
            quality={80}
            preload
            className="object-contain"
          />
        </div>
        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={g.prev}
              className="absolute top-1/2 left-2 hidden size-13 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lift ring-1 ring-line hover:bg-sun-soft sm:left-4 sm:grid"
            >
              <ChevronLeft className="size-7" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={g.next}
              className="absolute top-1/2 right-2 hidden size-13 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lift ring-1 ring-line hover:bg-sun-soft sm:right-4 sm:grid"
            >
              <ChevronRight className="size-7" aria-hidden="true" />
            </button>
          </>
        ) : null}
      </div>

      {/* На телефоне — крупные кнопки снизу, под большой палец */}
      {total > 1 ? (
        <div className="flex items-center justify-center gap-4 px-3 pt-2 pb-[max(14px,env(safe-area-inset-bottom))] sm:hidden">
          <button type="button" onClick={() => go(-1)} aria-label={g.prev} className="grid size-13 place-items-center rounded-full bg-white text-ink shadow-soft ring-1 ring-line">
            <ChevronLeft className="size-7" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label={g.next} className="grid size-13 place-items-center rounded-full bg-white text-ink shadow-soft ring-1 ring-line">
            <ChevronRight className="size-7" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div className="h-[max(14px,env(safe-area-inset-bottom))]" />
      )}

      <div className="hidden" aria-hidden="true">
        {neighbours.map((p) => (
          <Image key={p.src} src={p.src} alt="" width={p.width} height={p.height} sizes="100vw" quality={80} loading="eager" />
        ))}
      </div>
    </div>,
    document.body,
  );
}
