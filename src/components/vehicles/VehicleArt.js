// Flat side-view vehicle illustrations (used until real vehicle photos are added).
const wheel = (cx) => (
  <g key={cx}>
    <circle cx={cx} cy="78" r="15" fill="#0b1630" />
    <circle cx={cx} cy="78" r="7" fill="#cbd5e1" />
    <circle cx={cx} cy="78" r="2.5" fill="#0b1630" />
  </g>
);

const glass = "#9fc3ea";

const shapes = {
  sedan: (
    <>
      <path d="M16 78 L20 62 Q24 55 38 52 L72 48 Q88 28 124 26 L158 26 Q178 28 190 48 L216 54 Q230 58 230 70 L230 78 Z" fill="#ffffff" />
      <path d="M80 47 Q92 32 120 31 L128 31 L128 47 Z" fill={glass} />
      <path d="M135 31 L156 31 Q170 33 181 47 L135 47 Z" fill={glass} />
      <rect x="214" y="60" width="12" height="5" rx="2" fill="#ffd166" />
      <rect x="18" y="64" width="9" height="5" rx="2" fill="#ef476f" />
      {wheel(66)}{wheel(184)}
    </>
  ),
  suv: (
    <>
      <path d="M14 78 L16 58 Q18 50 30 48 L60 44 L80 22 L186 22 Q198 24 204 40 L224 48 Q232 52 232 64 L232 78 Z" fill="#ffffff" />
      <path d="M84 42 L96 27 L122 27 L122 42 Z" fill={glass} />
      <path d="M128 27 L158 27 L158 42 L128 42 Z" fill={glass} />
      <path d="M164 27 L184 27 Q192 29 196 42 L164 42 Z" fill={glass} />
      <rect x="216" y="56" width="12" height="5" rx="2" fill="#ffd166" />
      <rect x="16" y="62" width="9" height="5" rx="2" fill="#ef476f" />
      <rect x="86" y="14" width="96" height="4" rx="2" fill="#e2e8f0" />
      {wheel(64)}{wheel(188)}
    </>
  ),
  van: (
    <>
      <path d="M12 80 L12 36 Q12 28 24 28 L172 28 Q186 28 196 42 L224 54 Q234 58 234 70 L234 80 Z" fill="#ffffff" />
      {[28, 62, 96, 130].map((x) => <rect key={x} x={x} y="36" width="28" height="22" rx="3" fill={glass} />)}
      <path d="M164 36 L182 36 Q190 40 198 52 L164 52 Z" fill={glass} />
      <rect x="218" y="62" width="12" height="5" rx="2" fill="#ffd166" />
      <rect x="12" y="66" width="8" height="5" rx="2" fill="#ef476f" />
      <rect x="12" y="62" width="222" height="3" fill="#f59e0b" opacity="0.8" />
      {wheel(58)}{wheel(190)}
    </>
  ),
  bus: (
    <>
      <path d="M8 80 L8 30 Q8 22 18 22 L200 22 Q212 22 218 34 L232 56 Q236 62 236 70 L236 80 Z" fill="#ffffff" />
      {[20, 48, 76, 104, 132, 160].map((x) => <rect key={x} x={x} y="30" width="24" height="22" rx="3" fill={glass} />)}
      <path d="M190 30 L204 30 Q210 32 216 44 L224 52 L190 52 Z" fill={glass} />
      <rect x="8" y="60" width="228" height="4" fill="#f59e0b" opacity="0.85" />
      <rect x="222" y="62" width="10" height="5" rx="2" fill="#ffd166" />
      {wheel(52)}{wheel(196)}
    </>
  ),
};

export default function VehicleArt({ kind = "sedan", className = "" }) {
  return (
    <svg viewBox="0 0 244 100" className={className} role="img" aria-hidden="true">
      <ellipse cx="122" cy="94" rx="110" ry="4" fill="#000" opacity="0.18" />
      {shapes[kind] || shapes.sedan}
    </svg>
  );
}
