import { SITE_URL, TELEPHONE } from "@/data/site";

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: "Palki Garden",
    url: SITE_URL,
    description:
      "A venue for weddings, family gatherings, and special celebrations in Rajpur Sonarpur, West Bengal.",

    telephone: TELEPHONE,
    image: `${SITE_URL}/images/palki-garden-venue.jpg`,
    priceRange: "₹30k - ₹1Lac",

    address: {
      "@type": "PostalAddress",
      streetaddress:"Rail Gate, Mamonigate, Subhasgram, Rajpur Sonarpur",
      addressLocality: "Rajpur Sonarpur",
      addressRegion: "West Bengal",
      postalCode: "700147",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "South 24 Parganas, West Bengal",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
