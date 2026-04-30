"use client";

import { useMemo } from "react";

/**
 * BrandColorBandsBackground
 * 
 * A premium brand identity background with 5 vertical color bands and subtle glass bubbles.
 * Uses NOW Perfume's Pantone color universes: Ginger, Maracuja, Matcha, Vanilla, Rosa.
 * 
 * Features:
 * - 5 vertical color bands with subtle gradients
 * - Translucent glass bubble shapes with soft blur
 * - Gentle floating animations for premium feel
 * - Fully responsive design
 * - Maintains text readability with optional overlay
 */

type BubbleConfig = {
  id: string;
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
  opacity: string;
  driftX: string;
  driftY: string;
  scaleTo: string;
};

interface BrandColorBandsBackgroundProps {
  variant?: "light" | "dark";
  showOverlay?: boolean;
  overlayOpacity?: number;
  bubbleCount?: number;
}

export default function BrandColorBandsBackground({
  variant = "light",
  showOverlay = false,
  overlayOpacity = 0.18,
  bubbleCount = 12,
}: BrandColorBandsBackgroundProps) {
  // NOW Perfume Pantone color universe
  const colors = {
    ginger: "#F2C330",      // Pantone 601U - yellow
    maracuja: "#ED7D31",    // Pantone 1355U - orange
    matcha: "#B5D966",      // Pantone 372U - green
    vanilla: "#D4C4B0",     // Pantone 726U - creamy beige
    rosa: "#E8A8C1",        // Pantone 670U - pink
  };

  const colorArray = [
    colors.ginger,
    colors.maracuja,
    colors.matcha,
    colors.vanilla,
    colors.rosa,
  ];

  // Generate bubble configurations
  const bubbles: BubbleConfig[] = useMemo(() => {
    const generated: BubbleConfig[] = [];
    for (let i = 0; i < bubbleCount; i++) {
      const horizontalSeed = ((i * 17) % 21) - 10;
      const verticalSeed = ((i * 23) % 19) - 9;
      const size = 72 + ((i * 29) % 96);
      generated.push({
        id: `bubble-${i}`,
        left: `${((i * 13.7) % 100).toFixed(2)}%`,
        top: `${((i * 19.3 + 11) % 100).toFixed(2)}%`,
        size: `${size}px`,
        delay: `${(i * 0.3) % 3}s`,
        duration: `${18 + (i % 5) * 2.5}s`,
        opacity: `${0.22 + (i % 4) * 0.035}`,
        driftX: `${horizontalSeed}px`,
        driftY: `${verticalSeed}px`,
        scaleTo: `${(1.02 + (i % 3) * 0.015).toFixed(3)}`,
      });
    }
    return generated;
  }, [bubbleCount]);

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* 5 Vertical Color Bands */}
      <div className="absolute inset-0 flex">
        {colorArray.map((color, index) => (
          <div
            key={`band-${index}`}
            className="flex-1 relative"
            style={{
              background: `linear-gradient(180deg,
                ${color}66 0%,
                ${color}42 38%,
                ${color}20 100%)`,
            }}
          >
            {/* Subtle inner gradient for depth */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(120deg,
                  rgba(255, 255, 255, 0.16) 0%,
                  transparent 34%,
                  rgba(255, 255, 255, 0.04) 100%)`,
              }}
            />
            <div
              className="absolute inset-y-0 right-0 w-[1px]"
              style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,0.18), rgba(255,255,255,0.03))",
              }}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.28),transparent_28%),radial-gradient(circle_at_82%_16%,rgba(255,255,255,0.18),transparent_26%),radial-gradient(circle_at_54%_76%,rgba(255,255,255,0.14),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02)_45%,rgba(0,0,0,0.02)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,transparent_48%,rgba(255,255,255,0.08)_100%)] mix-blend-screen" />

      {/* Glass Bubble Layer */}
      <div className="absolute inset-0 overflow-hidden">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute rounded-full"
            style={{
              left: bubble.left,
              top: bubble.top,
              width: bubble.size,
              height: bubble.size,
              animation: `driftFloat ${bubble.duration} ease-in-out infinite`,
              animationDelay: bubble.delay,
              opacity: bubble.opacity,
              ['--drift-x' as string]: bubble.driftX,
              ['--drift-y' as string]: bubble.driftY,
              ['--bubble-scale' as string]: bubble.scaleTo,
            }}
          >
            <div
              className="absolute inset-[-14%] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.24) 0%, rgba(255,255,255,0.08) 42%, transparent 72%)",
                filter: "blur(12px)",
              }}
            />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.14) 34%, rgba(255,255,255,0.06) 100%)",
                border: "1px solid rgba(255,255,255,0.38)",
                boxShadow:
                  "0 18px 36px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.65), inset -8px -10px 18px rgba(255,255,255,0.08)",
                backdropFilter: "blur(14px) saturate(135%)",
                WebkitBackdropFilter: "blur(14px) saturate(135%)",
              }}
            />
            <div
              className="absolute left-[16%] top-[14%] h-[26%] w-[30%] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.14) 68%, transparent 100%)",
                filter: "blur(3px)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Optional overlay veil for text readability */}
      {showOverlay && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: variant === "light" 
              ? `rgba(255, 255, 255, ${overlayOpacity})`
              : `rgba(0, 0, 0, ${overlayOpacity})`,
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* Subtle noise texture for premium finish */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundSize: "400px 400px",
        }}
      />
    </div>
  );
}
