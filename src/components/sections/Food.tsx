"use client";

import { useT } from "@/lib/i18n";
import { Cloud, Flower, Star, Wave } from "../decor/Doodles";
import { Breakfast, Lunch, Snack } from "../decor/Illustrations";
import { SectionHeading } from "../ui/SectionHeading";

const MEALS = [
  { Art: Breakfast, plate: "bg-sun-soft ring-sun", num: "bg-honey text-ink", tilt: "sm:-rotate-1" },
  { Art: Lunch, plate: "bg-mint-soft ring-mint", num: "bg-mint-deep text-white", tilt: "sm:rotate-1 sm:-translate-y-2" },
  { Art: Snack, plate: "bg-sky-soft ring-sky", num: "bg-sky-deep text-white", tilt: "sm:-rotate-1" },
];

export function Food() {
  const t = useT();
  const f = t.food;

  return (
    <section id="food" data-section aria-labelledby="food-title" className="section-y relative isolate overflow-hidden bg-peach-soft">
      <Wave className="absolute inset-x-0 top-0 h-6 w-full sm:h-10" fill="#ebf9f2" flip />
      <Cloud className="decor -z-10 top-16 right-[-14px] w-20 opacity-90 lg:right-[6%]" />
      <Flower className="decor -z-10 bottom-10 left-[5%] w-8 animate-bob" petal="#f7a928" center="#fff" />
      <Star className="decor -z-10 top-20 left-[12%] hidden w-4 animate-twinkle sm:block" tone="#f0607f" />

      <div className="container-x">
        <SectionHeading id="food-title" eyebrow={f.eyebrow} title={f.title} lead={f.lead} tone="peach" />

        <ol className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3 lg:gap-6">
          {f.meals.map((m, i) => {
            const { Art, plate, num, tilt } = MEALS[i];
            return (
              <li
                key={m.name}
                className={`reveal relative flex items-center gap-4 rounded-[28px] bg-white p-4 shadow-soft ring-1 ring-peach transition-transform duration-300 hover:rotate-0 sm:flex-col sm:p-6 sm:text-center ${tilt}`}
                style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
              >
                <span className={`absolute top-3 left-3 grid size-8 place-items-center rounded-full text-[15px] font-extrabold ${num}`} aria-hidden="true">
                  {i + 1}
                </span>
                <span className={`grid size-24 shrink-0 place-items-center rounded-full ring-4 sm:size-36 ${plate}`}>
                  <Art className="w-20 sm:w-28" />
                </span>
                <div>
                  <h3 className="text-[20px] font-extrabold text-ink sm:text-[22px]">{m.name}</h3>
                  <p className="mt-1 text-[14.5px] leading-snug text-ink-soft sm:text-[15px]">{m.text}</p>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="reveal mx-auto mt-7 max-w-xl text-center text-[15px] text-ink-soft">{f.note}</p>
      </div>
    </section>
  );
}
