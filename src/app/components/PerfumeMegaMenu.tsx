"use client";

import { Perfume } from "@/data/perfumes";
import Link from "next/link";
import ImageSlot from "./ImageSlot";

type PerfumeMegaMenuProps = {
  perfumes: Perfume[];
  lang: "fr" | "en";
  isOpen?: boolean;
};

type BottleFrameAdjust = {
  scale: number;
  y: number;
};

const MEGA_MENU_BOTTLE_ADJUSTMENTS: Record<string, BottleFrameAdjust> = {
  "ginger-aphrodisiac": { scale: 1.08, y: 1 },
  "maracuja-samba": { scale: 1.16, y: -2 },
  "matcha-star": { scale: 1.12, y: -1 },
  "vanilla-chill": { scale: 1.1, y: 0 },
  "rosa-boom": { scale: 1.11, y: -1 },
  default: { scale: 1.1, y: 0 },
};

export default function PerfumeMegaMenu({
  perfumes,
  lang,
  isOpen = false,
}: PerfumeMegaMenuProps) {
  const baseClass = isOpen
    ? "relative opacity-100 visible translate-y-0"
    : "absolute top-full left-0 right-0 w-screen opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0";

  return (
    <div className={`${baseClass} bg-[#f7f5f2]/95 shadow-2xl backdrop-blur-md transition-all duration-300 z-40`}> 
      <div className="mx-auto w-full max-w-[100vw] px-6 md:px-10 py-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {perfumes.map((perfume) => {
            const frameAdjust =
              MEGA_MENU_BOTTLE_ADJUSTMENTS[perfume.id] ??
              MEGA_MENU_BOTTLE_ADJUSTMENTS.default;

            return (
              <Link
                key={perfume.id}
                href={`/parfums/${perfume.id}`}
                className="group/item flex flex-col items-center gap-4 rounded-[32px] border border-white/70 bg-white/95 px-4 py-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative flex h-32 w-24 items-center justify-center overflow-hidden rounded-xl border border-black/10">
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: `translateY(${frameAdjust.y}%) scale(${frameAdjust.scale})`,
                      transformOrigin: "center center",
                    }}
                  >
                    <ImageSlot
                      src={perfume.bottleImage}
                      alt={`${perfume.name} bottle`}
                      fill
                      sizes="96px"
                      className="object-contain object-center"
                      placeholderLabel="Image a ajouter"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-900">
                    {perfume.name}
                  </h4>
                  <p className="text-[11px] uppercase tracking-[0.26em] text-slate-500">
                    {perfume.sprayMood}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
