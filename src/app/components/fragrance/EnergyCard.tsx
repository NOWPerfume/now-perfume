type EnergyCardProps = {
  label: string;
  isSelected: boolean;
  accentColor: string;
  textColor: string;
  onSelect: () => void;
};

export default function EnergyCard({
  label,
  isSelected,
  accentColor,
  textColor,
  onSelect,
}: EnergyCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group relative w-full min-h-11 rounded-2xl border px-5 py-4 text-left transition-all duration-500 focus-visible:outline-none focus-visible:ring-2"
      style={{
        borderColor: isSelected ? accentColor : "rgba(255, 255, 255, 0.1)",
        color: textColor,
        background: isSelected
          ? `linear-gradient(130deg, ${accentColor}24, rgba(0, 0, 0, 0.18))`
          : "rgba(255, 255, 255, 0.02)",
        boxShadow: isSelected ? `0 0 0 1px ${accentColor}55 inset` : "none",
      }}
      aria-pressed={isSelected}
    >
      <span
        className="absolute left-0 top-0 h-full w-[2px] rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-60"
        style={{ backgroundColor: accentColor, opacity: isSelected ? 0.9 : undefined }}
      />
      <span className="text-[1.06rem] tracking-[0.02em]">{label}</span>
    </button>
  );
}
