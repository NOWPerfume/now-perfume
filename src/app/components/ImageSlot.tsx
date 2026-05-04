"use client";

import Image from "next/image";
import { useState } from "react";

type ImageSlotProps = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  placeholderLabel?: string;
};

// Checklist images attendues dans public/images/
// header-logo.png
// accueil-hero.jpg, accueil-univers.jpg, accueil-collection.jpg, accueil-mood.jpg
// marque-hero.jpg, marque-manifeste.jpg, marque-5-moods.jpg, marque-experience.jpg, marque-device.jpg, marque-final.jpg
// nous-trouver-hero.jpg, nous-trouver-clubs.jpg, nous-trouver-studios-sport.jpg, nous-trouver-hotels.jpg, nous-trouver-lounges.jpg, nous-trouver-spas.jpg
// parfums-hero.jpg, flacon-ginger.png, flacon-maracuja.png, flacon-matcha.png, flacon-vanilla.png, flacon-rosa.png
// note-ginger.jpg, note-lime.jpg, note-vetiver.jpg, note-passion-fruit.jpg, note-mango.jpg, note-basil.jpg
// note-matcha.jpg, note-fig.jpg, note-cedarwood.jpg, note-vanilla.jpg, note-sesame.jpg, note-lavender.jpg
// note-rose.jpg, note-lychee.jpg, note-patchouli.jpg

export default function ImageSlot({
  src,
  alt,
  fill = false,
  width,
  height,
  sizes,
  className,
  priority = false,
  placeholderLabel = "Image a ajouter",
}: ImageSlotProps) {
  const [hasError, setHasError] = useState(false);
  const resolvedFillClassName = (() => {
    if (!fill) return className;
    const safeClassName = className ?? "";
    // Ensure fill images default to centered framing unless a specific object-* class is provided.
    return /(^|\s)object-[^\s]+/.test(safeClassName)
      ? safeClassName
      : `${safeClassName} object-center`.trim();
  })();

  if (hasError) {
    return (
      <div
        aria-label={placeholderLabel}
        className={`flex items-center justify-center bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(240,235,229,0.95))] text-center ${className ?? ""}`}
      >
        <div className="rounded-full border border-black/10 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-black/45">
          {placeholderLabel}
        </div>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "100vw"}
        priority={priority}
        className={resolvedFillClassName}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 800}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}