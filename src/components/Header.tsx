"use client";

import { Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { onAnchorClick } from "@/lib/scroll";
import { site, telHref } from "@/lib/site";
import { InstagramIcon } from "./ui/BrandIcons";
import { LangSwitch } from "./ui/LangSwitch";
import { Logo } from "./ui/Logo";

export const NAV_IDS = ["about", "groups", "food", "gallery", "documents", "contacts"] as const;
const DOT = ["#f7a928", "#7cc8ef", "#ff9f7a", "#7fd1a8", "#a493f0", "#f0607f"];

export function Header() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // тень шапки после начала прокрутки
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // подсветка текущего раздела
  useEffect(() => {
    const sections = NAV_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => io.observe(s));
    const onTop = () => window.scrollY < 200 && setActive(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  // мобильное меню: блокировка прокрутки, Escape, закрытие при переходе на десктоп
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panelRef.current) {
        const items = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a,button")].filter(Boolean) as HTMLElement[];
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
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      data-site-header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? "bg-white/95 shadow-[0_6px_24px_-14px_rgb(41_48_77/0.35)] backdrop-blur-md" : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <a
        href="#main"
        className="sr-only rounded-full bg-ink px-4 py-2 font-bold text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-10"
      >
        {t.skip}
      </a>
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-3">
        <Logo
          onClick={(e) => {
            close();
            onAnchorClick(e);
          }}
        />

        <nav aria-label={t.header.nav} className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {NAV_IDS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={onAnchorClick}
                  aria-current={active === id ? "true" : undefined}
                  className={`relative block rounded-full px-2.5 py-2 text-[15px] font-bold transition-colors xl:px-3.5 ${
                    active === id ? "bg-sun-soft text-ink" : "text-ink-soft hover:bg-sky-soft hover:text-ink"
                  }`}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden sm:block">
            <LangSwitch />
          </div>
          <a href="#contacts" onClick={onAnchorClick} className="btn btn-primary hidden min-h-11 px-5 text-[15px] xl:inline-flex">
            <Phone className="size-4" aria-hidden="true" />
            {t.header.cta}
          </a>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.header.menuClose : t.header.menuOpen}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-2xl bg-sun-soft text-ink ring-2 ring-sun transition-colors hover:bg-sun lg:hidden"
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Затемнение под мобильным меню — клик закрывает меню */}
      {open ? (
        <div
          aria-hidden="true"
          onClick={close}
          className="fixed inset-x-0 top-[var(--header-h)] bottom-0 -z-10 bg-ink/25 lg:hidden"
        />
      ) : null}

      {/* Мобильное меню */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="max-h-[calc(100dvh-var(--header-h))] overflow-y-auto overscroll-contain border-t border-line bg-white lg:hidden"
      >
        <div className="container-x pt-4 pb-6">
          <nav aria-label={t.header.menuTitle}>
            <ul className="grid grid-cols-2 gap-2.5">
              {NAV_IDS.map((id, i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(e) => onAnchorClick(e, close)}
                    className="flex min-h-14 items-center gap-2.5 rounded-2xl bg-paper px-3.5 text-[16px] font-extrabold text-ink ring-1 ring-line active:bg-sun-soft"
                  >
                    <svg viewBox="0 0 12 14" className="size-3.5 shrink-0" aria-hidden="true">
                      <path d="M6 .8 11.2 3.9v6.2L6 13.2.8 10.1V3.9Z" fill={DOT[i]} />
                    </svg>
                    {t.nav[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <LangSwitch />
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-[15px] font-bold text-berry-deep"
            >
              <InstagramIcon className="size-5" />
              {site.instagram.handle}
            </a>
          </div>
          <ul className="mt-4 grid gap-2">
            {site.phones.map((p) => (
              <li key={p.e164}>
                <a
                  href={telHref(p.e164)}
                  className="flex min-h-12 items-center gap-3 rounded-2xl bg-mint-soft px-4 text-[16px] font-extrabold text-ink ring-1 ring-mint"
                >
                  <Phone className="size-4.5 text-mint-deep" aria-hidden="true" />
                  {p.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
