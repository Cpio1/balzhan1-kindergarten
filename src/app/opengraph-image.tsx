import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "«Балжан-1» балабақшасы — Үңгіртас ауылы";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const dir = path.join(process.cwd(), "src/app/_og");
  const nunito = await readFile(path.join(dir, "Nunito-700.ttf"));
  const chips = [
    { text: "2 топ", bg: "#fff6d2", color: "#925500" },
    { text: "3–4 жас", bg: "#ebf9f2", color: "#187552" },
    { text: "08:00–18:00", bg: "#fff0e7", color: "#b9461c" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(180deg, #cfeefe 0%, #eaf6fd 45%, #fffdf6 100%)",
          padding: "0 90px",
          fontFamily: "Nunito",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 60, right: 90, width: 150, height: 150, borderRadius: 999, background: "#ffd95a", display: "flex" }} />
        <div style={{ position: "absolute", bottom: -60, left: 0, right: 0, height: 160, background: "#bdebd7", borderRadius: "50% 50% 0 0", display: "flex" }} />
        <div style={{ display: "flex", fontSize: 30, color: "#1c6a9c" }}>Үңгіртас ауылындағы балабақша</div>
        <div style={{ display: "flex", fontFamily: "Nunito", fontSize: 112, color: "#29304d", marginTop: 14 }}>
          «Балжан-1»
        </div>
        <div style={{ display: "flex", fontFamily: "Nunito", fontSize: 52, color: "#1c6a9c", marginTop: 4 }}>балабақшасы</div>
        <div style={{ display: "flex", gap: 16, marginTop: 36 }}>
          {chips.map((c) => (
            <div key={c.text} style={{ display: "flex", padding: "10px 26px", borderRadius: 999, background: c.bg, color: c.color, fontSize: 30 }}>
              {c.text}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Nunito", data: nunito, weight: 700, style: "normal" },
      ],
    },
  );
}
