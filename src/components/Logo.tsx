export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-9 w-9 shrink-0">
        <div className="absolute inset-0 rounded-full bg-lime" />
        <svg viewBox="0 0 36 36" className="absolute inset-0 h-full w-full">
          <path
            d="M2 18 Q 18 8, 34 18"
            stroke="var(--charcoal)"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
        </svg>
        <div className="absolute left-1/2 top-1/2 h-5 w-1.5 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-sm bg-coral" />
        <div className="absolute left-1/2 top-1/2 h-5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-sm bg-court" />
      </div>
      <div className="leading-[0.95]">
        <div className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">The</div>
        <div className="font-display text-lg font-extrabold uppercase tracking-tight text-charcoal">Padel Range</div>
      </div>
    </div>
  );
}
