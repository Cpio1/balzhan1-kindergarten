/** Крупные иллюстрации-заглушки (вместо фото, пока они не добавлены) и рисунки еды. */

type P = { className?: string };

/** Домик детского сада под небом — для первого экрана без фотографии. */
export function KindergartenScene({ className, title }: P & { title: string }) {
  return (
    <svg viewBox="0 0 480 400" className={className} role="img" aria-label={title}>
      <defs>
        <linearGradient id="ks-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfe5fa" />
          <stop offset="1" stopColor="#eaf6fd" />
        </linearGradient>
      </defs>
      <rect width="480" height="400" fill="url(#ks-sky)" />
      {/* радуга */}
      <g fill="none" strokeWidth="14" opacity=".75">
        <path d="M60 300a180 180 0 0 1 360 0" stroke="#ffd2bd" />
        <path d="M74 300a166 166 0 0 1 332 0" stroke="#ffe17a" />
        <path d="M88 300a152 152 0 0 1 304 0" stroke="#bdebd7" />
      </g>
      <g fill="#fff">
        <path d="M70 92h58a16 16 0 0 0 1-32 20 20 0 0 0-38-4 14 14 0 0 0-21 36Z" />
        <path d="M340 70h70a18 18 0 0 0 1-36 24 24 0 0 0-45-5 16 16 0 0 0-26 41Z" />
      </g>
      {/* холмы */}
      <path d="M0 318c80-40 170-44 250-18s160 22 230-6v106H0Z" fill="#9fdfc2" />
      <path d="M0 344c100-30 210-26 300-6s130 10 180-4v66H0Z" fill="#bdebd7" />
      {/* дом */}
      <rect x="150" y="190" width="180" height="140" rx="16" fill="#fff8e6" />
      <path d="M134 200 240 120l106 80Z" fill="#f0607f" stroke="#f0607f" strokeWidth="10" strokeLinejoin="round" />
      <circle cx="240" cy="168" r="17" fill="#ffe17a" stroke="#fff" strokeWidth="5" />
      <rect x="216" y="262" width="48" height="68" rx="22" fill="#f7a928" />
      <circle cx="254" cy="298" r="3.5" fill="#925500" />
      <rect x="168" y="222" width="38" height="36" rx="10" fill="#bfe5fa" stroke="#fff" strokeWidth="5" />
      <rect x="274" y="222" width="38" height="36" rx="10" fill="#bfe5fa" stroke="#fff" strokeWidth="5" />
      {/* дерево и цветы */}
      <rect x="386" y="262" width="12" height="60" rx="6" fill="#b9783a" />
      <circle cx="392" cy="246" r="34" fill="#7fd1a8" />
      <circle cx="378" cy="236" r="6" fill="#f0607f" />
      <circle cx="404" cy="254" r="6" fill="#f0607f" />
      {[
        [80, 342, "#f0607f"],
        [112, 356, "#f7a928"],
        [350, 358, "#5b46b8"],
        [430, 344, "#f0607f"],
      ].map(([x, y, c]) => (
        <g key={`${x}`} transform={`translate(${x} ${y})`}>
          <path d="M0 0v18" stroke="#3a9a6d" strokeWidth="3" />
          {Array.from({ length: 5 }, (_, i) => (
            <ellipse key={i} cx="0" cy="-6" rx="4" ry="6" fill={c as string} transform={`rotate(${i * 72})`} />
          ))}
          <circle r="4" fill="#ffe17a" />
        </g>
      ))}
    </svg>
  );
}

/** Таңғы ас — тарелка каши с ягодами и чашка. */
export function Breakfast({ className }: P) {
  return (
    <svg viewBox="0 0 160 120" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="74" cy="98" rx="58" ry="10" fill="#29304d" opacity=".07" />
      <path d="M22 62h104c0 22-23 38-52 38S22 84 22 62Z" fill="#fff" stroke="#ffd2bd" strokeWidth="4" />
      <ellipse cx="74" cy="62" rx="52" ry="12" fill="#ffe7a3" />
      <circle cx="56" cy="58" r="6" fill="#f0607f" />
      <circle cx="70" cy="62" r="5" fill="#5b46b8" />
      <circle cx="84" cy="57" r="6" fill="#f0607f" />
      <path d="M92 64c6-6 14-6 18 0" stroke="#f7a928" strokeWidth="5" strokeLinecap="round" fill="none" />
      <rect x="116" y="26" width="30" height="34" rx="9" fill="#bfe5fa" />
      <path d="M146 34c8 0 8 16 0 16" stroke="#bfe5fa" strokeWidth="5" fill="none" />
      <path d="M124 18c0-6 6-6 6-12M136 18c0-6 6-6 6-12" stroke="#bfe5fa" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Түскі ас — суп в миске. */
export function Lunch({ className }: P) {
  return (
    <svg viewBox="0 0 160 120" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="80" cy="102" rx="60" ry="10" fill="#29304d" opacity=".07" />
      <path d="M50 30c0-8 8-8 8-16M74 28c0-8 8-8 8-16M98 30c0-8 8-8 8-16" stroke="#9fd0ea" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M20 52h120c0 30-26 50-60 50S20 82 20 52Z" fill="#7fd1a8" />
      <path d="M28 66c18 8 86 8 104 0" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity=".55" fill="none" />
      <ellipse cx="80" cy="52" rx="60" ry="13" fill="#ffc24a" />
      <circle cx="58" cy="50" r="6" fill="#f7a928" />
      <rect x="74" y="44" width="12" height="10" rx="3" fill="#fff8e6" />
      <circle cx="104" cy="52" r="5" fill="#3a9a6d" />
      <path d="M118 8l-16 44" stroke="#ffd2bd" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

/** Бесін ас — яблоко, печенье и стакан молока. */
export function Snack({ className }: P) {
  return (
    <svg viewBox="0 0 160 120" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="80" cy="104" rx="62" ry="9" fill="#29304d" opacity=".07" />
      <path d="M100 30h34l-5 70h-24Z" fill="#fff" stroke="#bfe5fa" strokeWidth="4" strokeLinejoin="round" />
      <path d="M103 52h28l-3 46h-22Z" fill="#eaf6fd" />
      <path d="M44 44c-18-8-34 6-30 28 3 18 16 30 30 26 14 4 27-8 30-26 4-22-12-36-30-28Z" fill="#f0607f" />
      <path d="M44 44c0-10 4-16 10-18" stroke="#8a5a2b" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M48 34c8-8 18-6 20-2-6 6-14 6-20 2Z" fill="#3a9a6d" />
      <ellipse cx="32" cy="62" rx="5" ry="8" fill="#fff" opacity=".45" />
      <circle cx="82" cy="88" r="15" fill="#f7a928" />
      <circle cx="77" cy="84" r="2.4" fill="#925500" />
      <circle cx="87" cy="90" r="2.4" fill="#925500" />
      <circle cx="79" cy="94" r="2" fill="#925500" />
    </svg>
  );
}

/** Папка с документами — пустое состояние раздела «Құжаттар». */
export function Folder({ className }: P) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true" focusable="false">
      <path d="M10 22a8 8 0 0 1 8-8h26l10 10h48a8 8 0 0 1 8 8v52a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8Z" fill="#f7a928" />
      <rect x="24" y="10" width="62" height="70" rx="8" fill="#fff" stroke="#efe5cf" strokeWidth="2" transform="rotate(-6 55 45)" />
      <g transform="rotate(-6 55 45)" stroke="#bfe5fa" strokeWidth="4" strokeLinecap="round">
        <path d="M34 26h40M34 38h40M34 50h26" />
      </g>
      <path d="M10 40a8 8 0 0 1 8-8h84a8 8 0 0 1 8 8v44a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8Z" fill="#ffc24a" />
      <circle cx="60" cy="62" r="9" fill="#fff" opacity=".8" />
      <path d="M56 62h8M60 58v8" stroke="#f7a928" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Схематичная карта с меткой — пока точка 2GIS не подтверждена. */
export function MapScene({ className, title }: P & { title: string }) {
  return (
    <svg viewBox="0 0 400 260" className={className} role="img" aria-label={title} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="260" fill="#ebf9f2" />
      <path d="M0 180c70-20 120 10 190-6s140-50 210-30v116H0Z" fill="#d6f3e5" />
      <path d="M-10 70c90 20 160-30 250-10s120 60 170 50" stroke="#fff" strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M120 -10c10 90-30 160 20 280" stroke="#fff" strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d="M260 270c-10-70 40-120 10-280" stroke="#fff" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M300 200c20-30 60-30 110-20" stroke="#bfe5fa" strokeWidth="16" fill="none" strokeLinecap="round" />
      {[
        [40, 110],
        [160, 150],
        [300, 110],
        [330, 40],
        [60, 200],
        [200, 30],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="34" height="26" rx="6" fill="#fff8e6" stroke="#efe5cf" strokeWidth="2" />
      ))}
      <circle cx="96" cy="40" r="14" fill="#9fdfc2" />
      <circle cx="350" cy="210" r="16" fill="#9fdfc2" />
      <circle cx="232" cy="198" r="12" fill="#9fdfc2" />
      <ellipse cx="200" cy="140" rx="26" ry="8" fill="#29304d" opacity=".12" />
      <path d="M200 140s-34-36-34-60a34 34 0 0 1 68 0c0 24-34 60-34 60Z" fill="#f0607f" />
      <circle cx="200" cy="80" r="13" fill="#fff" />
    </svg>
  );
}
