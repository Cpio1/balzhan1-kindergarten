import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { kk } from "@/lib/i18n/kk";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// cyrillic-ext обязателен для казахских букв Ә Ғ Қ Ң Ө Ұ Ү Һ І
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: kk.meta.title,
  description: kk.meta.description,
  applicationName: "Балжан-1",
  keywords: [
    "Балжан-1",
    "Балжан-1 балабақшасы",
    "балабақша Үңгіртас",
    "детский сад Унгуртас",
    "детский сад Жамбылский район",
    "балабақша Жамбыл ауданы",
    "детский сад Балжан",
  ],
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: "/" },
  openGraph: {
    title: kk.meta.title,
    description: kk.meta.description,
    siteName: "«Балжан-1» балабақшасы",
    locale: "kk_KZ",
    alternateLocale: ["ru_RU"],
    type: "website",
    url: "/",
  },
  twitter: { card: "summary_large_image", title: kk.meta.title, description: kk.meta.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: "#fffdf6",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="kk"
      className={`${nunito.variable} antialiased`}
      style={{ colorScheme: "light" }}
      suppressHydrationWarning
    >
      <head>
        {/* Анимации появления — только при работающем JS; язык <html> выставляется до отрисовки */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');try{if(localStorage.getItem('balzhan1-lang')==='ru')document.documentElement.lang='ru'}catch(e){}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
