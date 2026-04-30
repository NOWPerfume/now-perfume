# NOW Perfume Brand Color Bands Background System

## Overview

A premium brand identity background component featuring 5 vertical color bands inspired by the NOW Perfume Pantone color universe, with subtle glass bubble animations.

## Color Universe (Pantone)

- **Ginger**: #F2C330 (Pantone 601U - yellow)
- **Maracuja**: #ED7D31 (Pantone 1355U - orange)
- **Matcha**: #B5D966 (Pantone 372U - green)
- **Vanilla**: #D4C4B0 (Pantone 726U - creamy beige)
- **Rosa**: #E8A8C1 (Pantone 670U - pink)

## Component: `BrandColorBandsBackground`

### Location
`src/app/components/BrandColorBandsBackground.tsx`

### Features
- 5 vertical color bands with subtle gradients
- Translucent glass bubble shapes (12-18+ bubbles)
- Soft blur and layered depth
- Gentle floating animations (8-20s cycle)
- Optional overlay veil for text readability
- Premium noise texture for refined finish
- Fully responsive design

### Props

```typescript
interface BrandColorBandsBackgroundProps {
  variant?: "light" | "dark";        // Default: "light"
  showOverlay?: boolean;             // Default: false
  overlayOpacity?: number;           // Default: 0.18 (0-1)
  bubbleCount?: number;              // Default: 12 (min: 8, max: 20+)
}
```

### Usage Example

```tsx
import BrandColorBandsBackground from "@/app/components/BrandColorBandsBackground";

export function MySection() {
  return (
    <section className="relative h-screen overflow-hidden">
      <BrandColorBandsBackground 
        variant="light"
        showOverlay={true}
        overlayOpacity={0.22}
        bubbleCount={14}
      />
      
      <div className="relative z-10">
        {/* Your content here */}
      </div>
    </section>
  );
}
```

## Current Implementation

### 1. **Homepage - Spray Section**
- Route: `/`
- Component location: `src/app/page.tsx` (SPRAY section)
- Config: 14 bubbles, 0.22 overlay opacity
- Purpose: "Spray Your Energy" CTA section with brand identity

### 2. **Parfums Listing - Hero Section**
- Route: `/parfums`
- Component location: `src/app/parfums/page.tsx` (HERO section)
- Config: 16 bubbles, 0.25 overlay opacity
- Purpose: Collection introduction with premium atmosphere

### 3. **La Marque - 5 Moods Section**
- Route: `/la-marque`
- Component location: `src/app/la-marque/page.tsx` (5 MOODS section)
- Config: 18 bubbles, 0.12 overlay opacity
- Purpose: Showcase 5 fragrance moods with colorful brand backdrop

## Animation System

### Keyframe: `driftFloat`
- Duration: 12-20 seconds (randomized per bubble)
- Movement: Subtle horizontal and vertical drift (±8-12px)
- Scale: Gentle pulse (0.98 - 1.02)
- Delay: Staggered (0.3s increments)

### CSS in `src/app/globals.css`
```css
@keyframes driftFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25%      { transform: translate(12px, -8px) scale(1.02); }
  50%      { transform: translate(8px, 16px) scale(0.98); }
  75%      { transform: translate(-10px, 6px) scale(1.01); }
}
```

## Design Principles

### Premium Feel
- Low opacity gradients (8-22% alpha)
- Soft blur amounts (20-32px)
- Subtle glass effect with inset shadows
- Noise texture overlay for texture
- Smooth 12-20s animation cycles

### Text Readability
- Optional `showOverlay` prop adds translucent veil
- Overlay opacity adjustable (0.12 - 0.25 recommended)
- Always place text in `z-10` or higher
- Use `text-black` on light backgrounds
- Ensure sufficient contrast

### Performance
- CSS Gradients: No GPU hit
- Animations: CSS-based (smooth 60fps)
- Responsive: All breakpoints supported
- No images required
- Minimal JavaScript (only bubble generation setup)

## Customization Options

### To add more sections:

```tsx
import BrandColorBandsBackground from "@/app/components/BrandColorBandsBackground";

export function NewSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      <BrandColorBandsBackground 
        variant="light"
        showOverlay={true}
        overlayOpacity={0.2}
        bubbleCount={14}
      />
      <div className="relative z-10 flex items-center justify-center">
        <h2>Your Content</h2>
      </div>
    </section>
  );
}
```

### To adjust colors:
Edit the `colors` object in `BrandColorBandsBackground.tsx` to modify hex values.

### To change animation:
Modify `@keyframes driftFloat` in `src/app/globals.css` for different movement patterns.

## Browser Support

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ CSS Grid support required
- ✅ Gradient support required
- ✅ CSS Filter support required
- ✅ View Timeline (view() CSS) not used - animations are independent

## Quality Checklist

- ✅ No console errors
- ✅ TypeScript strict mode compliant
- ✅ Responsive on mobile, tablet, desktop
- ✅ Text always readable with overlay
- ✅ Animations smooth and subtle
- ✅ Performance optimized
- ✅ Reusable across sections
- ✅ Follows NOW Perfume brand guidelines
- ✅ Premium, not childish
- ✅ Recognizable NOW Perfume identity

## Maintenance

### Files Modified
1. `src/app/components/BrandColorBandsBackground.tsx` (NEW)
2. `src/app/globals.css` (added `@keyframes driftFloat`)
3. `src/app/page.tsx` (imported and used in SPRAY section)
4. `src/app/parfums/page.tsx` (imported and used in HERO section)
5. `src/app/la-marque/page.tsx` (imported and used in 5 MOODS section)

### Future Enhancements
- Variant for dark mode (background colors adjusted)
- Custom color palette option
- Dynamic bubble count based on viewport
- Parallax effect for deeper immersion
- Interactive bubble response to cursor position
