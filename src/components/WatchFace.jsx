// Component to render vector horology dials: analog, wall, digital, smart.
export default function WatchFace({
  kind = "analog",
  dial = "#F5F1E8",
  ink = "#1C1917",
  accent = "#C5A059",
  bezel = "#383431",
  small,
  time,
  label
}) {
  const d = time || new Date(2026, 9, 19, 10, 10, 36);
  const s = d.getSeconds();
  const m = d.getMinutes() + s / 60;
  const h = (d.getHours() % 12) + m / 60;

  const hand = (deg, len, w, color) => (
    <line
      x1="100"
      y1="100"
      x2="100"
      y2={100 - len}
      stroke={color}
      strokeWidth={w}
      strokeLinecap="round"
      transform={`rotate(${deg} 100 100)`}
    />
  );

  const aria = {
    role: "img",
    "aria-label": label || "Watch face visualizer",
    className: "face-svg",
    viewBox: "0 0 200 200"
  };

  const hhmm = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

  if (kind === "digital") {
    return (
      <svg {...aria}>
        <rect x="14" y="48" width="172" height="104" rx="26" fill={bezel} />
        <rect x="28" y="62" width="144" height="76" rx="14" fill={dial} />
        <text x="100" y="112" textAnchor="middle" fontSize="40" fontWeight="700" fill={ink} fontFamily="monospace">{hhmm}</text>
        <circle cx="44" cy="152" r="4" fill={ink} />
        <circle cx="156" cy="152" r="4" fill={ink} />
      </svg>
    );
  }

  if (kind === "smart") {
    return (
      <svg {...aria}>
        <rect x="28" y="18" width="144" height="164" rx="36" fill="#1C1917" stroke="#44403C" strokeWidth="2" />
        <rect x="36" y="26" width="128" height="148" rx="28" fill={dial} />
        <circle cx="100" cy="100" r="48" fill="none" stroke="#292524" strokeWidth="6" />
        <circle
          cx="100"
          cy="100"
          r="48"
          fill="none"
          stroke={accent}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="210 310"
          transform="rotate(-90 100 100)"
        />
        <text x="100" y="108" textAnchor="middle" fontSize="30" fontWeight="600" fill={ink} fontFamily="system-ui, sans-serif">{hhmm}</text>
        <rect x="172" y="80" width="6" height="24" rx="3" fill="#A8A29E" />
      </svg>
    );
  }

  const wall = kind === "wall";
  const r = small ? 78 : 90;
  const nums = wall ? Array.from({ length: 12 }, (_, i) => i + 1) : [];

  return (
    <svg {...aria}>
      <circle cx="100" cy="100" r={wall ? 98 : 96} fill={bezel} />
      <circle cx="100" cy="100" r={wall ? 88 : r} fill={dial} stroke={accent} strokeWidth="1.5" />
      {Array.from({ length: 60 }, (_, i) => {
        const big = i % 5 === 0;
        if (wall && big) return null;
        return (
          <line
            key={i}
            x1="100"
            y1={big ? 12 : 15}
            x2="100"
            y2={big ? 24 : 19}
            stroke={ink}
            strokeWidth={big ? 2.2 : 0.9}
            transform={`rotate(${i * 6} 100 100)`}
          />
        );
      })}
      {nums.map((n) => {
        const a = (n * 30 * Math.PI) / 180;
        return (
          <text
            key={n}
            x={100 + 68 * Math.sin(a)}
            y={100 - 68 * Math.cos(a) + 6}
            textAnchor="middle"
            fontSize="18"
            fontWeight="600"
            fill={ink}
            fontFamily="Georgia, serif"
          >
            {n}
          </text>
        );
      })}
      {hand(h * 30, wall ? 46 : 50, wall ? 5 : small ? 3 : 4, ink)}
      {hand(m * 6, wall ? 68 : 72, wall ? 3.5 : 2.5, ink)}
      {hand(s * 6, wall ? 74 : 78, 1.2, accent)}
      <circle cx="100" cy="100" r="4.5" fill={accent} />
    </svg>
  );
}

