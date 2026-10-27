import FeatureIcon from "../ui/FeatureIcon";
import { pad } from "@/data/journey";
import styles from "./journey.module.css";

const pill =
  "absolute flex items-center gap-2 rounded-full bg-[#F8F4EC]/90 px-4 py-2 text-sm font-medium text-[#32151D] shadow-lg backdrop-blur";

// Floating badges over a photo. The parent must be `relative`.
export default function JourneyBadges({ stop, index, total }) {
  return (
    <div key={stop.id} aria-hidden="false">
      <span className={`${pill} left-4 top-4 ${styles.badgeIn}`}>
        <span className="font-display text-base text-[#967441]">{pad(index + 1)}</span>
        <span className="text-[#32151D]/50">/ {pad(total)}</span>
        <span className="ml-1 hidden sm:inline">{stop.name}</span>
      </span>

      {stop.badge && (
        <span className={`${pill} bottom-4 left-4 ${styles.badgeIn}`}>
          <span className={`flex items-center gap-2 ${styles.float}`}>
            <FeatureIcon name={stop.badge.icon} className="h-4 w-4 text-[#967441]" />
            {stop.badge.text}
          </span>
        </span>
      )}
    </div>
  );
}
