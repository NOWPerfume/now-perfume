type ProgressDotsProps = {
  step: number;
  total: number;
  accentColor: string;
};

export default function ProgressDots({ step, total, accentColor }: ProgressDotsProps) {
  return (
    <div className="flex items-center justify-center gap-2" aria-hidden="true">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === step;
        const isPast = index < step;

        return (
          <span
            key={index}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: isActive ? 24 : 8,
              backgroundColor: isActive || isPast ? accentColor : "rgba(255,255,255,0.2)",
              opacity: isActive ? 1 : isPast ? 0.7 : 0.45,
            }}
          />
        );
      })}
    </div>
  );
}
