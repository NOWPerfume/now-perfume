import type { ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";

const fragranceDisplay = Cormorant_Garamond({
  variable: "--font-fragrance-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const fragranceBody = Manrope({
  variable: "--font-fragrance-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function FragranceLayout({ children }: { children: ReactNode }) {
  return (
    <main className={`${fragranceDisplay.variable} ${fragranceBody.variable} overflow-x-hidden font-[var(--font-fragrance-body)]`}>
      {children}
    </main>
  );
}
