import Image from "next/image";

// Wrapper around next/image. Local SVG placeholders skip the optimizer.
export default function SmartImage({ src, alt, sizes = "(min-width: 1024px) 50vw, 100vw", priority = false, className = "" }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={src.endsWith(".svg")}
      className={`object-cover ${className}`}
    />
  );
}
