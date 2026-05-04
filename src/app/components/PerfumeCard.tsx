"use client";

import { Perfume } from "@/data/perfumes";
import Link from "next/link";
import ImageSlot from "./ImageSlot";

type PerfumeCardProps = {
  perfume: Perfume;
  lang: "fr" | "en";
};

export default function PerfumeCard({ perfume, lang }: PerfumeCardProps) {
  return (
    <Link
      href={`/parfums/${perfume.id}`}
      className="group relative w-full max-w-none rounded-[24px] bg-white/75 p-3 shadow-[0_8px_22px_rgba(0,0,0,0.05)] backdrop-blur-sm transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/20 md:max-w-[210px] md:rounded-2xl md:border md:border-black/8 md:p-5 md:shadow-[0_10px_28px_rgba(0,0,0,0.07)] md:hover:-translate-y-1.5 md:hover:scale-[1.02] md:hover:shadow-[0_18px_36px_rgba(0,0,0,0.12)]"
    >
      <div className={`absolute inset-3 rounded-2xl bg-gradient-to-br ${perfume.colors.bg} opacity-18 blur-2xl transition-opacity duration-300 group-hover:opacity-28`} />

      <div className="relative mx-auto w-full aspect-[3/4] overflow-hidden rounded-xl md:aspect-[4/5]">
        <ImageSlot
          src={perfume.bottleImage}
          alt={`${perfume.name} bottle`}
          fill
          sizes="(max-width: 640px) 42vw, (max-width: 1024px) 22vw, 180px"
          className="object-contain object-center"
          placeholderLabel="Image a ajouter"
        />
      </div>

      {/* Perfume info */}
      <div className="relative w-full pt-3 text-center">
        <h3 className="mx-auto flex min-h-[2.5rem] items-center justify-center text-[14px] font-semibold tracking-[0.01em] text-black md:h-10 md:text-base">
          {perfume.name}
        </h3>
        <p className="mt-1 flex min-h-[1.25rem] items-center justify-center text-[10px] font-medium uppercase tracking-[0.12em] text-black/55 md:h-5 md:text-[11px]">
          {perfume.sprayMood}
        </p>
        <p className="mt-2 flex min-h-[2.5rem] items-center justify-center px-1 text-[12px] leading-relaxed text-black/72 font-normal md:h-11 md:text-[13px]">
          {perfume.claim}
        </p>
        <div className="mx-auto mt-3 w-24 border-t border-black/15 pt-2.5">
          <p className="text-[18px] font-medium tracking-[0.02em] text-black">
            {perfume.price}
            <span className="ml-1 align-top text-[10px] tracking-[0.12em] text-black/62">EUR</span>
          </p>
        </div>
      </div>

      {/* Hover cue */}
      <div className="mt-2 hidden text-[10px] uppercase tracking-[0.12em] text-black/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
        {lang === "fr" ? "Découvrir" : "Discover"}
      </div>
    </Link>
  );
}
