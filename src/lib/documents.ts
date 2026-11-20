import { localDocuments } from "./media";

/**
 * Документы детского сада. Вымышленных документов здесь нет — раздел показывает
 * аккуратное пустое состояние, пока список пуст.
 *
 * Как добавить документ:
 *
 * 1) PDF-файл: положите его в `public/documents/` — он появится на сайте автоматически
 *    (название берётся из имени файла). Чтобы задать красивое название на двух языках,
 *    добавьте запись в `manualDocuments` с `url: "/documents/<имя файла>"` и `source: "local"`.
 *
 * 2) Google Drive / облако:
 *    {
 *      id: "license",
 *      title: { kk: "Лицензия", ru: "Лицензия" },
 *      url: "https://drive.google.com/file/d/<ID>/view",
 *      source: "drive",
 *    },
 *    Для Google Drive кнопка «Жүктеп алу» строится автоматически.
 *    Для других сервисов используйте `source: "link"` (и при желании `downloadUrl`).
 *
 * Локальные записи, для которых нет файла в public/documents, не показываются,
 * поэтому на сайте не бывает неработающих кнопок.
 */
export type DocumentSource = "local" | "drive" | "link";

export type DocumentItem = {
  id: string;
  title: { kk: string; ru: string };
  url: string;
  source: DocumentSource;
  downloadUrl?: string;
  /** Подпись формата: PDF, DOCX, JPG… */
  format?: string;
  size?: number;
};

const manualDocuments: DocumentItem[] = [];

const ext = (name: string) => (name.split(".").pop() ?? "").toUpperCase();
const prettify = (name: string) =>
  decodeURIComponent(name).replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim();
const norm = (u: string) => decodeURIComponent(u);

function driveDownload(url: string) {
  try {
    const id = url.match(/\/d\/([^/]+)/)?.[1] ?? new URL(url).searchParams.get("id");
    return id ? `https://drive.google.com/uc?export=download&id=${id}` : undefined;
  } catch {
    return undefined;
  }
}

function build(): DocumentItem[] {
  const local = new Map(localDocuments.map((d) => [norm(d.src), d]));
  const manual = manualDocuments
    .filter((d) => d.source !== "local" || local.has(norm(d.url)))
    .map((d) => ({
      ...d,
      format: d.format ?? (d.source === "local" ? ext(d.url) : undefined),
      size: d.size ?? local.get(norm(d.url))?.size,
      downloadUrl:
        d.downloadUrl ?? (d.source === "local" ? d.url : d.source === "drive" ? driveDownload(d.url) : undefined),
    }));
  const described = new Set(manual.filter((d) => d.source === "local").map((d) => norm(d.url)));
  const auto: DocumentItem[] = localDocuments
    .filter((l) => !described.has(norm(l.src)))
    .map((l) => ({
      id: l.name,
      title: { kk: prettify(l.name), ru: prettify(l.name) },
      url: l.src,
      source: "local",
      downloadUrl: l.src,
      format: ext(l.name),
      size: l.size,
    }));
  return [...manual, ...auto];
}

export const documents: DocumentItem[] = build();
