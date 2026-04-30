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
      className="group relative w-full max-w-[210px] rounded-2xl border border-black/8 bg-white/75 p-4 md:p-5 shadow-[0_10px_28px_rgba(0,0,0,0.07)] backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_18px_36px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/20"
    >
      <div className={`absolute inset-3 rounded-2xl bg-gradient-to-br ${perfume.colors.bg} opacity-18 blur-2xl transition-opacity duration-300 group-hover:opacity-28`} />

      <div className="relative mx-auto w-full aspect-[4/5] overflow-hidden rounded-xl">
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
        <h3 className="mx-auto flex h-10 items-center justify-center text-[15px] md:text-base font-semibold tracking-[0.01em] text-black">
          {perfume.name}
        </h3>
        <p className="mt-1 flex h-5 items-center justify-center text-[11px] uppercase tracking-[0.12em] text-black/55 font-medium">
          {perfume.sprayMood}
        </p>
        <p className="mt-2 flex h-11 items-center justify-center px-1 text-[13px] leading-relaxed text-black/72 font-normal">
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
      <div className="mt-2 text-[10px] uppercase tracking-[0.12em] text-black/45 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        {lang === "fr" ? "Découvrir" : "Discover"}
      </div>
    </Link>
  );
}
