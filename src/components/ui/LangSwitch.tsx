"use client";

import { useLang, useT, type Lang } from "@/lib/i18n";

const OPTIONS: { value: Lang; label: string; full: string }[] = [
  { value: "kk", label: "KZ", full: "Қазақша" },
  { value: "ru", label: "RU", full: "Русский" },
];

export function LangSwitch({ className = "" }: { className?: string }) {
  const [lang, setLang] = useLang();
  const t = useT();
  return (
    <div role="group" aria-label={t.header.langLabel} className={`inline-flex rounded-full bg-sky-soft p-1 ring-1 ring-sky ${className}`}>
      {OPTIONS.map((o) => {
        const active = o.value === lang;
        return (
          <button
            key={o.value}
            type="button"
            lang={o.value}
            aria-pressed={active}
            aria-label={o.full}
            onClick={() => setLang(o.value)}
            className={`min-h-9 min-w-11 rounded-full px-3 text-sm font-extrabold transition-colors ${
              active ? "bg-white text-ink shadow-soft" : "text-sky-deep hover:text-ink"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
