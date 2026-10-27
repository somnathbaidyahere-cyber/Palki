// Desktop-only sticky progress rail. Buttons are keyboard accessible.
export default function JourneyRail({ stops, active, onSelect }) {
  const pct = stops.length > 1 ? (active / (stops.length - 1)) * 100 : 0;

  return (
    <nav aria-label="Journey progress" className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
      <div className="relative">
        {/* track + gold fill between first and last dot */}
        <span aria-hidden="true" className="absolute bottom-4 left-[6.5px] top-4 w-px bg-[#967441]/30">
          <span
            className="block w-full bg-[#967441] transition-[height] duration-700 ease-out motion-reduce:transition-none"
            style={{ height: `${pct}%` }}
          />
        </span>

        <ol className="relative flex h-[26rem] flex-col justify-between">
          {stops.map((s, i) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={i === active ? "step" : undefined}
                className="group flex h-8 items-center gap-4 text-left"
              >
                <span
                  aria-hidden="true"
                  className={`h-3.5 w-3.5 shrink-0 rounded-full border transition duration-300 ${
                    i <= active ? "border-[#967441] bg-[#967441]" : "border-[#967441]/50 bg-[#F8F4EC]"
                  } ${i === active ? "scale-110 ring-4 ring-[#967441]/25" : ""}`}
                />
                <span
                  className={`text-sm transition-colors duration-300 ${
                    i === active ? "font-semibold text-[#32151D]" : "text-[#32151D]/55 group-hover:text-[#32151D]"
                  }`}
                >
                  {s.name}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
