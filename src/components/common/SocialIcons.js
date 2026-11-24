// Simple brand glyphs (lucide has no brand icons).
export function InstagramIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.95.4-1.7 1.8-1.7H17V3.8c-.4-.05-1.4-.15-2.4-.15-2.6 0-4.1 1.5-4.1 4.3v2.55H7.7v3.3h2.8V22h3Z" />
    </svg>
  );
}

export function GoogleIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <text x="12" y="18.5" textAnchor="middle" fontSize="20" fontWeight="700" fontFamily="Arial, sans-serif" fill="currentColor">G</text>
    </svg>
  );
}
