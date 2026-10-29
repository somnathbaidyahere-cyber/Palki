// The seven stops of the venue walkthrough.
// Rooms use ROOMS from site.js at runtime, so `image` is null for that stop.
// Badges only use facts already listed for the venue; edit freely.
// Replace the placeholder images in /public/images/journey with real photos
// (keep the file names, or update the paths here).

export const pad = (n) => String(n).padStart(2, "0");

export const JOURNEY_STOPS = [
  {
    id: "approach",
    name: "Approach",
    tagline: "The journey begins",
    description:
      "A welcoming path, a little greenery, and a chance to leave the everyday behind. Your celebration begins even before you step inside.",
    image: "/images/journey/approach.jpg",
    alt: "The approach to the venue",
    badge: { icon: "parking", text: "Parking lot on site" },
  },
  {
    id: "entrance",
    name: "Entrance",
    tagline: "You enter",
    description:
      "The greetings, the smiles, the familiar faces arriving one by one. There's something special about seeing everyone you love come together in one place.",
    image: "/images/journey/entrance.jpg",
    alt: "The venue entrance",
    badge: { icon: "ac", text: "Fully air-conditioned" },
  },
  {
    id: "rooms",
    name: "Rooms",
    tagline: "Get fresh & get ready",
    description:
      "Take your time getting ready, freshen up, and enjoy a quieter moment before the festivities. Because the people making the memories deserve a little comfort too.",
    image: null,
    alt: "",
    badge: { icon: "rooms", text: "4–5 guest rooms" },
  },
  {
    id: "hall",
    name: "Celebration Hall",
    tagline: "Let the celebrations begin",
    description:
      "From heartfelt speeches to joyful reunions and photographs you'll revisit for years, this is where the energy of your gathering comes alive.",
    image: "/images/journey/celebration.jpg",
    alt: "The celebration hall",
    badge: { icon: "area", text: "5,000 sq ft · up to 700 guests" },
  },
  {
    id: "ceremony",
    name: "Ceremonial Area",
    tagline: "Make it memorable",
    description:
      "Make space for the traditions, promises, and meaningful rituals that bring everyone closer. Some moments deserve to be remembered exactly as they happen.",
    image: "/images/journey/ceremony.jpg",
    alt: "The ceremonial area",
    badge: { icon: "decor", text: "Custom decoration" },
  },
  {
    id: "dining",
    name: "Dining Area",
    tagline: "Gather around",
    description:
      "Pass around a favourite dish, catch up over a meal, and let conversations wander. Often, the simplest moments around the table become the sweetest memories.",
    image: "/images/journey/dining.jpg",
    alt: "The dining area",
    badge: { icon: "kitchen", text: "Dedicated kitchen with backup" },
  },
  {
    id: "garden",
    name: "Garden Retreat",
    tagline: "Wind down & unwind",
    description:
      "When the bustle softens, find a moment to breathe, share one last conversation, and savour the happiness of being together before heading home.",
    image: "/images/journey/garden.jpg",
    alt: "The garden retreat",
    badge: null,
  },
];