"use client";

import { useEffect } from "react";
import { useDocumentLang } from "@/lib/i18n";
import { scrollToSection } from "@/lib/scroll";

/** Плавно показывает элементы `.reveal` при прокрутке и синхронизирует язык документа. */
export function RevealObserver() {
  useDocumentLang();

  // Открытие по ссылке с якорем (#gallery и т. п.): после загрузки шрифтов
  // точно выравниваем раздел под фиксированной шапкой
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id || !document.getElementById(id)) return;
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    let active = true;
    const align = () => active && scrollToSection(id, { updateHash: false, instant: true });
    // любое действие пользователя отменяет автоматическое выравнивание
    const stop = () => {
      active = false;
    };
    const events = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, stop, { once: true, passive: true }));
    align();
    document.fonts?.ready.then(align);
    const t = window.setTimeout(() => {
      align();
      stop();
    }, 400);
    return () => {
      stop();
      window.clearTimeout(t);
      events.forEach((e) => window.removeEventListener(e, stop));
    };
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );
    const observeAll = () => document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => io.observe(el));
    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });
    // При переходе по якорю элементы выше цели должны быть видимы сразу
    const onHash = () => requestAnimationFrame(observeAll);
    window.addEventListener("hashchange", onHash);
    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return null;
}
