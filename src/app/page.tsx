import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { About } from "@/components/sections/About";
import { Contacts } from "@/components/sections/Contacts";
import { Documents } from "@/components/sections/Documents";
import { Food } from "@/components/sections/Food";
import { Gallery } from "@/components/sections/Gallery";
import { Groups } from "@/components/sections/Groups";
import { Hero } from "@/components/sections/Hero";
import { site, SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  name: "«Балжан-1» балабақшасы",
  legalName: site.legalName,
  url: SITE_URL,
  telephone: site.phones.map((p) => p.e164),
  sameAs: [site.instagram.url],
  openingHours: "08:00-18:00",
  inLanguage: "kk",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Тәуелсіздік көшесі, 3В",
    addressLocality: "Үңгіртас ауылы",
    addressRegion: "Алматы облысы, Жамбыл ауданы",
    addressCountry: "KZ",
  },
};

export default function Home() {
  return (
    <>
      <div id="top" />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Groups />
        <Food />
        <Gallery />
        <Documents />
        <Contacts />
      </main>
      <Footer year={new Date().getFullYear()} />
      <RevealObserver />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
