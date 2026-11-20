"use client";

import { Download, ExternalLink, FileText, Phone } from "lucide-react";
import { useLang, useT } from "@/lib/i18n";
import { documents } from "@/lib/documents";
import { site, telHref } from "@/lib/site";
import { Hexagon, Star, Wave } from "../decor/Doodles";
import { Folder } from "../decor/Illustrations";
import { SectionHeading } from "../ui/SectionHeading";

function formatSize(bytes?: number) {
  if (!bytes) return null;
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function Documents() {
  const t = useT();
  const [lang] = useLang();
  const d = t.documents;

  return (
    <section id="documents" data-section aria-labelledby="documents-title" className="section-y honeycomb relative isolate overflow-hidden bg-cream">
      <Wave className="absolute inset-x-0 top-0 h-6 w-full sm:h-10" fill="#eaf6fd" flip />
      <Hexagon className="decor -z-10 top-16 right-[7%] w-9 rotate-12 animate-bob" tone="#bdebd7" />
      <Star className="decor -z-10 bottom-12 left-[7%] w-5 animate-twinkle" tone="#7cc8ef" />

      <div className="container-x">
        <SectionHeading id="documents-title" eyebrow={d.eyebrow} title={d.title} lead={d.lead} tone="honey" />

        {documents.length === 0 ? (
          <div className="reveal mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-[32px] bg-white p-6 text-center shadow-soft ring-1 ring-line sm:flex-row sm:p-8 sm:text-left">
            <Folder className="w-24 shrink-0 sm:w-28" />
            <div className="min-w-0">
              <p className="font-display text-[19px] font-extrabold text-ink sm:text-[21px]">{d.emptyTitle}</p>
              <p className="mt-2 text-[15px] text-ink-soft">{d.emptyText}</p>
              <a href={telHref(site.phones[0].e164)} className="btn btn-primary mt-4 text-[15.5px]">
                <Phone className="size-4.5" aria-hidden="true" />
                {d.emptyCta}
              </a>
            </div>
          </div>
        ) : (
          <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 sm:gap-4">
            {documents.map((doc, i) => {
              const meta = [doc.source === "local" ? doc.format : d.sources[doc.source], formatSize(doc.size)].filter(Boolean).join(" · ");
              const external = doc.source !== "local";
              return (
                <li
                  key={doc.id}
                  className="reveal flex min-w-0 flex-col gap-3 rounded-[24px] bg-white p-4 shadow-soft ring-1 ring-line sm:p-5"
                  style={{ "--d": `${(i % 6) * 60}ms` } as React.CSSProperties}
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sun-soft text-honey-deep ring-1 ring-sun">
                      <FileText className="size-6" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-sans text-[16.5px] leading-snug font-extrabold break-words text-ink">{doc.title[lang]}</h3>
                      {meta ? <p className="mt-0.5 text-[13.5px] font-bold text-ink-soft">{meta}</p> : null}
                    </div>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-2">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost min-h-11 flex-1 px-4 text-[15px]"
                    >
                      <ExternalLink className="size-4" aria-hidden="true" />
                      {d.open}
                    </a>
                    {doc.downloadUrl ? (
                      <a
                        href={doc.downloadUrl}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : { download: "" })}
                        className="btn btn-primary min-h-11 flex-1 px-4 text-[15px]"
                      >
                        <Download className="size-4" aria-hidden="true" />
                        {d.download}
                      </a>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
