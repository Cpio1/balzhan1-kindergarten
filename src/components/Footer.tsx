"use client";

import { ArrowUp, Phone } from "lucide-react";
import { useLang, useT } from "@/lib/i18n";
import { onAnchorClick } from "@/lib/scroll";
import { site, telHref } from "@/lib/site";
import { NAV_IDS } from "./Header";
import { Wave } from "./decor/Doodles";
import { InstagramIcon } from "./ui/BrandIcons";
import { Logo } from "./ui/Logo";

export function Footer({ year }: { year: number }) {
  const t = useT();
  const [lang] = useLang();

  return (
    <footer className="relative isolate bg-sun-soft pt-14 pb-[max(24px,env(safe-area-inset-bottom))]">
      <Wave className="absolute inset-x-0 top-0 h-6 w-full sm:h-10" fill="#d7f0ff" flip />
      <div className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo onClick={onAnchorClick} />
          <p className="mt-3 max-w-xs text-[14.5px] text-ink-soft">{site.address[lang]}</p>
        </div>

        <nav aria-label={t.footer.nav}>
          <p className="text-[14px] font-extrabold text-honey-deep">{t.footer.nav}</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
            {NAV_IDS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={onAnchorClick} className="inline-block py-1.5 text-[15px] font-bold text-ink hover:text-sky-deep">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[14px] font-extrabold text-honey-deep">{t.footer.contacts}</p>
          <ul className="mt-2 grid gap-1">
            {site.phones.map((p) => (
              <li key={p.e164}>
                <a href={telHref(p.e164)} className="inline-flex items-center gap-2 py-1.5 text-[15px] font-bold whitespace-nowrap text-ink hover:text-sky-deep">
                  <Phone className="size-4 text-mint-deep" aria-hidden="true" />
                  {p.display}
                </a>
              </li>
            ))}
            <li>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-1.5 text-[15px] font-bold break-all text-ink hover:text-berry-deep"
              >
                <InstagramIcon className="size-4 shrink-0 text-berry-deep" />
                {site.instagram.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-8 flex flex-col-reverse items-start justify-between gap-3 border-t border-sun pt-5 sm:flex-row sm:items-center">
        <p className="text-[13.5px] text-ink-soft">
          © {year} {site.legalName}
        </p>
        <a
          href="#top"
          onClick={onAnchorClick}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-[14.5px] font-extrabold text-ink shadow-soft ring-1 ring-sun hover:bg-sun"
        >
          <ArrowUp className="size-4" aria-hidden="true" />
          {t.footer.top}
        </a>
      </div>
    </footer>
  );
}
