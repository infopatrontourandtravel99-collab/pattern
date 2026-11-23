"use client";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

const KEY = "kh-saved-destinations";

function read() {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

// Saves a destination to this browser's favourites (localStorage).
export default function WishlistButton({ slug, name }) {
  const [saved, setSaved] = useState(false);
  useEffect(() => setSaved(read().includes(slug)), [slug]);

  function toggle() {
    const list = read();
    const next = list.includes(slug) ? list.filter((s) => s !== slug) : [...list, slug];
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
    setSaved(next.includes(slug));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${name} from saved` : `Save ${name}`}
      className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-ink shadow-sm transition-transform hover:scale-105"
    >
      <Heart size={17} className={saved ? "fill-red-500 text-red-500" : ""} />
    </button>
  );
}
