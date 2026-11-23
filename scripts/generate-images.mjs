// Generates placeholder landscape illustrations into public/images.
// Replace these files (or the paths in src/data/images.js) with real photography.
import { writeFileSync, mkdirSync } from "node:fs";

mkdirSync("public/images", { recursive: true });
mkdirSync("public/icons", { recursive: true });

const W = 1600, H = 1000;

function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function ridge(r, baseY, amp, color, steps = 14, opacity = 1) {
  const pts = [];
  for (let i = 0; i <= steps; i++) pts.push([(W / steps) * i, baseY - r() * amp]);
  let d = `M0 ${H} L0 ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    d += ` Q ${x0 + (x1 - x0) * 0.5} ${Math.min(y0, y1) - amp * 0.15} ${x1} ${y1}`;
  }
  d += ` L${W} ${H} Z`;
  return `<path d="${d}" fill="${color}" opacity="${opacity}"/>`;
}

const scenes = {
  "hero-dal-lake": { sky: ["#f6e3c8", "#dfeaf0"], sun: "#fff3d6", far: "#9fb4c6", mid: "#6f8aa0", near: "#3d5a54", water: ["#8fb0bb", "#5c8591"], snow: true, boat: true, seed: 1 },
  mountains: { sky: ["#dbe8f2", "#f3ecdf"], sun: "#fff8e6", far: "#a8bccd", mid: "#7690a6", near: "#44625d", water: null, snow: true, seed: 2 },
  lakes: { sky: ["#f9e6cd", "#cfe1e8"], sun: "#ffe9bf", far: "#a5bac5", mid: "#789aa6", near: "#4b6b62", water: ["#9dc0c6", "#5f8a95"], boat: true, seed: 3 },
  adventure: { sky: ["#cbdde9", "#f1f0ec"], sun: "#ffffff", far: "#b4c4d2", mid: "#8097ab", near: "#e8eef2", water: null, snow: true, seed: 4 },
  honeymoon: { sky: ["#f7d9c0", "#f0e4dc"], sun: "#ffd9a8", far: "#c6a59a", mid: "#8d7a7e", near: "#4c5a58", water: ["#d4b3a3", "#9b8488"], boat: true, seed: 5 },
  srinagar: { sky: ["#f2e2c9", "#d9e6ea"], sun: "#fff0d0", far: "#a6b9c4", mid: "#7a9aa3", near: "#4e6d60", water: ["#97b8bf", "#628893"], boat: true, seed: 6 },
  gulmarg: { sky: ["#d3e2ee", "#f4f2ec"], sun: "#fffbee", far: "#b9c9d6", mid: "#e4ebf0", near: "#ffffff", water: null, snow: true, seed: 7 },
  pahalgam: { sky: ["#e4ecdd", "#cfe0e4"], sun: "#fff6d8", far: "#98b0a2", mid: "#6b8f7b", near: "#3f6252", water: ["#a4c3c3", "#6e9696"], seed: 8 },
  sonamarg: { sky: ["#dbe7ef", "#f0eee6"], sun: "#fff8e0", far: "#aebfcd", mid: "#7e9d90", near: "#4f7561", water: ["#9fc2c9", "#6a97a1"], snow: true, seed: 9 },
  doodhpathri: { sky: ["#e7efe0", "#d6e5e8"], sun: "#fff6d6", far: "#a1b8a5", mid: "#759a7c", near: "#45694f", water: null, seed: 10 },
  gurez: { sky: ["#e9dfcf", "#cfdbe2"], sun: "#ffedc9", far: "#a8afb5", mid: "#7d8b8e", near: "#566a62", water: ["#8db3b9", "#5d8a92"], snow: true, seed: 11 },
  bangus: { sky: ["#eadfc8", "#dde8e4"], sun: "#fff1cb", far: "#aab7a8", mid: "#889f7a", near: "#5c7a52", water: null, seed: 12 },
  yusmarg: { sky: ["#e3ecdb", "#d9e7ea"], sun: "#fff7da", far: "#9db4a2", mid: "#7ea083", near: "#4d7255", water: null, seed: 13 },
  shikara: { sky: ["#f8e2c6", "#d6e4ea"], sun: "#ffe8bd", far: "#a2b6c1", mid: "#7899a4", near: "#4f6e65", water: ["#97bac1", "#5f8994"], boat: true, seed: 14 },
  houseboat: { sky: ["#f4dcc0", "#dbe5e6"], sun: "#ffe3b4", far: "#a8b5bb", mid: "#7c8f93", near: "#4d625c", water: ["#9bb7b8", "#668a8e"], boat: true, seed: 15 },
  gondola: { sky: ["#d0e0ec", "#f3f1ea"], sun: "#ffffff", far: "#b3c3d1", mid: "#dfe8ee", near: "#f7f9fa", water: null, snow: true, seed: 16 },
  snow: { sky: ["#d9e5ee", "#f6f4ef"], sun: "#ffffff", far: "#c3d0db", mid: "#e5edf2", near: "#ffffff", water: null, snow: true, seed: 17 },
  cuisine: { sky: ["#efd9bc", "#e9cfa9"], sun: "#ffe8c2", far: "#c5a27c", mid: "#a8835d", near: "#6f5238", water: null, seed: 18 },
  gardens: { sky: ["#eaf0dc", "#d8e6e3"], sun: "#fff7d8", far: "#a8bfa4", mid: "#7ba383", near: "#4a7357", water: ["#b2d0cc", "#79a3a3"], seed: 19 },
  offbeat: { sky: ["#e6dccb", "#cfd9df"], sun: "#ffeccc", far: "#a9b0b4", mid: "#7f8f8c", near: "#566b60", water: null, snow: true, seed: 20 },
  about: { sky: ["#f5e4cc", "#dce8ec"], sun: "#fff1d4", far: "#a7b9c5", mid: "#7b9aa5", near: "#506f63", water: ["#98b9c0", "#628b95"], boat: true, seed: 21 },
};

function render(name, c) {
  const r = rng(c.seed * 7919);
  const horizon = c.water ? 640 : 760;
  let out = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${name}">`;
  out += `<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.sky[0]}"/><stop offset="1" stop-color="${c.sky[1]}"/></linearGradient>`;
  if (c.water) out += `<linearGradient id="wt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.water[0]}"/><stop offset="1" stop-color="${c.water[1]}"/></linearGradient>`;
  out += `<radialGradient id="sun"><stop offset="0" stop-color="${c.sun}" stop-opacity="0.95"/><stop offset="1" stop-color="${c.sun}" stop-opacity="0"/></radialGradient></defs>`;
  out += `<rect width="${W}" height="${H}" fill="url(#sky)"/>`;
  const sx = 300 + r() * 1000;
  out += `<circle cx="${sx}" cy="${230 + r() * 80}" r="260" fill="url(#sun)"/>`;
  out += ridge(r, horizon - 120, 300, c.far, 12, 0.85);
  if (c.snow) {
    // snow caps: light haze overlaying far ridge tops
    out += `<rect y="0" width="${W}" height="${horizon - 330}" fill="#ffffff" opacity="0.07"/>`;
  }
  out += ridge(r, horizon - 20, 240, c.mid, 10, 0.95);
  out += ridge(r, horizon + 50, 170, c.near, 9, 1);
  if (c.water) {
    out += `<rect y="${horizon + 60}" width="${W}" height="${H - horizon - 60}" fill="url(#wt)"/>`;
    for (let i = 0; i < 18; i++) {
      const y = horizon + 90 + i * 18;
      out += `<rect x="${r() * W * 0.8}" y="${y}" width="${120 + r() * 380}" height="2" rx="1" fill="#ffffff" opacity="${0.08 + r() * 0.14}"/>`;
    }
    if (c.boat) {
      const bx = 520 + r() * 500, by = horizon + 250;
      out += `<g opacity="0.9"><path d="M${bx - 110} ${by} Q${bx} ${by + 34} ${bx + 110} ${by} L${bx + 90} ${by - 10} L${bx - 90} ${by - 10} Z" fill="#2b3a38"/><path d="M${bx - 60} ${by - 10} L${bx - 50} ${by - 52} L${bx + 55} ${by - 52} L${bx + 65} ${by - 10} Z" fill="#c8a45e"/><rect x="${bx - 52}" y="${by - 52}" width="106" height="6" fill="#2b3a38"/></g>`;
    }
  } else {
    out += `<rect y="${horizon + 110}" width="${W}" height="${H}" fill="${c.near}" opacity="0.55"/>`;
  }
  out += `<rect width="${W}" height="${H}" fill="#2a2018" opacity="0.04"/>`;
  out += `</svg>`;
  writeFileSync(`public/images/${name}.svg`, out);
}

for (const [n, c] of Object.entries(scenes)) render(n, c);

writeFileSync(
  "public/icons/icon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#2b2622"/><path d="M8 46 L24 24 L33 36 L41 27 L56 46 Z" fill="#c8a45e"/><circle cx="46" cy="16" r="5" fill="#f4ecdd"/></svg>`
);
console.log("Generated", Object.keys(scenes).length, "images");
