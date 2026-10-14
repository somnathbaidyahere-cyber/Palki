import {
  Maximize2, Users, Snowflake, Landmark, ChefHat,
  ShieldCheck, ParkingCircle, Sparkles, BedDouble,
} from "lucide-react";

const ICONS = {
  area: Maximize2,
  guests: Users,
  ac: Snowflake,
  stage: Landmark,
  kitchen: ChefHat,
  fire: ShieldCheck,
  parking: ParkingCircle,
  decor: Sparkles,
  rooms: BedDouble,
};

export default function FeatureIcon({ name, className = "" }) {
  const Icon = ICONS[name] ?? Sparkles;
  return <Icon className={className} strokeWidth={1.25} aria-hidden="true" />;
}
