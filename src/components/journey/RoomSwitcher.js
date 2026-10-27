"use client";

import { useRef } from "react";

// Segmented control (ARIA tabs pattern with arrow-key support).
export default function RoomSwitcher({ rooms, value, onChange }) {
  const refs = useRef([]);

  function onKeyDown(e, i) {
    let next = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % rooms.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + rooms.length) % rooms.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = rooms.length - 1;
    if (next !== null) {
      e.preventDefault();
      onChange(next);
      refs.current[next]?.focus();
    }
  }

  const room = rooms[value];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Room type"
        className="inline-grid w-full auto-cols-fr grid-flow-col rounded-full border border-[#967441]/40 bg-white/60 p-1 sm:w-auto"
      >
        {rooms.map((r, i) => (
          <button
            key={r.title}
            ref={(el) => (refs.current[i] = el)}
            type="button"
            role="tab"
            id={`room-tab-${i}`}
            aria-selected={i === value}
            aria-controls="room-detail"
            tabIndex={i === value ? 0 : -1}
            onClick={() => onChange(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`min-h-11 rounded-full px-3 text-sm font-medium transition-colors duration-300 sm:px-5 ${
              i === value ? "bg-[#32151D] text-[#F8F4EC]" : "text-[#32151D]/70 hover:text-[#32151D]"
            }`}
          >
            {r.label ?? r.title}
          </button>
        ))}
      </div>

      <div id="room-detail" role="tabpanel" aria-labelledby={`room-tab-${value}`} aria-live="polite" className="mt-5 max-w-md">
        <p className="font-display text-2xl font-semibold">{room.title}</p>
        <p className="mt-1 text-[#32151D]/75">{room.text}</p>
      </div>
    </div>
  );
}
