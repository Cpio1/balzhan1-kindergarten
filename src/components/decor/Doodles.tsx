/** Небольшие декоративные SVG-фигурки. Все — aria-hidden, размер задаётся классом. */

type P = { className?: string; style?: React.CSSProperties };

export function Cloud({ className, style, tone = "#ffffff" }: P & { tone?: string }) {
  return (
    <svg viewBox="0 0 120 64" className={className} style={style} aria-hidden="true" focusable="false">
      <path
        d="M28 58h66a20 20 0 0 0 2-40 26 26 0 0 0-48-6 18 18 0 0 0-22 14A16 16 0 0 0 28 58Z"
        fill={tone}
      />
      <path d="M30 58h64a20 20 0 0 0 19-14c-6 7-14 9-22 9H33c-8 0-15-3-19-9a16 16 0 0 0 16 14Z" fill="#29304d" opacity=".05" />
    </svg>
  );
}

export function Sun({ className, style }: P) {
  return (
    <svg viewBox="0 0 120 120" className={className} style={style} aria-hidden="true" focusable="false">
      <g className="origin-center animate-spin-slow" style={{ transformBox: "fill-box" }}>
        {Array.from({ length: 12 }, (_, i) => (
          <rect
            key={i}
            x="56"
            y="4"
            width="8"
            height="18"
            rx="4"
            fill="#ffc24a"
            transform={`rotate(${i * 30} 60 60)`}
          />
        ))}
      </g>
      <circle cx="60" cy="60" r="32" fill="#ffd95a" />
      <circle cx="60" cy="60" r="32" fill="url(#sun-g)" />
      <circle cx="49" cy="56" r="3.2" fill="#29304d" />
      <circle cx="71" cy="56" r="3.2" fill="#29304d" />
      <path d="M50 67c5 6 15 6 20 0" stroke="#29304d" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      <circle cx="43" cy="66" r="4.5" fill="#f0607f" opacity=".35" />
      <circle cx="77" cy="66" r="4.5" fill="#f0607f" opacity=".35" />
      <defs>
        <radialGradient id="sun-g" cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#fff3b0" />
          <stop offset="1" stopColor="#ffc24a" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function Star({ className, style, tone = "#ffd95a" }: P & { tone?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" focusable="false">
      <path
        d="M12 2.5c.6 0 1 .4 1.3 1l2 4.3 4.6.6c1.2.2 1.6 1.6.8 2.4l-3.4 3.2.9 4.6c.2 1.2-1 2-2 1.5L12 17.8l-4.2 2.3c-1 .6-2.2-.3-2-1.5l.9-4.6-3.4-3.2c-.8-.8-.4-2.2.8-2.4l4.6-.6 2-4.3c.3-.6.7-1 1.3-1Z"
        fill={tone}
      />
    </svg>
  );
}

export function Sparkle({ className, style, tone = "#f0607f" }: P & { tone?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M12 1c1 6 5 10 11 11-6 1-10 5-11 11-1-6-5-10-11-11 6-1 10-5 11-11Z" fill={tone} />
    </svg>
  );
}

export function Flower({ className, style, petal = "#f0607f", center = "#ffd95a" }: P & { petal?: string; center?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden="true" focusable="false">
      {Array.from({ length: 5 }, (_, i) => (
        <ellipse key={i} cx="20" cy="10" rx="6.5" ry="8.5" fill={petal} transform={`rotate(${i * 72} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="6.5" fill={center} />
    </svg>
  );
}

export function Hexagon({ className, style, tone = "#ffe17a" }: P & { tone?: string }) {
  return (
    <svg viewBox="0 0 52 60" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M26 2.5 49 15.7v28.6L26 57.5 3 44.3V15.7Z" fill={tone} stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}

/** Маскот — пчёлка «Бал». */
export function Bee({ className, style }: P) {
  return (
    <svg viewBox="0 0 96 80" className={className} style={style} aria-hidden="true" focusable="false">
      <ellipse cx="38" cy="20" rx="14" ry="18" fill="#eaf6fd" stroke="#bfe5fa" strokeWidth="2.5" transform="rotate(-20 38 20)" />
      <ellipse cx="58" cy="18" rx="13" ry="17" fill="#eaf6fd" stroke="#bfe5fa" strokeWidth="2.5" transform="rotate(18 58 18)" />
      <ellipse cx="48" cy="48" rx="30" ry="24" fill="#ffd95a" />
      <path d="M36 26c-4 6-5 37 0 44M52 24c-4 8-4 40 0 48" stroke="#29304d" strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M76 46l12 2-12 5" fill="#29304d" />
      <circle cx="26" cy="44" r="15" fill="#ffe7a3" />
      <circle cx="21" cy="42" r="2.6" fill="#29304d" />
      <circle cx="31" cy="42" r="2.6" fill="#29304d" />
      <path d="M21 49c3 3 7 3 10 0" stroke="#29304d" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="17" cy="48" r="3" fill="#f0607f" opacity=".45" />
      <circle cx="35" cy="48" r="3" fill="#f0607f" opacity=".45" />
      <path d="M22 30c-2-6-6-9-9-9M30 30c1-6 4-10 7-11" stroke="#29304d" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="20" r="3" fill="#29304d" />
      <circle cx="38" cy="18" r="3" fill="#29304d" />
    </svg>
  );
}

export function Ladybug({ className, style }: P) {
  return (
    <svg viewBox="0 0 64 56" className={className} style={style} aria-hidden="true" focusable="false">
      <circle cx="32" cy="14" r="10" fill="#29304d" />
      <path d="M26 6c-3-4-6-5-8-4M38 6c3-4 6-5 8-4" stroke="#29304d" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <ellipse cx="32" cy="34" rx="22" ry="19" fill="#f0607f" />
      <path d="M32 15v38" stroke="#29304d" strokeWidth="2.6" />
      <circle cx="22" cy="30" r="4" fill="#29304d" />
      <circle cx="42" cy="30" r="4" fill="#29304d" />
      <circle cx="24" cy="43" r="3.4" fill="#29304d" />
      <circle cx="40" cy="43" r="3.4" fill="#29304d" />
      <circle cx="28" cy="13" r="1.8" fill="#fff" />
      <circle cx="36" cy="13" r="1.8" fill="#fff" />
    </svg>
  );
}

export function Bird({ className, style, tone = "#7cc8ef" }: P & { tone?: string }) {
  return (
    <svg viewBox="0 0 64 52" className={className} style={style} aria-hidden="true" focusable="false">
      <path d="M8 30c0-14 11-24 25-24 11 0 19 7 21 16l8 3-8 4c-2 11-12 19-25 19C17 48 8 41 8 30Z" fill={tone} />
      <path d="M18 30c5-8 14-9 20-4-3 9-13 12-20 4Z" fill="#fff" opacity=".7" />
      <circle cx="42" cy="20" r="2.6" fill="#29304d" />
      <path d="M54 22l9 3-9 3" fill="#f7a928" />
      <circle cx="45" cy="28" r="2.6" fill="#f0607f" opacity=".45" />
    </svg>
  );
}

/** Волнистый разделитель между секциями. `fill` — цвет следующей секции. */
export function Wave({ className, fill, flip = false }: { className?: string; fill: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className={className}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M0 26c120-18 240-26 360-14s240 30 360 26 240-28 360-30 240 12 360 18v22H0Z" fill={fill} />
    </svg>
  );
}
