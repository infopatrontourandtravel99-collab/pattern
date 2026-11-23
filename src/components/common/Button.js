import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";
const variants = {
  dark: "bg-ink text-ivory hover:bg-black",
  gold: "bg-gold text-white hover:bg-gold-dark",
  light: "bg-white text-ink hover:bg-sand",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-ivory",
  outlineLight: "border border-white/60 text-white hover:bg-white hover:text-ink",
  whatsapp: "bg-[#1f9d57] text-white hover:bg-[#188047]",
};

export default function Button({ href, variant = "dark", className = "", external = false, children, ...rest }) {
  const cls = cn(base, variants[variant], className);
  if (!href) return <button className={cls} {...rest}>{children}</button>;
  if (external)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {children}
      </a>
    );
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
