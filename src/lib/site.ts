/**
 * Единый конфиг детского сада «Балжан-1».
 * Здесь меняются телефоны, адрес, ссылки и карта — компоненты берут данные только отсюда.
 * Тексты интерфейса (KZ / RU) — в src/lib/i18n/kk.ts и src/lib/i18n/ru.ts.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://balzhan1-landing.vercel.app";

export type Phone = {
  /** Как номер показывается на сайте */
  display: string;
  /** Номер для ссылки tel: */
  e164: string;
};

export const site = {
  legalName: "ТОО «Балжан-1» балабақшасы",
  brand: "«Балжан-1»",
  brandPlain: "Балжан-1",

  address: {
    kk: "Алматы облысы, Жамбыл ауданы, Үңгіртас ауылы, Тәуелсіздік көшесі, 3В",
    ru: "Алматинская область, Жамбылский район, село Унгуртас, улица Тауелсиздик, 3В",
  },

  phones: [
    { display: "+7 (727) 705-16-69", e164: "+77277051669" },
    { display: "+7 777 570 55 10", e164: "+77775705510" },
    { display: "+7 702 117 63 20", e164: "+77021176320" },
  ] satisfies Phone[],

  /**
   * WhatsApp-номер. Пока не подтверждено, какой из телефонов подключён к WhatsApp,
   * поэтому кнопка на сайте не показывается.
   * Когда номер будет подтверждён — укажите его в международном формате без «+», например:
   *   whatsapp: "77775705510",
   */
  whatsapp: null as string | null,

  instagram: {
    handle: "@balzhan_balabaqwasy",
    url: "https://www.instagram.com/balzhan_balabaqwasy/",
  },

  hours: "08:00–18:00",
  groupsCount: 2,
  ages: "3–4",

  /**
   * Точка на карте. Карточка «Балжан-1» в 2GIS пока не проверена, поэтому координаты
   * не указаны и на сайте нет случайной метки: кнопки открывают поиск по адресу.
   * Когда точка будет проверена, заполните оба поля — появится встроенная карта 2GIS:
   *   geo: { lat: 43.xxxxxx, lon: 76.xxxxxx },
   *   twoGisFirmId: "70000001xxxxxxxx", // из ссылки 2gis.kz/almaty/firm/<ID>
   */
  geo: null as null | { lat: number; lon: number },
  twoGisFirmId: null as null | string,
} as const;

/** Адрес для поиска в 2GIS (как он записан в справочнике). */
const ADDRESS_QUERY = "Үңгіртас, Тәуелсіздік көшесі, 3В";

export const telHref = (e164: string) => `tel:${e164}`;

export function waHref(text?: string) {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function twoGisHref() {
  if (site.twoGisFirmId) return `https://2gis.kz/almaty/firm/${site.twoGisFirmId}`;
  const g = site.geo;
  if (g) return `https://2gis.kz/almaty/geo/${g.lon},${g.lat}?m=${g.lon},${g.lat}/17`;
  return `https://2gis.kz/almaty/search/${encodeURIComponent(ADDRESS_QUERY)}`;
}

/** Маршрут: к точке, когда она известна; до этого — к адресу. */
export function routeHref() {
  const g = site.geo;
  if (g) {
    const to = site.twoGisFirmId ? `${g.lon}%2C${g.lat}%3B${site.twoGisFirmId}` : `${g.lon}%2C${g.lat}`;
    return `https://2gis.kz/almaty/directions/points/%7C${to}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    "Тәуелсіздік көшесі 3В, Үңгіртас, Жамбыл ауданы, Алматы облысы",
  )}`;
}

/** Встраиваемая карта 2GIS — только при проверенных координатах и карточке организации. */
export function twoGisEmbed() {
  const g = site.geo;
  if (!g || !site.twoGisFirmId) return null;
  const options = { pos: { lat: g.lat, lon: g.lon, zoom: 16 }, opt: { city: "almaty" }, org: site.twoGisFirmId };
  return `https://widgets.2gis.com/widget?type=firmsonmap&options=${encodeURIComponent(JSON.stringify(options))}`;
}
