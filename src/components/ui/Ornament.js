// Small gold divider: hairlines with a lotus-like diamond in the middle.
export default function Ornament({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 text-gold ${className}`} aria-hidden="true">
      <span className="h-px w-14 bg-current opacity-60" />
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M11 1 21 11 11 21 1 11Z" />
        <path d="M11 6 16 11 11 16 6 11Z" fill="currentColor" />
      </svg>
      <span className="h-px w-14 bg-current opacity-60" />
    </div>
  );
}
