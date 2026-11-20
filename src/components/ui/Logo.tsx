"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n";
import { logoImage } from "@/lib/media";
import { site } from "@/lib/site";

/** Значок: соты + солнышко. Если в public/ есть logo.png — показывается он. */
export function LogoMark({ className = "size-11" }: { className?: string }) {
  if (logoImage) {
    return (
      <Image
        src={logoImage.src}
        alt=""
        width={logoImage.width}
        height={logoImage.height}
        className={`${className} object-contain`}
        preload
      />
    );
  }
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path d="M24 2.5 43 13.5v21L24 45.5 5 34.5v-21Z" fill="#ffd95a" stroke="#f7a928" strokeWidth="3" strokeLinejoin="round" />
      <path d="M24 12.5 33.5 18v11L24 34.5 14.5 29V18Z" fill="#fff6d2" />
      <circle cx="20.5" cy="22.5" r="1.9" fill="#29304d" />
      <circle cx="27.5" cy="22.5" r="1.9" fill="#29304d" />
      <path d="M20.5 27c2 2 5 2 7 0" stroke="#29304d" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="40" cy="8" r="4.5" fill="#f0607f" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

export function Logo({ onClick }: { onClick?: React.MouseEventHandler<HTMLAnchorElement> }) {
  const t = useT();
  return (
    <a
      href="#top"
      onClick={onClick}
      aria-label={t.header.home}
      className="group flex min-w-0 items-center gap-2.5 rounded-2xl py-1 pr-2"
    >
      <LogoMark className="size-10 shrink-0 transition-transform duration-300 group-hover:-rotate-6 lg:size-11" />
      <span className="flex min-w-0 flex-col leading-none">
        <span className="font-display truncate text-[19px] font-extrabold text-ink lg:text-[21px]">{site.brand}</span>
        <span className="mt-1 truncate text-[12.5px] font-bold text-honey-deep lg:text-[13px]">{t.brandSub}</span>
      </span>
    </a>
  );
}
