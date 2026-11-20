import media from "@/generated/media.json";

export type Photo = { name: string; src: string; width: number; height: number };
export type LocalDocument = { name: string; src: string; size: number };

type Manifest = {
  hero: Photo | null;
  about: Photo | null;
  video: { src: string; poster: string | null } | null;
  logo: Photo | null;
  gallery: Photo[];
  documents: LocalDocument[];
};

const m = media as unknown as Manifest;

/** Главный экран: main-page.* (в public/, public/hero или public/gallery) либо первый файл из public/hero. */
export const heroPhoto: Photo | null = m.hero;
/** «Біз туралы»: фото main-page2.* … */
export const aboutPhoto: Photo | null = m.about;
/** … или видео main-page2.(mp4|webm|mov) с постером main-page2-poster.* */
export const aboutVideo = m.video;
/** Логотип public/logo.(png|webp|svg), если предоставлен. */
export const logoImage: Photo | null = m.logo;
/** Фотографии из public/gallery (размеры считываются автоматически при сборке). */
export const galleryPhotos: Photo[] = m.gallery;
/** Файлы, найденные в public/documents. */
export const localDocuments: LocalDocument[] = m.documents;
