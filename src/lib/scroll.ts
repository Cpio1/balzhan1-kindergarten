/** Плавный переход к разделу с учётом высоты фиксированной шапки. */
export function scrollToSection(id: string, opts: { updateHash?: boolean; instant?: boolean } = {}) {
  const { updateHash = true, instant = false } = opts;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = reduce || instant ? "instant" : "smooth";

  if (id === "top") {
    window.scrollTo({ top: 0, behavior });
    if (updateHash) history.replaceState(null, "", window.location.pathname + window.location.search);
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  const offset = header?.offsetHeight ?? 0;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior });
  if (updateHash) history.replaceState(null, "", `#${id}`);
}

/** Обработчик клика для ссылок вида href="#section". Работает и без JS (обычный якорь). */
export function onAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, after?: () => void) {
  const href = e.currentTarget.getAttribute("href") ?? "";
  if (!href.startsWith("#") || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  after?.();
  // ждём кадр, чтобы закрытое меню успело снять блокировку прокрутки
  requestAnimationFrame(() => scrollToSection(href.slice(1)));
}
