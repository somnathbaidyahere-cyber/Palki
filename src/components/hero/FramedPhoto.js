import Image from "next/image";

export const FRAME_SIZES = "(min-width: 1024px) 440px, 90vw";

// A gilded frame: antique-gold border, ivory mat, photo.
// Used for the intact frame AND for every torn fragment (each is a clipped copy).
export default function FramedPhoto({ src, alt = "", priority = false }) {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-[#D2AE68] via-[#967441] to-[#6C5230] p-[9px] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_0_0_1px_rgba(0,0,0,0.25)] sm:p-[11px]">
      <div className="relative h-full w-full bg-[#F8F4EC] p-[7px] sm:p-2">
        <div className="relative h-full w-full overflow-hidden bg-[#32151D] shadow-[inset_0_0_0_1px_rgba(150,116,65,0.55)]">
          <Image src={src} alt={alt} fill sizes={FRAME_SIZES} priority={priority} className="object-cover" />
        </div>
      </div>
    </div>
  );
}
