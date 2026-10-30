import Ornament from "./Ornament";

export default function SectionHeading({ title, text, dark = false, align = "center" }) {
  const center = align === "center";
  return (
    <header className={`mx-auto max-w-2xl ${center ? "text-center" : "text-left"}`}>
      <h2 className={`text-3xl  leading-tight md:text-4xl lg:text-5xl ${dark ? "text-ivory" : "text-maroon"}`}>
        {title}
      </h2>
      <Ornament className={`mt-3 md:mt-5 ${center ? "" : "justify-start"}`} />
      {text && (
        <p className={`mt-5 text-lg leading-relaxed ${dark ? "text-ivory/75" : "text-ink/75"}`}>{text}</p>
      )}
    </header>
  );
}
